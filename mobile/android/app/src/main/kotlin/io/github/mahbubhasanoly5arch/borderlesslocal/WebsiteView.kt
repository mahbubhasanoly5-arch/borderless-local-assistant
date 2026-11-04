package io.github.mahbubhasanoly5arch.borderlesslocal

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Handler
import android.os.Message
import android.webkit.GeolocationPermissions
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.webkit.WebViewAssetLoader
import io.flutter.plugin.common.BinaryMessenger
import io.flutter.plugin.common.MethodChannel
import io.flutter.plugin.common.StandardMessageCodec
import io.flutter.plugin.platform.PlatformView
import io.flutter.plugin.platform.PlatformViewFactory
import java.io.ByteArrayInputStream
import java.net.HttpURLConnection
import java.net.URI

class WebsiteViewFactory(private val activity: MainActivity, private val messenger: BinaryMessenger) :
    PlatformViewFactory(StandardMessageCodec.INSTANCE) {
    override fun create(context: Context, viewId: Int, args: Any?): PlatformView = WebsiteView(activity, messenger, viewId, args as? Map<*, *>)
}

class WebsiteView(private val activity: MainActivity, messenger: BinaryMessenger, id: Int, args: Map<*, *>?) : PlatformView {
    private var initialAction = args?.get("action") as? String ?: ""
    private val initialQuery = args?.get("query") as? String ?: ""
    private val host = "appassets.androidplatform.net"
    private val home = "https://$host/web/index.html"
    private val web = WebView(activity)
    private val channel = MethodChannel(messenger, "borderless_local/website/$id")
    private val loader = WebViewAssetLoader.Builder()
        .addPathHandler("/", WebViewAssetLoader.AssetsPathHandler(activity)).build()
    private val popups = mutableSetOf<WebView>()

    init {
        web.setBackgroundColor(0xfff3f5ef.toInt())
        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            setSupportMultipleWindows(true)
            setGeolocationEnabled(true)
        }
        web.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? {
                if (request.url.host != host) return null
                if (request.url.path?.startsWith("/api/") == true) return databaseResponse(request)
                val uri = if (request.url.path == "/") Uri.parse(home) else request.url
                return loader.shouldInterceptRequest(uri) ?: response(404, "Not found", "text/plain")
            }
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                if (request.url.host == host && request.url.path == "/") {
                    view.loadUrl(home)
                    return true
                }
                if (request.url.host == host && request.url.scheme == "https") return false
                openExternal(request.url)
                return true
            }
            override fun onPageFinished(view: WebView, url: String) {
                if (Uri.parse(url).host != host) return
                // Only the packaged trusted page receives this small compatibility marker.
                view.evaluateJavascript("window.BorderlessAndroid=true;", null)
                val action = initialAction
                initialAction = ""
                when (action) {
                    "location" -> view.evaluateJavascript("document.getElementById('location-button')?.scrollIntoView({block:'center'}); if(typeof useMyLocation==='function')useMyLocation();", null)
                    "search" -> view.evaluateJavascript("var field=document.getElementById('search'); if(field){field.value=${org.json.JSONObject.quote(initialQuery)}; field.scrollIntoView({block:'center'});field.focus();if(field.value&&typeof runSearch==='function')runSearch();}", null)
                    "language" -> view.evaluateJavascript("document.getElementById('language')?.scrollIntoView({block:'center'});document.getElementById('language')?.focus();", null)
                }
            }
        }
        web.webChromeClient = object : WebChromeClient() {
            override fun onGeolocationPermissionsShowPrompt(origin: String, callback: GeolocationPermissions.Callback) {
                if (Uri.parse(origin).host == host) activity.requestWebsiteLocation(origin, callback)
                else callback.invoke(origin, false, false)
            }
            override fun onCreateWindow(view: WebView, isDialog: Boolean, isUserGesture: Boolean, resultMsg: Message): Boolean {
                if (!isUserGesture) return false
                val popup = WebView(activity)
                popups.add(popup)
                popup.webViewClient = object : WebViewClient() {
                    override fun shouldOverrideUrlLoading(v: WebView, request: WebResourceRequest): Boolean {
                        if (request.url.toString() == "about:blank") return false
                        openExternal(request.url)
                        Handler(activity.mainLooper).post { popups.remove(popup); popup.destroy() }
                        return true
                    }
                }
                (resultMsg.obj as WebView.WebViewTransport).webView = popup
                resultMsg.sendToTarget()
                return true
            }
            override fun onCloseWindow(window: WebView) { popups.remove(window); window.destroy() }
        }
        channel.setMethodCallHandler { call, result ->
            when (call.method) {
                "home" -> { web.loadUrl(home); result.success(null) }
                "reload" -> { web.reload(); result.success(null) }
                "back" -> { if (web.canGoBack()) web.goBack() else web.evaluateJavascript("window.scrollTo(0,0)", null); result.success(null) }
                else -> result.notImplemented()
            }
        }
        web.loadUrl(home)
    }
    private fun openExternal(uri: Uri) {
        if (uri.scheme !in listOf("https", "http")) return
        try { activity.startActivity(Intent(Intent.ACTION_VIEW, uri)) }
        catch (_: Exception) { Toast.makeText(activity, "No browser or Maps app is available.", Toast.LENGTH_SHORT).show() }
    }
    private fun response(status: Int, message: String, mime: String = "application/json") = WebResourceResponse(
        mime, "UTF-8", status, if (status == 200) "OK" else "Unavailable",
        mapOf("Cache-Control" to "no-store"), ByteArrayInputStream(message.toByteArray(Charsets.UTF_8)))

    private fun databaseResponse(request: WebResourceRequest): WebResourceResponse {
        if (request.method != "GET" || !Regex("^/api/cities(?:/[0-9]+)?/?$").matches(request.url.path ?: "")) {
            return response(404, "{\"error\":\"Not available in this app\"}")
        }
        val configured = activity.getSharedPreferences("borderless_local", Context.MODE_PRIVATE).getString("server_url", "") ?: ""
        if (configured.isBlank()) return response(503, "{\"error\":\"Configure the rules server in settings\"}")
        var connection: HttpURLConnection? = null
        return try {
            val base = URI(if (configured.endsWith('/')) configured else "$configured/")
            if (base.scheme !in listOf("http", "https") || base.host == null || base.userInfo != null) return response(400, "{}")
            val suffix = request.url.encodedPath!!.removePrefix("/") + (request.url.encodedQuery?.let { "?$it" } ?: "")
            connection = base.resolve(suffix).toURL().openConnection() as HttpURLConnection
            connection.instanceFollowRedirects = false
            connection.connectTimeout = 10000
            connection.readTimeout = 10000
            connection.setRequestProperty("Accept", "application/json")
            val status = connection.responseCode
            if (status == 200) response(200, connection.inputStream.bufferedReader().use { it.readText() })
            else response(503, "{\"error\":\"Database API unavailable\"}")
        } catch (_: Exception) { response(503, "{\"error\":\"Rules server unavailable\"}") }
        finally { connection?.disconnect() }
    }
    override fun getView() = web
    override fun dispose() {
        channel.setMethodCallHandler(null)
        popups.forEach { it.destroy() }
        popups.clear()
        web.stopLoading()
        web.destroy()
    }
}

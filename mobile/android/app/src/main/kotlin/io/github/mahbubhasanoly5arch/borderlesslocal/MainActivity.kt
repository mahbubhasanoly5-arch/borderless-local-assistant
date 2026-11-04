package io.github.mahbubhasanoly5arch.borderlesslocal

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.Manifest
import android.content.pm.PackageManager
import android.webkit.GeolocationPermissions

class MainActivity : FlutterActivity() {
    private val nativeLocation by lazy { NativeLocation(this) }
    override fun onDestroy() { nativeLocation.dispose(); super.onDestroy() }
    private var pendingLocation: Pair<String, GeolocationPermissions.Callback>? = null
    fun requestWebsiteLocation(origin: String, callback: GeolocationPermissions.Callback) {
        if (checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            callback.invoke(origin, true, false)
        } else {
            pendingLocation?.let { it.second.invoke(it.first, false, false) }
            pendingLocation = Pair(origin, callback)
            requestPermissions(arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION), 104)
        }
    }
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 105) nativeLocation.permissionResult()
        if (requestCode == 104) {
            pendingLocation?.let { it.second.invoke(it.first, grantResults.firstOrNull() == PackageManager.PERMISSION_GRANTED, false) }
            pendingLocation = null
        }
    }
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        flutterEngine.platformViewsController.registry.registerViewFactory(
            "borderless_local/website", WebsiteViewFactory(this, flutterEngine.dartExecutor.binaryMessenger))
        val settings = getSharedPreferences("borderless_local", MODE_PRIVATE)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "borderless_local/settings")
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "getAppLanguage" -> result.success(settings.getString("app_language", "bn"))
                    "setAppLanguage" -> {
                        val language = call.arguments as? String
                        if (language !in setOf("bn", "en", "ja", "hi", "es", "fr", "ar", "my")) result.error("invalid_language", "Unsupported interface language", null)
                        else if (settings.edit().putString("app_language", language).commit()) result.success(null)
                        else result.error("save_failed", "Could not save language", null)
                    }
                    "getCurrentPosition" -> nativeLocation.request(result)
                    "getServerUrl" -> result.success(settings.getString("server_url", null))
                    "setServerUrl" -> {
                        val url = call.arguments as? String
                        if (url == null) {
                            result.error("invalid_url", "Expected a URL string", null)
                        } else if (settings.edit().putString("server_url", url).commit()) {
                            result.success(null)
                        } else {
                            result.error("save_failed", "Could not save connection settings", null)
                        }
                    }
                    "getDirectoryRecords" -> result.success(settings.getString("directory_records", "[]"))
                    "setSavedGuideLibrary", "setRecentGuideLibrary" -> {
                        val args = call.arguments as? Map<*, *>
                        val keys = (args?.get("keys") as? List<*>)?.filterIsInstance<String>()
                        val records = args?.get("records") as? String
                        val recent = call.method == "setRecentGuideLibrary"
                        if (keys == null || records == null || keys.size > (if (recent) 12 else 1000) || records.length > 2000000) {
                            result.error("invalid_library", "Invalid saved guide library", null)
                        } else {
                            val edit = settings.edit().putString("directory_records", records)
                            if (recent) edit.putString("recent_cities", org.json.JSONArray(keys).toString())
                            else edit.putStringSet("saved_cities", keys.toSet())
                            if (edit.commit()) result.success(null)
                            else result.error("save_failed", "Could not save guide library", null)
                        }
                    }
                    "getCountryDirectory" -> {
                        val code = call.arguments as? String
                        if (code == null || !Regex("^[A-Z]{2}$").matches(code)) result.error("invalid_country", "Invalid country code", null)
                        else Thread {
                            try {
                                val text = assets.open("web/cities/$code.js").bufferedReader(Charsets.UTF_8).use { it.readText() }
                                val json = text.substringAfter('=').trim().removeSuffix(";").trim()
                                runOnUiThread { result.success(json) }
                            } catch (_: Exception) {
                                runOnUiThread { result.error("directory_unavailable", "Country directory could not be loaded", null) }
                            }
                        }.start()
                    }
                    "getRecentCities" -> {
                        val stored = org.json.JSONArray(settings.getString("recent_cities", "[]"))
                        result.success((0 until stored.length()).map { stored.getString(it) })
                    }
                    "setRecentCities" -> {
                        val cities = (call.arguments as? List<*>)?.filterIsInstance<String>()?.take(12)
                        if (cities == null) result.error("invalid_recent", "Invalid recent city list", null)
                        else if (settings.edit().putString("recent_cities", org.json.JSONArray(cities).toString()).commit()) result.success(null)
                        else result.error("save_failed", "Could not save recent guides", null)
                    }
                    "getTravelChecklist" -> result.success(settings.getStringSet("travel_checklist", emptySet())?.toList())
                    "setTravelChecklist" -> {
                        val entries = (call.arguments as? List<*>)?.filterIsInstance<String>()
                        if (entries == null || entries.size > 30) result.error("invalid_checklist", "Invalid checklist", null)
                        else if (settings.edit().putStringSet("travel_checklist", entries.toSet()).commit()) result.success(null)
                        else result.error("save_failed", "Could not save checklist", null)
                    }
                    "getSavedCities" -> result.success(settings.getStringSet("saved_cities", emptySet())?.toList())
                    "setSavedCities" -> {
                        val cities = (call.arguments as? List<*>)?.filterIsInstance<String>()
                        if (cities == null || cities.size > 1000) result.error("invalid_saved", "Invalid saved city list", null)
                        else if (settings.edit().putStringSet("saved_cities", cities.toSet()).commit()) result.success(null)
                        else result.error("save_failed", "Could not save guides", null)
                    }
                    "openExternalUrl" -> {
                        val uri = (call.arguments as? String)?.let { android.net.Uri.parse(it) }
                        if (uri == null || uri.scheme != "https" || uri.host.isNullOrBlank()) result.error("invalid_url", "Expected an HTTPS link", null)
                        else try {
                            startActivity(android.content.Intent(android.content.Intent.ACTION_VIEW, uri))
                            result.success(null)
                        } catch (_: android.content.ActivityNotFoundException) {
                            result.error("no_browser", "No app can open this link", null)
                        }
                    }
                    else -> result.notImplemented()
                }
            }
    }
}

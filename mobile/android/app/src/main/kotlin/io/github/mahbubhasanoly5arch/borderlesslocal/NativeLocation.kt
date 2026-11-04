package io.github.mahbubhasanoly5arch.borderlesslocal

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import io.flutter.plugin.common.MethodChannel

/** Foreground, one-shot location. Coordinates never leave the device here. */
class NativeLocation(private val activity: MainActivity) {
    private val manager = activity.getSystemService(Context.LOCATION_SERVICE) as LocationManager
    private val handler = Handler(Looper.getMainLooper())
    private var pending: MethodChannel.Result? = null
    private var listener: LocationListener? = null
    fun request(result: MethodChannel.Result) {
        if (pending != null) { result.error("busy", "Location request already active", null); return }
        pending = result
        if (activity.checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED && activity.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            activity.requestPermissions(arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION), 105)
        } else start()
    }
    fun permissionResult() {
        if (pending == null) return
        if (activity.checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED || activity.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) start()
        else finish(null, "permission_denied")
    }
    private fun start() {
        val started = SystemClock.elapsedRealtimeNanos()
        val fine = activity.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
        var best: Location? = null
        val callback = object : LocationListener {
            override fun onLocationChanged(location: Location) {
                if (location.elapsedRealtimeNanos < started - 5_000_000_000L || !location.hasAccuracy()) return
                if (best == null || location.accuracy < best!!.accuracy) best = location
                if (!fine || location.accuracy <= 100f) finish(mapOf("latitude" to location.latitude, "longitude" to location.longitude, "accuracy" to location.accuracy.toDouble()), null)
            }
            override fun onProviderEnabled(provider: String) {}
            override fun onProviderDisabled(provider: String) {}
            @Deprecated("Legacy Android callback")
            override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
        }
        listener = callback
        try {
            val providers = listOf(LocationManager.NETWORK_PROVIDER, LocationManager.GPS_PROVIDER).filter { (it != LocationManager.GPS_PROVIDER || fine) && manager.isProviderEnabled(it) }
            if (providers.isEmpty()) { finish(null, "location_disabled"); return }
            for (provider in providers) manager.requestLocationUpdates(provider, 0L, 0f, callback, Looper.getMainLooper())
            handler.postDelayed({
                val fix = best
                if (fix == null) finish(null, "location_timeout")
                else finish(mapOf("latitude" to fix.latitude, "longitude" to fix.longitude, "accuracy" to fix.accuracy.toDouble()), null)
            }, 25000)
        } catch (_: Exception) { finish(null, "location_unavailable") }
    }
    private fun finish(value: Map<String, Double>?, error: String?) {
        val result = pending ?: return
        pending = null
        handler.removeCallbacksAndMessages(null)
        listener?.let { try { manager.removeUpdates(it) } catch (_: Exception) {} }
        listener = null
        if (error == null) result.success(value) else result.error(error, "Location could not be determined. Search for your city instead.", null)
    }
    fun dispose() { finish(null, "cancelled") }
}

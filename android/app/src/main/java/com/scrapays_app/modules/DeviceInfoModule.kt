package com.scrapays_app.modules

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.WritableNativeMap

@ReactModule(name = "DeviceInfoModule")
class DeviceInfoModule(reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DeviceInfoModule"
    }

    @ReactMethod
fun getDeviceInfo(promise: Promise) {
    try {
        val deviceInfo = WritableNativeMap()
        
        deviceInfo.putString("model", Build.MODEL ?: "Unknown")
        deviceInfo.putString("manufacturer", Build.MANUFACTURER ?: "Unknown")
        deviceInfo.putString("androidVersion", Build.VERSION.RELEASE ?: "Unknown")
        
        val batteryLevel = try {
            getBatteryLevel()
        } catch (e: Exception) {
            -1f
        }
        deviceInfo.putDouble("batteryLevel", batteryLevel.toDouble())
        
        promise.resolve(deviceInfo)
    } catch (e: Exception) {
        promise.reject("DEVICE_INFO_ERROR", "Detailed error: ${e.message}", e)
    }
}

private fun getBatteryLevel(): Float {
    val batteryIntent: Intent? = reactApplicationContext.registerReceiver(
        null, 
        IntentFilter(Intent.ACTION_BATTERY_CHANGED)
    )
    
    return try {
        val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
        
        if (level == -1 || scale == -1) {
            throw IllegalStateException("Unable to retrieve battery information")
        }
        
        level.toFloat() / scale.toFloat() * 100f
    } catch (e: Exception) {
        throw IllegalStateException("Battery level retrieval failed: ${e.message}")
    }
}
}
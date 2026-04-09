package tech.poool.rnaccess

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import tech.poool.rnaccess.NativePaywallModuleSpec
import com.google.gson.Gson

class NativePaywallModule(context: ReactApplicationContext) : NativePaywallModuleSpec(context) {
  var events: EventEmitter = EventEmitter()

  override fun getName() = NAME

  override fun emit(event: String?, data: String?) {
    Log.i("Poool/Access/ReactNative", "ACCESS: Received js event $event with -> $data")

    try {
      events.emit(event!!, Gson().fromJson(data, NativeMessage::class.java))
    } catch (e: Exception) {
      Log.e("Poool/Access/ReactNative", "ACCESS: Failed to decode js event data")
      e.printStackTrace()
    }
  }

  companion object {
    const val NAME = "NativePaywallModule"
  }
}

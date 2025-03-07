package tech.poool.rnaccess

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.google.gson.Gson

@ReactModule(name = NativePaywallModuleSpec.NAME)
class NativePaywallModule(context: ReactApplicationContext) : NativePaywallModuleSpec(context) {
  var events: EventEmitter = EventEmitter()

  override fun emit(event: String?, data: String?) {
    Log.i("Poool/Access/ReactNative", "ACCESS: Received js event $event with -> $data")

    try {
      events.emit(event!!, Gson().fromJson(data, NativeMessage::class.java))
    } catch (e: Exception) {
      Log.e("Poool/Access/ReactNative", "ACCESS: Failed to decode js event data")
      e.printStackTrace()
    }
  }
}

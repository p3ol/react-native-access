package com.poool.reactnativeaccess

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ReactNativeAccessModule.NAME)
class ReactNativeAccessModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "ReactNativeAccess"
  }
}

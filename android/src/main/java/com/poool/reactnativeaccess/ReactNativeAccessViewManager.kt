package com.poool.reactnativeaccess

import android.widget.LinearLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class ReactNativeAccessViewManager (
    private val callerContext: ReactApplicationContext
) : SimpleViewManager<LinearLayout>() {
    override fun getName() = REACT_CLASS

    companion object {
        const val REACT_CLASS = "RNAccessView"
    }

    override fun createViewInstance(context: ThemedReactContext) = LinearLayout(context)
}
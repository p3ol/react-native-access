package com.poool.reactnativeaccess

import android.content.Context
import android.widget.FrameLayout
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.poool.access.Access

class PaywallView(context: Context) : FrameLayout(context) {
  private var appId: String? = null
  private var pageType: String? = null
  private var access: Access? = null
  private var config: Map<String, Any>? = null
  private var styles: Map<String, Any>? = null
  private var variables: Map<String, Any>? = null
  private var texts: Map<String, String>? = null

  init {
    viewTreeObserver.addOnGlobalLayoutListener { requestLayout() }
  }

  private fun reinit () {
    if (
      appId == null || pageType == null || config == null || styles == null ||
      variables == null || texts == null
    ) {
      return
    }

    if (access !== null) {
      access?.destroy()
    }

    access = Access(appId!!)
    access?.config(config!!)
    access?.styles(styles!!)
    access?.variables(variables!!)
    access?.texts(texts!!)

    val subView = access?.returnPaywallView(pageType!!, context as ThemedReactContext)
    subView?.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    addView(subView)
    viewTreeObserver.dispatchOnGlobalLayout()
  }

  fun setAppId(appId: String) {
    this.appId = appId
    reinit()
  }

  fun setPageType(pageType: String) {
    this.pageType = pageType
    reinit()
  }

  fun setConfig(config: ReadableMap) {
    this.config = config.toHashMap()
    reinit()
  }

  fun setStyles(styles: ReadableMap) {
    this.styles = styles.toHashMap()
    reinit()
  }

  fun setVariables(variables: ReadableMap) {
    this.variables = variables.toHashMap()
    reinit()
  }

  fun setTexts(texts: ReadableMap) {
    this.texts = texts.toHashMap().toMap().mapValues { it.value.toString() }
    reinit()
  }
}

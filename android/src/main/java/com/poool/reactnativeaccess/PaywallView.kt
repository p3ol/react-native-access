package com.poool.reactnativeaccess

import android.content.Context
import android.widget.FrameLayout
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.uimanager.events.RCTModernEventEmitter
import com.poool.access.Access
import com.poool.access.onAlternativeClick
import com.poool.access.onAnswer
import com.poool.access.onCustomButtonClick
import com.poool.access.onDataPolicyClick
import com.poool.access.onDiscoveryLinkClick
import com.poool.access.onError
import com.poool.access.onFormSubmit
import com.poool.access.onLock
import com.poool.access.onLoginClick
import com.poool.access.onPaywallSeen
import com.poool.access.onReady
import com.poool.access.onRegister
import com.poool.access.onRelease
import com.poool.access.onSubscribeClick

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
      access = null
    }

    access = Access(appId!!)
    access?.config(config!!)
    access?.styles(styles!!)
    access?.variables(variables!!)
    access?.texts(texts!!)

    initEvents()

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

  private fun initEvents () {
    val reactContext = context as ReactContext
    val eventEmitter = reactContext.getJSModule(RCTEventEmitter::class.java)

    access?.onLock {
      eventEmitter.receiveEvent(id, "onLock", null)
    }

    access?.onReady {
      eventEmitter.receiveEvent(id, "onReady", PaywallEventMapping.widgetEvent(it))
    }

    access?.onRelease {
      eventEmitter.receiveEvent(id, "onRelease", PaywallEventMapping.widgetEvent(it))
    }

    access?.onPaywallSeen {
      eventEmitter.receiveEvent(id, "onPaywallSeen", PaywallEventMapping.widgetEvent(it))
    }

    access?.onRegister {
      eventEmitter.receiveEvent(id, "onRegister", PaywallEventMapping.registerEvent(it))

      return@onRegister null
    }

    access?.onFormSubmit {
      eventEmitter.receiveEvent(id, "onFormSubmit", PaywallEventMapping.formEvent(it))

      return@onFormSubmit null
    }

    access?.onSubscribeClick {
      eventEmitter.receiveEvent(id, "onSubscribeClick", PaywallEventMapping.clickEvent(it))
    }

    access?.onLoginClick {
      eventEmitter.receiveEvent(id, "onLoginClick", PaywallEventMapping.clickEvent(it))
    }

    access?.onDiscoveryLinkClick {
      eventEmitter.receiveEvent(id, "onDiscoveryLinkClick", PaywallEventMapping.clickEvent(it))
    }

    access?.onCustomButtonClick {
      eventEmitter.receiveEvent(id, "onCustomButtonClick", PaywallEventMapping.customButtonClickEvent(it))
    }

    access?.onDataPolicyClick {
      eventEmitter.receiveEvent(id, "onDataPolicyClick", PaywallEventMapping.clickEvent(it))
    }

    access?.onAlternativeClick {
      eventEmitter.receiveEvent(id, "onAlternativeClick", PaywallEventMapping.alternativeClickEvent(it))
    }

    access?.onError {
      eventEmitter.receiveEvent(id, "onError", PaywallEventMapping.errorEvent(it))
    }

    access?.onAnswer {
      eventEmitter.receiveEvent(id, "onAnswer", PaywallEventMapping.answerEvent(it))
    }
  }
}

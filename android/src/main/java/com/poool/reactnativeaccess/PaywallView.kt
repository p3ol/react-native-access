package com.poool.reactnativeaccess

import android.content.Context
import android.view.ViewGroup
import android.widget.FrameLayout
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import tech.poool.access.Access
import tech.poool.access.onAlternativeClick
import tech.poool.access.onAnswer
import tech.poool.access.onCustomButtonClick
import tech.poool.access.onDataPolicyClick
import tech.poool.access.onDiscoveryLinkClick
import tech.poool.access.onError
import tech.poool.access.onFormSubmit
import tech.poool.access.onLock
import tech.poool.access.onLoginClick
import tech.poool.access.onPaywallSeen
import tech.poool.access.onReady
import tech.poool.access.onRegister
import tech.poool.access.onRelease
import tech.poool.access.onResize
import tech.poool.access.onSubscribeClick

class PaywallView(context: Context) : FrameLayout(context) {
  private var access: Access? = null

  private var appId: String? = null
  private var pageType: String? = null
  private var displayMode: String? = null
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
      variables == null || texts == null || displayMode == null
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

    when (displayMode) {
      "bottom-sheet" -> {
        val ctx = context as ReactContext
        val rootView = ctx.currentActivity?.findViewById<ViewGroup>(android.R.id.content)
        val eventEmitter = ctx.getJSModule(RCTEventEmitter::class.java)

        if (rootView != null) {
          access?.createBottomSheetPaywall(pageType!!, rootView) {
            eventEmitter.receiveEvent(id, "onDismissBottomSheet", null)
          }
        }
      }

      else -> {
        val subView = access?.returnPaywallView(pageType!!, context as ThemedReactContext)
        subView?.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        addView(subView)
        viewTreeObserver.dispatchOnGlobalLayout()
      }
    }
  }

  fun setAppId(appId: String) {
    this.appId = appId
    reinit()
  }

  fun setPageType(pageType: String) {
    this.pageType = pageType
    reinit()
  }

  fun setDisplayMode(displayMode: String) {
    this.displayMode = displayMode
    reinit()
  }

  fun setConfig(config: ReadableMap) {
    this.config = config.toHashMap().toMap() as Map<String, Any>
    reinit()
  }

  fun setStyles(styles: ReadableMap) {
    this.styles = styles.toHashMap().toMap() as Map<String, Any>
    reinit()
  }

  fun setVariables(variables: ReadableMap) {
    this.variables = variables.toHashMap().toMap() as Map<String, Any>
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

    access?.onError { e, _ ->
      eventEmitter.receiveEvent(id, "onError", PaywallEventMapping.errorEvent(e))
    }

    access?.onAnswer {
      eventEmitter.receiveEvent(id, "onAnswer", PaywallEventMapping.answerEvent(it))
    }

    access?.onResize {
      eventEmitter.receiveEvent(id, "onResize", PaywallEventMapping.resizeEvent(it))
    }
  }
}

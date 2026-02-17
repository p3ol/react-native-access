package tech.poool.rnaccess

import android.content.Context
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.core.view.doOnAttach
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.EventDispatcher
import com.google.gson.internal.LinkedTreeMap
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import tech.poool.access.Access
import tech.poool.access.FieldError
import tech.poool.access.onAlternativeClick
import tech.poool.access.onAnswer
import tech.poool.access.onCustomButtonClick
import tech.poool.access.onDataPolicyClick
import tech.poool.access.onDiscoveryLinkClick
import tech.poool.access.onError
import tech.poool.access.onFormSubmit
import tech.poool.access.onIdentityAvailable
import tech.poool.access.onLock
import tech.poool.access.onLoginClick
import tech.poool.access.onPaywallSeen
import tech.poool.access.onReady
import tech.poool.access.onRegister
import tech.poool.access.onRelease
import tech.poool.access.onSubscribeClick
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

class PaywallView(context: Context, private val module: NativePaywallModule?) : LinearLayout(context) {
  private var access: Access? = null

  private var appId: String? = null
  private var pageType: String? = null
  private var displayMode: String? = null
  private var config: Map<String, Any>? = null
  private var styles: Map<String, Any>? = null
  private var variables: Map<String, Any>? = null
  private var texts: Map<String, String>? = null

  private var released: Boolean = false
  private var reinitJob: Job? = null

  private var eventDispatcher: EventDispatcher? = UIManagerHelper
    .getEventDispatcherForReactTag(context as ThemedReactContext, id)

  init {
    viewTreeObserver.addOnGlobalLayoutListener { requestLayout() }
  }

  private fun reinit () {
    if (reinitJob?.isActive == true) {
      reinitJob?.cancel()
    }

    reinitJob = CoroutineScope(Dispatchers.Main).launch {
      delay((config?.get("batchPropsUpdateDelay") as? Double)?.toLong() ?: 50)
      reinitCallback()
    }
  }

  private fun reinitCallback () {
    if (
      appId == null ||
      config == null ||
      released
    ) {
      return
    }

    if (access !== null) {
      access?.destroy()
      access = null
    }

    access = Access(appId!!)
    access?.config(config ?: mapOf())
    access?.styles(styles ?: mapOf())
    access?.variables(variables ?: mapOf())
    access?.texts(texts ?: mapOf())

    initEvents()

    when (displayMode) {
      "bottom-sheet" -> {
        val rootView = (context as ThemedReactContext).currentActivity
          ?.findViewById<ViewGroup>(android.R.id.content)

        rootView?.let {
          access?.createBottomSheetPaywall(pageType ?: "premium", rootView) {
            eventDispatcher?.dispatchEvent(OnDismissBottomSheetEvent(
              UIManagerHelper.getSurfaceId(context),
              id
            ))
          }
        }
      }
      else -> {
        val view = access?.returnPaywallView(pageType ?: "premium", context)

        doOnAttach {
          addView(view)
        }
      }
    }
  }

  private fun initEvents () {
    access?.onIdentityAvailable {
      eventDispatcher?.dispatchEvent(OnIdentityAvailableEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onLock {
      eventDispatcher?.dispatchEvent(OnLockEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
      ))
    }

    access?.onReady {
      eventDispatcher?.dispatchEvent(OnReadyEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onRelease {
      eventDispatcher?.dispatchEvent(OnReleaseEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onPaywallSeen {
      eventDispatcher?.dispatchEvent(OnPaywallSeenEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onRegister {
      val result = dispatchWithResult<List<LinkedTreeMap<String, String>>?>(OnRegisterEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))

      return@onRegister result?.map { field ->
        FieldError(field["name"] as String, field["message"] as String)
      }
    }

    access?.onFormSubmit {
      val result = dispatchWithResult<List<LinkedTreeMap<String, String>>?>(OnFormSubmitEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))

      println(result?.map { field ->
        FieldError(
          field["fieldKey"] as String,
          field["message"] as String
        )
      })

      return@onFormSubmit result?.map { field ->
        FieldError(
          field["fieldKey"] as String,
          field["message"] as String
        )
      }
    }

    access?.onSubscribeClick {
      eventDispatcher?.dispatchEvent(OnSubscribeClickEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onLoginClick {
      eventDispatcher?.dispatchEvent(OnLoginClickEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onDiscoveryLinkClick {
      eventDispatcher?.dispatchEvent(OnDiscoveryLinkClickEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onCustomButtonClick {
      eventDispatcher?.dispatchEvent(OnCustomButtonClickEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onDataPolicyClick {
      eventDispatcher?.dispatchEvent(OnDataPolicyClickEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onAlternativeClick {
      eventDispatcher?.dispatchEvent(OnAlternativeClickEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
    }

    access?.onError { e, _ ->
      eventDispatcher?.dispatchEvent(OnErrorEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        e
      ))
    }

    access?.onAnswer {
      eventDispatcher?.dispatchEvent(OnAnswerEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        it
      ))
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

  fun setConfig(config: Map<String, Any>) {
    this.config = config
    reinit()
  }

  fun setStyles(styles: Map<String, Any>) {
    this.styles = styles
    reinit()
  }

  fun setVariables(variables: Map<String, Any>) {
    this.variables = variables
    reinit()
  }

  fun setTexts(texts: Map<String, String>) {
    this.texts = texts
    reinit()
  }

  fun setReleased(value: Boolean) {
    released = value
  }

  override fun requestLayout() {
    super.requestLayout()

    post {
      if (!isAttachedToWindow) return@post

      measure(
        MeasureSpec.makeMeasureSpec(width, MeasureSpec.AT_MOST),
        MeasureSpec.makeMeasureSpec(2000, MeasureSpec.AT_MOST))
      layout(left, top, right, bottom)

      eventDispatcher?.dispatchEvent(OnResizeEvent(
        UIManagerHelper.getSurfaceId(context),
        id,
        ResizeEvent(
          convertPixelsToDp(measuredWidth).toInt(),
          convertPixelsToDp(measuredHeight).toInt()
        )
      ))
    }
  }

  private fun convertPixelsToDp (value: Int): Double {
    val displayDensity = context.resources.displayMetrics.density
    return (value / displayDensity).toDouble()
  }

  private suspend fun <R> dispatchWithResult (
    event: Event<*>,
  ): R {
    val eventName = "poool:rn:event." + event.eventName

    return suspendCancellableCoroutine { continuation ->
      var onResolve: ((NativeMessage<R>) -> Unit) = {}
      var onReject: ((NativeMessage<Throwable>) -> Unit) = {}

      onResolve = { data: NativeMessage<R> ->
        if (event.uniqueID == data._messageId) {
          module?.events?.off("$eventName:resolve", onResolve)
          module?.events?.off("$eventName:reject", onReject)

          continuation.resume(data.data)
        }
      }

      onReject = { data: NativeMessage<Throwable> ->
        if (event.uniqueID == data._messageId) {
          module?.events?.off("$eventName:resolve", onResolve)
          module?.events?.off("$eventName:reject", onReject)
          continuation.resumeWithException(Throwable(data.data.toString()))
        }
      }

      module?.events?.on("$eventName:resolve", onResolve)
      module?.events?.on("$eventName:reject", onReject)

      eventDispatcher?.dispatchEvent(event)
    }
  }
}

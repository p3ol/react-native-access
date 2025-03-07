package tech.poool.rnaccess

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.google.gson.Gson
import tech.poool.access.AlternativeClickEvent
import tech.poool.access.AnswerEvent
import tech.poool.access.ClickEvent
import tech.poool.access.CustomButtonClickEvent
import tech.poool.access.ErrorEvent
import tech.poool.access.FormEvent
import tech.poool.access.RegisterEvent
import tech.poool.access.UserEvent
import tech.poool.access.WidgetEvent

class PaywallEventMapping {
  companion object {
    fun userEvent (event: UserEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("userId", event.userId)
        putString("contextName", event.contextName)
        putString("contextType", event.contextType)
        putString("contextValue", event.contextValue)
        putString("groupSlug", event.groupSlug)
        putString("scenarioName", event.scenarioName)
        putString("widget", event.widget)
        putString("actionName", event.actionName)
      }
    }

    fun widgetEvent (event: WidgetEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("widget", event.widget)
        putString("actionName", event.actionName)
      }
    }

    fun registerEvent (event: RegisterEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("email", event.email)
        putString("newsletterId", event.newsletterId)
        putString("passId", event.passId)
      }
    }

    fun clickEvent (event: ClickEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("widget", event.widget)
        putString("actionName", event.actionName)
        putString("button", event.button)
        putString("url", event.url)
      }
    }

    fun alternativeClickEvent (event: AlternativeClickEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("widget", event.widget)
        putString("actionName", event.actionName)
        putString("button", event.button)
      }
    }

    fun errorEvent (event: ErrorEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("error", event.error)
      }
    }

    fun formEvent (event: FormEvent): WritableMap {
      val transformer = Gson()
      return Arguments.createMap().apply {
        putString("name", event.name)
        putString("fields", transformer.toJson(event.fields.toList()))
        putString("valid", transformer.toJson(event.valid.toMap()))
        putString("values", transformer.toJson(event.values.toMap()))
      }
    }

    fun answerEvent (event: AnswerEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("questionId", event.questionId)
        putString("answer", event.answer)
      }
    }

    fun customButtonClickEvent (event: CustomButtonClickEvent): WritableMap {
      return Arguments.createMap().apply {
        putString("name", event.name)
        putString("buttonId", event.buttonId)
      }
    }

    fun resizeEvent (event: ResizeEvent): WritableMap {
      return Arguments.createMap().apply {
        putInt("width", event.width)
        putInt("height", event.height)
      }
    }
  }
}

class OnIdentityAvailableEvent(surfaceId: Int, viewId: Int, event: UserEvent) :
  Event<OnIdentityAvailableEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.userEvent(event)
  override fun getEventName() = "onIdentityAvailable"
  override fun getEventData(): WritableMap = payload
}

class OnReadyEvent(surfaceId: Int, viewId: Int, event: WidgetEvent) :
  Event<OnReadyEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.widgetEvent(event)
  override fun getEventName() = "onReady"
  override fun getEventData(): WritableMap = payload
}

class OnLockEvent(surfaceId: Int, viewId: Int) :
  Event<OnLockEvent>(surfaceId, viewId) {
  override fun getEventName() = "onLock"
  override fun getEventData() = null
}

class OnReleaseEvent(surfaceId: Int, viewId: Int, event: WidgetEvent) :
  Event<OnReleaseEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.widgetEvent(event)
  override fun getEventName() = "onRelease"
  override fun getEventData() = payload
}

class OnPaywallSeenEvent(surfaceId: Int, viewId: Int, event: WidgetEvent) :
  Event<OnPaywallSeenEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.widgetEvent(event)
  override fun getEventName() = "onPaywallSeen"
  override fun getEventData() = payload
}

class OnRegisterEvent(surfaceId: Int, viewId: Int, event: RegisterEvent) :
  Event<OnRegisterEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.registerEvent(event).apply {
    putInt("_messageId", uniqueID)
  }
  override fun getEventName() = "onRegister"
  override fun getEventData() = payload
}

class OnFormSubmitEvent(surfaceId: Int, viewId: Int, event: FormEvent) :
  Event<OnFormSubmitEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.formEvent(event).apply {
    putInt("_messageId", uniqueID)
  }
  override fun getEventName() = "onFormSubmit"
  override fun getEventData() = payload
}

class OnSubscribeClickEvent(surfaceId: Int, viewId: Int, event: ClickEvent) :
  Event<OnSubscribeClickEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.clickEvent(event)
  override fun getEventName() = "onSubscribeClick"
  override fun getEventData() = payload
}

class OnLoginClickEvent(surfaceId: Int, viewId: Int, event: ClickEvent) :
  Event<OnLoginClickEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.clickEvent(event)
  override fun getEventName() = "onLoginClick"
  override fun getEventData() = payload
}

class OnDiscoveryLinkClickEvent(surfaceId: Int, viewId: Int, event: ClickEvent) :
  Event<OnDiscoveryLinkClickEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.clickEvent(event)
  override fun getEventName() = "onDiscoveryLinkClick"
  override fun getEventData() = payload
}

class OnCustomButtonClickEvent(surfaceId: Int, viewId: Int, event: CustomButtonClickEvent) :
  Event<OnCustomButtonClickEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.customButtonClickEvent(event)
  override fun getEventName() = "onCustomButtonClick"
  override fun getEventData() = payload
}

class OnDataPolicyClickEvent(surfaceId: Int, viewId: Int, event: ClickEvent) :
  Event<OnDataPolicyClickEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.clickEvent(event)
  override fun getEventName() = "onDataPolicyClick"
  override fun getEventData() = payload
}

class OnAlternativeClickEvent(surfaceId: Int, viewId: Int, event: AlternativeClickEvent) :
  Event<OnAlternativeClickEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.alternativeClickEvent(event)
  override fun getEventName() = "onAlternativeClick"
  override fun getEventData() = payload
}

class OnDismissBottomSheetEvent(surfaceId: Int, viewId: Int) :
  Event<OnDismissBottomSheetEvent>(surfaceId, viewId) {
  override fun getEventName() = "onDismissBottomSheet"
  override fun getEventData() = null
}

class OnErrorEvent(surfaceId: Int, viewId: Int, event: ErrorEvent) :
  Event<OnErrorEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.errorEvent(event)
  override fun getEventName() = "onError"
  override fun getEventData() = payload
}

class OnAnswerEvent(surfaceId: Int, viewId: Int, event: AnswerEvent) :
  Event<OnAnswerEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.answerEvent(event)
  override fun getEventName() = "onAnswer"
  override fun getEventData() = payload
}

data class ResizeEvent (
  val width: Int,
  val height: Int
)

class OnResizeEvent(
  surfaceId: Int,
  viewId: Int,
  event: ResizeEvent
) : Event<OnResizeEvent>(surfaceId, viewId) {
  private val payload = PaywallEventMapping.resizeEvent(event)
  override fun getEventName() = "onResize"
  override fun getEventData() = payload
}

data class NativeMessage<T> (
  val type: String,
  val data: T,
  val _messageId: Int,
)

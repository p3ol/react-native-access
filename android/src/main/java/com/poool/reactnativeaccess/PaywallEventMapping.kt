package com.poool.reactnativeaccess

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import tech.poool.access.AlternativeClickEvent
import tech.poool.access.AnswerEvent
import tech.poool.access.ClickEvent
import tech.poool.access.CustomButtonClickEvent
import tech.poool.access.ErrorEvent
import tech.poool.access.FormEvent
import tech.poool.access.RegisterEvent
import tech.poool.access.WidgetEvent

class PaywallEventMapping {
  companion object {
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
      return Arguments.createMap().apply {
        putString("name", event.name)
        putMap("fields", Arguments.makeNativeMap(event.fields.toMap()))
        putMap("valid", Arguments.makeNativeMap(event.valid.toMap()))
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
  }
}

import type { ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Double,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  appId: string;
  pageType?: string;
  config?: string;
  styles?: string;
  variables?: string;
  texts?: string;
  displayMode?: string;
  released?: boolean;
  onIdentityAvailable?: DirectEventHandler<UserEvent>;
  onLock?: DirectEventHandler<LockEvent>;
  onReady?: DirectEventHandler<WidgetEvent>;
  onRelease?: DirectEventHandler<WidgetEvent>;
  onPaywallSeen?: DirectEventHandler<WidgetEvent>;
  onRegister?: DirectEventHandler<RegisterEvent>;
  onFormSubmit?: DirectEventHandler<FormEvent>;
  onSubscribeClick?: DirectEventHandler<ClickEvent>;
  onLoginClick?: DirectEventHandler<ClickEvent>;
  onDiscoveryLinkClick?: DirectEventHandler<ClickEvent>;
  onCustomButtonClick?: DirectEventHandler<CustomButtonClickEvent>;
  onDataPolicyClick?: DirectEventHandler<ClickEvent>;
  onAlternativeClick?: DirectEventHandler<AlternativeClickEvent>;
  onError?: DirectEventHandler<ErrorEvent>;
  onAnswer?: DirectEventHandler<AnswerEvent>;
  onDismissBottomSheet?: DirectEventHandler<DismissBottomSheetEvent>;
  onResize?: DirectEventHandler<ResizeEvent>;
}

export default codegenNativeComponent<NativeProps>('PaywallView');

export interface LockEvent {}

export interface UserEvent extends WidgetEvent {
  userId: string;
  contextName: string;
  contextType: string;
  contextValue: string;
  groupSlug: string;
  scenarioName: string;
}

export interface DismissBottomSheetEvent {}

export interface WidgetEvent {
  widget: string;
  actionName: string;
}

export interface RegisterEvent {
  email: string;
  newsletterId: string;
  passId: string;
  _messageId: Double;
}

export interface ClickEvent extends WidgetEvent {
  url: string;
  button: string;
}

export interface AlternativeClickEvent extends WidgetEvent {
  button: string;
}

export interface ErrorEvent {
  error: string;
}

export interface FormEvent {
  fields: string;
  values: string;
  valid: string;
  _messageId: Double;
}

export interface AnswerEvent {
  questionId: string;
  answer: string;
}

export interface CustomButtonClickEvent {
  name: string;
  buttonId: string;
}

export interface CustomButtonLinkEvent {
  url: string;
  buttonId: string;
}

export interface ResizeEvent {
  width: Int32;
  height: Int32;
};

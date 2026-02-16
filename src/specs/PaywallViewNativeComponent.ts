import type { HostComponent, ViewProps, CodegenTypes } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface NativeProps extends ViewProps {
  appId: string;
  pageType?: string;
  config?: string;
  styles?: string;
  variables?: string;
  texts?: string;
  displayMode?: string;
  released?: boolean;
  onIdentityAvailable?: CodegenTypes.DirectEventHandler<UserEvent>;
  onLock?: CodegenTypes.DirectEventHandler<LockEvent>;
  onReady?: CodegenTypes.DirectEventHandler<WidgetEvent>;
  onRelease?: CodegenTypes.DirectEventHandler<WidgetEvent>;
  onPaywallSeen?: CodegenTypes.DirectEventHandler<WidgetEvent>;
  onRegister?: CodegenTypes.DirectEventHandler<RegisterEvent>;
  onFormSubmit?: CodegenTypes.DirectEventHandler<FormEvent>;
  onSubscribeClick?: CodegenTypes.DirectEventHandler<ClickEvent>;
  onLoginClick?: CodegenTypes.DirectEventHandler<ClickEvent>;
  onDiscoveryLinkClick?: CodegenTypes.DirectEventHandler<ClickEvent>;
  onCustomButtonClick?: CodegenTypes.DirectEventHandler<CustomButtonClickEvent>;
  onDataPolicyClick?: CodegenTypes.DirectEventHandler<ClickEvent>;
  onAlternativeClick?: CodegenTypes.DirectEventHandler<AlternativeClickEvent>;
  onError?: CodegenTypes.DirectEventHandler<ErrorEvent>;
  onAnswer?: CodegenTypes.DirectEventHandler<AnswerEvent>;
  onDismissBottomSheet?: CodegenTypes.DirectEventHandler<DismissBottomSheetEvent>;
  onResize?: CodegenTypes.DirectEventHandler<ResizeEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'PaywallView'
) as HostComponent<NativeProps>;

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
  _messageId: CodegenTypes.Double;
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
  _messageId: CodegenTypes.Double;
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
  width: CodegenTypes.Int32;
  height: CodegenTypes.Int32;
};

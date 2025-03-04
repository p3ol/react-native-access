import type { ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  appId: string;
  pageType?: string;
  config?: {
    debug?: boolean;
    percent?: Int32;
    appName?: string;
    subscriptionUrl?: string;
    subscriptionButtonEnabled?: boolean;
    newsletterName?: string;
    newsletterId?: string;
    linkUrl?: string;
    loginUrl?: string;
    loginButtonEnabled?: boolean;
    alternativeWidget?: string;
    alternativeEnabled?: boolean;
    dataPolicyUrl?: string;
    paywallLoadTimeout?: Int32;
    defaultWidget?: string;
    forceWidget?: string;
    signatureEnabled?: boolean;
    context?: string[];
    cookiesEnabled?: boolean;
    consentRejectionWidget?: string;
    locale?: string;
    trackOriginalAction?: boolean;
    customReaderId?: string;
    customSegment?: string;
  };
  styles?: {};
  variables?: {};
  texts?: {};
  displayMode?: string;
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

export interface DismissBottomSheetEvent {}

export interface WidgetEvent {
  widget: string;
  actionName: string;
}

export interface RegisterEvent {
  email: string;
  newsletterId: string;
  passId: string;
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

export interface FormEvent extends WidgetEvent {
  name: string;
  fields: { fieldKey: string }[];
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

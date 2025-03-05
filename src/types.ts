export interface AccessConfig {
    debug?: boolean;
    percent?: number;
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
    paywallLoadTimeout?: number;
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
  }

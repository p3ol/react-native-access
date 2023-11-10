import type { Poool } from 'poool-access';

/**
 * Simple fake types to hint that a parameter should be something precise
 */
/* eslint-disable @typescript-eslint/ban-types */
export interface BundleId extends String {}
/* eslint-enable @typescript-eslint/ban-types */

export declare interface StateContent {
  [key: string]: any;
}

export declare type PageType = 'premium' | 'free' | 'page';

export declare type EventRawCallback<Props> = (props: Props) => any;
export declare type EventObjectCallback<Props> = {
  once: boolean,
  callback: (props: Props) => any
};

export declare type EventCallback<Props> =
  | EventRawCallback<Props>
  | EventObjectCallback<Props>;

export declare interface AccessEventsObject {
  /**
   * Triggered after the first tracking request, when the user ID is available.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  identityAvailable?: EventCallback<{
    userId: string,
    contextName: string,
    contextType: string,
    contextValue: string,
    groupSlug: string,
    scenarioName: string,
    widget: string,
    actionName: string,
    trigger: string,
    triggerType: string,
    triggerValue: string,
  }>;
  /**
   * Triggered when the paywall locks the current article.
   */
  lock?: EventCallback<undefined>;
  /**
   * Triggered when the paywall is fully loaded and displayed inside the page.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  ready?: EventCallback<{
    widget: string,
    actionName: string,
    trigger: string,
    triggerType: string,
    triggerValue: string,
  }>;
}

export declare interface AccessOptionsObject {
  /**
   * Your poool app ID
   */
  appId?: BundleId;
  /**
   * Your config options
   *
   * More info:
   * https://poool.dev/docs/access/javascript/access/configuration
   */
  config?: Poool.AccessConfigOptions;
  /**
   * Your custom styles
   *
   * More info:
   * https://poool.dev/docs/access/javascript/access/appearances
   */
  styles?: Poool.styles;
  /**
   * Your texts options
   *
   * More info:
   * https://poool.dev/docs/access/javascript/access/texts
   */
  texts?: { [key: string]: string; };
  /**
   * Your access events
   *
   * More info:
   * https://poool.dev/docs/access/javascript/access/events
   */
  events?: AccessEventsObject;
  /**
   * Your access variables
   *
   * More infos:
   * https://poool.dev/docs/access/javascript/access/variables
   */
  variables?: {
    [key: string]: any;
  };
}

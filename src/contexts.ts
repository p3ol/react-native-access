import type { Poool } from 'poool-access';
import { createContext } from 'react';

import type { AccessEvents } from './types';
import type Access from './Access';

export interface AccessContextValue {
  /**
   * Your poool app ID
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  appId?: string;
  /**
   * Your poool access config options
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  config?: Poool.AccessConfigOptions;
  /**
   * Your poool access texts ati_tag_options
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/texts
   */
  texts?: { [key: string]: string };
  /**
   * Your poool access styles
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/styles
   */
  styles?: Poool.styles;
  /**
   * Your poool access events
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/events
   */
  events?: { [key in Poool.EventsList]?: AccessEvents[key] };
  /**
   * Your pool access variables
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/variables
   */
  variables?: { [key: string]: any };
  /**
   * The poool access script url
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  scriptUrl?: string;
  /**
   * The poool access sdk
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  lib?: Access;
  /**
   * The released paywalls
   */
  released?: (string | boolean)[]
  /**
   * Function to trigger a new access init, returns the created access instance,
   * with passed options
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  createFactory?: (
    opts?: Pick<
      AccessContextValue,
      'config' | 'texts' | 'styles' | 'variables' | 'events'
    >
  ) => Access | undefined;
  /**
   * Function to delete a factory
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  destroyFactory?: (factory: Access) => void;
  /**
   * Function to release content for a given paywall (or every paywalls)
   * @param id The paywall ID
   */
  releaseContent?(id: string | boolean): void;
}

export const AccessContext = createContext<AccessContextValue>({});

import { createContext } from 'react';

import type { AccessConfig } from './types';

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
  config?: AccessConfig & {
    /**
     * Delay in milliseconds to batch props updates (config, texts, styles,
     * variables) when they are updated at the same time. This can help improve
     * performance by reducing the number of re-renders.
     * @default 50
     * @android
     */
    batchPropsUpdateDelay?: number;
  };
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
  styles?: { [key: string]: string };
  /**
   * Your pool access variables
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/variables
   */
  variables?: { [key: string]: any };
  /**
   * The released paywalls
   */
  released?: (string | boolean)[]
  /**
   * Function to release content for a given paywall (or every paywalls)
   * @param id The paywall ID
   */
  releaseContent?(id: string | boolean): void;
}

export const AccessContext = createContext<AccessContextValue>({});

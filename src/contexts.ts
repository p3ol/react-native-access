import { createContext } from 'react';

import type { AccessOptionsObject } from './types';
import Access from './Access';

export interface AccessContextObject extends AccessOptionsObject {
  lib?: Access;
  createFactory?: (options: AccessOptionsObject) => Access | void;
}

export const AccessContext = createContext<AccessContextObject>({});

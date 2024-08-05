import { type ComponentPropsWithoutRef, useContext } from 'react';

import { AccessContext } from '../contexts'

export interface RestrictedContentProps extends ComponentPropsWithoutRef<any> {
  id: string;
}

const RestrictedContent = ({ id, children }: RestrictedContentProps) => {
  const { released } = useContext(AccessContext);

  if (released?.includes(true) || released?.includes(id)) {
    return children;
  }
}

RestrictedContent.displayName = 'RestrictedContent';

export default RestrictedContent;

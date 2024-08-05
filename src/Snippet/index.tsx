import { type ComponentPropsWithoutRef, useContext } from 'react';

import { AccessContext } from '../contexts'

export interface SnippetProps extends ComponentPropsWithoutRef<any> {
  id: string;
}

const Snippet = ({ id, children }: SnippetProps) => {
  const { released } = useContext(AccessContext);

  if (released?.includes(true) || released?.includes(id)) {
    return null;
  }

  return children;
}

Snippet.displayName = 'Snippet';

export default Snippet;

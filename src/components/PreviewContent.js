import { useContext } from 'react';
import { AppContext } from '../services/contexts';

const PreviewContent = ({ children }) => {
  const { released } = useContext(AppContext);

  if (released) {
    return null;
  }

  return children;
};

PreviewContent.displayName = 'PreviewContent';

export default PreviewContent;

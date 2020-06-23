import { useContext } from 'react';
import { AppContext } from '../services/contexts';

const PreviewContent = ({ children }) => {

  const { active } = useContext(AppContext);

  if (active) {
    return (
      children
    );
  } else {
    return null;
  }

};

export default PreviewContent;

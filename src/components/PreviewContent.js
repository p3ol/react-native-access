import { useContext } from 'react';
import { AppContext } from '../services/contexts';

const PreviewContent = ({ children }) => {
  const { active } = useContext(AppContext);
  return active ? children : null;
};

export default PreviewContent;

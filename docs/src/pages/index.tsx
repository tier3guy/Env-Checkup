import { useEffect, type ReactNode } from 'react';
import { useHistory } from '@docusaurus/router';

export default function HomeRedirect(): ReactNode {
  const history = useHistory();
  useEffect(() => {
    history.push('/docs/intro');
  }, [history]);
  return null;
}

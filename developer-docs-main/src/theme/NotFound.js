import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NotFound from '@theme-original/NotFound';

function removeNext(url) {
  return url.replace('/docs/next', '/docs');
}

export default function NotFoundWrapper(props) {
  const history = useHistory();

  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/next')) {
      const newUrl = removeNext(currentUrl);
      window.history.replaceState({}, '', newUrl);
      const relativePath = new URL(newUrl).pathname;
      history.push(relativePath);
    }
  }, [history]);

  return (
    <>
      <NotFound {...props} />
    </>
  );
}
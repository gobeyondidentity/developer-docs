import React, { useEffect } from 'react';
import NotFound from '@theme-original/NotFound';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function removeNext(url) {
  return url.replace('/docs/next', '/docs');
}

export default function NotFoundWrapper(props) {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const currentUrl = window.location.href;
    if (currentUrl.includes('/next')) {
      const newUrl = removeNext(currentUrl);
      const relativePath = new URL(newUrl).pathname;
      window.location.replace(relativePath);
    }
  }, []);

  return (
    <>
      <NotFound {...props} />
    </>
  );
}
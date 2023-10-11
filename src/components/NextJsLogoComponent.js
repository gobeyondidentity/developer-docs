import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import NextJsLogoDark from '../../docs/images/nextjs-dark.svg';
import NextJsLogoLight from '../../docs/images/nextjs-light.svg';

const NextJsLogoComponent = () => {
  const { colorMode } = useColorMode();

  if (colorMode === 'dark') {
    return <NextJsLogoDark />;
  } else if (colorMode === 'light') {
    return <NextJsLogoLight />;
  } else {
    return <NextJsLogoLight />;
  }
};

export default NextJsLogoComponent;

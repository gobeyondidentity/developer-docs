import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import NextJsLogoDark from '../../static/img/nextjs-dark.svg';
import NextJsLogoLight from '../../static/img/nextjs-light.svg';

const NextJsLogoComponent = () => {
  const {colorMode, setColorMode} = useColorMode();
  
  if (colorMode === 'dark') {
    return <NextJsLogoDark />;
  } else if (colorMode === 'light') {
    return <NextJsLogoLight />;
  } else {
    return <NextJsLogoLight />;
  }
}

export default NextJsLogoComponent;
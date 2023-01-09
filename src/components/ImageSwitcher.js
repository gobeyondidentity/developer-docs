import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';

const ImageSwitcher = ({lightSrc, darkSrc}) => {
  const {colorMode, setColorMode} = useColorMode();
  console.log(colorMode)

  return (
    <img src={colorMode === 'dark'? darkSrc: lightSrc} />
  )
}

export default ImageSwitcher;
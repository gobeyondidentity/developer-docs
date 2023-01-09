import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';

const ImageSwitcher = ({lightSrc, darkSrc}) => {
  const {colorMode, setColorMode} = useColorMode();
  console.log(colorMode)

  var imgSrc = "";
  if (colorMode === 'dark') {
      imgSrc = darkSrc;
  } else if (colorMode === 'light') {
      imgSrc = lightSrc;
  } else {
    console.log("color undefined");
    console.log(colorMode);
    imgSrc = lightSrc;
  }

  return (
    <img src={imgSrc} />
  )
}

export default ImageSwitcher;
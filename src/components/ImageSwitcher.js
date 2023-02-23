import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';

const ImageSwitcher = ({lightSrc, darkSrc}) => {
  const {colorMode, setColorMode} = useColorMode();
  
  var imgSrc = "";
  if (colorMode === 'dark') {
      imgSrc = darkSrc;
      console.log(imgSrc)
  } else if (colorMode === 'light') {
      imgSrc = lightSrc;
      console.log(imgSrc)
  } else {
    console.log("color undefined");
    console.log(colorMode);
    imgSrc = lightSrc;
    console.log(imgSrc)
  }

  return (
    <img src={imgSrc} />
  )
}

export default ImageSwitcher;
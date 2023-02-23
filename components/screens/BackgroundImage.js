import React from 'react';

import { StyleSheet, ImageBackground } from 'react-native';

const BackgroundImage = ({ children }) => {
  return (
    <>
      <ImageBackground style={s.ImageBackground} source={require('../../background.jpg')} resizeMode="cover">
        {children}
      </ImageBackground>
    </>
  );
};

const s = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default BackgroundImage;

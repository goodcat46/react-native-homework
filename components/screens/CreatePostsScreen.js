import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { colors } from '../../styles';

const CreatePostsScreen = () => {
  return (
    <View>
      <Text>CreatePostsScreen</Text>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.mainWhite,
  },
});

export default CreatePostsScreen;

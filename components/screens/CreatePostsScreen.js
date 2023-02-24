import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { colors } from '../../styles';
import CreatePostForm from '../CreatePostForm';

const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={s.screen}>
      <CreatePostForm {...{ navigation }}></CreatePostForm>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',

    backgroundColor: colors.mainWhite,
  },
});

export default CreatePostsScreen;

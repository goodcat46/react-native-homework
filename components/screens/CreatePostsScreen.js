import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { colors } from '../../styles';
import CreatePostForm from '../CreatePostForm';

const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={s.screen}>
      <ScrollView>
        <CreatePostForm {...{ navigation }}></CreatePostForm>
      </ScrollView>
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

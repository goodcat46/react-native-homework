import React from 'react';
import { Text } from 'react-native';
import { StyleSheet, FlatList, View } from 'react-native';
import { colors } from '../styles';
import Post from './Post';

const PostList = ({ data, navigation }) => {
  return (
    <View style={s.container}>
      <FlatList
        style={s.list}
        data={data}
        renderItem={post => <Post {...{ ...post, navigation, item: post }} />}
        keyExtractor={post => post}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: '100%',
    // maxHeight: 500,

    borderColor: 'tomato',
    borderWidth: 1,

    backgroundColor: colors.mainWhite,
  },
  list: {
    // maxHeight: '100%',
    padding: 16,
  },
});
export default PostList;

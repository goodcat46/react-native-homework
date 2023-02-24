import React from 'react';
import { Text } from 'react-native';
import { StyleSheet, FlatList, View } from 'react-native';
import { colors } from '../styles';
import Post from './Post';

const PostList = ({ data = [], navigation }) => {
  return (
    <>
      {data.length > 0 && (
        <FlatList
          style={s.list}
          data={data}
          renderItem={post => <Post {...{ ...post, navigation, item: post }} />}
          keyExtractor={post => post}
        />
      )}
      {data.length === 0 && <Text style={s.text}>Публікації відсутні</Text>}
    </>
  );
};

const s = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: colors.mainWhite,
  },
  text: {
    padding: 16,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});
export default PostList;

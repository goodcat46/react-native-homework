import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Post from './Post';

const PostList = data => {
  return (
    <View>
      <FlatList
        data={data || [1, 2, 3, 4, 5, 6, 7]}
        renderItem={post => <Post {...post} />}
        keyExtractor={post => post}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: '100%',
  },
});
export default PostList;

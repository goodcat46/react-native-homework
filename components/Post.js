import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Post = ({ name }) => {
  return (
    <View style={s.Post}>
      <View style={s.imgBox}>
        <Image source={require('../assets/avatarExample.jpg')} />
      </View>
      <View style={s.footer}>
        <Text style={s.name}>{name}</Text>
        <View>
          <View style={s.comments}></View>

          <View style={s.likes}></View>

          <View style={s.location}></View>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  Post: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'tomato',
    marginBottom: 32,
    height: 345,
  },
  imgBox: {},
  img: {},
  footer: {},
  name: {},
  comments: {},
  likes: {},
  location: {},
});
export default Post;

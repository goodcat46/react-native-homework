import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../styles';
import PostList from '../PostList';
import BackgroundImage from './BackgroundImage';

const ProfileScreen = ({ navigation }) => {
  const posts = useSelector(state => state.posts);

  return (
    <BackgroundImage>
      <View style={s.container}>
        <View style={s.screen}>
          <Pressable style={s.imgBox} onPress={ev => console.log(ev)}>
            <Image source={require('../../assets/avatarExample.jpg')} />
          </Pressable>

          <Text style={s.profileName}>Natali Romanova</Text>

          <PostList {...{ navigation, data: posts }} />
        </View>
      </View>
    </BackgroundImage>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 147,
    backgroundColor: colors.mainWhite,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    position: 'relative',

    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imgBox: {
    width: 120,
    height: 120,

    backgroundColor: colors.notActiveInput,

    borderRadius: 16,
    overflow: 'hidden',

    position: 'absolute',
    top: -60,
  },
  svgBox: {},

  profileName: {
    fontSize: 32,
    fontWeight: '500',
    marginTop: 92,
  },
});

export default ProfileScreen;

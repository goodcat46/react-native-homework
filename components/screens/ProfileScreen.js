import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { colors } from '../../styles';
import PostList from '../PostList';
import BackgroundImage from './BackgroundImage';

const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);
  const { myPosts = [] } = useSelector(state => state.posts);

  return (
    <BackgroundImage>
      <View style={s.container}>
        <View style={s.screen}>
          <Pressable style={s.imgBox} onPress={ev => console.log('press on avatar')}>
            <Svg width="30" height="30" viewBox="0 0 24 24" style={s.svg}>
              <Path
                fill="currentColor"
                d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
            </Svg>
            <Image
              style={{ width: 120, height: 120 }}
              source={user?.photo || require('../../assets/avatar.png')}
            />
          </Pressable>

          <Text style={s.profileName}>{user?.displayName || 'Natali Romanova'}</Text>

          <PostList {...{ navigation, data: myPosts }} />
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
  svg: {
    // transform: [{ rotate: "45deg" }],
    position: 'absolute',
    bottom: 5,
    right: -10,

    color: colors.iconGrey,
  },

  imgBox: {
    width: 120,
    height: 120,

    backgroundColor: colors.notActiveInput,

    borderRadius: 16,

    position: 'absolute',
    top: -60,
  },
  profileName: {
    fontSize: 32,
    fontWeight: '500',
    marginTop: 92,
  },
});

export default ProfileScreen;

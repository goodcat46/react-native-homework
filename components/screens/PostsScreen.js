import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { colors } from '../../styles';

const PostsScreen = () => {
  return (
    <View style={s.screen}>
      <View style={s.profileWrapper}>
        <Image style={s.profileImg} source={require('../../assets/avatarExample.jpg')} />

        <View>
          <Text style={s.name}>Natali Romanove</Text>

          <Text>natashka@mail.com</Text>
        </View>
      </View>

      <Text style={{ borderWidth: 1, borderColor: 'tomato' }}>PostsScreen</Text>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',

    textAlign: 'center',

    // width: '100%',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.mainWhite,
  },
  profileImg: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  name: { fontSize: 13, fontWeight: '700' },
});
export default PostsScreen;

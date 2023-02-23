import React from 'react';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../styles';
import Publication from '../Post';
import BackgroundImage from './BackgroundImage';

const ProfileScreen = () => {
  return (
    <BackgroundImage>
      <View style={s.container}>
        <View style={s.screen}>
          <Pressable style={s.imgBox} onPress={ev => console.log(ev)}>
            <Image source={require('../../assets/avatarExample.jpg')} />
          </Pressable>

          <Text style={s.profileName}>Natali Romanova</Text>

          <View style={s.list}>
            <FlatList
              data={[1, 2, 3, 4]}
              renderItem={({ item }) => <Publication />}
              keyExtractor={item => item}
            ></FlatList>
          </View>
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
  list: {
    width: '100%',
    padding: 16,
    marginTop: 32,
  },
  profileName: {
    fontSize: 32,
    fontWeight: '500',
    marginTop: 92,
  },
});

export default ProfileScreen;

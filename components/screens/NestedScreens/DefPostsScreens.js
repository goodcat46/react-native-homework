import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../../styles';
import PostList from '../../PostList';

const DefPostsScreens = ({ navigation }) => {
  return (
    <View>
      <View style={s.screen}>
        <View style={s.profileWrapper}>
          <Image style={s.profileImg} source={require('../../../assets/avatarExample.jpg')} />

          <View>
            <Text style={s.name}>Natali Romanova</Text>
            <Text>natashka@mail.com</Text>
          </View>
        </View>

        <PostList {...{ navigation, data: [1, 2, 3] }} />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    height: '100%',
    justifyContent: 'flex-start',
    alignContent: 'center',

    textAlign: 'center',

    // width: '100%',

    borderWidth: 3,
    borderColor: 'blue',
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

export default DefPostsScreens;

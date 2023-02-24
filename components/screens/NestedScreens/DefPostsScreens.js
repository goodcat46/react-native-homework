import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../../styles';
import PostList from '../../PostList';

const DefPostsScreens = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);
  const { posts = [] } = useSelector(state => state.posts);

  return (
    <View>
      <View style={s.screen}>
        <View style={s.profileWrapper}>
          <Image
            style={s.profileImg}
            source={user?.photoURL || require('../../../assets/avatarExample.jpg')}
          />

          <View>
            <Text style={s.name}>{user?.displayName || 'Natali Romanova'}</Text>
            <Text>{user?.email || 'natashka@mail.com'}</Text>
          </View>
        </View>

        <PostList {...{ navigation, data: posts }} />
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

    backgroundColor: colors.mainWhite,
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

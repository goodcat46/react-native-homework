import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles';
import { screens } from './screens/screens';
const Post = ({ navigation, item, name, comments, likes, location, img }) => {
  return (
    <View style={s.Post}>
      <View style={s.imgBox}>
        <Image source={img || require('../rocks.jpg')} />
      </View>
      <View style={s.footer}>
        <Text style={s.name}>{name || 'Post name'}</Text>
        {/* <View style={s.wraper}>
          <View style={s.comments}>{comments}</View>

          <View style={s.likes}>
            <Feather name="" />
            <View>{likes}</View>
          </View>

          <View style={s.location}>{location}</View>
        </View> */}

        <View style={s.allLinksWrapper}>
          <TouchableOpacity
            style={s.commentLinkWrapper}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(screens.comments, {
                postId: item?.id,
                uri: item?.photo,
              })
            }
          >
            <Feather name="message-circle" size={24} color="#BDBDBD" style={s.commentIcon} />
            <Text style={s.comment}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.mapLinkWrapper}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(screens.map, {
                location: {
                  name: item?.location,
                  latitude: item?.latitude,
                  longitude: item?.longitude,
                },
              })
            }
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" style={s.mapPin} />

            <Text style={s.location}>{item?.location || 'Location'}</Text>
          </TouchableOpacity>
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
    minHeight: 320,
  },
  imgBox: {
    width: '100%',
    height: 240,
    overflow: 'hidden',

    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
  },
  footer: {
    height: 50,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    padding: 4,
    marginHorizontal: 8,
  },
  wraper: {
    flexDirection: 'row',
  },
  comments: {},
  likes: {},
  location: {},

  allLinksWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  commentLinkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  comment: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginLeft: 6,
  },

  commentIcon: {
    // flexDirection: "row",
    transform: [{ scaleX: -1 }],
  },

  mapLinkWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  mapPin: {},

  location: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: colors.title,
    marginLeft: 3,
  },
});
export default Post;

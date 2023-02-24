import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { colors } from '../../styles';
import PostList from '../PostList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from './screens';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import DefPostsScreens from './NestedScreens/DefPostsScreens';
import CommentsScreen from './NestedScreens/CommentsScreen';
import MapScreen from './NestedScreens/MapScreen';
const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
  return (
    <NestedScreen.Navigator screenOptions={s.mainTabContainer}>
      <NestedScreen.Screen
        name={screens.defPosts}
        component={DefPostsScreens}
        options={{
          title: 'Публікації',
          headerStyle: {
            height: 83,
            borderBottomWidth: 1,
            borderColor: colors.notActiveInput,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
            marginTop: 'auto',
            marginBottom: 11,
            // color: "#BDBDBD",
          },
          headerRight: (focused, color, size) => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={() => {
                dispatch();
              }}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name={screens.comments}
        component={CommentsScreen}
        options={{
          title: 'Коментарі',
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <NestedScreen.Screen
        name={screens.map}
        component={MapScreen}
        options={{
          title: 'Карта',
        }}
      />
    </NestedScreen.Navigator>
  );
};

const s = StyleSheet.create({
  mainTabContainer: {
    headerTitleAlign: 'center',

    tabBarStyle: {
      height: 83,
      paddingTop: 9,
      paddingBottom: 34,
      paddingHorizontal: 82,
    },
  },
});
export default PostsScreen;

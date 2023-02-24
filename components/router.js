import React from 'react';

import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { screens } from './screens/screens';
import { AppScreens } from './screens';

import { colors } from '../styles';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name={screens.registration}
          component={AppScreens.RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name={screens.login}
          component={AppScreens.LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    // <MainTab.Navigator screenOptions={styles.mainTabContainer}>
    <MainTab.Navigator screenOptions={styles.mainTabContainer}>
      <MainTab.Screen
        name={screens.posts}
        component={AppScreens.PostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: (focused, color, size) => (
            <SimpleLineIcons name="grid" size={24} color={colors.iconGrey} />
          ),
        }}
      />
      <MainTab.Screen
        name={screens.createPost}
        component={AppScreens.CreatePostsScreen}
        options={{
          title: 'Створити публікацію',
          headerStyle: {
            height: 83,
            borderBottomWidth: 1,
            borderColor: colors.notActiveInput,
          },
          tabBarStyle: {
            display: 'none',
          },
          headerTitleContainerStyle: {
            paddingBottom: 11,
            marginLeft: 0,
          },
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 17,
            letterSpacing: -0.408,
            color: colors.title,
            marginTop: 'auto',
          },
          headerLeftContainerStyle: {
            paddingLeft: 16,
            marginTop: 'auto',
            marginBottom: 11,
          },
          headerLeft: (focused, color, size) => (
            <AntDesign name="arrowleft" size={24} color={colors.iconGrey} onPress={() => {}} />
          ),
          tabBarShowLabel: false,
          tabBarIcon: (focused, color, size) => (
            <View style={styles.mainTabBtn}>
              <AntDesign name="plus" size={13} color={colors.mainWhite} />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name={screens.profile}
        component={AppScreens.ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (focused, color, size) => (
            <Feather name="user" size={24} color={colors.iconGrey} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;

const styles = StyleSheet.create({
  mainTabContainer: {
    headerTitleAlign: 'center',

    // styles change dynamically when unrolling !!!
    // in MapScreen and CommentsScreen
    tabBarStyle: {
      height: 83,
      paddingTop: 9,
      paddingBottom: 34,
      paddingHorizontal: 82,
    },
  },

  mainTabBtn: {
    height: 40,
    width: 70,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

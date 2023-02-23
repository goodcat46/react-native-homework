import React from "react";

import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { StyleSheet, View, Button, Pressable } from "react-native";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreateScreen from "./Screens/mainScreen/CreateScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    // <MainTab.Navigator screenOptions={styles.mainTabContainer}>
    <MainTab.Navigator screenOptions={styles.mainTabContainer}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: (focused, color, size) => (
            <SimpleLineIcons name="grid" size={24} color="#212121CC" />
          ),
        }}
      />
      <MainTab.Screen
        name="Create post"
        component={CreateScreen}
        options={{
          title: "Создать публикацию",
          headerStyle: {
            height: 83,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8",
          },

          tabBarStyle: {
            display: "none",
          },

          headerTitleContainerStyle: {
            // height: 88,
            paddingBottom: 11,
            marginLeft: 0,
          },

          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            letterSpacing: -0.408,
            color: "#212121",
            marginTop: "auto",
          },

          headerLeftContainerStyle: {
            paddingLeft: 16,
            marginTop: "auto",
            marginBottom: 11,
          },

          headerLeft: (focused, color, size) => (
            // <Pressable
            //   onPress={() => {
            //     console.log(123);
            //     navigation.navigate("Login");
            //   }}
            // >
            //   <Feather name="log-out" size={24} color="black" />
            // </Pressable>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#212121CC"
              onPress={() => {}}
            />
          ),

          tabBarShowLabel: false,
          // tabBarLabel: (focused, color) => (
          //   <View style={styles.mainTabBtn}>
          //     <AntDesign name="plus" size={13} color="#FFFFFF" />
          //   </View>
          // ),

          tabBarIcon: (focused, color, size) => (
            <View style={styles.mainTabBtn}>
              <AntDesign name="plus" size={13} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (focused, color, size) => (
            <Feather name="user" size={24} color="#212121CC" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;

const styles = StyleSheet.create({
  mainTabContainer: {
    headerTitleAlign: "center",

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
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});

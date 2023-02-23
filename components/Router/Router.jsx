import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/ProfileScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const Router = () => {
  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Registration" component={RegistrationScreen} />

        <MainStack.Screen name="Home" component={HomeScreen} options={{ title: 'Start screen' }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

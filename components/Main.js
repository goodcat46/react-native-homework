import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Text } from 'react-native';

import useRoute from './router';
// import { authStateChanged } from '../redux/auth/authOperations';

const Main = () => {
  //   const [user, setUser] = useState(null);

  const { stateChange } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authStateChanged());
  // }, []);

  // console.log(stateChange);

  const routing = useRoute(stateChange);

  useEffect(() => {}, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

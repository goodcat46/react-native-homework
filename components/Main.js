import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Text } from 'react-native';

import useRoute from './router';
import { authStateChangedThunk } from '../redux/auth/auth.thunks';
// import { authStateChanged } from '../redux/auth/authOperations';

const Main = () => {
  //   const [user, setUser] = useState(null);

  const { stateChange } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // console.log('userData thunk ==============>>>>>>', user);

        const payload = {
          data: { user, stateChange: true },
          onSuccess: () => {},
          onError: error => {},
        };
        // console.log(payload);
        dispatch(authStateChangedThunk(payload));
      }
    });
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

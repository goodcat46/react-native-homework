import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Main from './components/Main';
import LoginScreen from './components/screens/LoginScreen';
import RegistrationScreen from './components/screens/RegistrationScreen';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { store } from './redux/store';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
          'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  return (
    <>
      <Provider store={store}>
        <View style={s.app}>
          <View style={s.container}>
            {/* <RegistrationScreen></RegistrationScreen> */}
            {/* <LoginScreen></LoginScreen> */}

            <Main />
          </View>

          <StatusBar style="auto" />
        </View>
      </Provider>
    </>
  );
};

const s = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
    width: '100%',
    height: 50,
  },
});
export default App;

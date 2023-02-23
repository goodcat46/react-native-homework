import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/screens/LoginScreen';
import RegistrationScreen from './components/screens/RegistrationScreen';

const App = () => {
  return (
    <>
      <View style={s.app}>
        <View style={s.container}>
          <ImageBackground style={s.ImageBackground} source={require('./background.jpg')} resizeMode="cover">
            {/* <RegistrationScreen></RegistrationScreen> */}
            <LoginScreen></LoginScreen>
          </ImageBackground>
        </View>

        <StatusBar style="auto" />
      </View>
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
  ImageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
export default App;

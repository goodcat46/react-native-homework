import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Keyboard, Pressable } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import ua from '../../lang';
// import Svg, { Path } from 'react-native-svg';
import { colors } from '../../styles';
const initialState = {
  login: '',
  email: '',
  password: '',
};
const RegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInputName, setActiveInputName] = useState(null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  function navigateToLogin() {
    // navigation.navigate('Login');
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initialState);
  };

  function onChangeFormData(name, text) {
    setFormData(prev => {
      return { ...prev, [name]: text };
    });

    console.log('formData', formData);
  }

  const onSubmitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setFormData(initialState);
    console.log(formData);
  };

  const togglePasswordHide = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <View style={s.form}>
      <StatusBar style="auto" />

      <Pressable style={s.imgBox} onPress={ev => console.log(ev)}>
        {/* <Svg
            width="13"
            height="13"
            viewBox="0 0 32 32"
            style={{
              //   transform: [{ rotate: "45deg" }],
              color: '#ff6c00',
            }}
          >
            <Path fill="currentColor" d="M17.231 0h-2.462v14.769h-14.769v2.462h14.769v14.769h2.462v-14.769h14.769v-2.462h-14.769v-14.769z" />
          </Svg> */}
      </Pressable>

      <Text style={s.title}>{ua.registration}</Text>

      <View style={s.inputs}>
        <View>
          <TextInput
            style={{
              ...s.input,
              backgroundColor: activeInputName === 'login' ? colors.mainWhite : colors.notActiveInput,
              borderColor: activeInputName === 'login' ? colors.brandOrange : colors.notActiveInputBrdClr,
            }}
            placeholder={ua.login}
            name="login"
            value={formData.login}
            onChangeText={text => {
              onChangeFormData('login', text);
            }}
            onFocus={() => {
              setActiveInputName('login');
            }}
            onBlur={() => {
              setActiveInputName(null);
            }}
          />
        </View>
        <View>
          <TextInput
            style={{
              ...s.input,
              backgroundColor: activeInputName === 'email' ? colors.mainWhite : colors.notActiveInput,
              borderColor: activeInputName === 'email' ? colors.brandOrange : colors.notActiveInputBrdClr,
            }}
            placeholder={ua.email}
            name="email"
            value={formData.email}
            onChangeText={text => {
              onChangeFormData('email', text);
            }}
            onFocus={() => {
              setActiveInputName('email');
            }}
            onBlur={() => {
              setActiveInputName(null);
            }}
          />
        </View>
        <View>
          <TextInput
            style={{
              ...s.input,
              backgroundColor: activeInputName === 'password' ? colors.mainWhite : colors.notActiveInput,
              borderColor: activeInputName === 'password' ? colors.brandOrange : colors.notActiveInputBrdClr,
            }}
            placeholder={ua.password}
            name="password"
            value={formData.password}
            onChangeText={text => {
              onChangeFormData('password', text);
            }}
            onFocus={() => {
              setActiveInputName('password');
            }}
            onBlur={() => {
              setActiveInputName(null);
            }}
          />{' '}
        </View>
      </View>

      <Pressable style={s.btn} onPress={onSubmitForm}>
        <Text style={s.btnText}>{ua.register}</Text>
      </Pressable>

      <View style={s.wrapper}>
        <Text style={s.text}>{ua.allreadyRegistered}</Text>
        <Text style={{ ...s.text, marginLeft: 10 }} onPress={navigateToLogin}>
          {ua.goToLogin}
        </Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  form: {
    position: 'relative',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,

    backgroundColor: colors.mainWhite,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    width: '100%',
    padding: 16,
    height: 575,
  },
  title: {
    fontSize: 36,

    marginTop: 90,
  },
  btn: {
    backgroundColor: colors.brandOrange,
    alignItems: 'center',
    justifyContent: 'center',

    height: 50,
    width: '100%',
    color: colors.mainWhite,

    borderRadius: 25,
  },
  btnText: {
    fontSize: 16,
    color: colors.mainWhite,
  },
  inputs: {
    width: '100%',
    marginBottom: 42,
    marginTop: 32,
  },
  input: {
    // ...getBorderRadius(4),
    backgroundColor: colors.notActiveInput,
    borderRadius: 4,
    borderWidth: 1,
    // borderColor: 'tomato',
    borderColor: colors.brandOrange,
    width: '100%',
    height: 50,

    padding: 16,
    marginBottom: 16,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
  },
  imgBox: {
    width: 120,
    height: 120,

    backgroundColor: colors.notActiveInput,

    borderRadius: 16,

    position: 'absolute',
    top: -60,
  },
  svgBox: {},
});

export default RegistrationScreen;
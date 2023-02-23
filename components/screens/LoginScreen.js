import React, { useState } from 'react';
import { colors } from '../../styles';
import ua from '../../lang';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
const initialState = {
  login: '',
  password: '',
};

const LoginScreen = () => {
  const [formData, setFormData] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInputName, setActiveInputName] = useState(null);

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
  function onSubmitForm() {
    console.log('formData', formData);
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setFormData(initialState);
  }

  function navigateToRegister() {}

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={s.KAVWrapper}>
        <View style={{ ...s.form, marginBottom: isShowKeyboard ? -241 : 0 }}>
          <Text style={s.title}>{ua.loginForm}</Text>

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
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setActiveInputName(null);
                  setIsShowKeyboard(false);
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
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setActiveInputName(null);
                  setIsShowKeyboard(false);
                }}
              />
            </View>
          </View>

          <TouchableOpacity style={s.btn} onPress={onSubmitForm}>
            <Text style={s.btnText}>{ua.enterBtn}</Text>
          </TouchableOpacity>

          <View style={s.wrapper}>
            <Text style={s.text}>{ua.haveNotAccount}</Text>
            <Text style={{ ...s.text, marginLeft: 10 }} onPress={navigateToRegister}>
              {ua.goToRegistration}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  KAVWrapper: {},
  form: {
    position: 'relative',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',

    backgroundColor: colors.mainWhite,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    width: '100%',
    padding: 16,
    height: 575,

    paddingBottom: 144,
  },
  title: {
    fontSize: 36,

    marginTop: 16,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 50,
    width: '100%',
    color: colors.mainWhite,
    backgroundColor: colors.brandOrange,

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
    backgroundColor: colors.notActiveInput,
    borderRadius: 4,
    borderWidth: 1,
    width: '100%',
    height: 50,

    padding: 16,
    marginBottom: 16,

    borderColor: colors.notActiveInputBrdClr,
  },
  inputActive: { borderColor: colors.brandOrange },
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

export default LoginScreen;

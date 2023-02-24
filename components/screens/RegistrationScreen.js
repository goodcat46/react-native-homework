import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from 'react-native';
import { screens } from './screens';
import { Path, Svg } from 'react-native-svg';
import ua from '../../lang';
import { colors } from '../../styles';
import BackgroundImage from './BackgroundImage';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from '../../redux/auth/auth.thunks';
// import Svg, { Path } from 'react-native-svg';
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
  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  function onChangeFormData(name, text) {
    setFormData(prev => {
      return { ...prev, [name]: text };
    });

    // console.log('formData', formData);
  }

  const onSubmitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setFormData(initialState);

    const payload = {
      submitData: formData,
      onSuccess: data => {},
      onError: error => {},
    };

    dispatch(registerUserThunk(payload));
    console.log(formData);
  };

  const togglePasswordHide = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <BackgroundImage>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={s.KAVWrapper}
        >
          <View style={{ ...s.form, marginBottom: isShowKeyboard ? -190 : 0 }}>
            <Pressable style={s.imgBox} onPress={ev => console.log(ev)}>
              <Svg width="30" height="30" viewBox="0 0 24 24" style={s.svg}>
                <Path
                  fill="currentColor"
                  d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                />
              </Svg>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/avatar.png')}
              />
            </Pressable>

            <Text style={s.title}>{ua.registration}</Text>

            <View style={s.inputs}>
              <View>
                <TextInput
                  style={{
                    ...s.input,
                    backgroundColor:
                      activeInputName === 'login' ? colors.mainWhite : colors.notActiveInput,
                    borderColor:
                      activeInputName === 'login'
                        ? colors.brandOrange
                        : colors.notActiveInputBrdClr,
                  }}
                  placeholder={ua.login}
                  name="login"
                  value={formData.login}
                  onChangeText={text => {
                    onChangeFormData('login', text);
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setActiveInputName('login');
                  }}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                  }}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    ...s.input,
                    backgroundColor:
                      activeInputName === 'email' ? colors.mainWhite : colors.notActiveInput,
                    borderColor:
                      activeInputName === 'email'
                        ? colors.brandOrange
                        : colors.notActiveInputBrdClr,
                  }}
                  placeholder={ua.email}
                  name="email"
                  value={formData.email}
                  onChangeText={text => {
                    onChangeFormData('email', text);
                  }}
                  onFocus={() => {
                    setActiveInputName('email');
                    setIsShowKeyboard(true);
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
                    backgroundColor:
                      activeInputName === 'password' ? colors.mainWhite : colors.notActiveInput,
                    borderColor:
                      activeInputName === 'password'
                        ? colors.brandOrange
                        : colors.notActiveInputBrdClr,
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
                  }}
                />
              </View>
            </View>

            <Pressable style={s.btn} onPress={onSubmitForm}>
              <Text style={s.btnText}>{ua.register}</Text>
            </Pressable>

            <View style={s.wrapper}>
              <Text style={s.text}>{ua.allreadyRegistered}</Text>
              <Text
                style={{ ...s.text, marginLeft: 10 }}
                onPress={() => navigation.navigate(screens.login)}
              >
                {ua.goToLogin}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BackgroundImage>
  );
};

const s = StyleSheet.create({
  KAVWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
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
  },
  title: {
    fontSize: 36,

    marginTop: 90,
  },
  svg: {
    // transform: [{ rotate: "45deg" }],
    position: 'absolute',
    bottom: 5,
    right: -10,

    color: '#ff6c00',
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
    backgroundColor: colors.notActiveInput,
    borderRadius: 4,
    borderWidth: 1,
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

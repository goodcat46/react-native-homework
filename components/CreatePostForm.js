import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../styles';
import { Camera } from 'expo-camera';
import { screens } from './screens/screens';
import * as MediaLibrary from 'expo-media-library';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
// import { storage, firestoreDB } from '../../firebase/config';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import ua from '../lang';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const initialState = {
  photo: '',
  title: '',
  location: '',
};
const CreatePostForm = ({ navigation }) => {
  const [formData, setFormDdata] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();

    console.log('take foto', photo.uri);

    setFormDdata(prev => ({ ...prev, photo: photo.uri }));

    await MediaLibrary.createAssetAsync(photo.uri);
  };
  function onSubmit() {
    console.log(formData);
  }

  const onPressDeleteBtn = () => {
    setFormDdata(initialState);
    navigation.navigate(screens.posts);
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      console.log('camera status', status);

      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      // console.log('location:', location);

      const { latitude, longitude } = location.coords;

      // console.log({ latitude, longitude });

      setFormDdata(prev => {
        return {
          ...prev,
          location: {
            latitude,
            longitude,
          },
        };
      });
      // console.log('state in useEffect:', state);
    })();
  }, []);

  console.log(formData.photo);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={s.container}>
        <View style={s.imgBox}>
          {/* <Image style={s.img} source={require('../rocks.jpg')} /> */}

          {!hasPermission && <Text>{ua.noCameraPermission}</Text>}

          <Camera style={s.camera} ref={setCamera}>
            <Pressable style={{ ...s.addBtn, ...s.addBtnActive }} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={24} color={colors.iconGrey} />
            </Pressable>
          </Camera>

          <Pressable style={{ ...s.addBtn, ...s.addBtnActive }} onPress={() => {}}>
            <MaterialIcons name="camera-alt" size={24} color={colors.iconGrey} />
          </Pressable>

          {formData.photo && <Image style={s.img} source={{ uri: formData.photo }} />}
        </View>

        <Text style={s.subTitle}>Завантажити зображення</Text>

        <View style={s.inputs}>
          <View style={s.inputWrapper}>
            <TextInput
              style={s.input}
              placeholder="Назва..."
              placeholderTextColor={colors.subTitle}
              value={formData.title}
              onChangeText={value => setFormDdata(prev => ({ ...prev, title: value }))}
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsInputOnFocus(true);
              }}
              onBlur={() => {
                setIsInputOnFocus(false);
              }}
            />
          </View>

          <View style={s.inputWrapper}>
            <TextInput
              style={s.input}
              onChangeText={value => setFormDdata(prev => ({ ...prev, location: value }))}
              value={formData.location}
              placeholder="Локація"
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsInputOnFocus(true);
              }}
              onBlur={() => {
                setIsInputOnFocus(false);
              }}
            />
          </View>

          <Pressable style={s.submitBtn} onPress={onSubmit}>
            <Text style={s.btnName}>Створити пост</Text>
          </Pressable>

          <View style={s.deleteBtnWrraper}>
            <Pressable
              style={s.deleteBtn}
              activeOpacity={!!formData.title || !!formData.location ? 0.2 : 1}
              onPress={!!formData.title || !!formData.location ? onPressDeleteBtn : null}
            >
              {!!formData.title || !!formData.location ? (
                <Feather name="trash-2" size={24} color="black" />
              ) : (
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    paddingTop: 32,
    paddingHorizontal: 16,
  },
  imgBox: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    height: 240,
    width: '100%',

    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: colors.subTitle,
  },
  subTitle: {
    marginTop: 16,
    marginBottom: 32,
    color: colors.subTitle,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
  },
  cameraWrapper: {
    color: '#212121',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    overflow: 'hidden',
  },

  camera: {
    height: 240,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    position: 'absolute',
    width: 60,
    height: 60,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 30,
    overflow: 'hidden',
  },
  addBtnActive: { backgroundColor: colors.addImgBtn, fill: colors.iconGrey },
  addBtnNotActive: { backgroundColor: colors.mainWhite, fill: colors.iconGrey },
  img: { width: '100%' },
  inputs: {
    width: '100%',
  },
  inputWrapper: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.notActiveInputBrdClr,
    marginBottom: 16,
  },
  input: {
    color: colors.title,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },

  submitBtn: {
    backgroundColor: '#FF6C00',
    height: 51,
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 16,
  },

  btnName: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },

  deleteBtnWrraper: {
    paddingTop: 9,
    paddingTop: 80,
    paddingBottom: 34,
    alignItems: 'center',
    marginTop: 'auto',

    height: 83,
    padding: 8,
    alignItems: 'center',
  },
  deleteBtn: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});
export default CreatePostForm;

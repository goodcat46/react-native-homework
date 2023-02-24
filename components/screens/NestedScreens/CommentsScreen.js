// import React from 'react';
// import { Text, View } from 'react-native';

// const CommentsScreen = () => {
//   return (
//     <View>
//       <Text>CommentsScreen</Text>
//     </View>
//   );
// };

// export default CommentsScreen;

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { doc, getDoc, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/config';
import convertUnixTime from '../../../helpers/convertUnixTime';

import { AntDesign } from '@expo/vector-icons';
// import { Ionicons } from "@expo/vector-icons";

export default function CommentsScreen({ route, navigation }) {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);

  const { userId, login } = useSelector(state => state.auth);
  const par = route.params;
  const { postId, uri } = route.params;
  // console.log(postId, uri);
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          // styles for router MainTab.Navigator !!!
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 82,
        },
      });
  }, [navigation]);

  const createPost = async () => {
    try {
      const docRef = doc(firestoreDB, 'posts', postId);
      const commentsRef = collection(docRef, 'comments');
      const newComment = await addDoc(commentsRef, {
        login,
        comment,
        timestamp: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      const docRef = doc(firestoreDB, 'posts', postId);
      const commentsRef = collection(docRef, 'comments');
      const newComment = onSnapshot(commentsRef, data => {
        // console.log("data.docs: ============>", data.docs[0].data());
        setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: uri }} style={styles.img} />
      </View>
      <FlatList
        style={styles.list}
        data={allComments}
        renderItem={({ item }) => (
          <View style={styles.commentWrapper}>
            <View style={styles.avatarWrapper}>
              <Text style={styles.postTitle}>Av</Text>
              <View style={styles.avatarImgWrapper}></View>
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>{item.comment.value} </Text>
              <Text style={styles.timestamp}>{convertUnixTime(item.timestamp.seconds)}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
      <View style={styles.inpupWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Комментировать..."
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={value => setComment({ value })}
          onFocus={() => {
            setIsShowKeyboard(true);
            // setIsInputOnFocus("email");
          }}
          onBlur={() => {
            setIsInputOnFocus(false);
          }}
        />
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.7} onPress={() => createPost()}>
          <AntDesign name="arrowup" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    // alignItems: "center",
    justifyContent: 'flex-end',
  },

  imgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
  },

  commentWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 24,
  },

  img: {
    width: 340,
    height: 240,
    borderRadius: 8,
    objectFit: 'cover',
  },

  avatarWrapper: {
    width: 44,
  },

  avatarImgWrapper: {
    position: 'absolute',
    borderRadius: 15,
    width: 28,
    height: 28,
    backgroundColor: 'green',
  },

  descriptionWrapper: {
    flex: 1,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: '#00000008',
    padding: 16,
  },

  description: {
    color: '#212121',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    lineHeight: 18,
  },

  timestamp: {
    textAlign: 'right',
    color: '#BDBDBD',
    marginTop: 8,
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    lineHeight: 12,
  },

  inpupWrapper: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    padding: 16,
    fontFamily: 'Roboto-Regular',
  },

  submitBtn: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: '#FF6C00',
    height: 34,
    width: 34,
    borderRadius: 100,
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 16,
  },

  btnName: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});

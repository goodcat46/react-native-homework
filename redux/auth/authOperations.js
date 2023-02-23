import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth';
import { authSlice } from './authSlice';

// export function test() {
//   return console.log(321);
// }

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // деструктуризую user з userCredential
      const newUwer = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          console.log('Success');
        })
        .catch(error => {
          console.log(error);
        });

      const user = await auth.currentUser;

      // console.log(user);

      const { uid, displayName } = user;

      dispatch(authSlice.actions.updateUserProfile({ userId: uid, login: displayName }));
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      // деструктуризую user з userCredential
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    signOut(auth);
    console.log('Sign-out successful');

    dispatch(authSlice.actions.authSignOutUser());
  } catch (error) {
    console.log('error');
    console.log(error);
  }
};

export const authStateChanged = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const { uid, displayName } = user;

      dispatch(authSlice.actions.updateUserProfile({ userId: uid, login: displayName }));

      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
        })
      );
    }
  });
};

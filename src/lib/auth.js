import { 
  getAuth, 
  signInWithEmailAndPassword as signInWithEmail, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut as signOutUser
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmail(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Error signing in with email and password:', error);
    return { user: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken
    const user = res.user;
    return { user, token };
  } catch (error){
    console.log(error);
    return { error };
  }
};


export const signOut = async () => {
  try {
    await signOutUser(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};



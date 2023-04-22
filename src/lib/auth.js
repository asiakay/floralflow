import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signInWithGoogle as signInWithGoogleLib } from '../lib/auth';

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

const Auth = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    const user = res.user;
    return { user, token };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default Auth;

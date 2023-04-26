import { firebase } from './firebase';

const firestore = firebase.firestore();


export const fetchUserRole = async (uid) => {
  const userDoc = await firestore.collection('users').doc(uid).get();
  if (userDoc.exists) {
    return userDoc.data().role;
  } else {
    return null;
  }
};

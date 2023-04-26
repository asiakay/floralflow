import { firebase } from './firebase';
//import { auth } from './firebase';

export const addUserToFirestore = async (user) => {
    console.log('Adding user to Firestore:', user);

    const userRef = firebase.firestore().collection('users').doc(user.uid);
  const defaultRoles = {
    admin: false,
    florist: true,
    assistant: false
  };

  return userRef.set({
    email: user.email,
    roles: defaultRoles
  }, { merge: true });
};

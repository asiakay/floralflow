import { db } from './firebase';
//import { auth } from './firebase';

export const addUserToFirestore = async (user) => {
    console.log('Adding user to Firestore:', user);

    const userRef = db.collection('users').doc(user.uid);
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

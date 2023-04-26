import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {auth, app, googleProvider, firebase, firestore } from '../lib/firebase';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';
import { addUserToFirestore } from '../lib/userUtils';
//import firebase from '../lib/firebase/firebase';

//const auth = getAuth(app);
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

 
 
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const { user, error } = await signInWithPopup(auth, provider);
    if (user !== null) {
      router.push('/dashboard');
    } else if (error) {
      setError(error.message);
    }
  };


// Call addUserToFirestore when a user signs up or logs in:
/* useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async(user) => {
    if (user) {
      console.log('Authenticated user:', user);

      const userDoc = await firebase.firestore.collection('users').doc(user.uid).get();
      if (!userDoc.exists) {
        await addUserToFirestore(user);
      }
    }
  });
  return () => {
    unsubscribe();
  };
}, []); */

/* firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userDoc = firebase.firestore().collection('users').doc(user.uid).get();
    if (!userDoc.exists) {
       addUserToFirestore(user);
    }
  }
}); */

  return (
    <Container className={`${styles.main} py-5`}>     
    <Row className="justify-content-center">
      <Col xs={12} md={6} lg={4} className="text-center">
      {/*   <Logo /> */}
    <h1 className={`${styles.description} mt-3 mb-4`}>Register</h1>
    <p className={`${styles.description} lead mb-4`}>
    Welcome to FloralFlow!<br></br>
Create an account to streamline your inventory management process. 
<br></br>
<br></br>
Fill in the form below to get started.        </p>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.input}>Register</button>
      </form>
      <div className="mt-4">or</div>
      <button
        type="button"
        className={styles.input}
        onClick={handleGoogleSignIn}
      >
        Register with Google
      </button>
      </Col>
     </Row>
        </Container>
  );
};

export default RegisterPage;

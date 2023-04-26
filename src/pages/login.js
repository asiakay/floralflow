import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import styles from '../styles/Login.module.css';
import { app } from '../lib/firebase';
const auth = getAuth(app);

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await signInWithEmailAndPassword(email, password);
      if (user) {
        router.push('/dashboard');
      } else if (error) {
        setError(error.message);
      }
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
  

  return (
    <Container className={`${styles.main} py-5`}>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="text-center">
        {/*   <Image src="/Logo.jpg" alt="Logo" width={100} height={50} />
          {' '} */}
          <h1 className={`${styles.description} mt-3 mb-4`}>Login</h1>
          <p className={`${styles.description} lead mb-4`}>
            Welcome back to FloralFlow!<br></br>
            Please enter your email and password to access your account.
          </p>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleLogin} className={styles.form}>
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
            <button type="submit" className={styles.input}>Login</button>
           
                     {/* Forgot Password */}
          <div className="mt-4">
            <button 
            href="/forgot-password"
            className={styles.input}

            >Forgot Password?</button>
          </div>
           
            <div className="mt-4">or</div>
            <button
              type="button"
              className={styles.input}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </form>


        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, app } from '../lib/firebase';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';

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
      </Col>
     </Row>
        </Container>
  );
};

export default RegisterPage;

import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Image from 'next/image';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

const handleLogout = async () => {
  try {
    await signOut(auth);
    setUser(null);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar bg="light" variant="light" className="mb-5">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src="/Logo.jpg" alt="Logo" width={100} height={50} />
            {' '}
            FloralFlow
          </Navbar.Brand>
          {user && (
            <div className="d-flex ms-auto">
              <Navbar.Text className="me-3">
              Signed in as: <Link href="/profile">{user.email}</Link>
              </Navbar.Text>
              <Navbar.Text className={`${styles.NavbarText}`}>
                <Link href="/dashboard">View Items</Link>{' '}
              </Navbar.Text>
              <Navbar.Text className={`${styles.NavbarText}`}>
                <Link href="/add">Add Item</Link>{' '}
              </Navbar.Text>
              <Navbar.Text className={`${styles.NavbarText}`}>
                <Link href="#" onClick={handleLogout}>  Logout</Link>   
              </Navbar.Text>
            </div>
          )}
        </Container>
      </Navbar>
      {children}
    </>
  );
}

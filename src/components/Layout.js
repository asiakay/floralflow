import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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

//const expand = 'lg'; // Set the value of expand here

  return (
    <>
 <Container fluid>
<Navbar.Brand href="/">
           {/*  <Image src="/Logo.jpg" alt="Logo" width={100} height={50} /> */}
            {' '}
            <h1>FloralFlow</h1>
          </Navbar.Brand>
{user ? (
  <>
 <Breadcrumb>
 <Breadcrumb.Item href="/profile">{user.email}</Breadcrumb.Item>
 <Breadcrumb.Item href="/dashboard">View Items</Breadcrumb.Item>
 <Breadcrumb.Item href="/add">Add Item</Breadcrumb.Item>
  <Breadcrumb.Item href="/logout">Logout</Breadcrumb.Item>
 
 </Breadcrumb>
 </>
) : (
  <Breadcrumb>
  <Breadcrumb.Item href="/login">Login</Breadcrumb.Item>
  <Breadcrumb.Item href="/register">Sign Up</Breadcrumb.Item>
  </Breadcrumb>
)}
 
 {children} 
  </Container>

{/*      <Navbar bg="light" expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src="/Logo.jpg" alt="Logo" width={100} height={50} />
            {' '}
            FloralFlow
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Collapse id={`offcanvasNavbar-expand-${expand}`}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {user ? (
                <>
                  <Nav.Link href="/profile">
                    Signed in as: {user.email}
                  </Nav.Link>
                  <Nav.Link href="/dashboard">View Items</Nav.Link>
                  <Nav.Link href="/add" >Add Item                    
                  </Nav.Link>
                  <Nav.Link href="#" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}  */}
    </>
  );
}

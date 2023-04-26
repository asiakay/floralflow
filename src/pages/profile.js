import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { auth } from '../lib/firebase';
import styles from '../styles/Profile.module.css';
import Link from 'next/link';
import { useUser } from '../contexts/UserContext';

export default function Profile() {
  const {user} = useUser();

 /*  useEffect(() => {
    setUser(auth.currentUser);
  }, []); */

  return (
    <Container className={`${styles.main} py-5`}>     
      <Row>
        <Col>

          <h1>Profile</h1>
          {user && (
            <div>
              <p className={`${styles.email}`}>Email: {user.email}</p>
              <p>Name: {user.displayName}</p>
               {/* Link to the update password page */}
          <Link href="/update-password">Update Password</Link><br></br>

            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}


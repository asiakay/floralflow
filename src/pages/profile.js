import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { auth } from '../lib/firebase';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return (
    <Container className={`${styles.main} py-5`}>     
      <Row>
        <Col>

          <h1>Profile</h1>
          {user && (
            <div>
              <p className={`${styles.email}`}>Email: {user.email}</p>
              <p>Name: {user.displayName}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

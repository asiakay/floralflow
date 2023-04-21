import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
//import Logo from './Logo';
import Home from '../pages/index';

export default function Layout({ children }) {
  return (
    <>
      <Navbar bg="light" variant="light" className="mb-5">
        <Container fluid>
          <Navbar.Brand href="/">
           {/*  <Logo /> */}
            {' '}
            FloralFlow
          </Navbar.Brand>
        </Container>
      </Navbar>
      {children}
    </>
  );
}

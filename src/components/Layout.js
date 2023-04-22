import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Image from 'next/image';


//import Home from '../pages/index';

export default function Layout({ children }) {
  return (
    <>
      <Navbar bg="light" variant="light" className="mb-5">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src="/Logo.png" alt="Logo" width={100} height={50} />
            {' '}
            FloralFlow
          </Navbar.Brand>
        </Container>
      </Navbar>
      {children}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Container, Row, Col, ButtonGroup, Button, Table } from 'react-bootstrap';
import Head from 'next/head'
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';
import styles from '../styles/Dashboard.module.css';

const DashboardPage = () => {
  const { user, loading, logout } = useUser();
  const [items, setItems] = useState([]);

  // Fetch items from Firestore and store them in state when the component mounts:
  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, 'items');
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsList);
    };
    fetchItems();
  }, []);

 /*  // If the user is not logged in, redirect them to the login page
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    
    }
  }, [loading, user]);
 */
  // If the page is still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the dashboard page with the user's email, a button to add a new item, and a grid view of items
  return <>
    <Head>
      <title>FloralFlow Dashboard</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container className={`${styles.main} py-5`}>
      <Row className="justify-content-center">
         
         <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td><Link href={`/edit/${item.id}`}>Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
         
        </Row>
      </Container>
</>;
};

// Style for the images in each item
const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
};

export default DashboardPage;

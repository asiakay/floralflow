import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserProvider';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import styles from '@/styles/Dashboard.module.css';
import Head from 'next/head'
//import AddItemForm from '../components/AddItemForm';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';


const DashboardPage = () => {
  const { user, loading, logout } = useUser();
  const [items, setItems] = useState([]);

  //Create a DashboardPage component that will fetch items from Firestore and display them in a grid view:
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
    // Check if window is defined before calling fetchItems
if (typeof window !== 'undefined')
  fetchItems();
}, []);



  const router = useRouter();

  if (!loading && !user) {
    router.push('/login');
  }


  if (loading) {
    return <div>Loading...</div>;
  }


  return <>
    <Head>
    <title>FloralFlow Dashboard</title>
    <meta name="description" content="Generated by create next app" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <Container className={`${styles.main} py-5`}>     
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="text-center">
        {/*   <Logo /> */}
      <h1 className={`${styles.description} mt-3 mb-4`}>Dashboard</h1>
     
      <p className={styles.welcome}>Welcome, {user?.email}!</p>
      <br>
  </br>
  <Link href="/update-password">Update Password</Link><br></br>
      <Button href="/add" variant="primary" size="lg">Add Item</Button>

      <ButtonGroup>
        <button type="submit" className={styles.input} onClick={logout}>Logout</button>   
      </ButtonGroup>
      </Col>
      </Row>
     <Row>
      <div style={gridStyle}>
        {items.map(item => (
          <div key={item.id} style={itemStyle}>
          <Link href={`/item/${item.id}`}>

            <Image src={item.image} style={imageStyle} alt={item.name} />
            <Image src={item.image} style={imageStyle} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Supplier: {item.supplier}</p>
            <p>Quantity: {item.quantity}</p>

          </Link>
          </div>
             ))}
             </div>
           </Row>
   
    
      
    </Container>
    
    </>;
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridGap: '1rem',
};

const itemStyle = {
  border: '1px solid #ccc',
  padding: '1rem',
  color: '#ccc',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
};
export default DashboardPage;

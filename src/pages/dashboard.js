import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import { Container, Row, Col, ButtonGroup, Button, Table } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';
import Chart from 'chart.js/auto';
import randomColor from 'randomcolor';
import ChartComponent from '@/components/ChartComponent';

const DashboardPage = () => { // Define the DashboardPage component
  const { user, loading, logout } = useUser(); // Get the user and loading state from the UserContext
  const [items, setItems] = useState([]); // Initialize the items state
  const [chartData, setChartData] = useState(null); // Initialize the chartData state
  const router = useRouter(); // Initialize useRouter

  useEffect(() => { // This effect runs when the component mounts
    const fetchItems = async () => { // Define the fetchItems function
      const itemsCollection = collection(db, 'items'); // Get a reference to the items collection
      const itemsSnapshot = await getDocs(itemsCollection); // Get the items collection snapshot
      const itemsList = itemsSnapshot.docs.map(doc => { // Map the items collection snapshot to an array of items
        return { // Return the item object
          id: doc.id, // Set the id to the document id
          name: doc.data().name, // Set the name to the document name
          description: doc.data().description, // Set the description to the document description
          quantity: doc.data().quantity, // Set the quantity to the document quantity
          price: doc.data().price, // Set the price to the document price
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null, // Set the createdAt to the document createdAt
          updatedAt: doc.data().updatedAt && doc.data().updatedAt.toDate ? doc.data().updatedAt.toDate() : null, // Set the updatedAt to the document updatedAt
        }; // End of the item object
      }); // End of the map function

      const colors = randomColor({ // Generate an areeray of colors
        count: itemsList.length, // Set the number of colors to the number of items
        luminosity: 'light', // Set the luminosity to light
        format: 'rgba', // Set the format to rgba
        alpha: 0.5, // Set the alpha to 0.5
      }); // End of the colors array

      const itemsListWithColors = itemsList.map((item, index) => ({ // Map the itemsList array to add a color to each item
        ...item, // Spread the item object
        backgroundColor: colors[index], // Set the backgroundColor to the color at the current index
      })); // End of the map function

      setItems(itemsListWithColors); // Set the items state to the itemsList array

      // Calculate total quantity of all items
      const totalQuantity = itemsList.reduce((total, item) => { // Calculate the total quantity of all items
        return total + item.quantity; // Add the item quantity to the total
      }, 0); // Start the total at 0


      // set chart data
      setChartData({ // Set the chartData state
        labels: itemsList.map(item => item.name), // Set the chart labels to the item names
        datasets: [{ // Set the chart datasets
          label: 'Quantity', // Set the dataset label
          data: itemsList.map(item => item.quantity), // Set the dataset data to the item quantities
          backgroundColor: colors, // Set the dataset background color
          borderColor: 'rgba(255, 99, 132, 1)', // Set the dataset border color
          borderWidth: 1, // Set the dataset border width
        }], // End of the chart datasets
        total: totalQuantity, // Set the chart total to the total quantity
      }); // End of the chartData state
    }; // End of the fetchItems function

    // Refetch the items when the updatedAt query parameter changes
    const handleRouteChange = // Define the handleRouteChange function
    (url, { shallow }) => { // Destructure the url and shallow from the router
      if (router.asPath.startsWith('/dashboard') && !shallow) { //
        fetchItems(); // Refetch the items
      } // End of the if statement
    }; // End of the handleRouteChange function

    router.events.on('routeChangeComplete', handleRouteChange); // Add the event listener to the router
    fetchItems(); // Fetch the items

    // Clean up the event listener when the component is unmounted
    return () => { // Define the cleanup function
      router.events.off('routeChangeComplete', handleRouteChange); // Remove the event listener from the router
    }; // End of the cleanup function
  }, [router]); // End of the useEffect dependencies array

  const handleEdit = (itemId) => { // Define the handleEdit function
    router.push(`/edit/${itemId}`); // Navigate to the edit page
  }; // End of the handleEdit function

  const handleView = async () => { // Define the handleView function
    router.push('/dashboard'); // Navigate to the dashboard page
  }; // End of the handleView function

  // If the page is still loading, display a loading message
  if (loading) { // If the page is loading
    return <div>Loading...</div>; // Display a loading message
  }
  // Render the dashboarde page with the user's email, a button to add a new item, and a grid view of items
  return <> {/* Return the dashboard page */}
    <Head> {/* Add the page title and description to the head */}
      <title>FloralFlow Dashboard</title> {/* Set the page title */}
      <meta name="description" content="Generated by create next app" /> {/* Set the page description */}
      <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* Set the page viewport */}
      <link rel="icon" href="/favicon.ico" />   {/* Set the page favicon */}
    </Head> {/* End of the head */}
    <Container className={`${styles.main} py-5`}> {/* Start the main container */}
      <Row className="justify-content-center">  {/* Start the row */}
      {chartData && ( // If the chartData exists
              <div className={styles.chartContainer} > {/* Start the chart container */}
                <ChartComponent // Render the ChartComponent
                type="bar" // Set the chart type to bar
                data={chartData} // Pass the chartData to the chart
                 options={{}} // Pass the chart options to the chart
                 width={800} // Set the chart width
                 height={800} // Set the chart height
                 /> {/* End of the ChartComponent */}
              </div> // End of the chart container
            )} {/* End of the if statement */}
      </Row> {/* End of the row */}
      <Row className="justify-content-center"> {/* Start the row */}

         <Table striped bordered hover> {/* Start the table */}
            <thead> {/* Start the table header */}
              <tr> {/* Start the table row */}
                <th>Item Name</th> {/* Set the table header */}
                <th>Item Description</th> {/* Set the table header */}
                <th>Quantity</th> {/* Set the table header */}
                <th>Edit</th> {/* Set the table header */}
                <th>Last Updated</th> {/* Set the table header */}
                <th>Stock</th> {/* Set the table header */}
              </tr> {/* End of the table row */}
            </thead> {/* End of the table header */}
            <tbody> {/* Start the table body */}
              {items.map(item => ( // Map through the items
                <tr // Start the table row
                key={item.id} // Set the table row key
                style={{ backgroundColor: item.backgroundColor }} // Set the table row background color
                >   {/* Set the table row style */}
                  <td><Link href={`/item/${item.id}`}>{item.name}</Link></td> {/* Set the table data */}
                  <td>{item.description}</td> {/* Set the table data */}
                  <td>{item.quantity}</td> {/* Set the table data */}
                  <td><button // Set the button to navigate to the edit page
                  onClick={() => handleEdit(item.id)} // Add the onClick event listener
                  className={`${styles.button}`} // Add the button styles
                  >Edit</button></td> {/* Set the table data */}
                 {/*  <td><Link href={`/edit/${item.id}`}>Edit</Link></td> */}
                  <td>{item.updatedAt ? item.updatedAt.toLocaleString() : 'N/A'}</td> {/* Set the table data */}
                  <td> {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </td> {/* Set the table data */}
                </tr> // End of the table row
              ))} {/* End of the map function */}
            </tbody> {/* End of the table body */}
          </Table> {/* End of the table */}
        </Row> {/* End of the row */}
      </Container> {/* End of the main container */}
</>; {/* End of the dashboard page */}
}; // End of the DashboardPage function

// Style for the images in each item
const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
};

export default DashboardPage;
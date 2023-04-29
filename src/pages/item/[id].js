// pages/item/[id].js
// Import required modules

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { firestore } from '../../lib/firebase';
import { Timestamp } from 'firebase/firestore'; // import Timestamp

import styles from '../../styles/EditItem.module.css';
// Define a functional component called ItemPage

const ItemPage = () => {
    // Use the useRouter hook to get the current router object

    const router = useRouter();
// Extract the id parameter from the router object

    const{ id } = router.query;
// Define a state variable called item and initialize it to null

    const [item, setItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({ updatedAt: new Date() });
// Use the useEffect hook to fetch the item data when the component mounts or the id parameter changes

    useEffect(() => {

        const fetchItem = async () => {
            if (id) {
            // Create a document reference to the item document in the Firestore database

                const itemDoc = doc(db, 'items', id);

            // Get the item data from the Firestore database

                const itemSnaphot = await getDoc(itemDoc);

            // If the item exists, set the item state variable to the item data

                if (itemSnaphot.exists()) {
                    setItem({id: itemSnaphot.id, ...itemSnaphot.data()});
                    setUpdatedItem({id:itemSnaphot.id, ...itemSnaphot.data()});

                    console.log(itemSnaphot.data());
                }
              
                }
            };
            fetchItem();
        }, [id]);

        // Define a function called handleEdit that redirects to the EditItemPage for the current item

        const handleEdit = async () => {
    // Get the current timestamp
    const now = Timestamp.now();
        // Create an updatedItemData object that includes the current timestamp in the updatedAt field
const updatedItemData = { ...updatedItem, updatedAt: now };
    // Update the state variable updatedItem to include the new timestamp
setUpdatedItem(updatedItemData);
  // Save the updated item data to the database
const itemDoc = doc(db, 'items', id);
await updateDoc(itemDoc, updatedItemData);

  // Redirect to the EditItemPage

            router.push(`/edit/${id}`);
        };

        // Define a function called handleDelete that deletes the current item from the Firestore database

        const handleDelete = async () => {
            if (confirm('Are you sure you want to delete this item?')) {
                const itemDoc = doc(db, 'items', id);
                await deleteDoc(itemDoc);
                router.push('/dashboard');
            }
            };

            // Render the ItemPage component

        return (
        
            <div className={styles.container}>

            <div className='{styles.main}'>
                {item ?
                <> 
                  
                <h2>{item.name}</h2>
                <p>Description: {item.description}</p>
                <p>Supplier: {item.supplier}</p>
                <p>Quantity in stock: {item.quantity}</p>
                <p>
            
            </p>
            <p>Created: {item.createdAt ? item.updatedAt.toLocaleString() : 'N/A' } </p>
            <p>Updated: {item.updatedAt ? item.updatedAt.toLocaleString() : 'N/A' }</p>





 <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button> 
                         </> 
    : // If the item does not exist, render a message

                         (
            <p>Loading...</p>
                )}
                </div>
                </div>
                );
    };
// Export the ItemPage component as the default export of the module

    export default ItemPage;
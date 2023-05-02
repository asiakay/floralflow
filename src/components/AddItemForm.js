import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import styles from '../styles/AddItemForm.module.css';
import { useRouter } from 'next/router';

const AddItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [supplier, setSupplier] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
            // Create an item object

        try {
            const docRef = await addDoc(collection(db, 'items'), {
                name,
                description,
                supplier,
                quantity,
                imageUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const id = docRef.id;
            console.log('Document written with ID: ', docRef.id);
        
// Clear the input fields
setName('');
setDescription('');
setSupplier('');
setQuantity('');
setImageUrl('');

// Redirect to dashboard
/* router.push('/dashboard'); */

  // Redirect to the ItemPage

  router.push(`/item/${id}`);

console.log('Item added!');
} catch (error) {
    console.error('Error adding document: ', error);
}

    };

    return (
        <div className={`${styles.container}`}>
      <h1>Add Item</h1>

        <form onSubmit={handleSubmit} className={`${styles.form}`}>
           <label className={`${styles.label}`}>Name</label>
           <input   
           type="text"
                placeholder="Name"
                value={name}    
                onChange={(e) => setName(e.target.value)}
                />  
                <br></br>
           <label className={`${styles.label}`}>Type</label>  
           <select 
                value={description} 
                onChange={(e) => 
                setDescription(e.target.value)}
                >
                <option value="">-- Select Category --</option>
                <option value="flowers & bouquets">Flowers & Bouquets</option>
                <option value="plants & greenery">Plants & Greenery</option>
                </select>
           {/*      <label className={`${styles.label}`}>Supplier</label>    
                <input
                type="text"
                placeholder="Supplier"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                /> */}

               <label className={`${styles.label}`}>Quantity in Stock</label>   
                <input
                type="text"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
{/*                  <label className={`${styles.label}`}>Image:</label>  
                 <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                /> */}
                <br></br>
                <button 
                type="submit" 
                className={`${styles.btninput}`} 
                >
                    Add Item
                    </button>
        </form>
        </div>
    );
};
    
export default AddItemForm;
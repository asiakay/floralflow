import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import styles from '../styles/AddItemForm.module.css';

const AddItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [supplier, setSupplier] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }

// Clear the input fields
setName('');
setDescription('');
setSupplier('');
setQuantity('');
setImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}    
                onChange={(e) => setName(e.target.value)}
                />  
                <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <input
                type="text"
                placeholder="Supplier"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                />
                <input
                type="text"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                /><br></br>
                <button type="submit" className={styles.input} >Add Item</button>
        </form>
    );
};
    
export default AddItemForm;

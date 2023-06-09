import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import styles from '../../styles/EditItem.module.css';

const EditItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({
    name: '',
    description: '',
    price: '',
    supplier: '',
    quantity: '',
    updatedAt: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        const itemDoc = doc(db, 'items', id);
        const itemSnapshot = await getDoc(itemDoc);

        if (itemSnapshot.exists()) {
          const itemData = itemSnapshot.data();
          setItem({ id, ...itemData });

          setUpdatedItem(itemData);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      const itemDoc = doc(db, 'items', id);
      await deleteDoc(itemDoc);
      router.push('/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the current timestamp to the updatedAt field
    const updatedAt = new Date();
    const itemDoc = doc(db, 'items', id);
    await updateDoc(itemDoc, { ...updatedItem, updatedAt });

    // Update the item state with the updated updatedAt field
    setItem({ ...item, ...updatedItem, updatedAt });

    // Redirect to the item page and pass the updatedAt timestamp as a query parameter
    router.push(`/item/${id}?updatedAt=${updatedAt.getTime()}`);
  };


  return (
    <div className={`${styles.container}`}>

      <h1>Edit Item</h1>

      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <label htmlFor='name' className={`${styles.label}`}>Product Name</label>
        <input
          type='text'
          name='name'
          value={updatedItem.name}
          onChange={handleChange}
        />

        <label htmlFor='description' className={`${styles.label}`}>Type</label>
        <select 
        value={updatedItem.description} 
        onChange={(e) => 
        setUpdatedItem({ ...updatedItem, description: e.target.value })
        }>
  <option value="">-- Select Category --</option>
  <option value="flowers & bouquets">Flowers & Bouquets</option>
  <option value="plants & greenery">Plants & Greenery</option>
</select>

        <label htmlFor='price' className={`${styles.label}`}>Price</label>
        <input
          type='text'
          name='price'
          value={updatedItem.price}
          onChange={handleChange}
        />

        <label htmlFor='supplier' className={`${styles.label}`}>Supplier</label>
        <input
          type='text'
          name='supplier'
          value={updatedItem.supplier}
          onChange={handleChange}
        />

        <label htmlFor='quantity' className={`${styles.label}`}>Quantity</label>
        <input
          type='text'
          name='quantity'
          value={updatedItem.quantity}
          onChange={handleChange}
        />

<label htmlFor='updatedAt' className={`${styles.label}`}>Today&apos;s Date</label>
        <input
        className={`${styles.dateinput}`}
          type='date'
          name='updatedAt'
          value={updatedItem.updatedAt}
         /*  onChange={handleChange} */
          onChange={(e) =>
          setUpdatedItem({...updatedItem, updatedAt: e.target.value})
          }/>
           <br></br>
        <button 
        type='submit' 
        className={`${styles.button}`}
        >
          Update Item
          </button>
      </form>
    </div>
  );
};

export default EditItemPage;
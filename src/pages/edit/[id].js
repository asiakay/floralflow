// pages/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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
    const itemDoc = doc(db, 'items', id);
    await updateDoc(itemDoc, updatedItem);
    router.push(`/item/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={updatedItem.name}
          onChange={handleChange}
        />

        <label htmlFor='description'>Description:</label>
        <select 
        value={updatedItem.description} 
        onChange={(e) => 
        setUpdatedItem({ ...updatedItem, description: e.target.value })
        }>
  <option value="">-- Select Category --</option>
  <option value="flowers & bouquets">Flowers & Bouquets</option>
  <option value="plants & greenery">Plants & Greenery</option>
</select>

        <label htmlFor='price'>Price:</label>
        <input
          type='text'
          name='price'
          value={updatedItem.price}
          onChange={handleChange}
        />

        <label htmlFor='supplier'>Supplier:</label>
        <input
          type='text'
          name='supplier'
          value={updatedItem.supplier}
          onChange={handleChange}
        />

        <label htmlFor='quantity'>Quantity:</label>
        <input
          type='text'
          name='quantity'
          value={updatedItem.quantity}
          onChange={handleChange}
        />

        <button type='submit'>Update Item</button>
      </form>
    </div>
  );
};

export default EditItemPage;

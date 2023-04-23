// pages/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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
                    setItem({ id: itemData.id, ...itemData});
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
const itemDoc = doc(db, 'items', id); // Created the itemDoc inside the function
        await updateDoc(itemDoc, updatedItem);
        router.push('/item/${id}');
    };  

    return (
        <div>
            <>
            <h1>Edit Item</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input 
                    type='text'
                    name='name'
                    value={updatedItem.name}
                    onChange={handleChange}
                    />
                    <input 
                    type='text'
                    name='description'
                    value={updatedItem.description}
                    onChange={handleChange}
                    />
                    <label htmlFor='description'>Description:</label>
                    <input
                    type='text'
                    name='description'
                    value={updatedItem.description}
                    onChange={handleChange}
                    />
                    <label htmlFor='supplier'>Price:</label>
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
            </>
            ) : (
                <p>Loading...</p>
            )
            </div>
    );
};

export default EditItemPage;
// pages/item/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ItemPage = () => {
    const router = useRouter();

    const{ id } = router.query;

    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (id) {
                const itemDoc = doc(db, 'items', id);
                const itemSnaphot = await getDoc(itemDoc);
                if (itemSnaphot.exists()) {
                    setItem({id: itemSnaphot.id, ...itemSnaphot.data()});
                }
              
                }
            };
            fetchItem();
        }, [id]);

        const handleEdit = () => {
            router.push(`/edit/${id}`);
        };

        const handleDelete = async () => {
            if (confirm('Are you sure you want to delete this item?')) {
                const itemDoc = doc(db, 'items', id);
                await deleteDoc(itemDoc);
                router.push('/dashboard');
            }
            };

        return (
            <div>
                {item ?
                <> 
                  
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.supplier}</p>
                <p>{item.quantity}</p>
 <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>                </> : (
            <p>Loading...</p>
                )}
                </div>
                );
    };

    export default ItemPage;

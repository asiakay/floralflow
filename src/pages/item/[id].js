// pages/item/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ItemPage = () => {
    const router = useRouter();

    const{ id } = router.query;

    const [item, setItem] = useState(null);

    useeffect(() => {
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

        return (
            <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.supplier}</p>
                <p>{item.quantity}</p>
                {{/* add buttons for eediting and deleeeting the iteeme */}}
                </div>
        );
    };

    export default ItemPage;

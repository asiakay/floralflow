import { useState, useEffect } from 'react';
import { firebase } from '../../lib/firebase';
import ProductDetail from '../../components/ProductDetail';

export async function getServerSideProps({ params }) {
  // Fetch product details from inventory
  const db = firebase.firestore();
  const productRef = db.collection('products').doc(params.productId);
  const product = await productRef.get();
  return {
    props: {
      product: { id: product.id, ...product.data() }
    }
  };
}

export default function ProductPage({ product }) {
  const [productDetails, setProductDetails] = useState(product);

  useEffect(() => {
    // Listen for changes to product details
    const db = firebase.firestore();
    const productRef = db.collection('products').doc(product.id);
    const unsubscribe = productRef.onSnapshot((doc) => {
      setProductDetails({ id: doc.id, ...doc.data() });
    });
    return unsubscribe;
  }, [product.id]);

  return (
    <div>
      <h1>{productDetails.product_name}</h1>
      <ProductDetail product={productDetails} />
    </div>
  );
}

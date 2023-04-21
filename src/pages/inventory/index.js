// Import necessary hooks and components from React and other libraries
import { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList';
import { db } from '../../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';



// Define the Inventory component
export default function Inventory() {
  // Declare a state variable (products) with its state update function (setProducts)
  // Initialize the products state with an empty array
  const [products, setProducts] = useState([]);
 
  
  // useEffect is a hook that runs side effects, such as data fetching, 
  // in functional components. It takes a function and an array of dependencies as arguments.
  useEffect(() => {
    // Create a reference to the 'products' collection in Firestore
    const productsRef = collection(db, 'products');
    //const productsRef = db.collection('products');
    
    // Subscribe to real-time updates from the 'products' collection
    // onSnapshot listens for changes and updates the 'products' state with new data
    const unsubscribe = onSnapshot(productsRef,(snapshot) => {
      // Map each document in the snapshot to an object containing its id and data
      const newProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Update the 'products' state with the new data
      setProducts(newProducts);
    });

    // Return a function to unsubscribe from real-time updates
    // This function will be called when the component is unmounted
    return unsubscribe;
  }, []); // Empty array as dependencies means the effect will only run on component mount and unmount

  // Render the Inventory component
  return (
    <div>
      <h1>Inventory</h1>
      {/* Pass the 'products' state as a prop to the ProductList component */}
      <ProductList products={products} />
    </div>
  );
}

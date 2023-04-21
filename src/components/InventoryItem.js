import React from 'react';
import Image from 'next/image';
const InventoryItem = ({ item }) => {
  return (
    <div className="inventory-item">
      <Image src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default InventoryItem;

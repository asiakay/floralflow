import React from 'react';
import InventoryItem from './InventoryItem';

const InventoryList = ({ items }) => {
  return (
    <div className="inventory-list">
      {items.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventoryList;

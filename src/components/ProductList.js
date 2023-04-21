import React from 'react';
import ProductDetail from './ProductDetail';

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductDetail product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

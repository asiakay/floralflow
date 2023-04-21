import React from 'react';
import { Card } from 'react-bootstrap';

export default function ProductDetail({ product }) {
  const {
    name,
    category,
    description,
    last_updated,
    lead_time_to_order,
    product_name,
    quantity_in_front,
    quantity_in_storage,
    reorder_point,
    retail_price,
    sku_number,
    supplier,
    supplier_code,
  } = product;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <div>Category: {category}</div>
          <div>Description: {description}</div>
          <div>Last updated: {last_updated}</div>
          <div>Lead time to order: {lead_time_to_order}</div>
          <div>Product Name: {product_name}</div>
          <div>Quantity in Front: {quantity_in_front}</div>
          <div>Quantity in Back: {quantity_in_storage}</div>
          <div>Re-order Point: {reorder_point}</div>
          <div>Retail Price: {retail_price}</div>
          <div>SKU: {sku_number}</div>
          <div>Supplier: {supplier}</div>
          <div>Supplier Code: {supplier_code}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

import { firebase } from '../../lib/firebase';

const inventoryApi =  async (req, res) => {
  if (req.method === 'POST') {
    // Add new product to inventory
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
      supplier_code
        } = req.body;
    const db = firebase.firestore();
    const productsRef = db.collection('products');
    const newProductRef = await productsRef.add({ 
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
      supplier_code,    });
    const newProduct = await newProductRef.get();
    res.status(201).json({ id: newProduct.id, ...newProduct.data() });
  } else if (req.method === 'PUT') {
    // Update existing product in inventory
    const { id, 
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
      supplier_code
        } = req.body;
    const db = firebase.firestore();
    const productRef = db.collection('products').doc(id);
    await productRef.update({ 
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
      supplier_code
      });
    res.status(200).json({ id, 
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
      supplier_code
        });
  } else if (req.method === 'DELETE') {
    // Delete existing product from inventory
    const { id } = req.query;
    const db = firebase.firestore();
    const productRef = db.collection('products').doc(id);
    await productRef.delete();
    res.status(204).end();
  }
};

export default inventoryApi;





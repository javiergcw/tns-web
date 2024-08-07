// components/ProductList.js

import React, { useEffect, useState } from 'react';
import { getAllProducts,createProduct } from '@/app/services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    url: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({ name: '', url: '', description: '', price: '' });
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">Ver producto</a>
            <p>Precio: {product.price}</p>
          </li>
        ))}
      </ul>

      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={newProduct.url}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductList;

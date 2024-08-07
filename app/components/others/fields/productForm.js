import React, { useState, useRef } from 'react';
import ProductDetails from '../container/proveedorDetails';
import { createProduct } from '@/app/services/productService';

const ProductForm = ({ setProducts }) => {
  const [productsList, setProductsList] = useState([]);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    url: '',
    price: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const listRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const handleScrollLeft = () => {
    listRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    listRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  const handleMouseEnter = () => {
    setShowScrollButtons(true);
  };

  const handleMouseLeave = () => {
    setShowScrollButtons(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('es-CO').format(numericValue);
    setFormData({ ...formData, price: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image && formData.title && formData.description && formData.price && formData.url) {
      let updatedProducts;
      if (isEditing) {
        updatedProducts = productsList.map((product, index) =>
          index === editIndex ? formData : product
        );
        setIsEditing(false);
        setEditIndex(null);
      } else {
        try {
          const newProduct = {
            name: formData.title,
            url: formData.url,
            description: formData.description,
            price: parseFloat(formData.price.replace(/,/g, ''))
          };
          const createdProduct = await createProduct(newProduct);
          const productWithImage = { ...createdProduct, image: formData.image };
          updatedProducts = [...productsList, productWithImage];
        } catch (error) {
          console.error('Error al crear el producto:', error);
          return;
        }
      }
      setProductsList(updatedProducts);
      setProducts(updatedProducts);
      setFormData({ image: '', title: '', description: '', url: '', price: '' });
    } else {
      alert('Todos los campos son requeridos');
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleDelete = (index) => {
    const newProducts = productsList.filter((_, i) => i !== index);
    setProductsList(newProducts);
    setProducts(newProducts);
    if (selectedProduct && productsList[index] === selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleEdit = (index) => {
    const product = productsList[index];
    setFormData({
      image: product.image,
      title: product.name,
      description: product.description,
      url: product.url,
      price: product.price.toString()
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className={`flex flex-col md:flex-row w-full ${selectedProduct ? 'md:space-x-4' : ''} space-y-4 md:space-y-0`}>
      <form onSubmit={handleSubmit} className={`w-full ${selectedProduct ? 'md:w-1/2' : 'md:w-full'} bg-white p-6 rounded-lg shadow-md`}>
        <h2 className="text-2xl font-bold mb-4 text-black">Products</h2>
        <div className="relative mb-4">
          <div
            className="flex overflow-x-auto space-x-4 no-scrollbar"
            ref={listRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {productsList.map((product, index) => (
              <div key={index} className="bg-white p-2 rounded-lg shadow relative w-48 flex-shrink-0 group">
                <div className="absolute top-0 right-0 flex space-x-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17h2m-2-2h2m4-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11a7 7 0 0114 0v2a7 7 0 01-14 0v-2z"></path>
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="cursor-pointer flex items-center space-x-4" onClick={() => handleProductClick(product)}>
                  <div className="flex-shrink-0">
                    <img src={product.image} alt="Imagen del Product" className="h-16 w-16 object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-black">{product.name}</div>
                    <div className="text-sm text-black">Valor {product.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showScrollButtons && (
            <>
              <button
                onClick={handleScrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 text-2xl"
              >
                &lt;
              </button>
              <button
                onClick={handleScrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-500 text-2xl"
              >
                &gt;
              </button>
            </>
          )}
        </div>
        <div className="mb-4">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
            {formData.image ? (
              <img src={formData.image} alt="Vista previa de la imagen" className="w-24 h-24 object-cover mb-2" />
            ) : (
              <>
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.94a1 1 0 00-.76-.35H13V3a1 1 0 00-1-1H8a1 1 0 00-1 1v6.59L4.71 8.3a1 1 0 10-1.42 1.42l3 3a1 1 0 001.42 0l3-3a1 1 0 00.29-.7 1 1 0 00-.3-.71zM15 17H5a2 2 0 010-4h1.5a1 1 0 010 2H5a.5.5 0 000 1h10a.5.5 0 000-1h-1.5a1 1 0 010-2H15a2 2 0 010 4z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Seleccionar una imagen</span>
              </>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Descripción</label>
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded h-24 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">URL</label>
          <input
            type="url"
            name="url"
            placeholder="URL"
            value={formData.url}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Precio</label>
          <input
            type="text"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handlePriceChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {isEditing ? 'Guardar cambios' : 'Añadir un artículo'}
        </button>
      </form>
      {selectedProduct && (
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md overflow-auto">
          <ProductDetails product={selectedProduct} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default ProductForm;

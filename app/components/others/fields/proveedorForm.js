// components/others/fields/ProveedorForm.js
import React, { useState, useRef } from 'react';
import ProveedorDetails from '../container/proveedorDetails';

const ProveedorForm = ({ setProveedores }) => {
  const [proveedoresList, setProveedoresList] = useState([]);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    url: '',
    price: ''
  });
  const [selectedProveedor, setSelectedProveedor] = useState(null);
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
    const numericValue = value.replace(/\D/g, ''); // Eliminar todo lo que no sea dígito
    const formattedValue = new Intl.NumberFormat('es-CO').format(numericValue); // Formatear el valor
    setFormData({ ...formData, price: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.image && formData.title && formData.description && formData.price && formData.url) {
      let updatedProveedores;
      if (isEditing) {
        updatedProveedores = proveedoresList.map((proveedor, index) =>
          index === editIndex ? formData : proveedor
        );
        setIsEditing(false);
        setEditIndex(null);
      } else {
        updatedProveedores = [...proveedoresList, formData];
      }
      setProveedoresList(updatedProveedores);
      setProveedores(updatedProveedores); // Actualiza el estado en el componente padre
      setFormData({ image: '', title: '', description: '', url: '', price: '' });
    } else {
      alert('Todos los campos son requeridos');
    }
  };

  const handleProveedorClick = (proveedor) => {
    setSelectedProveedor(proveedor);
  };

  const closeModal = () => {
    setSelectedProveedor(null);
  };

  const handleDelete = (index) => {
    const newProveedores = proveedoresList.filter((_, i) => i !== index);
    setProveedoresList(newProveedores);
    setProveedores(newProveedores); // Actualiza el estado en el componente padre
    if (selectedProveedor && proveedoresList[index] === selectedProveedor) {
      setSelectedProveedor(null);
    }
  };

  const handleEdit = (index) => {
    const proveedor = proveedoresList[index];
    setFormData(proveedor);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex overflow-x-auto space-x-4 mb-4 no-scrollbar" ref={listRef}>
            {proveedoresList.map((proveedor, index) => (
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
                <div className="cursor-pointer flex items-center space-x-4" onClick={() => handleProveedorClick(proveedor)}>
                  <div className="flex-shrink-0">
                    <img src={proveedor.image} alt="Imagen del Proveedor" className="h-16 w-16 object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-blueSecundary">{proveedor.title}</div>
                    <div className="text-sm">Valor {proveedor.price}</div>
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

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
              {formData.image ? (
                <img src={formData.image} alt="Vista previa de la imagen" className="w-24 h-24 object-cover mb-2" />
              ) : (
                <>
                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.94a1 1 0 00-.76-.35H13V3a1 1 0 00-1-1H8a1 1 0 00-1 1v6.59L4.71 8.3a1 1 0 10-1.42 1.42l3 3a1 1 0 001.42 0l3-3a1 1 0 00.29-.7 1 1 0 00-.3-.71zM15 17H5a2 2 0 010-4h1.5a1 1 0 010 2H5a.5.5 0 000 1h10a.5.5 0 000-1h-1.5a1 1 0 010-2H15a2 2 0 010 4z"/>
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
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded h-24"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              name="url"
              placeholder="URL"
              value={formData.url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="price"
              placeholder="Precio"
              value={formData.price}
              onChange={handlePriceChange}
              className="w-full p-2 border border-gray-300 rounded"
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
      </div>

      <div>
        <ProveedorDetails proveedor={selectedProveedor} onClose={closeModal} />
      </div>
    </div>
  );
};

export default ProveedorForm;

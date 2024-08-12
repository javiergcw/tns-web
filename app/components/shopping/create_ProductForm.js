import React, { useState } from "react";

const CreateProductForm = ({ onProductCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!price || price <= 0) newErrors.price = "El precio debe ser un número positivo";
    if (!url.trim()) newErrors.url = "La URL es obligatoria";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const newProduct = {
      name,
      description,
      price: parseInt(price, 10),
      url,
    };

    onProductCreate(newProduct); // Llamar a la función pasada como prop para agregar el producto
    setName("");
    setDescription("");
    setPrice("");
    setUrl("");
    setError({}); // Limpiar los errores después de la creación
  };

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black font-medium">
            Nombre del Producto:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {error.name && <p className="text-red-500">{error.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {error.description && <p className="text-red-500">{error.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {error.price && <p className="text-red-500">{error.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Url:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {error.url && <p className="text-red-500">{error.url}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Añadir Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;

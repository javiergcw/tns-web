import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductForm = ({ onProductCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [innovated, setInnovated] = useState(false);
  const [unidad, setUnidad] = useState("1"); // Unidad como string para permitir edición libre
  const [error, setError] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!price || price <= 0) newErrors.price = "El precio debe ser un número positivo";
    if (!unidad || parseInt(unidad, 10) <= 0)
      newErrors.unidad = "La unidad debe ser un número positivo";
    return newErrors;
  };

  const handleIncrement = () => {
    setUnidad((prevUnidad) => {
      const num = parseInt(prevUnidad, 10) || 0;
      return (num + 1).toString();
    });
  };

  const handleDecrement = () => {
    setUnidad((prevUnidad) => {
      const num = parseInt(prevUnidad, 10) || 0;
      return num > 1 ? (num - 1).toString() : "1";
    });
  };

  const handleUnitChange = (value) => {
    // Solo permitir números (elimina cualquier carácter no numérico)
    const numericValue = value.replace(/[^0-9]/g, "");
    setUnidad(numericValue); // No forzamos "1" aquí, permitimos que quede vacío
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Asegurar que unidad tenga un valor válido antes de enviar
    const finalUnidad = unidad === "" || !unidad ? "1" : unidad;

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
      innovated,
      unidad: parseInt(finalUnidad, 10), // Convertir a número para enviar
    };

    onProductCreate(newProduct);
    toast.success("Producto añadido exitosamente!");

    // Reiniciar los campos
    setName("");
    setDescription("");
    setPrice("");
    setUrl("");
    setInnovated(false);
    setUnidad("1");
    setError({});
  };

  return (
      <div className="text-black">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>

        <form onSubmit={handleSubmit}>
          {/* Nombre del Producto */}
          <div className="mb-4">
            <label className="block text-black font-medium">
              Nombre del Producto: <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.name && <p className="text-red-500">{error.name}</p>}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-black font-medium">
              Descripción: <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.description && <p className="text-red-500">{error.description}</p>}
          </div>

          {/* Precio */}
          <div className="mb-4">
            <label className="block text-black font-medium">
              Precio: <span className="text-red-500">*</span>
            </label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.price && <p className="text-red-500">{error.price}</p>}
          </div>

          {/* URL */}
          <div className="mb-4">
            <label className="block text-black font-medium">URL:</label>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.url && <p className="text-red-500">{error.url}</p>}
          </div>

          {/* Innovación */}
          <div className="mb-4">
            <label className="block text-black font-medium">Innovación:</label>
            <input
                type="checkbox"
                checked={innovated}
                onChange={(e) => setInnovated(e.target.checked)}
                className="mr-2"
            />
            <span className="text-black">Este producto es innovador</span>
          </div>

          {/* Unidad como contador editable */}
          <div className="mb-4">
            <label className="block text-black font-medium">Unidad:</label>
            <div className="flex items-center space-x-2">
              <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                  onClick={handleDecrement}
              >
                -
              </button>
              <input
                  type="text"
                  value={unidad}
                  onChange={(e) => handleUnitChange(e.target.value)}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-md text-center text-black"
                  placeholder="1"
              />
              <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                  onClick={handleIncrement}
              >
                +
              </button>
            </div>
            {error.unidad && <p className="text-red-500">{error.unidad}</p>}
          </div>

          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Añadir Producto
          </button>
        </form>

        <ToastContainer />
      </div>
  );
};

export default CreateProductForm;
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
        <h2 className="mb-4 text-xl font-bold">Crear Nuevo Producto</h2>

        <form onSubmit={handleSubmit}>
          {/* Nombre del Producto */}
          <div className="mb-4">
            <label className="block font-medium text-black">
              Nombre del Producto: <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
            />
            {error.name && <p className="text-red-500">{error.name}</p>}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block font-medium text-black">
              Descripción: <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
            />
            {error.description && <p className="text-red-500">{error.description}</p>}
          </div>

          {/* Precio */}
          <div className="mb-4">
            <label className="block font-medium text-black">
              Precio: <span className="text-red-500">*</span>
            </label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
            />
            {error.price && <p className="text-red-500">{error.price}</p>}
          </div>

          {/* URL */}
          <div className="mb-4">
            <label className="block font-medium text-black">URL:</label>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
            />
            {error.url && <p className="text-red-500">{error.url}</p>}
          </div>

          {/* Innovación */}
          <div className="mb-4">
            <label className="block font-medium text-black">Innovación:</label>
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
            <label className="block font-medium text-black">Unidad:</label>
            <div className="flex items-center space-x-2">
              <button
                  type="button"
                  className="px-3 py-1 text-black bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleDecrement}
              >
                -
              </button>
              <input
                  type="text"
                  value={unidad}
                  onChange={(e) => handleUnitChange(e.target.value)}
                  className="w-16 px-3 py-2 text-center text-black border border-gray-300 rounded-md"
                  placeholder="1"
              />
              <button
                  type="button"
                  className="px-3 py-1 text-black bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleIncrement}
              >
                +
              </button>
            </div>
            {error.unidad && <p className="text-red-500">{error.unidad}</p>}
          </div>

          <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Añadir Producto
          </button>
        </form>

        <ToastContainer />
      </div>
  );
};

export default CreateProductForm;
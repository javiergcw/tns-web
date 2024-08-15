import React, { useState, useEffect } from "react";
import { createShopping } from "@/app/services/shoppingService";
import CreateProductForm from "./create_ProductForm";
import { getCategories } from "@/app/services/categoryService";
import { getStatuses } from "@/app/services/statusService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateShoppingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory] = useState("");
  const [status_id, setStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Failed to fetch categories. Please check your authorization.",
        }));
      } finally {
        setLoading(false);
      }
    };

    const fetchStatuses = async () => {
      setLoading(true);
      try {
        const data = await getStatuses();
        setStatuses(data);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Failed to fetch statuses. Please check your authorization.",
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchStatuses();
  }, []);

  const handleProductCreate = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleRemoveProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!category_id) newErrors.category_id = "Debe seleccionar una categoría";
    if (!status_id) newErrors.status_id = "Debe seleccionar un estado";
    if (products.length === 0) newErrors.products = "Debe añadir al menos un producto";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const shopping = {
      shopping: {
        title,
        description,
        category_id: parseInt(category_id, 10),
        status_id: parseInt(status_id, 10),
        request_date: new Date().toISOString(),
        pending_date: new Date().toISOString(),
        date_approval: new Date().toISOString(),
      },
      products: products,
    };

    try {
      const isCreated = await createShopping(shopping);
      if (isCreated!="") {
        setTitle("");
        setDescription("");
        setCategory("");
        setStatus("");
        setProducts([]);
        setError({}); // Limpiar los errores después del éxito
        toast.success("Compra creada exitosamente!");
      } else {
        setError({ general: "No se logró crear la compra" });
      }
    } catch (error) {
      setError({ general: "Error al crear la compra" });
    }
  };

  return (
    <div className="text-black flex space-x-4">
      <form
        className="w-1/2 bg-white shadow-md rounded-lg px-8 py-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Crear Nueva Compra</h2>

        {error.general && (
          <div className="text-red-500 mb-4">{error.general}</div>
        )}

        <div className="mb-4">
          <label className="block text-black font-medium">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {error.title && <p className="text-red-500">{error.title}</p>}
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
          <label className="block text-black font-medium">Categoría:</label>
          <select
            value={category_id}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {error.category_id && <p className="text-red-500">{error.category_id}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Estado:</label>
          <select
            value={status_id}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Seleccione un estado</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          {error.status_id && <p className="text-red-500">{error.status_id}</p>}
        </div>

        <h3 className="text-lg font-semibold mb-2">Productos en la Compra</h3>
        {products.length === 0 ? (
          <p className="text-red-500">
            No hay productos. Añade productos primero.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="mb-2 flex justify-between items-center"
            >
              <span className="text-black">{product.name}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveProduct(product.id)}
              >
                Eliminar
              </button>
            </div>
          ))
        )}

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Crear Compra
        </button>
      </form>
      <div className="w-1/2 bg-white shadow-md rounded-lg px-8 py-6">
        <CreateProductForm onProductCreate={handleProductCreate} />
      </div>

      {/* Componente ToastContainer para mostrar las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default CreateShoppingForm;

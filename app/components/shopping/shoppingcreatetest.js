import React, { useState, useEffect } from "react";
import { createShopping } from "@/app/services/shoppingService";
import CreateProductForm from "./productcreatetest";
import { ToastContainer, toast } from "react-toastify";
import { getCategories } from "@/app/services/categoryService";
import { getStatuses } from "@/app/services/statusService";

const CreateShoppingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory] = useState("");
  const [status_id, setStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        setError(
          "Failed to fetch categories. Please check your authorization."
        );
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
        setError("Failed to fetch statuses. Please check your authorization.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      if (isCreated) {
        toast.success("Registro exitoso!");
        setTitle("");
        setDescription("");
        setCategory("");
        setStatus("");
        setProducts([]);
      } else {
        toast.error("No se logró crear la compra");
      }
    } catch (error) {
      toast.error("Error al crear la compra");
    }
  };

  return (
    <div className="text-black flex space-x-4">
      <form
        className="w-1/2 bg-white shadow-md rounded-lg px-8 py-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Crear Nueva Compra</h2>

        <div className="mb-4">
          <label className="block text-black font-medium">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
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
    </div>
  );
};

export default CreateShoppingForm;

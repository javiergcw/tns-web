import React, { useState, useEffect } from "react";
import { createShopping } from "@/app/services/shoppingService";
import CreateProductForm from "./create_ProductForm";
import { getCategories } from "@/app/services/categoryService";
import { getStatuses } from "@/app/services/statusService";
import { getAllProfiles } from "@/app/services/profileService";
import { getAllAreas } from "@/app/services/areaService";
import { getAllAccountTypes } from "@/app/services/accountTypeService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from "react-icons/fa"; // Importa el ícono de basura

const CreateShoppingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory] = useState("");
  const [status_id, setStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedAccountTypeId, setSelectedAccountTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

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

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllProfiles();
        const filteredUsers = data.filter(user => user.rol?.name === "Jefe de area");
        setUsers(filteredUsers);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Failed to fetch users. Please check your authorization.",
        }));
      } finally {
        setLoading(false);
      }
    };

    const fetchAreas = async () => {
      setLoading(true);
      try {
        const data = await getAllAreas();
        setAreas(data);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Failed to fetch areas. Please check your authorization.",
        }));
      } finally {
        setLoading(false);
      }
    };

    const fetchAccountTypes = async () => {
      setLoading(true);
      try {
        const data = await getAllAccountTypes();
        setAccountTypes(data);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Failed to fetch account types. Please check your authorization.",
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchStatuses();
    fetchUsers();
    fetchAreas();
    fetchAccountTypes();
  }, []);

  const handleProductCreate = (newProduct) => {
    const productWithId = { ...newProduct, uniqueId: Date.now() }; // Asignar un ID único al producto
    setProducts([...products, productWithId]);
  };

  const handleRemoveProduct = (uniqueId) => {
    setProducts(products.filter((product) => product.uniqueId !== uniqueId));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!category_id) newErrors.category_id = "Debe seleccionar una categoría";
    if (!status_id) newErrors.status_id = "Debe seleccionar un estado";
    if (!selectedUserId) newErrors.user_id = "Debe seleccionar un usuario";
    if (!selectedAreaId) newErrors.area_id = "Debe seleccionar un área";
    if (!selectedAccountTypeId) newErrors.account_type_id = "Debe seleccionar un tipo de cuenta";
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
        area_id: parseInt(selectedAreaId, 10),
        account_type_id: parseInt(selectedAccountTypeId, 10),
        user_id: parseInt(selectedUserId, 10), // Aquí se asigna el user_id correctamente
        request_date: new Date().toISOString(),
        pending_date: new Date().toISOString(),
        date_approval: new Date().toISOString(),
      },
      products: products,
    };

    try {
      const isCreated = await createShopping(shopping);
      if (isCreated != "") {
        setTitle("");
        setDescription("");
        setCategory("");
        setStatus("");
        setSelectedAreaId("");
        setSelectedAccountTypeId("");
        setProducts([]);
        setSelectedUserId("");
        setError({});
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
        <div className="mb-4">
          <label className="block text-black font-medium">Área:</label>
          <select
            value={selectedAreaId}
            onChange={(e) => setSelectedAreaId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Seleccione un área</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
          {error.area_id && <p className="text-red-500">{error.area_id}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Tipo de Cuenta:</label>
          <select
            value={selectedAccountTypeId}
            onChange={(e) => setSelectedAccountTypeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Seleccione un tipo de cuenta</option>
            {accountTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {error.account_type_id && <p className="text-red-500">{error.account_type_id}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Jefe de área:</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Seleccione un jefe de área</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user_id && <p className="text-red-500">{error.user_id}</p>}
        </div>

        <h3 className="text-lg font-semibold mb-4">Productos en la Compra</h3>
        {products.length === 0 ? (
          <p className="text-red-500">
            No hay productos. Añade productos primero.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {products.slice(0, 4).map((product) => (
                <div key={product.uniqueId} className="bg-white rounded-lg shadow-md p-4 flex-shrink-0" style={{ minWidth: '250px' }}>
                  <div className="flex items-center">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                    )}
                    <div>
                      <h4 className="text-black font-semibold">{product.name}</h4>
                      <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 mt-2"
                    onClick={() => handleRemoveProduct(product.uniqueId)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
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

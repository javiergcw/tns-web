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
import { FaTrash } from "react-icons/fa";

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
  const [unidad, setUnidad] = useState(1); // Unidad como cantidad
  const [iva, setIva] = useState(""); // IVA
  const [retefuente, setRetefuente] = useState(""); // Rete Fuente
  const [innovated, setInnovated] = useState(false); // Innovación a nivel de shopping

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Error al obtener categorías.",
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
          general: "Error al obtener estados.",
        }));
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllProfiles();
        const filteredUsers = data.filter(user => user.rol?.name === "Lider de area");
        setUsers(filteredUsers);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Error al obtener usuarios.",
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
          general: "Error al obtener áreas.",
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
          general: "Error al obtener tipos de cuenta.",
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
    if (products.length > 0) {
      toast.error("Solo puedes agregar un producto.");
      return;
    }

    const productWithId = { ...newProduct, uniqueId: Date.now() };
    setProducts([productWithId]);
    setInnovated(newProduct.innovated);
    setUnidad(newProduct.unidad); // Almacenar innovated a nivel de shopping
     // Almacenar innovated a nivel de shopping
  };

  const handleRemoveProduct = (uniqueId) => {
    setProducts(products.filter((product) => product.uniqueId !== uniqueId));
    setUnidad(1);
    setInnovated(false); // Reiniciar innovated cuando se borra un producto
    toast.success("Producto eliminado exitosamente!");
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
    if (!iva) newErrors.iva = "El IVA es obligatorio";
    if (!retefuente) newErrors.retefuente = "El Rete Fuente es obligatorio";
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
        user_id: parseInt(selectedUserId, 10),
        request_date: new Date().toISOString(),
        pending_date: new Date().toISOString(),
        date_approval: new Date().toISOString(),
        iva: parseFloat(iva),
        retefuente: parseFloat(retefuente),
        innovated, // Ahora incluimos innovated a nivel de shopping
        unidad, // También incluimos unidad a nivel de shopping
      },
      products: products.map(product => ({
        id: product.uniqueId,
        name: product.name,
        description: product.description,
        price: product.price,
        url: product.url
      })),
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
        setIva("");
        setRetefuente("");
        setError({});
        toast.success("Compra creada exitosamente!");
      } else {
        setError({ general: "No se logró crear la compra" });
      }
    } catch (error) {
      setError({ general: "Error al crear la compra" });
    }
  };

  const handleUnidadChange = (e) => {
    const newUnidad = parseInt(e.target.value, 10);
    setUnidad(newUnidad > 0 ? newUnidad : 1);
  };

  const handleIncrement = () => {
    setUnidad((prevUnidad) => prevUnidad + 1);
  };

  const handleDecrement = () => {
    setUnidad((prevUnidad) => (prevUnidad > 1 ? prevUnidad - 1 : 1));
  };

  return (
    <div className="text-black flex flex-col-reverse md:flex-row space-y-0 md:space-y-0 md:space-x-4">
      <form className="w-full md:w-1/2 bg-white shadow-md rounded-lg px-8 py-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Crear Nueva Compra</h2>

        {error.general && <div className="text-red-500 mb-4">{error.general}</div>}

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
              <option key={user.id} value={user.user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user_id && <p className="text-red-500">{error.user_id}</p>}
        </div>

        {/* Campos IVA y Rete Fuente */}
        <div className="mb-4">
          <label className="block text-black font-medium">IVA (%):</label>
          <input
            type="number"
            value={iva}
            onChange={(e) => setIva(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {error.iva && <p className="text-red-500">{error.iva}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium">Rete Fuente (%):</label>
          <input
            type="number"
            value={retefuente}
            onChange={(e) => setRetefuente(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {error.retefuente && <p className="text-red-500">{error.retefuente}</p>}
        </div>

        <h3 className="text-lg font-semibold mb-4">Producto en la Compra</h3>
        {products.length === 0 ? (
          <p className="text-red-500">No hay producto. Añade un producto primero.</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {products.map((product) => (
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
                      <p className="text-gray-600">Unidad: {product.unidad}</p>
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

      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg px-8 py-6">
        <CreateProductForm onProductCreate={handleProductCreate} />
      </div>
    </div>
  );
};

export default CreateShoppingForm;

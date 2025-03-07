import React, { useState, useEffect } from "react";
import { createShopping } from "@/app/services/shoppingService";
import CreateProductForm from "./create_ProductForm";
import { getStatuses } from "@/app/services/statusService";
import { getAllProfiles } from "@/app/services/profileService";
import { getAllAreas } from "@/app/services/areaService";
import { getAllAccountTypes } from "@/app/services/accountTypeService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from "react-icons/fa";
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const CreateShoppingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status_id, setStatus] = useState(1);
  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedAccountTypeId, setSelectedAccountTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [unidad, setUnidad] = useState(1);
  const [iva, setIva] = useState("");
  const [retefuente, setRetefuente] = useState("");
  const [innovated, setInnovated] = useState(false);
  const [total, setTotal] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
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
        console.log("Datos crudos de getAllProfiles:", data);
        const filteredUsers = data.filter(
            (user) => user.rol?.name === "Lider de presupuesto" || user.rol?.name === "admin"
        );
        console.log("Usuarios filtrados:", filteredUsers);
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

    fetchStatuses();
    fetchUsers();
    fetchAreas();
    fetchAccountTypes();
  }, []);

  const handleProductCreate = (newProduct) => {
    const productWithId = { ...newProduct, uniqueId: Date.now() };
    setProducts([...products, productWithId]);
    setInnovated(newProduct.innovated);
    setUnidad(newProduct.unidad);
  };

  const handleRemoveProduct = (uniqueId) => {
    setProducts(products.filter((product) => product.uniqueId !== uniqueId));
    setUnidad(1);
    setInnovated(false);
    toast.success("Producto eliminado exitosamente!");
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    toast.success("Archivo PDF eliminado.");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      toast.success("Archivo PDF subido exitosamente!");
    } else {
      toast.error("Solo se permiten archivos PDF.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!status_id) newErrors.status_id = "Debe seleccionar un estado";
    if (!selectedUserId) newErrors.user_id = "Debe seleccionar un usuario";
    if (!selectedAreaId) newErrors.area_id = "Debe seleccionar un área";
    if (!selectedAccountTypeId) newErrors.account_type_id = "Debe seleccionar un tipo de cuenta";
    if (!iva) newErrors.iva = "El IVA es obligatorio";
    if (!total) newErrors.total = "El total es obligatorio";
    if (!subtotal) newErrors.subtotal = "El subtotal es obligatorio";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    if (products.length === 0) {
      setIsModalOpen(true);
      return;
    }

    await createPurchase();
  };

  const createPurchase = async () => {
    const shopping = {
      title,
      description,
      category_id: 1,
      status_id: parseInt(status_id, 10),
      area_id: parseInt(selectedAreaId, 10),
      account_type_id: parseInt(selectedAccountTypeId, 10),
      user_id: parseInt(selectedUserId, 10),
      request_date: new Date().toISOString(),
      pending_date: new Date().toISOString(),
      date_approval: new Date().toISOString(),
      iva: parseFloat(iva),
      retefuente: retefuente ? parseFloat(retefuente) : 0,
      innovated,
      unidad,
      subtotal: parseFloat(subtotal),
      total: parseFloat(total),
      products: products.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        url: product.url,
      })),
    };

    console.log("Datos enviados al backend:", shopping);

    const formData = new FormData();
    Object.keys(shopping).forEach((key) => {
      if (key === "products") {
        shopping.products.forEach((product, index) => {
          Object.keys(product).forEach((productKey) => {
            if (product[productKey]) {
              formData.append(`products[${index}][${productKey}]`, product[productKey]);
            }
          });
        });
      } else {
        formData.append(`shopping[${key}]`, shopping[key]);
      }
    });

    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }

    try {
      const response = await createShopping(formData);
      console.log("Respuesta del backend:", response);

      if (response.status === 201) {
        toast.success("Compra creada exitosamente!");
        resetForm();
        window.onbeforeprint = null;
        window.onafterprint = null;
      } else {
        toast.error("No se logró crear la compra.");
        setError({ general: "No se logró crear la compra" });
      }
    } catch (error) {
      console.error("Error al crear la compra:", error.response?.data || error.message);
      toast.error("Error al crear la compra.");
      setError({ general: error.response?.data?.message || "Error al crear la compra" });
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus(1);
    setSelectedAreaId("");
    setSelectedAccountTypeId("");
    setProducts([]);
    setSelectedUserId("");
    setIva("");
    setRetefuente("");
    setTotal("");
    setSubTotal("");
    setError({});
    setUploadedFile(null);
  };

  const handleModalConfirm = async () => {
    setIsModalOpen(false);
    await createPurchase();
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
      <div className="text-black flex flex-col-reverse md:flex-row space-y-0 md:space-y-0 md:space-x-4">
        <form className="w-full md:w-1/2 bg-white shadow-md rounded-lg px-8 py-6" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Crear Nueva Orden</h2>

          {error.general && <div className="text-red-500 mb-4">{error.general}</div>}

          <div className="mb-4">
            <label className="block text-black font-medium">Título: <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.title && <p className="text-red-500">{error.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium">Descripción: <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.description && <p className="text-red-500">{error.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium">Estado: <span className="text-red-500">*</span></label>
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
            <label className="block text-black font-medium">Área: <span className="text-red-500">*</span></label>
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
            <label className="block text-black font-medium">Tipo de Cuenta: <span className="text-red-500">*</span></label>
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
            <label className="block text-black font-medium">Lider de presupuesto: <span className="text-red-500">*</span></label>
            <select
                value={selectedUserId}
                onChange={(e) => {
                  console.log("Usuario seleccionado - value:", e.target.value);
                  setSelectedUserId(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Seleccione un Lider de presupuesto</option>
              {users.map((profile) => {
                console.log(`Renderizando opción - profile.id: ${profile.id}, user.id: ${profile.user.id}, name: ${profile.name}`);
                return (
                    <option key={profile.user.id} value={profile.user.id}>
                      {profile.name}
                    </option>
                );
              })}
            </select>
            {error.user_id && <p className="text-red-500">{error.user_id}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium">IVA (%): <span className="text-red-500">*</span></label>
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
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium">Subtotal: <span className="text-red-500">*</span></label>
            <input
                type="number"
                value={subtotal}
                onChange={(e) => setSubTotal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.subtotal && <p className="text-red-500">{error.subtotal}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium">Total: <span className="text-red-500">*</span></label>
            <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {error.total && <p className="text-red-500">{error.total}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium">Subir Archivo PDF:</label>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {uploadedFile && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <p className="text-black font-medium">Archivo: {uploadedFile.name}</p>
                  <button
                      type="button"
                      className="text-red-500 hover:text-red-700 mt-2"
                      onClick={handleFileRemove}
                  >
                    Eliminar Archivo
                  </button>
                </div>
            )}
          </div>

          <br />
          <h3 className="text-lg font-semibold mb-4">Producto en la Orden</h3>
          {products.length === 0 ? (
              <p className="text-red-500">No hay producto. Añade un producto primero si lo deseas.</p>
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
              className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Crear Orden
          </button>
        </form>

        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg px-8 py-6">
          <CreateProductForm onProductCreate={handleProductCreate} />
        </div>

        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleModalCancel}
            contentLabel="Confirmación de compra sin productos"
            className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-16"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-semibold mb-4 text-black">¿Crear compra sin productos?</h2>
          <p className="mb-4">No has añadido ningún producto. ¿Estás seguro de que deseas continuar?</p>
          <div className="flex justify-end space-x-4">
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleModalCancel}
            >
              Cancelar
            </button>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleModalConfirm}
            >
              Confirmar
            </button>
          </div>
        </Modal>
      </div>
  );
};

export default CreateShoppingForm;
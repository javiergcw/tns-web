import React, { useState, useEffect, useRef } from "react";
import { createShopping } from "@/app/services/shoppingService";
import CreateProductForm from "./create_ProductForm";
import { getStatuses } from "@/app/services/statusService";
import { getAllProfiles } from "@/app/services/profileService";
import { getAllAreas } from "@/app/services/areaService";
import { getAllAccountTypes } from "@/app/services/accountTypeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#__next");

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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [creationTime, setCreationTime] = useState(null); // Nuevo estado para el tiempo de creación

  // Estados para la funcionalidad de búsqueda
  const [areaSearch, setAreaSearch] = useState("");
  const [accountTypeSearch, setAccountTypeSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        const filteredUsers = data.filter(
            (user) => user.rol?.name === "Lider de presupuesto" || user.rol?.name === "admin" || user.rol?.name === "Compras"
        );
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

  // Filtrado de opciones según búsqueda
  const filteredAreas = areas.filter((area) =>
      area.name.toLowerCase().includes(areaSearch.toLowerCase())
  );
  const filteredAccountTypes = accountTypes.filter((type) =>
      type.name.toLowerCase().includes(accountTypeSearch.toLowerCase())
  );
  const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

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

  const handleFileRemove = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    toast.success("Archivo eliminado.");
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    const invalidFiles = files.filter((file) => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      toast.error("Algunos archivos no son válidos. Solo se permiten PDF, JPEG, PNG, DOCX y XLSX.");
    }

    if (validFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
      toast.success(`${validFiles.length} archivo(s) subido(s) exitosamente!`);
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
    setLoading(true); // Activar estado de carga
    setCreationTime(null); // Reiniciar el tiempo de creación
    const startTime = Date.now(); // Capturar tiempo de inicio

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

    uploadedFiles.forEach((file) => {
      formData.append("file[]", file);
    });

    try {
      const response = await createShopping(formData);

      const endTime = Date.now(); // Capturar tiempo de fin
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calcular tiempo en segundos
      setCreationTime(timeTaken); // Guardar el tiempo tomado

      if (response.status === 201) {
        toast.success(`Compra creada exitosamente`);
        resetForm();
      } else {
        toast.error("No se logró crear la compra.");
        setError({ general: "No se logró crear la compra" });
      }
    } catch (error) {
      const endTime = Date.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
      setCreationTime(timeTaken);
      console.error("Error al crear la compra:", error.response?.data || error.message);
      toast.error(`Error al crear la compra después de ${timeTaken} segundos.`);
      setError({ general: error.response?.data?.message || "Error al crear la compra" });
    } finally {
      setLoading(false); // Desactivar estado de carga
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
    setUploadedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setAreaSearch("");
    setAccountTypeSearch("");
    setUserSearch("");
    setCreationTime(null); // Reiniciar el tiempo de creación
  };

  const handleModalConfirm = async () => {
    setIsModalOpen(false);
    await createPurchase();
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
      <div className="flex flex-col-reverse space-y-0 text-black md:flex-row md:space-y-0 md:space-x-4">
        <form className="w-full px-8 py-6 bg-white rounded-lg shadow-md md:w-1/2" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-xl font-bold">Crear Nueva Orden</h2>

          {error.general && <div className="mb-4 text-red-500">{error.general}</div>}

          <div className="mb-4">
            <label className="block font-medium text-black">Título y Descripción: <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading} // Deshabilitar mientras carga
            />
            {error.title && <p className="text-red-500">{error.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium text-black">¿A quién se paga?: <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {error.description && <p className="text-red-500">{error.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium text-black">Estado: <span className="text-red-500">*</span></label>
            <select
                value={status_id}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            >
              <option value="">Seleccione un estado</option>
              {statuses
                  .filter((status) => [35, 3, 1].includes(status.id))
                  .sort((a, b) => {
                    const order = { "en proceso": 0, "aprobadas": 1, "rechazadas": 2 };
                    return order[a.name.toLowerCase()] - order[b.name.toLowerCase()];
                  })
                  .map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                  ))}
            </select>
            {error.status_id && <p className="text-red-500">{error.status_id}</p>}
          </div>

          {/* Campo Área */}
          <div className="relative mb-4">
            <label className="block font-medium text-black">Área: <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={areaSearch}
                onChange={(e) => {
                  setAreaSearch(e.target.value);
                  setShowAreaDropdown(true);
                }}
                onFocus={() => setShowAreaDropdown(true)}
                placeholder="Busca un área..."
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {showAreaDropdown && (
                <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-60">
                  {filteredAreas.length > 0 ? (
                      filteredAreas.map((area) => (
                          <li
                              key={area.id}
                              onClick={() => {
                                setSelectedAreaId(area.id);
                                setAreaSearch(area.name);
                                setShowAreaDropdown(false);
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {area.name}
                          </li>
                      ))
                  ) : (
                      <li className="px-3 py-2 text-gray-500">No hay coincidencias</li>
                  )}
                </ul>
            )}
            {error.area_id && <p className="text-red-500">{error.area_id}</p>}
          </div>

          {/* Campo Tipo de Cuenta */}
          <div className="relative mb-4">
            <label className="block font-medium text-black">Tipo de Cuenta: <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={accountTypeSearch}
                onChange={(e) => {
                  setAccountTypeSearch(e.target.value);
                  setShowAccountTypeDropdown(true);
                }}
                onFocus={() => setShowAccountTypeDropdown(true)}
                placeholder="Busca un tipo de cuenta..."
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {showAccountTypeDropdown && (
                <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-60">
                  {filteredAccountTypes.length > 0 ? (
                      filteredAccountTypes.map((type) => (
                          <li
                              key={type.id}
                              onClick={() => {
                                setSelectedAccountTypeId(type.id);
                                setAccountTypeSearch(type.name);
                                setShowAccountTypeDropdown(false);
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {type.name}
                          </li>
                      ))
                  ) : (
                      <li className="px-3 py-2 text-gray-500">No hay coincidencias</li>
                  )}
                </ul>
            )}
            {error.account_type_id && <p className="text-red-500">{error.account_type_id}</p>}
          </div>

          {/* Campo Líder de Presupuesto */}
          <div className="relative mb-4">
            <label className="block font-medium text-black">Líder de Presupuesto: <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  setShowUserDropdown(true);
                }}
                onFocus={() => setShowUserDropdown(true)}
                placeholder="Busca un líder..."
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {showUserDropdown && (
                <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-60">
                  {filteredUsers.length > 0 ? (
                      filteredUsers.map((profile) => (
                          <li
                              key={profile.user.id}
                              onClick={() => {
                                setSelectedUserId(profile.user.id);
                                setUserSearch(profile.name);
                                setShowUserDropdown(false);
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {profile.name}
                          </li>
                      ))
                  ) : (
                      <li className="px-3 py-2 text-gray-500">No hay coincidencias</li>
                  )}
                </ul>
            )}
            {error.user_id && <p className="text-red-500">{error.user_id}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium text-black">IVA (%): <span className="text-red-500">*</span></label>
            <input
                type="number"
                value={iva}
                onChange={(e) => setIva(e.target.value)}
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {error.iva && <p className="text-red-500">{error.iva}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium text-black">Rete Fuente (%):</label>
            <input
                type="number"
                value={retefuente}
                onChange={(e) => setRetefuente(e.target.value)}
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-black">Subtotal: <span className="text-red-500">*</span></label>
            <input
                type="number"
                value={subtotal}
                onChange={(e) => setSubTotal(e.target.value)}
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {error.subtotal && <p className="text-red-500">{error.subtotal}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium text-black">Total: <span className="text-red-500">*</span></label>
            <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {error.total && <p className="text-red-500">{error.total}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium text-black">Subir Archivos:</label>
            <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                onChange={handleFileUpload}
                multiple
                ref={fileInputRef}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                disabled={loading}
            />
            {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-black">Archivos Subidos:</h4>
                  {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 mt-2 bg-gray-100 rounded-md">
                        <p className="text-black">{file.name}</p>
                        <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleFileRemove(index)}
                            disabled={loading}
                        >
                          <FaTrash />
                        </button>
                      </div>
                  ))}
                </div>
            )}
          </div>

          <br />
          <h3 className="mb-4 text-lg font-semibold">Producto en la Orden</h3>
          {products.length === 0 ? (
              <p className="text-red-500">No hay producto. Añade un producto primero si lo deseas.</p>
          ) : (
              <div className="overflow-x-auto">
                <div className="flex space-x-4">
                  {products.map((product) => (
                      <div key={product.uniqueId} className="flex-shrink-0 p-4 bg-white rounded-lg shadow-md" style={{ minWidth: "250px" }}>
                        <div className="flex items-center">
                          {product.image && (
                              <img
                                  src={product.image}
                                  alt={product.name}
                                  className="object-cover w-16 h-16 mr-4 rounded-lg"
                              />
                          )}
                          <div>
                            <h4 className="font-semibold text-black">{product.name}</h4>
                            <p className="text-gray-600">Unidad: {product.unidad}</p>
                          </div>
                        </div>
                        <button
                            type="button"
                            className="mt-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveProduct(product.uniqueId)}
                            disabled={loading}
                        >
                          <FaTrash />
                        </button>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* Botón de Crear Orden con estado de carga */}
          <button
              type="submit"
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
              disabled={loading}
          >
            {loading ? "Creando orden..." : "Crear Orden"}
          </button>

          {/* Mostrar tiempo de creación si está disponible */}
          {creationTime && (
              <p className="mt-2 text-gray-600">Última orden creada</p>
          )}
        </form>

        <div className="w-full px-8 py-6 bg-white rounded-lg shadow-md md:w-1/2">
          <CreateProductForm onProductCreate={handleProductCreate} />
        </div>

        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleModalCancel}
            contentLabel="Confirmación de compra sin productos"
            className="max-w-md p-4 mx-auto mt-16 bg-white rounded-lg shadow-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="mb-4 text-xl font-semibold text-black">¿Crear compra sin productos?</h2>
          <p className="mb-4">No has añadido ningún producto. ¿Estás seguro de que deseas continuar?</p>
          <div className="flex justify-end space-x-4">
            <button
                className="px-4 py-2 text-white bg-red-500 rounded-md"
                onClick={handleModalCancel}
                disabled={loading}
            >
              Cancelar
            </button>
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
                onClick={handleModalConfirm}
                disabled={loading}
            >
              Confirmar
            </button>
          </div>
        </Modal>
      </div>
  );
};

export default CreateShoppingForm;
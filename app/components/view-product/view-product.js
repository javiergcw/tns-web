"use client";
import React, { useState, useEffect, useRef } from "react";
import { getAllShoppings, deleteShoppingById, uploadInvoice } from "@/app/services/shoppingService";
import { getStatuses } from "@/app/services/statusService";
import { getProfileById } from "@/app/services/profileService";
import { getMessagesByShoppingId, createMessage, deleteMessage } from "@/app/services/messagesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye, faFilePdf, faCommentDots, faFileUpload, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import CustomComponent from "../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard";

import { getAllProfiles } from "@/app/services/profileService";
import { getAllAreas } from "@/app/services/areaService";
import { getAllAccountTypes } from "@/app/services/accountTypeService";
import * as XLSX from 'xlsx';
import { IoClose } from "react-icons/io5";

const fetchData = async () => {
  try {
    const res = await getAllShoppings(); //  'await' espera la respuesta
    console.log("Datos de la API:", res); // Mejor descripción en el console.log
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Devuelve un array vacío en caso de error.  IMPORTANTE:  siempre devolver algo.
  }
};

const FiltersComponent = () => {
  const [itemName, setItemName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [areaManager, setAreaManager] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [areas, setAreas] = useState([]); // Estado para almacenar las áreas
  const [accountTypes, setAccountTypes] = useState([]); // Estado para los tipos de cuenta
  const [selectedAreaId, setSelectedAreaId] = useState(""); // Estado para el área seleccionada
  const [selectedAccountTypeId, setSelectedAccountTypeId] = useState(""); // Estado para el tipo de cuenta seleccionado
  const [loadingOptions, setLoadingOptions] = useState(true); // Estado para controlar si las áreas y tipos de cuenta están cargando
  // Estado para el tipo de cuenta seleccionado
  const [users, setUsers] = useState([]); // Estado para los usuarios (líderes de presupuesto)
  const [selectedUserId, setSelectedUserId] = useState(""); // Estado para el usuario seleccionado


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [role, setRole] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para el modal de confirmación de eliminación
  const [shoppingToDelete, setShoppingToDelete] = useState(null); // Estado para almacenar el ID de la compra a eliminar

  const [selectedShoppingData, setSelectedShoppingData] = useState(null);

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newStatusId, setNewStatusId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedShoppingForInvoice, setSelectedShoppingForInvoice] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const [messages, setMessages] = useState([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [newMessageBody, setNewMessageBody] = useState("");

  const itemNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const areaManagerRef = useRef(null);
  const statusFilterRef = useRef(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");

        if (storedUserId) {
          const profile = await getProfileById(storedUserId);
          const userRole = profile.rol.name ? profile.rol.name : "";
          setRole(userRole);

          console.log("El rol del usuario logueado es:", userRole);
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAreasAndAccountTypes = async () => {
      try {
        setLoadingOptions(true); // Comienza la carga de datos

        // Obtener las áreas y tipos de cuenta
        const areasData = await getAllAreas();
        const accountTypesData = await getAllAccountTypes();

        // Guardar los datos en el estado
        setAreas(areasData);
        setAccountTypes(accountTypesData);

        // Asegúrate de cargar los valores solo si selectedShoppingData está disponible
        if (selectedShoppingData) {
          setSelectedAreaId(selectedShoppingData.area_id || "");
          setSelectedAccountTypeId(selectedShoppingData.account_type_id || "");
          setSelectedUserId(selectedShoppingData.user_id || "");
        }
      } catch (error) {
        console.error("Error al obtener áreas o tipos de cuenta:", error);
      } finally {
        setLoadingOptions(false); // Finaliza la carga de datos
      }
    };

    const fetchUsers = async () => {
      try {
        const data = await getAllProfiles();
        const filteredUsers = data.filter(user => user.rol?.name === "Lider de presupuesto" || user.rol?.name === "admin");
        setUsers(filteredUsers);

        // Asegúrate de que el líder de presupuesto esté preseleccionado correctamente
        if (selectedShoppingData) {
          setSelectedUserId(selectedShoppingData.user_id || "");
        }
      } catch (error) {
        setError((prev) => ({
          ...prev,
          general: "Error al obtener usuarios.",
        }));
      }
    };

    if (isEditModalOpen && selectedShoppingData) {
      fetchAreasAndAccountTypes();
      fetchUsers(); // Solo cargar datos si el modal está abierto y hay datos seleccionados
    }
  }, [isEditModalOpen, selectedShoppingData]);




  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token

        const response = await fetch(
          "https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Usar el token
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Error al obtener las compras: ${response.status} - ${errorData.message || response.statusText
            }`
          );
        }

        const fetchedData = await response.json();
        const statuses = await getStatuses(); // Esto se mantiene igual
        console.log("Statuses:", statuses);
        console.log("fetchedData:", fetchedData);

        setData(fetchedData);
        setFilteredData(fetchedData);
        setStatusOptions(statuses);  // Esto también se mantiene

        // Ordenar y actualizar datos (igual que antes)
        const sortedData = fetchedData.sort(
          (a, b) => new Date(b.request_date) - new Date(a.request_date)
        );

        const updatedData = sortedData.map((shopping) => {
          const invoice = localStorage.getItem(`invoice_${shopping.id}`);
          return { ...shopping, invoice_url: invoice || shopping.facturacion };
        });

        setData(updatedData); //Actualiza luego de mapear la data
        setFilteredData(updatedData); //Actualiza luego de mapear la data
        setIsLoading(false);


        /* const leaders = [
          ...new Set(fetchedData.map((shopping) => shopping.user.profile.name)),
        ]; */
        const leaders = [
          ...new Set(
            fetchedData
              .filter(shopping => shopping.user && shopping.user.profile) // Filtrar los que tienen user.profile
              .map(shopping => shopping.user.profile.name)
          ),
        ];
        setLeaderOptions(leaders);


      } catch (error) {
        setError(error.message);
        console.error("Error en fetchAndProcessData:", error); // Log del error
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);


  useEffect(() => {
    const filterData = () => {
      let filtered = data;

      if (itemName) {
        filtered = filtered.filter((shopping) =>
          shopping.products.some((product) =>
            product.name.toLowerCase().includes(itemName.toLowerCase())
          )
        );
      }

      if (startDate) {
        filtered = filtered.filter(
          (shopping) => new Date(shopping.created_at) >= new Date(startDate)
        );
      }

      if (endDate) {
        filtered = filtered.filter(
          (shopping) => new Date(shopping.created_at) <= new Date(endDate)
        );
      }

      if (areaManager) {
        filtered = filtered.filter(
          (shopping) =>
            shopping.user &&
            shopping.user.profile &&
            shopping.user.profile.name.toLowerCase() ===
            areaManager.toLowerCase()
        );
      }

      if (statusFilter) {
        filtered = filtered.filter(
          (shopping) =>
            shopping.status.name &&
            shopping.status.name.toLowerCase() === statusFilter.toLowerCase()
        );
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [itemName, startDate, endDate, areaManager, statusFilter, data]);
  // const handleDelete = async (shoppingId) => {
  //   try {
  //     const result = await deleteShoppingById(shoppingId);
  //     console.log('Compra eliminada:', result);
  //     // Aquí puedes actualizar tu estado o hacer otra acción tras la eliminación
  //   } catch (error) {
  //     console.error('Error al eliminar la compra:', error);
  //   }
  // };
  const openDeleteModal = (shoppingId) => {
    setShoppingToDelete(shoppingId);
    setIsDeleteModalOpen(true);
  };



  // Función que elimina la compra
  const handleDelete = async () => {
    try {
      if (shoppingToDelete) {
        const result = await deleteShoppingById(shoppingToDelete);
        console.log('Compra eliminada:', result);

        // Aquí puedes actualizar el estado o hacer otra acción tras la eliminación
        const updatedData = data.filter((shopping) => shopping.id !== shoppingToDelete);
        setData(updatedData);
        setFilteredData(updatedData);
        setIsDeleteModalOpen(false); // Cerrar el modal
        // Puedes actualizar tu estado de `data` aquí si es necesario
      }
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setShoppingToDelete(null);
  };

  const handleUploadInvoice = async (event, shoppingId) => {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    if (!file) return;

    try {
      const result = await uploadInvoice(shoppingId, file); // Llama al método uploadInvoice
      alert("Factura subida exitosamente");

      // Actualiza el estado local inmediatamente con la nueva URL
      setData((prevData) =>
        prevData.map((item) =>
          item.id === shoppingId
            ? { ...item, facturacion: result.fileUrl } // Actualizamos el campo facturacion
            : item
        )
      );

      // Si necesitas más datos del backend después de subir la factura:
      const updatedData = await fetchData(); // Supón que esta función actualiza los datos desde la API
      setData(updatedData);
    } catch (error) {
      console.error("Error al subir la factura:", error);
      alert("Error al subir la factura, inténtalo nuevamente.");
    }
  };


  const handleDeleteInvoice = async (shoppingId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta factura?")) {
      try {
        // Crear el objeto con el campo facturacion vacío
        const updatedShopping = {
          facturacion: "", // Solo actualizamos este campo
        };

        // Realizar la solicitud PATCH al endpoint, usando el shoppingId
        const updateResponse = await fetch(
          `https://flow-api-9a1502cb3d68.herokuapp.com/v1/shoppings/${shoppingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(updatedShopping), // Solo enviamos el campo necesario
          }
        );

        if (updateResponse.ok) {
          alert("Factura eliminada correctamente.");
          // Actualizar el estado local
          setData((prevData) =>
            prevData.map((item) =>
              item.id === shoppingId ? { ...item, facturacion: "" } : item
            )
          );
        } else {
          alert("Hubo un error al eliminar la factura.");
        }
      } catch (error) {
        console.error("Error al eliminar la factura:", error);
        alert("Hubo un error al eliminar la factura.");
      }
    }
  };
  const handleViewPdf = (url) => {
    setPdfUrl(url);
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setPdfUrl("");
  };


  const handleFilterReset = () => {
    setItemName("");
    setStartDate("");
    setEndDate("");
    setAreaManager("");
    setStatusFilter("");
    setFilteredData(data);
    if (itemNameRef.current) itemNameRef.current;
    if (startDateRef.current) startDateRef.current;
    if (endDateRef.current) itemNameRef.current;
    if (areaManagerRef.current) itemNameRef.current;
    if (statusFilterRef.current) itemNameRef.current;
  };
  const handleOpenEditModal = async (shoppingId) => {
    try {
      const response = await fetch(
        `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error al obtener los datos de la compra.");
        return;
      }

      const shopping = await response.json();

      // Extraer el área correctamente como un objeto
      const areaId = shopping.area?.id || "";  // El id del objeto área

      // Asignar los datos seleccionados al estado selectedShoppingData
      setSelectedShoppingData({
        ...shopping,
        area_id: areaId, // Almacena el id del área
        account_type_id: shopping.account_type?.id || "", // El id del tipo de cuenta
        user_id: shopping.user?.id || "", // El id del usuario
      });

      setIsEditModalOpen(true); // Abrir el modal de edición
    } catch (error) {
      console.error("Error fetching shopping data:", error);
      alert("Error al obtener los datos de la compra.");
    }
  };

  const handleViewDetailsClick = async (shoppingId) => {
    setSelectedShoppingId(shoppingId);

    try {
      const messagesResponse = await getMessagesByShoppingId(shoppingId);
      setMessages(messagesResponse);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
      setMessages([]);
    }

    setIsModalOpen(true);
  };
  function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  }
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((shopping) => ({
        // "ITEM": shopping.products.map((product) => product.name).join(", "),
        "TITULO": shopping.title,
        "DESCRIPCIÓN": shopping.description,
        "LÍDER DE ÁREA": shopping.user.profile.name,
        "TIPO DE CUENTA": shopping.account_type.name,
        "ESTADO": shopping.status.name,
        "FECHA PETICIÓN": new Date(shopping.request_date).toLocaleDateString(),
        "FECHA APROBADO": new Date(shopping.date_approval).toLocaleDateString(),
        //"FECHA FINALIZACIÓN": new Date(shopping.pending_date).toLocaleDateString(),
        // Formatear usando la función formatCurrency
        //"PRECIO": formatCurrency(shopping.products.reduce((total, product) => total + product.price, 0)),
        "SUBTOTAL": shopping.subtotal != null ? formatCurrency(shopping.subtotal) : "N/A",
        "TOTAL": shopping.total != null ? formatCurrency(shopping.total) : "N/A",
        "FACTURA": shopping.facturacion ? shopping.facturacion : "No disponible"
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");

    worksheet['!cols'] = [
      { wpx: 200 }, { wpx: 200 }, { wpx: 100 },
      { wpx: 150 }, { wpx: 150 }, { wpx: 150 },
      { wpx: 100 }, { wpx: 150 }, { wpx: 150 }, { wpx: 200 }
    ];
    XLSX.writeFile(workbook, 'tabla_compras.xlsx');
  };

  const handleEditClick = (shoppingId) => {
    setEditingId(shoppingId);
    setIsEditing(true);
  };

  const handleStatusChange = (e) => {
    setNewStatusId(e.target.value);
  };

  const handleSaveClick = async () => {
    if (!newStatusId) {
      alert("Por favor, selecciona un nuevo estado.");
      return;
    }

    try {
      const response = await fetch(
        `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${editingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error al obtener los datos de la compra.");
        return;
      }

      const shopping = await response.json();

      const updatedShopping = {
        shopping: {
          ...shopping, // Conservamos todos los campos originales
          status_id: parseInt(newStatusId, 10), // Solo cambiamos el estado
        },
        products: shopping.products, // Conservamos los productos
      };

      const updateResponse = await fetch(
        `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedShopping),
        }
      );

      if (updateResponse.ok) {
        alert("Estado actualizado correctamente.");
        setIsEditing(false);
        setEditingId(null);
        setNewStatusId("");
        const updatedData = await fetchData(); // Refrescar los datos
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        alert("Hubo un error al actualizar el estado.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Hubo un error al actualizar el estado.");
    }
  };
  const handleEditSave = async (e) => {
    e.preventDefault();

    try {
      const updatedShopping = {
        shopping: {
          title: selectedShoppingData.title,
          description: selectedShoppingData.description,
          category_id: selectedShoppingData.category_id,
          area_id: selectedShoppingData.area?.id, // Asegúrate de obtener el `id` del objeto `area`
          account_type_id: selectedShoppingData.account_type?.id, // Asegúrate de obtener el `id` del objeto `account_type`
          user_id: selectedShoppingData.user?.id, // Asegúrate de obtener el `id` del objeto `user`
          request_date: selectedShoppingData.request_date,
          pending_date: selectedShoppingData.pending_date,
          date_approval: selectedShoppingData.date_approval,
          innovated: selectedShoppingData.innovated,
          unidad: selectedShoppingData.unidad,
          iva: selectedShoppingData.iva,
          retefuente: selectedShoppingData.retefuente,
          facturacion: selectedShoppingData.facturacion,
          subtotal: selectedShoppingData.subtotal, // Subtotal
          total: selectedShoppingData.total, // Total
        },
        products: selectedShoppingData.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        })),
        replace_products: "true", // Indicamos que los productos han sido modificados
      };


      const updateResponse = await fetch(
        `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${selectedShoppingData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedShopping),
        }
      );

      if (updateResponse.ok) {
        alert("Compra y productos actualizados correctamente.");
        setIsEditModalOpen(false); // Cerrar el modal
        const updatedData = await fetchData(); // Refrescar los datos
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        alert("Hubo un error al actualizar la compra.");
      }
    } catch (error) {
      console.error("Error updating shopping:", error);
      alert("Hubo un error al actualizar la compra.");
    }
  };






  const handleOpenInvoiceModal = (shoppingId) => {
    setSelectedShoppingForInvoice(shoppingId);
    setInvoiceUrl(""); // Limpiar el valor anterior
    setIsInvoiceModalOpen(true); // Abrir el modal
  };

  const handleSaveInvoiceUrl = async () => {
    if (!invoiceUrl) {
      alert("Por favor, ingresa una URL de factura válida.");
      return;
    }

    try {
      const response = await fetch(
        `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${selectedShoppingForInvoice}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error al obtener los datos de la compra.");
        return;
      }

      const shopping = await response.json();

      const updatedShopping = {
        shopping: {
          title: shopping.title,
          description: shopping.description,
          category_id: shopping.category_id,
          status_id: shopping.status_id,
          area_id: shopping.area_id,
          account_type_id: shopping.account_type_id,
          user_id: shopping.user_id,
          request_date: shopping.request_date,
          pending_date: shopping.pending_date,
          date_approval: shopping.date_approval,
          innovated: shopping.innovated,
          unidad: shopping.unidad,
          iva: shopping.iva,
          retefuente: shopping.retefuente,
          facturacion: invoiceUrl, // Aquí actualizamos la URL de la factura
          total: shopping.total,
        },
        products: shopping.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        })),
        replace_products: "false",
      };

      const updateResponse = await fetch(
        `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${selectedShoppingForInvoice}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedShopping),
        }
      );

      if (updateResponse.ok) {
        alert("Factura actualizada correctamente.");
        setIsInvoiceModalOpen(false); // Cerrar el modal
        setSelectedShoppingForInvoice(null); // Limpiar la selección
        const updatedData = await fetchData();
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        alert("Hubo un error al actualizar la factura.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Hubo un error al actualizar la factura.");
    }
  };

  const handleOpenMessageModal = (shoppingId) => {
    if (role === "admin" || role === "Developer") {
      setSelectedShoppingId(shoppingId);
      setIsMessageModalOpen(true);
    }
  };

  const handleAddMessage = async () => {
    const messageData = {
      body: newMessageBody,
      shopping_id: selectedShoppingId,
      user_id: localStorage.getItem("userId"),
    };

    try {
      const newMessage = await createMessage(messageData);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      alert("Mensaje añadido correctamente.");
      setIsMessageModalOpen(false);
      setNewMessageBody("");
    } catch (error) {
      console.error("Error al añadir el mensaje:", error);
      alert("Hubo un error al añadir el mensaje.");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
      alert("Mensaje eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
      alert("Hubo un error al eliminar el mensaje.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShoppingId(null);
    setMessages([]);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setNewMessageBody("");
  };

  const handleViewInvoice = (invoiceUrl) => {
    window.open(invoiceUrl, "_blank");
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const selectedShopping = filteredData.find(shopping => shopping.id === selectedShoppingId);

  return (
    <div className="app-container">
      <h1>{(role === "admin" || role === "Developer") ? "Compras ADMIN" : "Compras"}</h1>
      <div className="w-full bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Nombre de item</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-black">
          <input
            type="text"
            placeholder="Item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full text-black"
          />

          <select
            value={areaManager}
            onChange={(e) => setAreaManager(e.target.value)}
            ref={areaManagerRef}
            className="border border-gray-300 rounded p-2 w-full text-black"
          >
            <option value="">Todos los Líderes</option>
            {leaderOptions.map((leader) => (
              <option key={leader} value={leader}>
                {leader}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            ref={statusFilterRef}
            className="border border-gray-300 rounded p-2 w-full text-black"
          >
            <option value="">Todos los Estados</option>
            {statusOptions.map((status) => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>

          <div className="flex space-x-4">
            <button
              onClick={handleFilterReset}
              className="bg-red-500 text-white p-2 rounded"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            <button
              onClick={handleDownloadExcel}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Exportar Tabla
            </button>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto max-w-full">
        <div className="w-full overflow-y-auto max-h-[600px]">
          <table className="shopping-table min-w-[1200px] text-base text-left text-black border border-gray-300">
            <thead className="text-base text-white uppercase bg-blue-500">
              <tr>
                <th className="px-6 py-3 text-center border border-gray-300">TITULO</th>
                <th className="px-6 py-3 text-center border border-gray-300">DESCRIPCIÓN</th>
                <th className="px-6 py-3 text-center border border-gray-300">LÍDER DE ÁREA</th>
                <th className="px-6 py-3 text-center border border-gray-300">TIPO DE CUENTA</th>
                <th className="px-6 py-3 text-center border border-gray-300">ESTADO</th>
                <th className="px-6 py-3 text-center border border-gray-300">FECHA PETICIÓN</th>
                <th className="px-6 py-3 text-center border border-gray-300">FECHA APROBADO</th>
                <th className="px-6 py-3 text-center border border-gray-300">SUBTOTAL</th>
                <th className="px-6 py-3 text-center border border-gray-300">TOTAL</th>
                <th className="px-6 py-3 text-center border border-gray-300">FACTURA</th>
                <th className="px-6 py-3 text-center border border-gray-300">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-4 text-center border border-gray-300">No hay compras</td>
                </tr>
              ) : (
                filteredData.map((shopping) => (
                  <tr key={shopping.id} className="hover:bg-gray-100">
                    {/* <td className="px-6 py-4 text-center border border-gray-300">
                      <ul className="list-disc pl-4">
                        {shopping.products.map((product) => (
                          <li key={product.id}>{product.name}</li>
                        ))}
                      </ul>
                    </td> */}
                    <td className="px-6 py-4 text-center border border-gray-300">{shopping.title}</td>
                    <td className="px-6 py-4 text-center border border-gray-300">{shopping.description}</td>
                    <td className="px-6 py-4 text-center border border-gray-300">
                      {shopping.user && shopping.user.profile ? shopping.user.profile.name : "Sin usuario"}
                    </td>
                    <td className="px-6 py-4 text-center border border-gray-300">{shopping.account_type.name}</td>
                    <td className="px-6 py-4 text-center border border-gray-300">
                      {role === "admin" || role === "Developer" ? (
                        isEditing && editingId === shopping.id ? (
                          <div className="flex items-center space-x-2">
                            <select value={newStatusId} onChange={handleStatusChange} className="border border-gray-300 rounded p-1">
                              <option value="">Selecciona un estado</option>
                              {statusOptions.map((status) => (
                                <option key={status.id} value={status.id}>
                                  {status.name}
                                </option>
                              ))}
                            </select>
                            <button className="bg-green-500 text-white p-2 rounded" onClick={handleSaveClick}>
                              Confirmar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>{shopping.status.name}</span>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-green-500 hover:text-green-700 cursor-pointer"
                              onClick={() => handleEditClick(shopping.id)}
                            />
                          </div>
                        )
                      ) : (
                        <span>{shopping.status.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center border border-gray-300">
                      {shopping.request_date ? new Date(shopping.request_date).toLocaleString('es-CO', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false // O true, según prefieras 24h o 12h
                      }) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center border border-gray-300">{new Date(shopping.date_approval).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center border border-gray-300">{shopping.subtotal ? formatCurrency(shopping.subtotal) : "N/A"}</td>
                    <td className="px-6 py-4 text-center border border-gray-300">{shopping.total ? formatCurrency(shopping.total) : "N/A"}</td>
                    <td className="px-6 py-4 text-center border border-gray-300">
                      {shopping.facturacion ? (
                        <div className="flex items-center space-x-2">
                          {/* Botón para abrir el modal y previsualizar el PDF */}
                          <button
                            onClick={() => handleViewPdf(shopping.facturacion)} // Llama a la función para abrir el modal
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faFilePdf} />
                          </button>

                          {(role === "admin" || role === "Compras" || role === "Developer") && (
                            <>
                              <label className="cursor-pointer">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="text-green-500 hover:text-green-700 cursor-pointer"
                                />
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleUploadInvoice(e, shopping.id)} // Reutiliza el método de upload
                                />
                              </label>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                onClick={() => handleDeleteInvoice(shopping.id)}
                              />
                            </>
                          )}
                        </div>
                      ) : (
                        (role === "admin" || role === "Compras" || role === "Developer") && (
                          <label className="cursor-pointer">
                            <FontAwesomeIcon
                              icon={faFileUpload}
                              className="text-green-500 hover:text-green-700"
                            />
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleUploadInvoice(e, shopping.id)} // Reutiliza el método de upload
                            />
                          </label>
                        )
                      )}

                    </td>
                    <td className="px-6 py-4 text-center border border-gray-300">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => handleViewDetailsClick(shopping.id)}
                        />
                        {(role === "admin" || role === "Developer") && (
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            className="text-green-500 hover:text-green-700 cursor-pointer"
                            onClick={() => handleOpenMessageModal(shopping.id)}
                          />
                        )}
                        {(role === "admin" || role === "Developer") && (
                          <>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                              onClick={() => openDeleteModal(shopping.id)}
                            />
                          </>
                        )}

                        {(role === "admin" || role === "Developer" || role === "Compras") && (
                          <>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-green-500 hover:text-green-700 cursor-pointer"
                              onClick={() => handleOpenEditModal(shopping.id)}
                            />
                          </>
                        )}

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedShopping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-3/4 max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Detalle de la compra</h2>
            <CustomComponent shoppingId={selectedShoppingId} />
            <h3 className="text-lg text-black mt-6 lg:text-xl font-semibold mb-4">Mensajes</h3>
            {(role === "admin" || role === "Developer") && (
              <button
                className="bg-blue-500 text-white p-2 rounded mb-4"
                onClick={() => handleOpenMessageModal(selectedShoppingId)}
              >
                Añadir Mensaje
              </button>
            )}
            <div className="mt-6 flex text-black space-x-4 overflow-x-auto py-2 px-2">
              {messages.slice().reverse().map((message) => (
                <div key={message.id} className="relative flex-shrink-0 w-auto">
                  <MessageCard message={message} />
                  {(role === "admin" || role === "Developer") && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 hover:text-red-700 cursor-pointer absolute top-2 right-2"
                      onClick={() => handleDeleteMessage(message.id)}
                    />
                  )}
                </div>
              ))}
            </div>
            <h3 className="text-lg text-black mt-6 lg:text-xl font-semibold mb-4">Factura</h3>
            <div className="flex items-center space-x-2">
              {selectedShopping.facturacion ? (
                <a
                  href={selectedShopping.facturacion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faFilePdf} />
                </a>
              ) : (
                <p className="text-gray-500">No hay factura</p>
              )}
              {(role === "admin" || role === "Compras" || role === "Developer") && selectedShopping.facturacion && (
                <>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleOpenInvoiceModal(selectedShopping.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDeleteInvoice(selectedShopping.id)}
                  />
                </>
              )}
            </div>

          </div>
        </div>
      )}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl relative">
            {/* Botón para cerrar el modal */}
            <button
              className="absolute top-1 right-1 text-black hover:text-gray-900 text-xl font-bold"
              onClick={closePdfModal}
            >
              <IoClose></IoClose>
            </button>
            {/* Previsualización del PDF */}
            <iframe
              src={pdfUrl}
              className="w-full h-[600px] border-0"
              title="Factura PDF"
            ></iframe>
          </div>
        </div>
      )}

      {/* Modal para ingresar la URL de la factura */}
      {
        isInvoiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
            <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
              <button
                className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
                onClick={() => setIsInvoiceModalOpen(false)}
              >
                X
              </button>
              <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Subir URL de Factura</h2>
              <input
                type="text"
                placeholder="Ingresa la URL de la factura"
                value={invoiceUrl}
                onChange={(e) => setInvoiceUrl(e.target.value)}
                className="w-full text-black p-2 border border-gray-300 rounded mb-4"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded w-full"
                onClick={handleSaveInvoiceUrl}
              >
                Guardar Factura
              </button>
            </div>
          </div>
        )
      }

      {
        isMessageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
            <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
              <button
                className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
                onClick={handleCloseMessageModal}
              >
                X
              </button>
              <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Añadir Mensaje</h2>
              <input
                type="text"
                placeholder="Escribe tu mensaje aquí"
                value={newMessageBody}
                onChange={(e) => setNewMessageBody(e.target.value)}
                className="w-full text-black p-2 border border-gray-300 rounded mb-4"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded w-full"
                onClick={handleAddMessage}
              >
                Guardar Mensaje
              </button>
            </div>
          </div>
        )
      }
      {
        isEditModalOpen && selectedShoppingData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              {/* Botón para cerrar (X) */}
              <button
                className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
                onClick={() => setIsEditModalOpen(false)}
              >
                X
              </button>

              <h2 className="text-2xl font-bold mb-4 text-black">Editar Compra</h2>
              <form onSubmit={handleEditSave}>
                {/* Título */}
                <div className="mb-4">
                  <label className="block text-black font-medium">Título: <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={selectedShoppingData.title || ''}
                    onChange={(e) => setSelectedShoppingData({ ...selectedShoppingData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    required
                    onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <label className="block text-black font-medium">Descripción: <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={selectedShoppingData.description || ''}
                    onChange={(e) => setSelectedShoppingData({ ...selectedShoppingData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    required
                    onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                </div>

                {/* Área */}
                <div className="mb-4">
                  <label className="block text-black font-medium">Área: <span className="text-red-500">*</span></label>
                  <select
                    value={selectedShoppingData.area?.id || ''}
                    onChange={(e) =>
                      setSelectedShoppingData({
                        ...selectedShoppingData,
                        area: areas.find((area) => area.id === parseInt(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    required
                    onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  >
                    <option value="">Seleccione un área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tipo de Cuenta Dropdown */}
                <div className="mb-4">
                  <label className="block text-black font-medium">
                    Tipo de Cuenta: <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedShoppingData.account_type?.id || ''}
                    onChange={(e) =>
                      setSelectedShoppingData({
                        ...selectedShoppingData,
                        account_type: accountTypes.find((type) => type.id === parseInt(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    required
                    onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  >
                    <option value="">Seleccione un tipo de cuenta</option>
                    {accountTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Líder de Presupuesto Dropdown */}
                <div className="mb-4">
                  <label className="block text-black font-medium">
                    Líder de Presupuesto: <span className="text-red-500">*</span>
                  </label>
                  <select
                      value={selectedShoppingData.user?.id || ""}
                      onChange={(e) => {
                        const selectedUserId = parseInt(e.target.value);
                        const selectedProfile = users.find((profile) => profile.user.id === selectedUserId);
                        console.log("Usuario seleccionado en edición - user.id:", selectedUserId, "profile:", selectedProfile);
                        setSelectedShoppingData({
                          ...selectedShoppingData,
                          user: selectedProfile ? { id: selectedProfile.user.id, profile: { id: selectedProfile.id, name: selectedProfile.name } } : null,
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                      required
                      onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                      onInput={(e) => e.target.setCustomValidity("")}
                  >
                    <option value="">Seleccione un líder de presupuesto</option>
                    {users.map((profile) => (
                        <option key={profile.user.id} value={profile.user.id}>
                          {profile.name}
                        </option>
                    ))}
                  </select>
                </div>

                {/* Subtotal y Total */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-bold text-black">
                      Subtotal: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={selectedShoppingData.subtotal || ''}
                      onChange={(e) =>
                        setSelectedShoppingData({ ...selectedShoppingData, subtotal: parseFloat(e.target.value) })
                      }
                      className="border p-2 rounded w-full text-black"
                      required
                      onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold text-black">
                      Total: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={selectedShoppingData.total || ''}
                      onChange={(e) =>
                        setSelectedShoppingData({ ...selectedShoppingData, total: parseFloat(e.target.value) })
                      }
                      className="border p-2 rounded w-full text-black"
                      required
                      onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    />
                  </div>

                  {/* IVA */}
                  <div>
                    <label className="block mb-2 text-sm font-bold text-black">
                      IVA: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={selectedShoppingData.iva || ''}
                      onChange={(e) =>
                        setSelectedShoppingData({ ...selectedShoppingData, iva: parseFloat(e.target.value) })
                      }
                      className="border p-2 rounded w-full text-black"
                      required
                      onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    />
                  </div>

                  {/* Unidad */}
                  <div>
                    <label className="block mb-2 text-sm font-bold text-black">
                      Unidad: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={selectedShoppingData.unidad || ''}
                      onChange={(e) =>
                        setSelectedShoppingData({ ...selectedShoppingData, unidad: parseFloat(e.target.value) })
                      }
                      className="border p-2 rounded w-full text-black"
                      required
                      onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    />
                  </div>
                </div>

                {/* Espacio adicional antes del Checkbox Innovated */}
                <div className="mt-6 mb-4">
                  <label className="flex items-center space-x-4">
                    <span className="text-black font-medium">¿Es innovador?</span>
                    <input
                      type="checkbox"
                      checked={selectedShoppingData.innovated || false}
                      onChange={(e) =>
                        setSelectedShoppingData({ ...selectedShoppingData, innovated: e.target.checked })
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-black font-medium">Innovado</span>
                  </label>
                </div>

                {/* Productos */}
                <h3 className="text-lg font-semibold mb-4 text-black">Productos en la Orden</h3>
                {selectedShoppingData.products.map((product, index) => (
                  <div key={product.id} className="grid grid-cols-3 gap-4 mb-4 text-black">
                    <div>
                      <label className="block mb-2 text-sm font-bold text-black">
                        Nombre del Producto: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={product.name || ''}
                        onChange={(e) => {
                          const updatedProducts = [...selectedShoppingData.products];
                          updatedProducts[index].name = e.target.value;
                          setSelectedShoppingData({ ...selectedShoppingData, products: updatedProducts });
                        }}
                        className="border p-2 rounded w-full text-black"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-bold text-black">
                        Descripción: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={product.description || ''}
                        onChange={(e) => {
                          const updatedProducts = [...selectedShoppingData.products];
                          updatedProducts[index].description = e.target.value;
                          setSelectedShoppingData({ ...selectedShoppingData, products: updatedProducts });
                        }}
                        className="border p-2 rounded w-full text-black"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-bold text-black">
                        Precio: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={product.price || ''}
                        onChange={(e) => {
                          const updatedProducts = [...selectedShoppingData.products];
                          updatedProducts[index].price = parseFloat(e.target.value);
                          setSelectedShoppingData({ ...selectedShoppingData, products: updatedProducts });
                        }}
                        className="border p-2 rounded w-full text-black"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Rellena este campo')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </div>
                  </div>
                ))}

                {/* Botones de acción */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-black">Confirmar eliminación</h2>
              <p>¿Estás seguro de que quieres eliminar esta compra?</p>
              <div className="flex justify-end mt-4 text-black">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={closeDeleteModal}
                >
                  Cancelar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )
      }

    </div >
  );
};

export default FiltersComponent;

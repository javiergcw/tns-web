"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
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
import { generatePDF } from "@/app/utils/pdfGenerator";
import { OrderPDF } from "@/app/components/OrderPDF";

const fetchData = async () => {
  try {
    const res = await getAllShoppings();
    console.log("Datos de la API:", res);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const FiltersComponent = () => {
  const [itemName, setItemName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [areaManager, setAreaManager] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [areas, setAreas] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedAccountTypeId, setSelectedAccountTypeId] = useState("");
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leaderOptions, setLeaderOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [role, setRole] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [shoppingToDelete, setShoppingToDelete] = useState(null);
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
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito
  const [selectedShoppings, setSelectedShoppings] = useState([]); // Estado para rastrear IDs seleccionados
  const [selectedStatus, setSelectedStatus] = useState("");
  const [priorityStates, setPriorityStates] = useState({});
  // Estado para el modal de archivos
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Archivos a mostrar en el modal
  const [selectedFileToView, setSelectedFileToView] = useState(null); // Archivo seleccionado para visualizar
  const [isFileViewModalOpen, setIsFileViewModalOpen] = useState(false); // Modal para visualizar un archivo
  const [selectedShoppingIdForFiles, setSelectedShoppingIdForFiles] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Función para abrir el modal de archivos
  const handleOpenFilesModal = (files, shoppingId) => {
    setSelectedFiles(files || []);
    setSelectedShoppingIdForFiles(shoppingId); // Guardar el shoppingId
    setIsFilesModalOpen(true);
  };

// Función para cerrar el modal de archivos
  const closeFilesModal = () => {
    setIsFilesModalOpen(false);
    setSelectedFiles([]);
  };

// Función para visualizar un archivo
  const handleViewFile = (file) => {
    setSelectedFileToView(file);
    setIsFileViewModalOpen(true);
  };

// Función para cerrar el modal de visualización de archivo
  const closeFileViewModal = () => {
    setIsFileViewModalOpen(false);
    setSelectedFileToView(null);
  };

// Función para determinar el ícono según el tipo de archivo
  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) {
      return (
          <svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z"/>
          </svg>
      );
    } else if (fileType.includes("image")) {
      return (
          <svg className="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 10l-4-4-4 4h8z"/>
          </svg>
      );
    } else if (fileType.includes("spreadsheetml") || fileType.includes("excel")) {
      return (
          <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM9 12l2 2-2 2h3v2H7v-2l2-2-2-2v-2h5v2H9z"/>
          </svg>
      );
    } else if (fileType.includes("wordprocessingml") || fileType.includes("msword")) {
      return (
          <svg className="w-6 h-6 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM7 12h2l2 3 2-6h2v10h-2v-6l-2 3-2-3v6H7v-10z"/>
          </svg>
      );
    } else {
      return (
          <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z"/>
          </svg>
      );
    }
  };

// Detectar shoppingId de la URL y abrir el modal automáticamente
  useEffect(() => {
    const shoppingId = searchParams.get("shoppingId");
    if (shoppingId) {
      handleViewDetailsClick(parseInt(shoppingId));
    } else {
      console.log("No se encontró shoppingId en la URL");
    }
  }, [searchParams]);

  // Obtener el ID del usuario autenticado desde localStorage, esto es para la funcionalidad de la bandera permitida para ciertos usuarios
  const userId = parseInt(localStorage.getItem("userId"), 10) || 0; // Default a 0 si no existe
  const allowedUserIds = [1, 36, 105]; // IDs permitidos
  const canManagePriority = allowedUserIds.includes(userId); // Verificar permiso

  const sortConfig = useRef({
    key: "request_date",
    direction: "descending",
  });

  const itemNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const areaManagerRef = useRef(null);
  const statusFilterRef = useRef(null);

  // Modificar sortData para priorizar is_priority
  const sortData = (dataToSort) => {
    const sortedData = [...dataToSort];

    // Primero ordenar por is_priority (true primero, false después)
    sortedData.sort((a, b) => {
      if (a.is_priority && !b.is_priority) return -1;
      if (!a.is_priority && b.is_priority) return 1;

      // Si ambos tienen el mismo is_priority, aplicar el ordenamiento de sortConfig
      let valueA, valueB;
      if (sortConfig.current.key.includes(".")) {
        const keys = sortConfig.current.key.split(".");
        valueA = keys.reduce((obj, key) => obj?.[key], a) || "";
        valueB = keys.reduce((obj, key) => obj?.[key], b) || "";
      } else {
        valueA = a[sortConfig.current.key] || "";
        valueB = b[sortConfig.current.key] || "";
      }

      if (sortConfig.current.key === "request_date" || sortConfig.current.key === "date_approval") {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return sortConfig.current.direction === "ascending" ? dateA - dateB : dateB - dateA;
      }

      return sortConfig.current.direction === "ascending"
          ? valueA.toString().localeCompare(valueB.toString())
          : valueB.toString().localeCompare(valueA.toString());
    });

    return sortedData;
  };

  const handleSort = (key) => {
    sortConfig.current = {
      key,
      direction: sortConfig.current.key === key && sortConfig.current.direction === "ascending" ? "descending" : "ascending",
    };
    const sortedFilteredData = sortData(filteredData);
    setFilteredData(sortedFilteredData);
  };

  useEffect(() => {
    if (data.length > 0 && Object.keys(priorityStates).length === 0) {
      const initialPriorities = {};
      data.forEach((item) => {
        if (item.is_priority && !item.is_completed) {
          initialPriorities[item.id] = 1; // Rojo
        } else if (!item.is_priority && item.is_completed) {
          initialPriorities[item.id] = 2; // Verde
        } else {
          initialPriorities[item.id] = 0; // Gris
        }
      });
      console.log("Initial priorityStates:", initialPriorities);
      setPriorityStates(initialPriorities);
    }
  }, [data]);

  // Nueva función para alternar prioridad
  const handleTogglePriority = async (shoppingId) => {
    try {
      const token = localStorage.getItem("token");
      const currentState = priorityStates[shoppingId] !== undefined ? priorityStates[shoppingId] : 0;
      let nextState;
      let isPriority;
      let isCompleted;

      // Definir el siguiente estado y valores para el backend
      if (currentState === 0) {
        // Gris → Rojo
        nextState = 1;
        isPriority = true;
        isCompleted = false;
      } else if (currentState === 1) {
        // Rojo → Verde
        nextState = 2;
        isPriority = false;
        isCompleted = true;
      } else {
        // Verde → Gris
        nextState = 0;
        isPriority = false;
        isCompleted = false;
      }

      console.log(`Before update - Shopping ID: ${shoppingId}, Current: ${currentState}, Next: ${nextState}, is_priority: ${isPriority}, is_completed: ${isCompleted}`);

      // Enviar solicitud al backend
      const response = await fetch(
          `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}/toggle_priority`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shopping: { is_priority: isPriority, is_completed: isCompleted },
            }),
          }
      );

      if (!response.ok) throw new Error("Error al actualizar prioridad");

      const updatedShopping = await response.json();

      // Actualizar el estado local
      setPriorityStates((prevState) => {
        const newState = { ...prevState, [shoppingId]: nextState };
        console.log("After update - New priorityStates:", newState);
        return newState;
      });

      // Actualizar data y filteredData
      const updatedData = data.map((item) =>
          item.id === shoppingId
              ? { ...item, is_priority: updatedShopping.is_priority, is_completed: updatedShopping.is_completed }
              : item
      );
      const sortedData = sortData(updatedData);
      setData(sortedData);

      const updatedFilteredData = filteredData.map((item) =>
          item.id === shoppingId
              ? { ...item, is_priority: updatedShopping.is_priority, is_completed: updatedShopping.is_completed }
              : item
      );
      const sortedFilteredData = sortData(updatedFilteredData);
      setFilteredData(sortedFilteredData);

      setSuccessMessage(
          `Prioridad ${nextState === 1 ? "activada" : nextState === 2 ? "completada" : "reiniciada"} con éxito`
      );
    } catch (error) {
      console.error("Error toggling priority:", error);
      alert("Error al cambiar la prioridad");
    }
  };

  // Función para manejar los cambios de los checkboxes
  const handleCheckboxChange = (shoppingId) => {
    setSelectedShoppings((prevSelected) =>
        prevSelected.includes(shoppingId)
            ? prevSelected.filter((id) => id !== shoppingId) // Desmarcar
            : [...prevSelected, shoppingId] // Marcar
    );
  };

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
        setLoadingOptions(true);

        const areasData = await getAllAreas();
        const accountTypesData = await getAllAccountTypes();

        setAreas(areasData);
        setAccountTypes(accountTypesData);

        if (selectedShoppingData) {
          setSelectedAreaId(selectedShoppingData.area_id || "");
          setSelectedAccountTypeId(selectedShoppingData.account_type_id || "");
          setSelectedUserId(selectedShoppingData.user_id || "");
        }
      } catch (error) {
        console.error("Error al obtener áreas o tipos de cuenta:", error);
      } finally {
        setLoadingOptions(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const data = await getAllProfiles();
        const filteredUsers = data.filter(
            (user) => user.rol?.name === "Lider de presupuesto" || user.rol?.name === "admin"
        );
        setUsers(filteredUsers);

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
      fetchUsers();
    }
  }, [isEditModalOpen, selectedShoppingData]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
              `Error al obtener las compras: ${response.status} - ${
                  errorData.message || response.statusText
              }`
          );
        }

        const fetchedData = await response.json();
        const statuses = await getStatuses();
        console.log("Statuses:", statuses);
        console.log("fetchedData:", fetchedData);

        const updatedData = fetchedData.map((shopping) => {
          const invoice = localStorage.getItem(`invoice_${shopping.id}`);
          return { ...shopping, invoice_url: invoice || shopping.facturacion };
        });

        const sortedData = sortData(updatedData);
        setData(sortedData);
        setFilteredData(sortedData);
        setStatusOptions(statuses);
        setIsLoading(false);

        const leaders = [
          ...new Set(
              fetchedData
                  .filter((shopping) => shopping.user && shopping.user.profile)
                  .map((shopping) => shopping.user.profile.name)
          ),
        ];
        setLeaderOptions(leaders);
      } catch (error) {
        setError(error.message);
        console.error("Error en fetchAndProcessData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = data;

      // Excluir "rechazada" y "aprobadas" por defecto si no hay filtro de estado
      if (!statusFilter) {
        filtered = filtered.filter((shopping) => {
          const statusName = shopping.status?.name?.toLowerCase();
          return statusName && statusName !== "rechazadas" && statusName !== "aprobadas";
        });
      } else {
        // Si hay un filtro de estado, solo mostrar los que coincidan exactamente
        filtered = filtered.filter((shopping) => {
          const statusName = shopping.status?.name?.toLowerCase();
          return statusName && statusName === statusFilter.toLowerCase();
        });
      }

      // Filtro por nombre del ítem
      if (itemName) {
        filtered = filtered.filter((shopping) =>
            shopping.title?.toLowerCase().includes(itemName.toLowerCase())
        );
      }

      // Filtro por fecha de inicio
      if (startDate) {
        filtered = filtered.filter(
            (shopping) => new Date(shopping.created_at) >= new Date(startDate)
        );
      }

      // Filtro por fecha de fin
      if (endDate) {
        filtered = filtered.filter(
            (shopping) => new Date(shopping.created_at) <= new Date(endDate)
        );
      }

      // Filtro por gerente de área
      if (areaManager) {
        filtered = filtered.filter(
            (shopping) =>
                shopping.user?.profile?.name?.toLowerCase() === areaManager.toLowerCase()
        );
      }

      const sortedFilteredData = sortData(filtered);
      setFilteredData(sortedFilteredData);
    };

    filterData();
  }, [itemName, startDate, endDate, areaManager, statusFilter, data]);

  useEffect(() => {
    const sortedFilteredData = sortData(filteredData);
    setFilteredData(sortedFilteredData);
  }, [sortConfig]);

  const openDeleteModal = (shoppingId) => {
    if (shoppingId) {
      setShoppingToDelete(shoppingId);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedShoppings.length > 0) {
        // Eliminar múltiples registros
        await Promise.all(selectedShoppings.map((id) => deleteShoppingById(id)));
        const updatedData = data.filter((shopping) => !selectedShoppings.includes(shopping.id));
        const sortedData = sortData(updatedData);
        setData(sortedData);
        setFilteredData(sortedData);
        setSelectedShoppings([]); // Limpiar selecciones
        setSuccessMessage("Compras eliminadas con éxito");
      } else if (shoppingToDelete) {
        // Eliminar un solo registro
        const result = await deleteShoppingById(shoppingToDelete);
        console.log("Compra eliminada:", result);
        const updatedData = data.filter((shopping) => shopping.id !== shoppingToDelete);
        const sortedData = sortData(updatedData);
        setData(sortedData);
        setFilteredData(sortedData);
        setShoppingToDelete(null);
        setSuccessMessage("Compra eliminada con éxito");
      }
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la(s) compra(s):", error);
      alert("Hubo un error al eliminar la(s) compra(s).");
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setShoppingToDelete(null);
  };

  const handleUploadInvoice = async (event, shoppingId) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file[]", file); // Usamos "file[]" para enviar múltiples archivos
      });

      const response = await fetch(
          `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}/upload_archives`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al subir los archivos: ${errorData.error || response.statusText}`);
      }

      const updatedShopping = await response.json();
      setSuccessMessage("Archivos subidos exitosamente");

      // Actualizar los datos con los nuevos archivos
      const updatedData = data.map((item) =>
          item.id === shoppingId ? { ...item, shopping_files: updatedShopping.files } : item
      );
      const sortedData = sortData(updatedData);
      setData(sortedData);
      setFilteredData(sortedData);

      // Actualizar los archivos en el modal si está abierto
      if (isFilesModalOpen && selectedShoppingIdForFiles === shoppingId) {
        setSelectedFiles(updatedShopping.files); // Actualiza selectedFiles con los archivos nuevos
      }
    } catch (error) {
      console.error("Error al subir los archivos:", error);
      alert(`Error al subir los archivos: ${error.message}`);
    }
  };

  const handleDeleteInvoice = async (shoppingId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta factura?")) {
      try {
        const updatedShopping = {
          facturacion: "",
        };

        const updateResponse = await fetch(
            `https://flow-api-9a1502cb3d68.herokuapp.com/v1/shoppings/${shoppingId}`,
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
          alert("Factura eliminada correctamente.");
          const updatedData = data.map((item) =>
              item.id === shoppingId ? { ...item, facturacion: "" } : item
          );
          const sortedData = sortData(updatedData);
          setData(sortedData);
          setFilteredData(sortedData);
        } else {
          alert("Hubo un error al eliminar la factura.");
        }
      } catch (error) {
        console.error("Error al eliminar la factura:", error);
        alert("Hubo un error al eliminar la factura.");
      }
    }
  };

  const handleDeleteFile = async (shoppingId, fileId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este archivo?")) return;

    if (!shoppingId) {
      setSuccessMessage("Error: No se pudo identificar la compra asociada.");
      return;
    }

    try {
      const response = await fetch(
          `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}/files/${fileId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al eliminar archivo: ${errorData.error || response.statusText}`);
      }

      setSuccessMessage("Archivo eliminado con éxito");

      const updatedData = data.map((item) =>
          item.id === shoppingId
              ? { ...item, shopping_files: item.shopping_files.filter((file) => file.id !== fileId) }
              : item
      );
      const sortedData = sortData(updatedData);
      setData(sortedData);
      setFilteredData(sortedData);

      setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
      setSuccessMessage(`Error: ${error.message}`);
    }
  };

  // metodo para actualizar (aprobar y rechazar) ordenes seleccionando una o muchas
  const handleStatusUpdate = async (newStatusName) => {
    try {
      const statusId = statusOptions.find(
          status => status.name.toLowerCase() === newStatusName.toLowerCase()
      )?.id;

      if (!statusId) {
        setSuccessMessage("Estado no encontrado"); // Cambiamos alert por notificación
        return;
      }

      const isApproved = newStatusName.toLowerCase() === "aprobadas";
      const updatePromises = selectedShoppings.map(async (shoppingId) => {
        const response = await fetch(
            `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );

        const shopping = await response.json();

        const updatedShopping = {
          shopping: {
            ...shopping,
            status_id: statusId,
            date_approval: isApproved ? new Date().toISOString() : null,
          },
          products: shopping.products,
        };

        return fetch(
            `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(updatedShopping),
            }
        );
      });

      await Promise.all(updatePromises);

      const updatedData = await fetchData();
      const sortedData = sortData(updatedData);
      setData(sortedData);
      setFilteredData(sortedData);
      setSelectedShoppings([]);
      setSelectedStatus("");
      setSuccessMessage(`Estado cambiado a ${newStatusName} para ${selectedShoppings.length} compra(s)`);
    } catch (error) {
      console.error("Error updating statuses:", error);
      setSuccessMessage("Error al actualizar los estados"); // Cambiamos alert por notificación
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
    const sortedData = sortData(data);
    setFilteredData(sortedData);
    if (itemNameRef.current) itemNameRef.current;
    if (startDateRef.current) startDateRef.current;
    if (endDateRef.current) endDateRef.current;
    if (areaManagerRef.current) areaManagerRef.current;
    if (statusFilterRef.current) statusFilterRef.current;
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

      const areaId = shopping.area?.id || "";
      setSelectedShoppingData({
        ...shopping,
        area_id: areaId,
        account_type_id: shopping.account_type?.id || "",
        user_id: shopping.user?.id || "",
      });

      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching shopping data:", error);
      alert("Error al obtener los datos de la compra.");
    }
  };

  // Este Metodo ayuda abrir el modal para ver el detalle del shopping y sus mensajes
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
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value);
  }

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
        filteredData.map((shopping) => ({
          "TITULO": shopping.title,
          "DESCRIPCIÓN": shopping.description,
          "LÍDER DE ÁREA": shopping.user.profile.name,
          "TIPO DE CUENTA": shopping.account_type.name,
          "ESTADO": shopping.status.name,
          "FECHA PETICIÓN": new Date(shopping.request_date).toLocaleDateString(),
          "FECHA APROBADO": new Date(shopping.date_approval).toLocaleDateString(),
          "SUBTOTAL": shopping.subtotal != null ? formatCurrency(shopping.subtotal) : "N/A",
          "TOTAL": shopping.total != null ? formatCurrency(shopping.total) : "N/A",
          "FACTURA": shopping.facturacion ? shopping.facturacion : "No disponible",
        }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");

    worksheet["!cols"] = [
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 150 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 150 },
      { wpx: 200 },
    ];
    XLSX.writeFile(workbook, "tabla_compras.xlsx");
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

      const approvedStatusId = statusOptions.find(status => status.name.toLowerCase() === "aprobadas")?.id;
      const isApproved = parseInt(newStatusId, 10) === approvedStatusId;

      const updatedShopping = {
        shopping: {
          ...shopping,
          status_id: parseInt(newStatusId, 10),
          date_approval: isApproved ? new Date().toISOString() : null,
        },
        products: shopping.products,
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
        setSuccessMessage("Estado cambiado con éxito"); // Mostrar mensaje de éxito
        setIsEditing(false);
        setEditingId(null);
        setNewStatusId("");

        const updatedData = await fetchData();
        const sortedData = sortData(updatedData);
        setData(sortedData);
        setFilteredData(sortedData);
      } else {
        alert("Hubo un error al actualizar el estado.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Hubo un error al actualizar el estado.");
    }
  };

  // Efecto para ocultar el mensaje después de 4 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 4000); // 4000 milisegundos = 4 segundos
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [successMessage]);

  const handleEditSave = async (e) => {
    e.preventDefault();

    try {
      const updatedShopping = {
        shopping: {
          title: selectedShoppingData.title,
          description: selectedShoppingData.description,
          category_id: selectedShoppingData.category_id,
          area_id: selectedShoppingData.area?.id,
          account_type_id: selectedShoppingData.account_type?.id,
          user_id: selectedShoppingData.user?.id,
          request_date: selectedShoppingData.request_date,
          pending_date: selectedShoppingData.pending_date,
          date_approval: selectedShoppingData.date_approval,
          innovated: selectedShoppingData.innovated,
          unidad: selectedShoppingData.unidad,
          iva: selectedShoppingData.iva,
          retefuente: selectedShoppingData.retefuente,
          facturacion: selectedShoppingData.facturacion,
          subtotal: selectedShoppingData.subtotal,
          total: selectedShoppingData.total,
        },
        products: selectedShoppingData.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        })),
        replace_products: "true",
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
        setIsEditModalOpen(false);
        const updatedData = await fetchData();
        const sortedData = sortData(updatedData);
        setData(sortedData);
        setFilteredData(sortedData);
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
    setInvoiceUrl("");
    setIsInvoiceModalOpen(true);
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
          facturacion: invoiceUrl,
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
        setIsInvoiceModalOpen(false);
        setSelectedShoppingForInvoice(null);
        const updatedData = await fetchData();
        const sortedData = sortData(updatedData);
        setData(sortedData);
        setFilteredData(sortedData);
      } else {
        alert("Hubo un error al actualizar la factura.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Hubo un error al actualizar la factura.");
    }
  };

  const handleOpenMessageModal = (shoppingId) => {
    if (role === "admin" || role === "Developer" || role === "Compras") {
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
      setSuccessMessage("Mensaje añadido correctamente.");
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
    router.push("/view-product"); // Limpia la URL
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setNewMessageBody("");
  };

  // Nueva función para descargar el PDF
  const handleGeneratePDF = async (shoppingId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }
  
      const response = await fetch(
        `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener los datos del PDF");
      }
  
      const data = await response.json();
  
      // Transformar la respuesta de show para coincidir con OrderPDF
      const transformedData = {
        id: data.id,
        encargado: data.user?.profile?.name || "Sin nombre",
        area: data.area?.name || "N/A",
        numero_orden: data.id ? String(data.id).padStart(3, "0") : "N/A",
        fecha: new Date().toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).replace("April", "Abril"),
        subtotal: data.subtotal || 0,
        iva: data.iva || 0,
        total: data.total || 0,
        cuenta_gastos: data.account_type?.name || "N/A",
        titulo: data.title || "Sin título",
        description: data.description || "N/A",
        unidad: data.unidad || "N/A",
        productos: data.products
          ? data.products.map((product) => ({
              nombre: product.name,
              descripcion: product.description || "N/A",
              precio: product.price,
              cantidad: product.quantity || 1,
              unidad: product.unidad || data.unidad || "N/A",
            }))
          : [],
      };
  
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = "-9999px";
      document.body.appendChild(container);
  
      const root = ReactDOM.createRoot(container);
  
      await new Promise((resolve) => {
        root.render(<OrderPDF order={transformedData} onReady={resolve} />);
      });
  
      await generatePDF("pdf-content", `orden_${transformedData.numero_orden}.pdf`);
      container.remove();
      setSuccessMessage("PDF generado con éxito");
    } catch (error) {
      console.error("Error generando PDF:", error);
      setSuccessMessage("Error al generar el PDF");
    }
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

  const selectedShopping = selectedShoppingId
      ? data.find((shopping) => shopping.id === selectedShoppingId)
      : null;

  return (
      <div className="app-container">
        <h1>{(role === "admin" || role === "Developer") ? "Compras ADMIN" : "Compras"}</h1>
        <div className="w-full p-4 mb-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-black">Nombre de item</h2>
          <div className="grid grid-cols-1 gap-4 text-black md:grid-cols-4">
            <input
                type="text"
                placeholder="Item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 text-black border border-gray-300 rounded"
            />
            <select
                value={areaManager}
                onChange={(e) => setAreaManager(e.target.value)}
                ref={areaManagerRef}
                className="w-full p-2 text-black border border-gray-300 rounded"
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
                className="w-full p-2 text-black border border-gray-300 rounded"
            >
              <option value="">Todos los Estados</option>
              {statusOptions
                  .filter(status =>
                      status.id === 35 || // Aprobadas
                      status.id === 3 ||  // Rechazadas
                      status.id === 1     // En proceso
                  )
                  .sort((a, b) => {
                    // Orden: "En proceso" (1), "Aprobadas" (35), "Rechazadas" (3)
                    const order = { "en proceso": 0, "aprobadas": 1, "rechazadas": 2 };
                    return order[a.name.toLowerCase()] - order[b.name.toLowerCase()];
                  })
                  .map(status => (
                      <option key={status.id} value={status.name}>
                        {status.name}
                      </option>
                  ))
              }
            </select>
            <div className="flex space-x-4">
              <button onClick={handleFilterReset} className="p-2 text-white bg-red-500 rounded">
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={handleDownloadExcel} className="p-2 text-white bg-blue-500 rounded">
                Exportar Tabla
              </button>
              {(role === "admin" || role === "Compras") && (
                  <select
                      value={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        if (selectedShoppings.length > 0 && e.target.value) {
                          handleStatusUpdate(e.target.value);
                        }
                      }}
                      disabled={selectedShoppings.length === 0}
                      className={`border border-gray-300 rounded p-2 text-black ${
                          selectedShoppings.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <option value="">Cambiar estado ({selectedShoppings.length})</option>
                    {statusOptions
                        .filter(status =>
                            status.name.toLowerCase() === "aprobadas" ||
                            status.name.toLowerCase() === "rechazadas"
                        )
                        .map(status => (
                            <option key={status.id} value={status.name.toLowerCase()}>
                              {status.name}
                            </option>
                        ))
                    }
                  </select>
              )}
            </div>
          </div>
        </div>
        <div className="w-full max-w-full overflow-x-auto">
          <div className="w-full overflow-y-auto max-h-[600px]">
            <table className="shopping-table min-w-[1200px] text-base text-left text-black border border-gray-300">
              <thead className="text-base text-white uppercase bg-blue-500">
              <tr>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("title")}
                >
                  ID {sortConfig.key === "ID" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("title")}
                >
                  TITULO Y DESCRIPCIÓN{sortConfig.key === "title" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("description")}
                >
                  ¿A quién se paga? {sortConfig.key === "description" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("user.profile.name")}
                >
                  LÍDER DE ÁREA {sortConfig.key === "user.profile.name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("account_type.name")}
                >
                  TIPO DE CUENTA {sortConfig.key === "account_type.name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("status.name")}
                >
                  ESTADO {sortConfig.key === "status.name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("request_date")}
                >
                  FECHA PETICIÓN {sortConfig.key === "request_date" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                    className="px-6 py-3 text-center border border-gray-300 cursor-pointer"
                    onClick={() => handleSort("date_approval")}
                >
                  FECHA APROBADO {sortConfig.key === "date_approval" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-center border border-gray-300">SUBTOTAL</th>
                <th className="px-6 py-3 text-center border border-gray-300">TOTAL</th>
                <th className="px-6 py-3 text-center border border-gray-300">FACTURA</th>
                <th className="px-6 py-3 text-center border border-gray-300">ACCIONES</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-4 text-center border border-gray-300">
                      No hay compras
                    </td>
                  </tr>
              ) : (
                  filteredData.map((shopping) => (
                      <tr key={shopping.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 text-center border border-gray-300">
                          <div className="flex items-center justify-center space-x-2">
                            {(role === "admin" || role === "Compras") && (
                                <input
                                    type="checkbox"
                                    class="bg-gray-200 border-gray-300 rounded mr-2 all-checkbox"
                                    checked={selectedShoppings.includes(shopping.id)}
                                    onChange={() => handleCheckboxChange(shopping.id)}
                                />
                            )}
                            <span>{shopping.id}</span>
                          </div>
                        </td>
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
                                    <select
                                        value={newStatusId}
                                        onChange={handleStatusChange}
                                        className="p-1 border border-gray-300 rounded"
                                    >
                                      <option value="">Selecciona un estado</option>
                                      {statusOptions
                                          .filter(
                                              (status) =>
                                                  status.id === 35 || // Aprobadas
                                                  status.id === 3 ||  // Rechazadas
                                                  status.id === 1     // En proceso
                                          )
                                          .map((status) => (
                                              <option key={status.id} value={status.id}>
                                                {status.name}
                                              </option>
                                          ))}
                                    </select>
                                    <button
                                        className="p-2 text-white bg-green-500 rounded"
                                        onClick={handleSaveClick}
                                    >
                                      Confirmar
                                    </button>
                                  </div>
                              ) : (
                                  <div className="flex items-center space-x-2">
                                    <span>{shopping.status.name}</span>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="text-green-500 cursor-pointer hover:text-green-700"
                                        onClick={() => handleEditClick(shopping.id)}
                                    />
                                  </div>
                              )
                          ) : (
                              <span>{shopping.status.name}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {shopping.request_date
                              ? new Date(shopping.request_date).toLocaleString("es-CO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                              })
                              : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {shopping.date_approval
                              ? new Date(shopping.date_approval).toLocaleString("es-CO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                              })
                              : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {shopping.subtotal ? formatCurrency(shopping.subtotal) : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {shopping.total ? formatCurrency(shopping.total) : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          <div className="flex items-center space-x-2">
                            {/* Contenedor para los iconos de lista y descarga */}
                            <div className="flex items-center space-x-2">
                              {/* Botón para ver la lista de archivos */}
                              <button
                                  onClick={() => handleOpenFilesModal(shopping.shopping_files, shopping.id)}
                                  className="text-gray-500 hover:text-gray-700"
                              >
                                <svg
                                    className="w-6 h-6 text-gray-500 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10 3v4a1 1 0 0 1-1 1H5m8-2h3m-3 3h3m-4 3v6m4-3H8M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 12v6h8v-6H8Z"
                                  />
                                </svg>
                              </button>

                              {/* Botón de descarga */}
                              <button
                                  onClick={() => handleGeneratePDF(shopping.id)}
                                  className="text-gray-500 hover:text-gray-700"
                              >
                                <svg
                                    className="w-6 h-6 text-blue-500" // Cambié el color a azul para distinguirlo
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 12V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4m5-13v4a1 1 0 0 1-1 1H5m0 6h9m0 0-2-2m2 2-2 2"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Botones para admin, Compras o Developer */}
                            {(role === "admin" || role === "Compras" || role === "Developer") && (
                                <>
                                  {/* Botón para subir archivo (solo si no hay archivos) */}
                                  {(!shopping.shopping_files || shopping.shopping_files.length === 0) && (
                                      <label className="cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faFileUpload}
                                            className="text-green-500 hover:text-green-700"
                                        />
                                        <input
                                            type="file"
                                            className="hidden"
                                            multiple
                                            onChange={(e) => handleUploadInvoice(e, shopping.id)}
                                        />
                                      </label>
                                  )}
                                </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          <div className="flex items-center space-x-2">
                            {/* Icono dinámico según priorityLevel */}
                            {canManagePriority && (
                                <>
                                  {priorityStates[shopping.id] === 0 ? (
                                      <svg
                                          onClick={() => handleTogglePriority(shopping.id)}
                                          className="w-6 h-6 text-gray-500 cursor-pointer"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                      >
                                        <path
                                            d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216 .655.32Z"/>
                                      </svg>
                                  ) : priorityStates[shopping.id] === 1 ? (
                                      <svg
                                          onClick={() => handleTogglePriority(shopping.id)}
                                          className="w-6 h-6 text-red-500 cursor-pointer"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                      >
                                        <path
                                            d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216 .655.32Z"/>
                                      </svg>
                                  ) : priorityStates[shopping.id] === 2 ? (
                                      <svg
                                          onClick={() => handleTogglePriority(shopping.id)}
                                          className="w-6 h-6 text-green-500 cursor-pointer"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                      >
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                                      </svg>
                                  ) : (
                                      <span>Estado desconocido</span>
                                  )}
                                </>
                            )}
                            {/* Otras acciones */}
                            <FontAwesomeIcon
                                icon={faEye}
                                className="text-gray-500 cursor-pointer hover:text-gray-700"
                                onClick={() => handleViewDetailsClick(shopping.id)}
                            />
                            {(role === "admin" || role === "Developer" || role === "Compras") && (
                                <FontAwesomeIcon
                                    icon={faCommentDots}
                                    className="text-green-500 cursor-pointer hover:text-green-700"
                                    onClick={() => handleOpenMessageModal(shopping.id)}
                                />
                            )}
                            {(role === "admin" || role === "Developer") && (
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                    onClick={() => openDeleteModal(shopping.id)}
                                />
                            )}
                            {(role === "admin" || role === "Developer" || role === "Compras") && (
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="text-green-500 cursor-pointer hover:text-green-700"
                                    onClick={() => handleOpenEditModal(shopping.id)}
                                />
                            )}
                          </div>
                        </td>
                      </tr>
                  )))
              }
              </tbody>
            </table>
          </div>
        </div>

        {/* Mostrar mensaje de éxito */}
        {successMessage && (
            <div className="fixed z-50 p-3 text-white bg-green-500 rounded shadow-lg top-4 right-4">
              {successMessage}
            </div>
        )}

        {isModalOpen && selectedShopping && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 lg:p-0">
              <div
                  className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-3/4 max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute text-xl text-gray-700 top-2 right-2 lg:top-4 lg:right-4 hover:text-gray-900 lg:text-2xl"
                    onClick={handleCloseModal}
                >
                  X
                </button>
                <h2 className="mb-4 text-xl font-bold text-center text-black lg:text-2xl">Detalle de la compra</h2>
                <CustomComponent shoppingId={selectedShoppingId}/>
                <h3 className="mt-6 mb-4 text-lg font-semibold text-black lg:text-xl">Mensajes</h3>
                {(role === "admin" || role === "Developer" || role === "Compras") && (
                    <button
                        className="p-2 mb-4 text-white bg-blue-500 rounded"
                        onClick={() => handleOpenMessageModal(selectedShoppingId)}
                    >
                      Añadir Mensaje
                    </button>
                )}
                <div className="flex px-2 py-2 mt-6 space-x-4 overflow-x-auto text-black">
                  {messages.slice().reverse().map((message) => (
                      <div key={message.id} className="relative flex-shrink-0 w-auto">
                        <MessageCard message={message}/>
                        {(role === "admin" || role === "Developer") && (
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="absolute text-red-500 cursor-pointer hover:text-red-700 top-2 right-2"
                                onClick={() => handleDeleteMessage(message.id)}
                            />
                        )}
                      </div>
                  ))}
                </div>
                <h3 className="mt-6 mb-4 text-lg font-semibold text-black lg:text-xl">Factura</h3>
                <div className="flex items-center space-x-2">
                  {selectedShopping.facturacion ? (
                      <a
                          href={selectedShopping.facturacion}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 cursor-pointer hover:text-red-700"
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
                            className="text-blue-500 cursor-pointer hover:text-blue-700"
                            onClick={() => handleOpenInvoiceModal(selectedShopping.id)}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500 cursor-pointer hover:text-red-700"
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
              <div className="relative w-full max-w-4xl p-5 bg-white rounded-lg shadow-lg">
                <button
                    className="absolute text-xl font-bold text-black top-1 right-1 hover:text-gray-900"
                    onClick={closePdfModal}
                >
                  <IoClose />
                </button>
                <iframe src={pdfUrl} className="w-full h-[600px] border-0" title="Factura PDF"></iframe>
              </div>
            </div>
        )}
        {isInvoiceModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 lg:p-0">
              <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute text-xl text-gray-700 top-2 right-2 lg:top-4 lg:right-4 hover:text-gray-900 lg:text-2xl"
                    onClick={() => setIsInvoiceModalOpen(false)}
                >
                  X
                </button>
                <h2 className="mb-4 text-xl font-bold text-center text-black lg:text-2xl">Subir URL de Factura</h2>
                <input
                    type="text"
                    placeholder="Ingresa la URL de la factura"
                    value={invoiceUrl}
                    onChange={(e) => setInvoiceUrl(e.target.value)}
                    className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
                />
                <button className="w-full p-2 text-white bg-blue-500 rounded" onClick={handleSaveInvoiceUrl}>
                  Guardar Factura
                </button>
              </div>
            </div>
        )}
        {isMessageModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 lg:p-0">
              <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute text-xl text-gray-700 top-2 right-2 lg:top-4 lg:right-4 hover:text-gray-900 lg:text-2xl"
                    onClick={handleCloseMessageModal}
                >
                  X
                </button>
                <h2 className="mb-4 text-xl font-bold text-center text-black lg:text-2xl">Añadir Mensaje</h2>
                <input
                    type="text"
                    placeholder="Escribe tu mensaje aquí"
                    value={newMessageBody}
                    onChange={(e) => setNewMessageBody(e.target.value)}
                    className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
                />
                <button className="w-full p-2 text-white bg-blue-500 rounded" onClick={handleAddMessage}>
                  Guardar Mensaje
                </button>
              </div>
            </div>
        )}
        {isEditModalOpen && selectedShoppingData && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <button
                    className="absolute text-xl text-gray-700 top-2 right-2 lg:top-4 lg:right-4 hover:text-gray-900 lg:text-2xl"
                    onClick={() => setIsEditModalOpen(false)}
                >
                  X
                </button>
                <h2 className="mb-4 text-2xl font-bold text-black">Editar Compra</h2>
                <form onSubmit={handleEditSave}>
                  <div className="mb-4">
                    <label className="block font-medium text-black">
                      Título: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={selectedShoppingData.title || ""}
                        onChange={(e) =>
                            setSelectedShoppingData({ ...selectedShoppingData, title: e.target.value })
                        }
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                        required
                        onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                        onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium text-black">
                      Descripción: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={selectedShoppingData.description || ""}
                        onChange={(e) =>
                            setSelectedShoppingData({ ...selectedShoppingData, description: e.target.value })
                        }
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                        required
                        onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                        onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium text-black">
                      Área: <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={selectedShoppingData.area?.id || ""}
                        onChange={(e) =>
                            setSelectedShoppingData({
                              ...selectedShoppingData,
                              area: areas.find((area) => area.id === parseInt(e.target.value)),
                            })
                        }
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                        required
                        onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                        onInput={(e) => e.target.setCustomValidity("")}
                    >
                      <option value="">Seleccione un área</option>
                      {areas.map((area) => (
                          <option key={area.id} value={area.id}>
                            {area.name}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium text-black">
                      Tipo de Cuenta: <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={selectedShoppingData.account_type?.id || ""}
                        onChange={(e) =>
                            setSelectedShoppingData({
                              ...selectedShoppingData,
                              account_type: accountTypes.find((type) => type.id === parseInt(e.target.value)),
                            })
                        }
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                        required
                        onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                        onInput={(e) => e.target.setCustomValidity("")}
                    >
                      <option value="">Seleccione un tipo de cuenta</option>
                      {accountTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium text-black">
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
                            user: selectedProfile
                                ? { id: selectedProfile.user.id, profile: { id: selectedProfile.id, name: selectedProfile.name } }
                                : null,
                          });
                        }}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-bold text-black">
                        Subtotal: <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="number"
                          value={selectedShoppingData.subtotal || ""}
                          onChange={(e) =>
                              setSelectedShoppingData({
                                ...selectedShoppingData,
                                subtotal: parseFloat(e.target.value),
                              })
                          }
                          className="w-full p-2 text-black border rounded"
                          required
                          onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                          onInput={(e) => e.target.setCustomValidity("")}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-bold text-black">
                        Total: <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="number"
                          value={selectedShoppingData.total || ""}
                          onChange={(e) =>
                              setSelectedShoppingData({
                                ...selectedShoppingData,
                                total: parseFloat(e.target.value),
                              })
                          }
                          className="w-full p-2 text-black border rounded"
                          required
                          onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                          onInput={(e) => e.target.setCustomValidity("")}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-bold text-black">
                        IVA: <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="number"
                          value={selectedShoppingData.iva || ""}
                          onChange={(e) =>
                              setSelectedShoppingData({
                                ...selectedShoppingData,
                                iva: parseFloat(e.target.value),
                              })
                          }
                          className="w-full p-2 text-black border rounded"
                          required
                          onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                          onInput={(e) => e.target.setCustomValidity("")}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-bold text-black">
                        Unidad: <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="number"
                          value={selectedShoppingData.unidad || ""}
                          onChange={(e) =>
                              setSelectedShoppingData({
                                ...selectedShoppingData,
                                unidad: parseFloat(e.target.value),
                              })
                          }
                          className="w-full p-2 text-black border rounded"
                          required
                          onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                          onInput={(e) => e.target.setCustomValidity("")}
                      />
                    </div>
                  </div>
                  <div className="mt-6 mb-4">
                    <label className="flex items-center space-x-4">
                      <span className="font-medium text-black">¿Es innovador?</span>
                      <input
                          type="checkbox"
                          checked={selectedShoppingData.innovated || false}
                          onChange={(e) =>
                              setSelectedShoppingData({
                                ...selectedShoppingData,
                                innovated: e.target.checked,
                              })
                          }
                          className="w-5 h-5 text-blue-600 form-checkbox"
                      />
                      <span className="ml-2 font-medium text-black">Innovado</span>
                    </label>
                  </div>
                  <h3 className="mb-4 text-lg font-semibold text-black">Productos en la Orden</h3>
                  {selectedShoppingData.products.map((product, index) => (
                      <div key={product.id} className="grid grid-cols-3 gap-4 mb-4 text-black">
                        <div>
                          <label className="block mb-2 text-sm font-bold text-black">
                            Nombre del Producto: <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="text"
                              value={product.name || ""}
                              onChange={(e) => {
                                const updatedProducts = [...selectedShoppingData.products];
                                updatedProducts[index].name = e.target.value;
                                setSelectedShoppingData({
                                  ...selectedShoppingData,
                                  products: updatedProducts,
                                });
                              }}
                              className="w-full p-2 text-black border rounded"
                              required
                              onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                              onInput={(e) => e.target.setCustomValidity("")}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-bold text-black">
                            Descripción: <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="text"
                              value={product.description || ""}
                              onChange={(e) => {
                                const updatedProducts = [...selectedShoppingData.products];
                                updatedProducts[index].description = e.target.value;
                                setSelectedShoppingData({
                                  ...selectedShoppingData,
                                  products: updatedProducts,
                                });
                              }}
                              className="w-full p-2 text-black border rounded"
                              required
                              onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                              onInput={(e) => e.target.setCustomValidity("")}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-bold text-black">
                            Precio: <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="number"
                              value={product.price || ""}
                              onChange={(e) => {
                                const updatedProducts = [...selectedShoppingData.products];
                                updatedProducts[index].price = parseFloat(e.target.value);
                                setSelectedShoppingData({
                                  ...selectedShoppingData,
                                  products: updatedProducts,
                                });
                              }}
                              className="w-full p-2 text-black border rounded"
                              required
                              onInvalid={(e) => e.target.setCustomValidity("Rellena este campo")}
                              onInput={(e) => e.target.setCustomValidity("")}
                          />
                        </div>
                      </div>
                  ))}
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                        type="button"
                        className="px-4 py-2 text-white bg-red-500 rounded"
                        onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
        {isDeleteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-6 bg-white rounded shadow-lg">
                <h2 className="mb-4 text-lg font-semibold text-black">Confirmar eliminación</h2>
                <p>
                  ¿Estás seguro de que quieres eliminar{" "}
                  {selectedShoppings.length > 0
                      ? `${selectedShoppings.length} compra(s) seleccionada(s)`
                      : "esta compra"}
                  ?
                </p>
                <div className="flex justify-end mt-4 text-black">
                  <button
                      className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                      onClick={closeDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 text-white bg-red-500 rounded" onClick={handleDelete}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
        )}
        {/* Modal para mostrar todos los archivos */}
        {isFilesModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 lg:p-0">
              <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/2 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute text-xl text-gray-700 top-2 right-2 lg:top-4 lg:right-4 hover:text-gray-900 lg:text-2xl"
                    onClick={closeFilesModal}
                >
                  X
                </button>
                <h2 className="mb-4 text-xl font-bold text-center text-black lg:text-2xl">Archivos Subidos</h2>
                {selectedFiles.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedFiles.map((file, index) => (
                          <li
                              key={file.id}
                              className="flex items-center justify-between p-2 border border-gray-300 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file.file_type)}
                              <span
                                  className="text-blue-500 cursor-pointer hover:underline"
                                  onClick={() => handleViewFile(file)}
                              >
                  {`Archivo ${index + 1}`}
                </span>
                            </div>
                            {(role === "admin" || role === "Compras" || role === "Developer") && (
                                <button
                                    onClick={() => handleDeleteFile(selectedShoppingIdForFiles, file.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                  <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                  >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                            )}
                          </li>
                      ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No hay archivos subidos.</p>
                )}
                {(role === "admin" || role === "Compras" || role === "Developer") && (
                    <div className="flex justify-center mt-4">
                      <label className="p-2 text-white bg-blue-500 rounded cursor-pointer">
                        Agregar otro archivo
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleUploadInvoice(e, selectedShoppingIdForFiles)}
                        />
                      </label>
                    </div>
                )}
              </div>
            </div>
        )}

        {/* Modal para visualizar un archivo */}
        {isFileViewModalOpen && selectedFileToView && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-4xl p-5 bg-white rounded-lg shadow-lg">
                <button
                    className="absolute text-xl font-bold text-black top-1 right-1 hover:text-gray-900"
                    onClick={closeFileViewModal}
                >
                  <IoClose />
                </button>
                {selectedFileToView.file_type.includes("pdf") || selectedFileToView.file_url.toLowerCase().endsWith(".pdf") ? (
                    <iframe
                        src={selectedFileToView.file_url}
                        className="w-full h-[600px] border-0"
                        title="Archivo PDF"
                    ></iframe>
                ) : (
                    selectedFileToView.file_type.includes("image") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".jpg") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".jpeg") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".png")
                ) ? (
                    <img
                        src={selectedFileToView.file_url}
                        alt="Archivo de imagen"
                        className="w-full h-auto max-h-[600px] object-contain"
                    />
                ) : (
                    selectedFileToView.file_type.includes("wordprocessingml") ||
                    selectedFileToView.file_type.includes("msword") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".docx") ||
                    selectedFileToView.file_type.includes("spreadsheetml") ||
                    selectedFileToView.file_type.includes("excel") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".xlsx")
                ) ? (
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedFileToView.file_url)}&embedded=true`}
                        className="w-full h-[600px] border-0"
                        title="Archivo Office"
                    ></iframe>
                ) : (
                    <div className="text-center">
                      <p className="mb-4">Este tipo de archivo no se puede visualizar directamente.</p>
                      <a
                          href={selectedFileToView.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white bg-blue-500 rounded"
                      >
                        Descargar o Abrir Archivo
                      </a>
                    </div>
                )}
              </div>
            </div>
        )}
      </div>
  );
};


export default FiltersComponent;
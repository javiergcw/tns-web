"use client";
import React, { useState, useEffect, useRef } from "react";
import { getAllShoppings } from "@/app/services/shoppingService";
import { getStatuses } from "@/app/services/statusService";
import { getProfileById } from "@/app/services/profileService";
import {
  getMessagesByShoppingId,
  createMessage,
  deleteMessage,
} from "@/app/services/messagesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faEye,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import CustomComponent from "../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard";
import { ImagesPath } from "@/app/utils/assetsPath";
//importaciones para exportación de excel y pdf
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const fetchData = async () => {
  try {
    const res = await getAllShoppings();
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

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [role, setRole] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newStatusId, setNewStatusId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);

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
        const storedUserId = localStorage.getItem("userId");

        if (storedUserId) {
          const profile = await getProfileById(storedUserId);
          setRole(profile.rol ? profile.rol.name : "");
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
    const fetchAndProcessData = async () => {
      try {
        const fetchedData = await fetchData();
        const statuses = await getStatuses();
        setStatusOptions(statuses);

        setData(fetchedData);
        setFilteredData(fetchedData);
        setIsLoading(false);

        const leaders = [
          ...new Set(fetchedData.map((shopping) => shopping.user.profile.name)),
        ];
        setLeaderOptions(leaders);
      } catch (error) {
        setError(error.message);
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

  const handleFilterReset = () => {
    setItemName("");
    setStartDate("");
    setEndDate("");
    setAreaManager("");
    setStatusFilter("");
    setFilteredData(data);
    if (itemNameRef.current) itemNameRef.current.blur();
    if (startDateRef.current) startDateRef.current.blur();
    if (endDateRef.current) itemNameRef.current.blur();
    if (areaManagerRef.current) itemNameRef.current.blur();
    if (statusFilterRef.current) itemNameRef.current.blur();
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

    const shopping = filteredData.find((s) => s.id === editingId);
    const updatedShopping = {
      shopping: {
        category_id: shopping.category.id,
        status_id: parseInt(newStatusId, 10),
        title: shopping.title,
        description: shopping.description,
        request_date: shopping.request_date,
        pending_date: shopping.pending_date,
        date_approval: shopping.date_approval,
      },
      products: shopping.products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      })),
      replace_products: "false",
    };

    try {
      const response = await fetch(
        `https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/shoppings/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedShopping),
        }
      );

      if (response.ok) {
        alert("Estado actualizado correctamente.");
        setIsEditing(false);
        setEditingId(null);
        setNewStatusId("");
        const updatedData = await fetchData();
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

  const handleExportDocument = (type, data) => {
    console.log("data");
    console.log(data);

    if (type === "excel") {
      exportToExcel(data);
    } else if (type === "pdf") {
      exportToPDF(data);
    }
  };
  /*
   *METODO: exportToExcel(data)
   *DESCRIPCIÓN: este metodo exporta la informacion de "data" con el formato del the new school.
   *@param data: json que recibe con la informacion de la compra
   */
  const exportToExcel = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orden de Compra");

    let grandTotal = 0.0;

    // Añadir imagen
    const imagePath = ImagesPath.logoVertical; // La ruta de tu imagen
    const image = await fetch(imagePath).then((res) => res.arrayBuffer()); // Descargar la imagen como arrayBuffer

    const imageId = workbook.addImage({
      buffer: image,
      extension: "png", // o jpg según tu imagen
    });

    worksheet.addImage(imageId, {
      tl: { col: 5, row: 0 }, // Inserta la imagen en la celda G1
      ext: { width: 75, height: 40 }, // Tamaño de la imagen
    });

    // Datos iniciales
    const worksheetData = [
      ["", "", "", "", ""],
      [
        "Orden de compra #: ",
        data.id,
        "Fecha Generación:",
        new Date().toLocaleDateString(),
        "Titulo: ",
        data.title,
      ],
      [
        "Categoria: ",
        data.category.name,
        "Encargado:",
        data.user.profile.name,
        "Descripción:",
        data.description,
      ],
      ["ITEMS", "CANTIDAD", "UNIDAD", "VALOR UNITARIO", "IVA", "TOTAL CON IVA"],
    ];

    // Añadir productos al array
    data.products.forEach((product) => {
      const total = product.cant * product.price * (1 + product.iva / 100);
      grandTotal += total;
      worksheetData.push([
        product.name,
        product.cant,
        product.unit,
        product.price,
        product.iva,
        total.toFixed(2),
      ]);
    });

    // Añadir las filas de SUBTOTAL, IVA, etc.
    worksheetData.push(["", "", "", "", "", ""]);
    worksheetData.push(["SUBTOTAL", grandTotal.toFixed(2), "", "", "", ""]);

    // Agregar los datos a la hoja de cálculo
    worksheet.addRows(worksheetData);
    worksheet.getCell("C4").font = { bold: true };
    worksheet.getCell("C3").font = { bold: true };
    worksheet.getCell("A4").font = { bold: true };
    worksheet.getCell("A3").font = { bold: true };
    worksheet.getCell("E4").font = { bold: true };
    worksheet.getCell("E3").font = { bold: true };
    worksheet.getRow(5).font = { bold: true };
    worksheet.getRow(1).font = { bold: true };
    // Unir celdas A1:G1
    worksheet.getCell("A1").value = "ORDEN DE COMPRA";
    worksheet.mergeCells("A1:E2");
    worksheet.mergeCells("F1:F2");
    // Autoajustar el ancho de las columnas
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength < 10 ? 15 : maxLength + 5;
    });
    // Aplicar estilo de wrap text y bordes a todas las celdas

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        // Wrap text
        cell.alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
        };

        // All borders
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Generar el archivo Excel como un Blob
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Usar `file-saver` para descargar el archivo
    saveAs(blob, `Orden_Compra_${data.id}.xlsx`);
  };
  /*
   *METODO: exportToPDF(data)
   *DESCRIPCIÓN: este metodo exporta la informacion de data con el formato del the new school.
   *@param data: json que recibe con la informacion de la compra
   */
  const exportToPDF = async (data) => {
    const doc = new jsPDF();

    // Cargar la imagen como un objeto Image
    const img = new Image();
    img.src = ImagesPath.logoVertical; // Ruta a tu imagen

    // Asegurarte de que la imagen esté cargada antes de usarla
    img.onload = function () {
      // Añadir la imagen al PDF
      const imgWidth = 30; // Ancho de la imagen
      const imgHeight = 15; // Alto de la imagen
      const marginX = doc.internal.pageSize.getWidth() - imgWidth - 10; // Posición X (10 píxeles desde el borde derecho)
      const marginY = 10; // Posición Y (10 píxeles desde el borde superior)
      doc.addImage(img, "PNG", marginX, marginY, imgWidth, imgHeight);

      // Información general de la orden
      doc.setFontSize(16);
      doc.text(
        "ORDEN DE COMPRA",
        doc.internal.pageSize.getWidth() / 2,
        40,
        "center"
      );

      doc.setFontSize(10);
      doc.text(`Orden #: ${data.id}`, 10, 55);
      doc.text(
        `Fecha de generación: ${new Date().toLocaleDateString()}`,
        10,
        60
      );
      doc.text(`Quien solicita: ${data.user.profile.name}`, 10, 65);

      doc.text(
        `Tipo de orden: ${data.category.name}`,
        doc.internal.pageSize.getWidth() / 2 + 14,
        55
      );
      doc.text(
        `Título: ${data.title}`,
        doc.internal.pageSize.getWidth() / 2 + 14,
        60
      );
      doc.text(
        `Descripción: ${data.description}`,
        doc.internal.pageSize.getWidth() / 2 + 14,
        65
      );

      doc.setFontSize(14);
      doc.text(`Productos:`, doc.internal.pageSize.getWidth() / 2 - 13, 85);

      // Tabla de productos
      autoTable(doc, {
        startY: 90,
        head: [["Item", "Descripción", "Cantidad", "Precio Unitario", "Total"]],
        body: data.products.map((product) => [
          product.id,
          product.name,
          1,
          product.price,
          product.price * 1,
        ]),
        styles: { halign: "center" },
      });

      // Total (calcular el total de todos los productos)
      const total = data.products.reduce(
        (acc, product) => acc + product.price * 1,
        0
      );

      doc.setFontSize(12);
      doc.text(`Total: $${total}`, 10, doc.lastAutoTable.finalY + 10);

      doc.save("orden_de_compra #" + data.id + ".pdf");
    };
  };

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleAddMessage = async () => {
    const messageData = {
      body: newMessageBody,
      shopping_id: selectedShoppingId,
      user_id: localStorage.getItem("profileId"),
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
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
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

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="app-container">
      <h1>{role === "admin" ? "Compras ADMIN" : "Compras "}</h1>
      <div className="filters-container">
        <h2>Nombre de item</h2>
        <div className="filter-inputs">
          <input
            type="text"
            placeholder="Item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <select
            value={areaManager}
            onChange={(e) => setAreaManager(e.target.value)}
            ref={areaManagerRef}
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
          >
            <option value="">Todos los Estados</option>
            {statusOptions.map((status) => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleFilterReset}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <div className="table-container h-80">
        <table className="shopping-table h-24">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>LÍDER DE ÁREA</th>
              <th>ESTADO</th>
              <th>FECHA PETICIÓN</th>
              <th>FECHA APROBADO</th>
              <th>FECHA FINALIZACIÓN</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7">No hay compras</td>
              </tr>
            ) : (
              filteredData.map((shopping) => (
                <tr key={shopping.id}>
                  <td>
                    <ul>
                      {shopping.products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{shopping.user.profile.name}</td>
                  <td>
                    {isEditing &&
                    editingId === shopping.id &&
                    role === "admin" ? (
                      <select value={newStatusId} onChange={handleStatusChange}>
                        <option value="">Selecciona un estado</option>
                        {statusOptions.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      shopping.status.name
                    )}
                  </td>
                  <td>
                    {new Date(shopping.request_date).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(shopping.date_approval).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(shopping.pending_date).toLocaleDateString()}
                  </td>
                  <td className="">
                    {role === "admin" && (
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleEditClick(shopping.id)}
                      />
                    )}
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`text-gray-500 hover:text-gray-700 cursor-pointer ml-4 ${
                        role === "admin" ? "ml-2" : ""
                      }`}
                      onClick={() => handleViewDetailsClick(shopping.id)}
                    />
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      className={`text-green-500 hover:text-green-700 cursor-pointer ml-4 ${
                        role === "admin" ? "ml-2" : ""
                      }`}
                      onClick={() => handleExportDocument("excel", shopping)}
                    />
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      className={`text-red-500 hover:text-red-700 cursor-pointer ml-4 ${
                        role === "admin" ? "ml-2" : ""
                      }`}
                      onClick={() => handleExportDocument("pdf", shopping)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-3/4 max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">
              Detalle de la compra
            </h2>
            <CustomComponent shoppingId={selectedShoppingId} />
            <h3 className="text-lg text-black mt-6 lg:text-xl font-semibold mb-4">
              Mensajes
            </h3>
            {role === "admin" && (
              <button
                className="bg-blue-500 text-white p-2 rounded mb-4"
                onClick={handleOpenMessageModal}
              >
                Añadir Mensaje
              </button>
            )}
            <div className="mt-6 flex text-black space-x-4 overflow-x-auto py-2 px-2">
              {messages.map((message) => (
                <div key={message.id} className="relative flex-shrink-0 w-auto">
                  <MessageCard message={message} />
                  {role === "admin" && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 hover:text-red-700 cursor-pointer absolute top-2 right-2"
                      onClick={() => handleDeleteMessage(message.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={handleCloseMessageModal}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">
              Añadir Mensaje
            </h2>
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
      )}
    </div>
  );
};

export default FiltersComponent;

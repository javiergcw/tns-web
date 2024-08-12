"use client";
import React, { useState, useEffect, useRef } from "react";
import { getAllShoppings } from "@/app/services/shoppingService";
import { getStatuses } from "@/app/services/statusService"; // Importar la función para obtener los estados
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

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
  const [statusOptions, setStatusOptions] = useState([]); // Estado para almacenar las opciones de estado

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newStatusId, setNewStatusId] = useState("");

  const itemNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const areaManagerRef = useRef(null);
  const statusFilterRef = useRef(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const fetchedData = await fetchData();
        const statuses = await getStatuses(); // Obtener las opciones de estado desde el backend
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
    if (endDateRef.current) endDateRef.current.blur();
    if (areaManagerRef.current) areaManagerRef.current.blur();
    if (statusFilterRef.current) statusFilterRef.current.blur();
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

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="app-container">
      <h1>Compras ADMIN</h1>
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
      <div className="table-container">
        <div className="table-wrapper">
          <table className="shopping-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>LÍDER DE ÁREA</th>
                <th>ESTADO</th>
                <th>FECHA PETICIÓN</th>
                <th>FECHA APROBADO</th>
                <th>FECHA FINALIZACIÓN</th>
                <th>Acciones</th>
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
                      {isEditing && editingId === shopping.id ? (
                        <select
                          value={newStatusId}
                          onChange={handleStatusChange}
                        >
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
                    <td>
                      {isEditing && editingId === shopping.id ? (
                        <button
                          onClick={handleSaveClick}
                          className="text-green-500 hover:text-green-700"
                        >
                          Guardar
                        </button>
                      ) : (
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          onClick={() => handleEditClick(shopping.id)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FiltersComponent;

/* "use client";
import React, { useState, useEffect, useRef } from "react";
import { getAllShoppings } from "@/app/services/shoppingService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

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

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newStatusId, setNewStatusId] = useState("");

  const itemNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const areaManagerRef = useRef(null);
  const statusFilterRef = useRef(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        setFilteredData(fetchedData);
        setIsLoading(false);

        const leaders = [
          ...new Set(fetchedData.map((shopping) => shopping.user.profile.name)),
        ];
        const statuses = [
          ...new Set(fetchedData.map((shopping) => shopping.status.name)),
        ];
        setLeaderOptions(leaders);
        setStatusOptions(statuses);
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
    if (endDateRef.current) endDateRef.current.blur();
    if (areaManagerRef.current) areaManagerRef.current.blur();
    if (statusFilterRef.current) statusFilterRef.current.blur();
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
      alert("Por favor, ingresa un nuevo status_id.");
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

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="app-container">
      <h1>Compras ADMIN</h1>
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
              <option key={status} value={status}>
                {status}
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
      <div className="table-container">
        <div className="table-wrapper">
          <table className="shopping-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>LÍDER DE ÁREA</th>
                <th>ESTADO</th>
                <th>FECHA PETICIÓN</th>
                <th>FECHA APROBADO</th>
                <th>FECHA FINALIZACIÓN</th>
                <th>Acciones</th>
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
                      {isEditing && editingId === shopping.id ? (
                        <input
                          type="number"
                          value={newStatusId}
                          onChange={handleStatusChange}
                        />
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
                    <td>
                      {isEditing && editingId === shopping.id ? (
                        <button
                          onClick={handleSaveClick}
                          className="text-green-500 hover:text-green-700"
                        >
                          Guardar
                        </button>
                      ) : (
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          onClick={() => handleEditClick(shopping.id)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FiltersComponent;
 */
/* "use client";
import React, { useState, useEffect, useRef } from "react";
import TextInput from "../others/fields/textInput";
import { getAllShoppings } from "@/app/services/shoppingService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

  const itemNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const areaManagerRef = useRef(null);
  const statusFilterRef = useRef(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        setFilteredData(fetchedData);
        setIsLoading(false);

        const leaders = [
          ...new Set(fetchedData.map((shopping) => shopping.user.profile.name)),
        ];
        const statuses = [
          ...new Set(fetchedData.map((shopping) => shopping.status.name)),
        ];
        setLeaderOptions(leaders);
        setStatusOptions(statuses);
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
    if (endDateRef.current) endDateRef.current.blur();
    if (areaManagerRef.current) areaManagerRef.current.blur();
    if (statusFilterRef.current) statusFilterRef.current.blur();
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="app-container">
      <h1>Compras ADMIN</h1>
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
            // Reducir padding y tamaño del texto
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
            // Reducir padding y tamaño del texto
          >
            <option value="">Todos los Estados</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            onClick={handleFilterReset}
            className="bg-red-500 text-white p-2 rounded" // Reducir padding y tamaño del texto
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <table className="shopping-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>LÍDER DE ÁREA</th>
                <th>ESTADO</th>
                <th>FECHA PETICIÓN</th>
                <th>FECHA APROBADO</th>
                <th>FECHA FINALIZACIÓN</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6">No hay compras</td>
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
                    <td>{shopping.status.name}</td>
                    <td>
                      {new Date(shopping.request_date).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(shopping.date_approval).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(shopping.pending_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FiltersComponent;
 */

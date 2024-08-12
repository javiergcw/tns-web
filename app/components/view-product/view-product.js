"use client";
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
            shopping.user.profile.name.toLowerCase() === areaManager.toLowerCase()
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
      <h1>Compras</h1>
      <div className="filters-container">
        <h2>Filtros</h2>
        <div className="filter-inputs">
          <input
            type="text"
            placeholder="Nombre de item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextInput
            labelText="Fecha de petición"
            labelColor="black"
            inputSize="big"
            inputType="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            inputRef={startDateRef}
          />

          <TextInput
            labelText="Fecha de aprobado"
            labelColor="black"
            inputSize="big"
            inputType="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            inputRef={endDateRef}
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

"use client";
import TextInput from "../others/fields/textInput";
import { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import TrackingTable from "../dashboard/trackingTable/trackingTable";
import { getAllShoppings } from "@/app/services/shoppingService";

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
  const [areaManager, setAreaManager] = useState(""); // Estado para el filtro de Jefe de Área
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Crear referencias para los inputs
  const itemNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const areaManagerRef = useRef(null); // Referencia para el nuevo filtro

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setFilteredData(fetchedData); // Inicialmente mostrar todos los datos
      setIsLoading(false); // Terminar la carga
    };

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    // Filtrar los datos cuando los filtros cambian
    const filterData = () => {
      let filtered = data;

      if (itemName) {
        filtered = filtered.filter((shopping) =>
          shopping.products
            .map((product) => product.name.toLowerCase())
            .join(", ")
            .includes(itemName.toLowerCase())
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
            shopping.user.profile.name
              .toLowerCase()
              .includes(areaManager.toLowerCase())
        );
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [itemName, startDate, endDate, areaManager, data]);

  const handleFilterReset = () => {
    setItemName("");
    setStartDate("");
    setEndDate("");
    setAreaManager(""); // Resetear el filtro de Jefe de Área
    setFilteredData(data); // Mostrar todos los datos después de limpiar los filtros
    if (itemNameRef.current) itemNameRef.current.blur();
    if (startDateRef.current) startDateRef.current.blur();
    if (endDateRef.current) endDateRef.current.blur();
    if (areaManagerRef.current) areaManagerRef.current.blur(); // Desenfocar el input del nuevo filtro
  };

  return (
    <div>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="mb-4 text-lg font-semibold text-blue-800">Filstros</h2>
        <div className="grid grid-cols-6 gap-4 mb-4">
          <TextInput
            labelText="Jefe de Área"
            labelColor="black"
            inputSize="big"
            inputType="text"
            value={areaManager}
            onChange={(e) => setAreaManager(e.target.value)}
            inputRef={areaManagerRef}
          />
          <TextInput
            labelText="Nombre de item"
            labelColor="black"
            inputSize="big"
            inputType="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            inputRef={itemNameRef}
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

          <button
            onClick={handleFilterReset}
            className="flex items-center justify-center w-full h-full px-2 py-1 bg-red-500 text-white rounded-md"
          >
            <FaTrash className="mr-1" />
            Limpiar
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <TrackingTable data={filteredData} />
      )}
    </div>
  );
};

export default FiltersComponent;

"use client";
import TextInput from "../others/fields/textInput";
import { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import ProductTable from "../dashboard/productTable/productTable";
import { getAllProducts } from "@/app/services/productService";

const fetchData = async () => {
  try {
    const res = await getAllProducts();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const FiltersComponent = () => {
  const [itemName, setItemName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Crear referencias para los inputs
  const itemNameRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

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
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(itemName.toLowerCase())
        );
      }

      if (minPrice) {
        filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
      }

      if (maxPrice) {
        filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
      }

      if (startDate) {
        filtered = filtered.filter(
          (product) => new Date(product.createdAt) >= new Date(startDate)
        );
      }

      if (endDate) {
        filtered = filtered.filter(
          (product) => new Date(product.createdAt) <= new Date(endDate)
        );
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [itemName, minPrice, maxPrice, startDate, endDate, data]);

  const handleFilterReset = () => {
    setItemName("");
    setMinPrice("");
    setMaxPrice("");
    setStartDate("");
    setEndDate("");
    setFilteredData(data); // Mostrar todos los datos después de limpiar los filtros
    if (itemNameRef.current) itemNameRef.current.blur();
    if (minPriceRef.current) minPriceRef.current.blur();
    if (maxPriceRef.current) maxPriceRef.current.blur();
    if (startDateRef.current) startDateRef.current.blur();
    if (endDateRef.current) endDateRef.current.blur();
  };

  return (
    <div>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="mb-4 text-lg font-semibold text-blue-800">Filtros</h2>
        <div className="grid grid-cols-6 gap-4 mb-4">
          <TextInput
            labelText="Nombre de item"
            labelColor="black"
            inputSize="small"
            inputType="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            inputRef={itemNameRef}
          />

          <TextInput
            labelText="Precio mínimo"
            labelColor="black"
            inputSize="small"
            inputType="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            inputRef={minPriceRef}
          />

          <TextInput
            labelText="Precio máximo"
            labelColor="black"
            inputSize="small"
            inputType="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            inputRef={maxPriceRef}
          />

          <TextInput
            labelText="Fecha de inicio"
            labelColor="black"
            inputSize="small"
            inputType="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            inputRef={startDateRef}
          />

          <TextInput
            labelText="Fecha de fin"
            labelColor="black"
            inputSize="small"
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
        <ProductTable data={filteredData} />
      )}
    </div>
  );
};

export default FiltersComponent;

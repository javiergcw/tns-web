// components/view-product/view-product.js
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

const getApprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1;
  const ApprovedExpenses = data.filter(
    (item) =>
      item.status &&
      item.status.id === 2 &&
      new Date(item.updated_at).getMonth() + 1 === currentMonth
  );

  const total = ApprovedExpenses.reduce((accumulator, item) => {
    const productTotal = item.products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    return accumulator + productTotal;
  }, 0);
  const flattenedExpenses = ApprovedExpenses.flatMap((item) =>
    item.products.map((product) => ({
      price: product.price,
      name: product.description,
    }))
  );
  return { ApprovedExpenses: flattenedExpenses, total };
};

const getUnapprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1;
  const pendingExpenses = data.filter(
    (item) =>
      item.status &&
      item.status.id === 1 &&
      new Date(item.updated_at).getMonth() + 1 === currentMonth
  );
  return pendingExpenses;
};

const FiltersComponent = () => {
  const [itemName, setItemName] = useState("");
  const [areaLeader, setAreaLeader] = useState("");
  const [status, setStatus] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [data, setData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [unapprovedExpenses, setUnapprovedExpenses] = useState([]);

  // Crear referencias para los inputs
  const itemNameRef = useRef(null);
  const areaLeaderRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      const { ApprovedExpenses, total } = getApprovedExpenses(fetchedData);
      setExpensesData(ApprovedExpenses);
      setTotalExpenses(total);

      const unapproved = getUnapprovedExpenses(fetchedData);
      setUnapprovedExpenses(unapproved);
    };

    fetchAndProcessData();

    return () => {
      // Limpiar el estado de los inputs al desmontar el componente
      setItemName("");
      setAreaLeader("");
      setStatus("");
      // Desenfocar los inputs
      if (itemNameRef.current) itemNameRef.current.blur();
      if (areaLeaderRef.current) areaLeaderRef.current.blur();
      if (statusRef.current) statusRef.current.blur();
    };
  }, []);

  const handleFilterReset = () => {
    setItemName("");
    setAreaLeader("");
    setStatus("");
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-blue-800">Filtros</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <TextInput
          labelText="Nombre de item"
          labelColor="black"
          inputSize="large"
          inputType="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          inputRef={itemNameRef} // Pasar la referencia al input
        />
        <TextInput
          labelText="Líder de área"
          labelColor="black"
          inputSize="large"
          inputType="text"
          value={areaLeader}
          onChange={(e) => setAreaLeader(e.target.value)}
          inputRef={areaLeaderRef} // Pasar la referencia al input
        />
        <TextInput
          labelText="Estado"
          labelColor="black"
          inputSize="large"
          inputType="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          inputRef={statusRef} // Pasar la referencia al input
        />
        <button
          onClick={handleFilterReset}
          className="flex items-center justify-center w-full px-4 py-2 bg-red-500 text-white rounded-md"
        >
          <FaTrash className="mr-2" />
          Limpiar
        </button>
      </div>
      <TrackingTable data={data} />
    </div>
  );
};

export default FiltersComponent;

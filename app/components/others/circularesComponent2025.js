import { useState, useEffect } from "react";

// Suponemos que 'data' contiene toda la información de tus circulares.
const data = [
  {
    name: "Circular N°1 Circular de Bienvenida",
    link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EbqH6tFt5uFFrK1tFYl9pfIBMNAvzPcajcloGAjN6cIFng?e=HKuRlA",
  }
];

// Función para extraer el número de la circular del nombre
const getNumberFromName = (name) => {
  const match = name.match(/\d+/); // encuentra la primera secuencia de dígitos
  return match ? parseInt(match[0], 10) : null;
};

const CircularList = () => {
  const [circularData, setCircularData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    setCircularData(data);
    setFilteredData(data);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortDirection(event.target.value);
  };

  const filterAndSortData = () => {
    let updatedData = circularData.filter((circular) =>
      circular.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    updatedData.sort((a, b) => {
      const numA = getNumberFromName(a.name);
      const numB = getNumberFromName(b.name);
      return numB - numA; // Mayor a menor
    });

    setFilteredData(updatedData);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortDirection("desc");
    setFilteredData(circularData);
  };

  useEffect(() => {
    filterAndSortData();
  }, [searchTerm, sortDirection, circularData]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-10">
      <div className="flex items-center justify-center h-10 mb-5">
        <input
          type="text"
          placeholder="Buscar circular..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border-2 border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={clearFilters}
          className="h-10 p-2 text-white transition duration-200 bg-blue-500 rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Limpiar filtros
        </button>
      </div>
      <div className="flex flex-col items-center justify-center w-full transition-opacity duration-500 ease-in-out">
        {filteredData.map((circular, index) => (
          <a
            key={index}
            href={circular.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-11/12 md:w-3/4 xl:w-3/5 p-6 m-3 text-center text-white cursor-pointer rounded-lg transform hover:scale-105 transition duration-200 ease-in-out`}
            style={{
              backgroundColor: index % 2 === 0 ? "#679CCA" : "#6EB3F0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              borderColor: index % 2 === 0 ? "#679CCA" : "#6EB3F0",
            }}
          >
            {circular.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CircularList;

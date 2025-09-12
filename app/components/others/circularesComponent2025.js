import { useState, useEffect } from "react";

// Suponemos que 'data' contiene toda la información de tus circulares.
const data = [
  {
    name: "Circular N°1 Circular de Bienvenida",
    link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EbqH6tFt5uFFrK1tFYl9pfIBMNAvzPcajcloGAjN6cIFng?e=HKuRlA",
  },
  {name: "Circular N°2 Circulación de vehículos dentro del colegio", link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/Edkc_Kjk2mVOglsPOgfKn4YBzvoopiH8sPn-FxFQ_z3wdQ?e=NaPOrE",
},
{
  name: "Circular N°3 Back to School Fair",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EamyayQGNlxHlZ5GnMJo4JEBz9QLKCNsTG6foHXbLtb2vQ?e=40aOh0",
},
{
  name: "Circular N°4 Confirmación de lectura y participación de padres de familia",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EZgzBHscECBKq3uc1Hc6PB0BHk2Tpbnsf8XmbpgNjjjfXg?e=pJg0Pw",
},
{
  name: "Circular N°5 Intercultural Fest 2025",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/Edt-w4EWoENGudXqgABEuncBip3Lpvb8uBNMBbykpLlDnQ?e=bQAbfj",
},
{
  name: "Circular N°6 Prevención frente al riesgo de virus",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ES6xqknr5LxBm1gpDY_nmLQBcMCg3-psXla5egxmc1yUTw?e=LZoeZS",
},

{
  name: "Circular N°7 Salida pedagógica grados 2",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EYGONcM-ta9OpwdvotKN1jEBH5ZuQAEBPtwpYZbdxDn26w?e=iQNbAz",
},

{
  name: "Circular N°8 Salida pedagógica grados 9",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ET8T__aGUwBCqHFKpcfznL0Bz__QXMn5z6X2maJCMaVyNw?e=p0MYZ4",
},

{
  name: "Circular N°9 Salida pedagógica grados 5",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EdwJqSDfySNLpnbCmL7CAV0B9qsOJT05ttMf4WuJSIeOug?e=YQW7sr",
},

{
  name: "Circular N°10 Salida pedagógica grados 3",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ETwA3G6b4_VBsR5u8AUEgmwBLeVwCbm__kAQguANQ60UCg?e=cfkJNU",
},

{
  name: "Circular N°11 Salida pedagógica grados 1",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EY3zn9P5Y0hNpwnv5-ax4qYBvjuKditBiZ6lt6x7tB_JJw?e=dPoVIh",
},

{
  name: "Circular N°12 Salida pedagógica grados 4",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EVfcCZwjKGBGi6a3NFcFqN8BELtmOSDViI0AD7Kdkeuwog?e=OHyggF",
},

{
  name: "Circular N°13 Salida pedagógica grados 6",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/Ea8rJ95rkpNFpeomzabK9-sBu18ySkAyduAahIK1S4bPEA?e=25Qlvx",
},

{
  name: "Circular N°14 Salida pedagógica grados 7",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EQB9E7TNhjNNq67YF45p4akBQl0irLyGNbLr_IhBAGp0pg?e=v8cdwt",
},

{
  name: "Circular N°15 Salida pedagógica grados 8",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EclMWK8PyxVFkHb9-v14XBQBLSOXgtIy1sRFuLzM78n81A?e=GswbUB",
},

{
  name: "Circular N°16 Salida pedagógica grados 10",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EUSc0muhGbdOjqBRBYCAg7ABXMRkWvHr5NMCtWKcBLGE2w?e=7EVtgQ",
},

{
  name: "Circular N°17 Salida pedagógica grados 11",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EbaoFfU1OlROjWhXHfc9h50BpRRrGMOoL7GMgV5PMJ5EIw?e=ZCO5BI",
},

{
  name: "Circular N°18 Salida pedagógica grados 3",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ETFWKFGjriFAl8FXwJK23uEBIcI4yoUxJabUkFmuA-G95Q?e=1UiNh9",
},
{
  name: "Circular N°20 Celebración Aniversario No. 30",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EW-TeQZBVpVBjnArdbMq008B3Wbld9eFgjcUmfDvjoMl9w?e=9nbBJO",
},
{
   name: "CircularN°21 Salida EAFITMUN",
  link: "https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EenQyGKTEO9IiIQ5CKm5uTQBHHTkQuA0Df86-NDjzxVP-g?e=IauAIb",
},
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

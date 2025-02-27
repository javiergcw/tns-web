import { useState, useEffect } from "react";

// Suponemos que 'data' contiene toda la información de tus circulares.
const data = [
  {
    name: "Circular N1 Bienvenida año escolar 2024",
    link: "https://drive.google.com/file/d/18sk8QoFBW9qHXN9P60MkSJYeQk8ozmft/view?usp=sharing",
  },
  {
    name: "Circular N2 Feria de inicio de año escolar 2024",
    link: "https://drive.google.com/file/d/1D3-S432pOVpHV0fa77HA6Bq-vWb56VPb/view?usp=sharing",
  },
  {
    name: "Circular N3 Información importante para la comunidad educativa",
    link: "https://drive.google.com/file/d/1Rh2ba0OPPfxW0QAeSmpJWCC0CQgKCqeU/view?usp=sharing",
  },
  {
    name: "Circular N4 Novedades e información importante para los padres de familia ",
    link: "https://drive.google.com/file/d/1ENtqBZlTYYB5p8cw-a8a3zFAuN3oWoig/view?usp=sharing",
  },
  {
    name: "Circular N5 Escuela de padres ",
    link: "https://drive.google.com/file/d/1qCPFX3SX4KKJ-3coqKqhp5DlfirN0Iop/view?usp=sharing",
  },
  {
    name: "Circular N6 Salida Pedagógica fiesta del libro ",
    link: "https://drive.google.com/file/d/1RLSwgR4LAVh4LEVED4-gS4fxMXDlG7py/view?usp=sharing",
  },
  {
    name: "Circular N7 Expediciones Pedagógicas ",
    link: "https://drive.google.com/file/d/1i1ktEgrb6nANIIuuiy2hNPTTy8aKzXT_/view?usp=sharing",
  },
  {
    name: "Circular N8 Salidas de integración escolar ",
    link: "https://drive.google.com/file/d/1Rsxi7a1IbWIWHwJlz1yycxenWKLjoowj/view?usp=sharing",
  },
  {
    name: "Circular N9 Distribución de los estudiantes del grado kinder ",
    link: "https://drive.google.com/file/d/1A1W1ndx3eC9LcaodComGbcUqMo0i2QoM/view",
  },
  {
    name: "Circular N10 Expedición pedagógica Eje Cafetero bilingüe grado tercero",
    link: "https://drive.google.com/file/d/1yuSzs-Izmo93uAa-e97tDUo7avi-ntK2/view",
  },
  {
    name: "Circular N11 Expedición pedagógica aventura grado sexto",
    link: "https://drive.google.com/file/d/1Qu061EwO8idtczYKIYJgb4gXtaO18k_W/view",
  },
  {
    name: "Circular N12 Expedición pedagógica historia de Colombia grado quinto",
    link: "https://drive.google.com/file/d/1QvqxeGL7cnaalg74x2Kmodnm1Z_nyg__/view",
  },
  {
    name: "Circular N13 Novedades e información importante del mes de Octubre",
    link: "https://drive.google.com/file/d/1LYWjlf3CUE_Pevvl-rdu_9rNZewklSpH/view",
  },
  {
    name: "Circular N20 Extensión Académica 2024",
    link: "https://drive.google.com/file/d/1uFHKdFQzZMCf-FHYQ7YFxur6RjEVagi-/view",
  },
  {
    name: "Circular N14 Expedición Pedagógica Oriente Antioqueño grado segundo",
    link: "https://drive.google.com/file/d/11MjrLuU63ucbSaoPNOGf5VyC03RO13yw/view",
  },
  {
    name: "Circular N15 Expedición Pedagógica Jardín grado cuarto ",
    link: "https://drive.google.com/file/d/1d1B2L29tubDa6ggggtyTQDn4SfXoku-X/view",
  },
  {
    name: "Circular N16 Expedición Pedagógica reservas naturales grado octavo",
    link: "https://drive.google.com/file/d/1S2UardoQwaRHyEhxfsIu8ZeyrWTWSDC4/view",
  },
  {
    name: "Circular N17 Escuela de padres ",
    link: "https://drive.google.com/file/d/1QWs0ZciEslP5W8caDc46GNyGxIF31Pea/view",
  },
  {
    name: "Circular N18  Novedades e información importante para finales de Noviembre e inicios de Diciembre ",
    link: "https://drive.google.com/file/d/1qr3p5Iy2fI7ZRbUZ0A0spRahU2f2oQQN/view",
  },
  {
    name: "Circular N19  Salida pedagógica what's up teens grado 6,7,8 ",
    link: "https://drive.google.com/file/d/1b-PXf7dOj50CG3oJl0lcMgVPS4UhpDL6/view",
  },
  {
    name: "Circular N21 Expedición pedagógica Comunidades indigenas grado séptimo ",
    link: "https://drive.google.com/file/d/1b6mDmg_6hvNphrIamO40JiKV3FAKAeD3/view",
  },
  {
    name: "Circular N22 Salidas pedagógicas ",
    link: "https://drive.google.com/file/d/1lSStO8oY1fFvvloJNbx5GITXeE3aaPPB/view",
  },
  {
    name: "Circular N23 Evento de luz y navidad 2024 ",
    link: "https://drive.google.com/file/d/19Cpx3MMsekMnEftKT3_N7CgCGf1zjdAX/view",
  },
  {
    name: "Circular N°24 PRUEBA SABER 11 ",
    link: "https://drive.google.com/file/d/1p94GW-9E1bQGn7kfFmdIwkO9w-mjaedy/view?usp=drive_link",
  },
  {
    name: "Circular N°25 - Entrega de informes finales 1 período ",
    link: "https://drive.google.com/file/d/1wlAe0FmJR2BrECG8g9bFByvx7w3rTfdB/view?usp=drive_link",
  },
  {
    name: "Circular N°26 ANUARIO PROMOCIÓN 24 ",
    link: "https://drive.google.com/file/d/1MmCAHk72RZLHo4ccVQUV0KuPuEE7L7ai/view?usp=sharing",
  },
  {
    name: "Circular N°27 Examen English FCE ",
        link: "https://drive.google.com/file/d/1MAQ7elsVwkVJts0i5-X62zm8hlDrGtGN/view?usp=sharing",
  },
  {
    name: "Circular N°28 PRUEBA PILOTO SIN DISPOSITIVOS ELECTRÓNICOS ",
    link: "https://drive.google.com/file/d/1kumpvXUipge4AsLbBqPjp6d5MP3g2rFo/view?usp=sharing",
  },

  // { name: 'Circular N1 Bienvenida año escolar 2023', link: 'https://drive.google.com/file/d/146xvVl6G6YAqT8CWKsQWz4BvrCQh-Hab/view?usp=sharing' },
  // { name: 'Circular N2 Escuela de padres Cuarto y Quinto', link: 'https://drive.google.com/file/d/1RwEdJzreDcsFt_ZKNNYl_z_eSlUriNN3/view?usp=sharing' },
  // { name: 'Circular N3 Servicio social', link: 'https://drive.google.com/file/d/1S0xqXbWqfyk5ySVANx3CBtgmTqlsyYmH/view?usp=sharing' },
  // { name: 'Circular N4 Encuentro deportivo', link: 'https://drive.google.com/file/d/1OtDBe61fKlNCoHlYYH1BlV3X6qC-GPXg/view?usp=sharing' },
  // { name: 'Circular N5 Taller de padres inspiradores Tercero', link: 'https://drive.google.com/file/d/1ccrl3G16ogegJpnPDOXOVJP3pyLEhTQk/view?usp=sharing' },
  // { name: 'Circular N6 Escuela de padres', link: 'https://drive.google.com/file/d/1XsVswMgOEYoBIRiloalCpd8_f-_FgTdO/view?usp=sharing' },
  // { name: 'Circular N7 Taller de padres inspiradores Once', link: 'https://drive.google.com/file/d/1Dw8XgGAaPhbC9HpAFy6CxMpOmOdyZ8NU/view?usp=sharing' },
  // { name: 'Circular N8 Taller de padres inspiradores Décimo', link: 'https://drive.google.com/file/d/16dyTL89Vk9cayRRWqSIu5jh4sQaYHUb9/view?usp=sharing' },
  // { name: 'Circular N9 Salida Fiesta del Libro y la cultura', link: 'https://drive.google.com/file/d/1N4riHZJ8fCpc61f6QPZkQdfi0RJY1mTF/view?usp=sharing' },
  // { name: 'Circular N9 Salida pedagógica Fiesta del Libro', link: 'https://drive.google.com/file/d/1KmgtMTWPr3fleZT9ziJOxMTxQ4gABir1/view?usp=sharing' },
  // { name: 'Circular N10 Salidas pedagógicas', link: 'https://drive.google.com/file/d/1Ay_EXp_LOn0paKh8kMVeeUt0GXijc7AK/view?usp=sharing' },
  // { name: 'Circular N11 Día virtual', link: 'https://drive.google.com/file/d/1Ay_EXp_LOn0paKh8kMVeeUt0GXijc7AK/view?usp=sharing' },
  // { name: 'Circular N13 Habitos de alimentación saludable', link: 'https://drive.google.com/file/d/13Vk65Vy-gWUqHHXZQz28CWVxBO3KLBSg/view?usp=sharing' },
  // { name: 'Circular N14 Cancelación Expedición Pedagógica', link: 'https://drive.google.com/file/d/15egLLTn10f9WorvAFHKxaw7dA3MErq0W/view?usp=sharing' },
  // { name: 'Circular N15 Escuela de padres primero y segundo', link: 'https://drive.google.com/file/d/160TKLNaDJvOKBkTjWkNHiNTAD_zW_5Sa/view?usp=sharing' },
  // { name: 'Circular N16 Encuentro deportivo Vermont', link: 'https://drive.google.com/file/d/1bz0zfK4ETyaWyEaEpnhkVhhAMAZo35sN/view?usp=sharing' },
  // { name: 'Circular N17 Cambios en movilidad a la hora de salida del colegio', link: 'https://drive.google.com/file/d/1r70omISrcPrSLydPwlbvK7KkPX3MrcIB/view?usp=sharing' },
  // { name: 'Circular N17 Cambios de tránsito en el colegio para la hora de salida', link: 'https://drive.google.com/file/d/14YMem2zqJ7sq1B2LxrDyi1EQibQhJziM/view?usp=sharing' },
  // { name: 'Circular N18 Taller de padres inspiradores Octavo y Noveno', link: 'https://drive.google.com/file/d/1u9P0FZ-7MAfOCgJNyIEIBasp0H3vjh24/view?usp=sharing' },
  // { name: 'Circular N19 Entrega de informes parciales primer periodo', link: 'https://drive.google.com/file/d/1pHYTc-G1OLrVxHjpWz-Ty69rwhtyH3u0/view?usp=sharing' },
  // { name: 'Circular N20 Expediciones pedagógicas', link: 'https://drive.google.com/file/d/1JEkGz5Cke71_VCPskJ63IAd_TMQgeR08/view?usp=sharing' },
  // { name: 'Circular N21 Taller de padres inspiradores Sexto y Séptimo', link: 'https://drive.google.com/file/d/1xhQguuAYh634Ic4n487dvXhKe5k7-90b/view?usp=sharing' },
  // { name: 'Circular N22 Noche de Luz y Navidad', link: 'https://drive.google.com/file/d/14UM3Pkeal-hWQ2N57ttbevZ2FgmiWh8R/view?usp=sharing' },
  // { name: 'Circular N23 Salidas Pedagógicas', link: 'https://drive.google.com/file/d/1cTR3I-94SQADSLoYOFwGGuaAbPZyKR7P/view?usp=sharing' },
  // { name: 'Circular N24 Taller de Padres inspiradores Transición', link: 'https://drive.google.com/file/d/1oqPAPml7xPIfvDppA3fL8FlvcoIGhvgD/view?usp=sharing' },
  // { name: 'Circular N25 Pruebas Icfes', link: 'https://drive.google.com/file/d/1irL1hUHu4teOus472DWZr7BGHJ4EPCgF/view?usp=sharing' },
  // { name: 'Circular N26 Salida párvulos y transición B', link: 'https://drive.google.com/file/d/1vSo2klb0MiH9py-s_ZP879Sp-2dpYM7s/view?usp=sharing' },
  // { name: 'Circular N27 Taller de padres inspiradores Kinder, Prekinder y Párvulos', link: 'https://drive.google.com/file/d/1kg_jz3XVsxkXDkp4-8IQcSLteNRUfey4/view?usp=sharing' },
  // { name: 'Circular N28 Asignación de grupo séptimo', link: 'https://drive.google.com/file/d/1sxBCStvjyObhV0pCJYeXPV6vh4zcXekN/view?usp=sharing' },
  // { name: 'Circular N29 Cambio de aplicación Prueba Icfes', link: 'https://drive.google.com/file/d/10vmVjX1elaJhHjcCkn-1VG7bvgomONFK/view?usp=sharing' },
  // { name: 'Circular N30 Apertura inscripción de extracurriculares', link: 'https://drive.google.com/file/d/1SeBwo9ecDRGZuuh4VxNPgk_8YWLyHQ4S/view?usp=sharing' },
  // { name: 'Circular N31 Escuela de padres', link: 'https://drive.google.com/file/d/1jieRvhPNmNBe6nUn9AgKssoaIoAsZvYi/view?usp=sharing' },
  // { name: 'Circular N32 Entrega de informes finales primer periodo', link: 'https://drive.google.com/file/d/1req_gysVCZA_QWcDFgdwhbwiN11HjeI_/view?usp=sharing' },
  // { name: 'Circular N34 Expedición pedagógica segundo', link: 'https://drive.google.com/file/d/1eMTIzWk9BKA8js2MnQbq2LcAFzgrWtm8/view?usp=sharing' },
  // { name: 'Circular N35 Expedición pedagógica tercero', link: 'https://drive.google.com/file/d/1RsMaG69452Kt-KDjcxRdYMiMq0htZH20/view?usp=sharing' },
  // { name: 'Circular N36 Expedición pedagógica cuarto', link: 'https://drive.google.com/file/d/1wdDLdLTm08yheYI7dv0tKrklyI6pCACv/view?usp=sharing' },
  // { name: 'Circular N37 Expedición pedagógica quinto', link: 'https://drive.google.com/file/d/1ovVP05hUFohyymAmFkUrhHgOHBJVG2ke/view?usp=sharing' },
  // { name: 'Circular N38 Encuentro deportivo', link: 'https://drive.google.com/file/d/1FjQXU-UmAAa-Gfw_-OU7xSy8rfBkn0ln/view?usp=sharing' },
  // { name: 'Circular N39 Expedición pedagógica séptimo', link: 'https://drive.google.com/file/d/1uyWWtAcgsmrUNt1XhWJKsMzjpMp12yYI/view?usp=sharing' },
  // { name: 'Circular N40 Expedición pedagógica octavo', link: 'https://drive.google.com/file/d/1R30jpYw3Qcjv3JKLlM2rLY5PXNnUWV_A/view?usp=sharing' },
  // { name: 'Circular N41 Escuela de padres preescolar', link: 'https://drive.google.com/file/d/1T5O6CP4s5Bw7b6bG2Nply-CumpMBxg38/view?usp=sharing' },
  // { name: 'Circular N42 Escuela de padres primaria', link: 'https://drive.google.com/file/d/11V3dbG3jcI0VjHesnQEpXmVONhyXLshi/view?usp=sharing' },
  // { name: 'Circular N43 Expedición pedagógica sexto', link: 'https://drive.google.com/file/d/1dUGn0aQcoJ-3lkYyInY3_2DGv8ke5ZOP/view?usp=sharing' },
  // { name: 'Circular N44 Expedición pedagógica novena y décimo', link: 'https://drive.google.com/file/d/1dlD6rEs4l3lDU8iRxIfq5H6DIdrjlq-V/view?usp=sharing' },
  // { name: 'Circular N45 Servicio de ruta escolar', link: 'https://drive.google.com/file/d/14VtQJew5VHtiRap9430YvxH_p4_mVXts/view?usp=sharing' },
  // { name: 'Circular N46 Salidas pedagógicas preescolar y primaria', link: 'https://drive.google.com/file/d/11zybF9YUD1WQoJI1JtjDGOKAFazG9bnc/view?usp=sharing' },
  // { name: 'Circular N47 Salidas pedagógicas bachillerato', link: 'https://drive.google.com/file/d/1WIRh6rd_3fqWrHuTv7uIxFPN_uea831q/view?usp=sharing' },
  // { name: 'Circular N48 Examen english FCE', link: 'https://drive.google.com/file/d/1_tn6pdXRNc5bpbbWWijtHMniAz8O4fPg/view?usp=sharing' },
  // { name: 'Circular N49 Reuniones informativas expediciones pedagógicas', link: 'https://drive.google.com/file/d/1CS7qLaW7kjlz3PWV2ghhFXUYWd2klUut/view?usp=sharing' },
  // { name: 'Circular N50 Día virtual', link: 'https://drive.google.com/file/d/1uBn6E4pS02_ID1tRRz8jAK4Amu2-j2z0/view?usp=sharing' },
  // { name: 'Circular N51 Expediciones pedagógicas - Quinto', link: 'https://drive.google.com/file/d/166Y87-ZHAJChMYjoPCVFx6aKpcosq9HL/view?usp=sharing' },
  // { name: 'Circular N52 Ceremonia de graduación once', link: 'https://drive.google.com/file/d/1S66VXmoT_t2dXvmK60062EQtwyEdLNCc/view?usp=sharing ' },
  // { name: 'Circular N53 Salida pedagógica Décimo', link: 'https://drive.google.com/file/d/1r8dBp18FiwPhaUq94J8LqLWTV-vaR2I1/view?usp=sharing' },
  // { name: 'Circular N54 Multilingual Music Festival 2024', link: ' https://drive.google.com/file/d/1tthAxjp3G9dDjn168jG05OwphoEfX0WP/view?usp=sharing' },
  // { name: 'Circular N55 Informes Parciales Segundo Periodo Academico', link: 'https://drive.google.com/file/d/1uOlxJQpAvLRl3pAYicBw2qBgEASyU4nO/view?usp=sharin' },
  // { name: 'Circular N56 Novedades Multilingual Music Festival', link: 'https://drive.google.com/file/d/1OZMyj2ExbZksoRARhDfKgiOn5-NSTxGM/view?usp=sharing' },
  // { name: 'Circular N57 Dia Compensatorio Dia del Trabajo', link: 'https://drive.google.com/file/d/17lRL8g-II44Qvyz5F3UfsfbB13JAiYrc/view?usp=sharing' },
  // { name: 'Circular N58 Costos 2024-2025', link: 'https://drive.google.com/file/d/1iew-q63tflNl8tZIMr4BXtISMA2pdPx5/view?usp=sharing' },
  // { name: 'Circular N59 Escuela de Padres Preescolar y Primaria', link: 'https://drive.google.com/file/d/19Ipsk1EyH_S55PpQUtLA51wZjMUovppa/view?usp=sharing' },
  // { name: 'Circular N60 Escuela de Padres Bachillerato', link: 'https://drive.google.com/file/d/1qULIXEyEVz8Du96i2VcmjzSDljxhtj84/view?usp=sharing' },
  // { name: 'Circular N61 Salida Pedagogica Parvulos y Kinder A-B', link: 'https://drive.google.com/file/d/1cc0LRP9xGAkjXVL3CuNSSJd16fF0MGuZ/view?usp=sharing' },
  // { name: 'Circular N62 Salida Pedagogica Transicion B', link: 'https://drive.google.com/file/d/1ILRe4zgMPS1PREsW0uY04N3limZqHL9b/view?usp=sharing' },
  // { name: 'Circular N63 Salida Pedagogica Transicion A', link: 'https://drive.google.com/file/d/1Vsnb0QvaztFOcsLbloPq_JhwZy6Hy6VC/view?usp=sharing ' },
  // { name: 'Circular N65 Salida Pedagogica Primero A-B', link: 'https://drive.google.com/file/d/1iEPIrBXswmGQGYFXAyX339qYxv032wRn/view?usp=sharing ' },
  // { name: 'Circular N66 Graduacion Grados Transicion y Primaria', link: 'https://drive.google.com/file/d/1zEPPxyO8Cm7gjwYfuR2PIMHg26A2B3M1/view?usp=sharing ' },
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
    <div className="flex flex-col items-center justify-center p-10 w-full">
      <div className="flex justify-center items-center mb-5 h-10">
        <input
          type="text"
          placeholder="Buscar circular..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 rounded-l-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={clearFilters}
          className="h-10 bg-blue-500 text-white p-2 rounded-r-full hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Limpiar filtros
        </button>
      </div>
      <div className="flex flex-col items-center justify-center  w-full transition-opacity duration-500 ease-in-out">
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

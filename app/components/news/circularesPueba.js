import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import { ImagesPath } from '@/app/utils/imagesPath';
import Pagination from '../others/button/pagination';

const articles = [
  {
    image: ImagesPath.article1,
    date: '2023-07-27',
    title: 'Circular N1 Bienvenida año escolar 2023',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/146xvVl6G6YAqT8CWKsQWz4BvrCQh-Hab/view?usp=sharing',
  },
  {
    image: ImagesPath.article2,
    date: '2023-08-23',
    title: 'Circular N3 Servicio Social',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1S0xqXbWqfyk5ySVANx3CBtgmTqlsyYmH/view',
  },
  {
    image: ImagesPath.article3,
    date: '2023-08-28',
    title: 'Circular N4 Encuentro deportivo Jorge Robledo',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1OtDBe61fKlNCoHlYYH1BlV3X6qC-GPXg/view',
  },
  {
    image: ImagesPath.article4,
    date: '2023-08-30',
    title: 'Circular N5 Taller de padres Inspiradores',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1ccrl3G16ogegJpnPDOXOVJP3pyLEhTQk/view?usp=sharing',
  },
  {
    image: ImagesPath.article5,
    date: '2023-08-30',
    title: 'Circular N6 Invitacion Familias:Parents lets have a coffe',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1XsVswMgOEYoBIRiloalCpd8_f-_FgTdO/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-08-30',
    title: 'Circular N7 Taller de padres inspiradores Once',
    category: 'Bloqueados',
    url: 'https://drive.google.com/file/d/1Dw8XgGAaPhbC9HpAFy6CxMpOmOdyZ8NU/view?usp=sharing',
  },
  {
    image: ImagesPath.article5,
    date: '2023-08-30',
    title: 'Circular N8 Taller de padres inspiradores Décimo',
    category: 'Bloqueados',
    url: '/article/5',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-08',
    title: 'Circular N9 Salida pedagogica fiesta del libro',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1N4riHZJ8fCpc61f6QPZkQdfi0RJY1mTF/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-13',
    title: 'Circular N10 Salidas de integracion escolar',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1Ay_EXp_LOn0paKh8kMVeeUt0GXijc7AK/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-20',
    title: 'Circula N13 Habitos de alimentación Saludable',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/13Vk65Vy-gWUqHHXZQz28CWVxBO3KLBSg/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-22',
    title: 'Circular N14 Expedición pedagogica jardin',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/15egLLTn10f9WorvAFHKxaw7dA3MErq0W/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-26',
    title: 'Circular N15 Invitación familias grados primero y segundo',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/160TKLNaDJvOKBkTjWkNHiNTAD_zW_5Sa/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-26',
    title: 'Circular N16 Encuentro deportivo Vermont',
    category: 'Todos',
    url: '/article/5',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-20',
    title: 'Circular N17 Cambios en la movilidad a la salida de los estudiantes',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1r70omISrcPrSLydPwlbvK7KkPX3MrcIB/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-09-20',
    title: 'Circular N17 Cambios en el transito de la salida del colegio',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/14YMem2zqJ7sq1B2LxrDyi1EQibQhJziM/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-10-19',
    title: 'Circular N18 Invitacion familias grado octavo y noveno',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1u9P0FZ-7MAfOCgJNyIEIBasp0H3vjh24/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-10-20',
    title: 'Circular N19 Informes parciales primer periodo academico',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1pHYTc-G1OLrVxHjpWz-Ty69rwhtyH3u0/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-07',
    title: 'Circular N20 Expediciones pedagogicas',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1JEkGz5Cke71_VCPskJ63IAd_TMQgeR08/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-10',
    title: 'Circular N21 Invitacion familias grado sexto y septimo',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1xhQguuAYh634Ic4n487dvXhKe5k7-90b/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-16',
    title: 'Circular N22 Noche de luz y navidad ',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/14UM3Pkeal-hWQ2N57ttbevZ2FgmiWh8R/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-17',
    title: 'Circular N23 Salidas pedagogicas',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1cTR3I-94SQADSLoYOFwGGuaAbPZyKR7P/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-20',
    title: 'Circular N24 Invitacion familias grados transicion',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/1oqPAPml7xPIfvDppA3fL8FlvcoIGhvgD/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-22',
    title: 'Circular N25 Pruebas saber 11',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1irL1hUHu4teOus472DWZr7BGHJ4EPCgF/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-24',
    title: 'Circular N26 Salida pedagogica parvulos y transicion b',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/1vSo2klb0MiH9py-s_ZP879Sp-2dpYM7s/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-11-28',
    title: 'Circular N27 Invitacion familais grados prekinder,kinder y parvulos',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/1kg_jz3XVsxkXDkp4-8IQcSLteNRUfey4/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-01-11',
    title: 'Circular N28 Asignacion docente',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1sxBCStvjyObhV0pCJYeXPV6vh4zcXekN/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-01-19',
    title: 'Circular N29 Pruebas Saber 11',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/10vmVjX1elaJhHjcCkn-1VG7bvgomONFK/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-01-15',
    title: 'Circular N30 Apertura inscripcion extracurriculares segundo semestre',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1SeBwo9ecDRGZuuh4VxNPgk_8YWLyHQ4S/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-01-25',
    title: 'Circular N31 Escuela de padres',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1jieRvhPNmNBe6nUn9AgKssoaIoAsZvYi/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-01-24',
    title: 'Circular N32 Informes finales primer periodo academico',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1req_gysVCZA_QWcDFgdwhbwiN11HjeI_/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-01',
    title: 'Circular N34 Expedicion Pedagogica Oriente Antioqueño',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1eMTIzWk9BKA8js2MnQbq2LcAFzgrWtm8/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-06',
    title: 'Circular N35 Expedicion Pedagogica Eje Cafetero',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1RsMaG69452Kt-KDjcxRdYMiMq0htZH20/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-07',
    title: 'Circular N36 Expedicion Pedagogica Antioquia',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1wdDLdLTm08yheYI7dv0tKrklyI6pCACv/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-09',
    title: 'Circular N37 Expedicion Pedagogica Historia de Colombia',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1ovVP05hUFohyymAmFkUrhHgOHBJVG2ke/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-12',
    title: 'Circular N38 Encuentro deportivo copa vermont',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1FjQXU-UmAAa-Gfw_-OU7xSy8rfBkn0ln/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-14',
    title: 'Circular N39 Expedicion Pedagogica Comunidades Indigenas',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1uyWWtAcgsmrUNt1XhWJKsMzjpMp12yYI/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-15',
    title: 'Circular N40 Expedicion Pedagogica Reservas Naturales',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1R30jpYw3Qcjv3JKLlM2rLY5PXNnUWV_A/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-16',
    title: 'Circular N41 Escuela de padres preescolar',
    category: 'Bloqueados',
    url: 'https://drive.google.com/file/d/1T5O6CP4s5Bw7b6bG2Nply-CumpMBxg38/view?usp=sharing',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-16',
    title: 'Circular N42 Escuela de padres primaria',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/11V3dbG3jcI0VjHesnQEpXmVONhyXLshi/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-19',
    title: 'Circular N43 Expedicion Pedagogica Aventura',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1dUGn0aQcoJ-3lkYyInY3_2DGv8ke5ZOP/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-20',
    title: 'Circular N44 Expedicion Pedagogica Inmersion en segunda lengua',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1dlD6rEs4l3lDU8iRxIfq5H6DIdrjlq-V/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-21',
    title: 'Circular N45 Convenio sistema de transporte escolar con servitravel',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/14VtQJew5VHtiRap9430YvxH_p4_mVXts/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-21',
    title: 'Circular N46 Salidas pedagogicas',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/11zybF9YUD1WQoJI1JtjDGOKAFazG9bnc/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-22',
    title: 'Circular N47 Salidas Pedagogicas',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1WIRh6rd_3fqWrHuTv7uIxFPN_uea831q/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-28',
    title: 'Circular N48 Certificacion Cambridge-Examen FCE',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1_tn6pdXRNc5bpbbWWijtHMniAz8O4fPg/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-02-23',
    title: 'Circular N49 Reuniones informativas expediciones',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1CS7qLaW7kjlz3PWV2ghhFXUYWd2klUut/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-02-29',
    title: 'Circular N50 Dia virtual',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1uBn6E4pS02_ID1tRRz8jAK4Amu2-j2z0/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-02-09',
    title: 'Circular N51 Invitacion para grado quinto a la expedecion',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/166Y87-ZHAJChMYjoPCVFx6aKpcosq9HL/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-03-19',
    title: 'Circular N52 Ceremonia de gradaucion once',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1S66VXmoT_t2dXvmK60062EQtwyEdLNCc/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-04-01',
    title: 'Circular N53 Salida pedagogica grado decimo',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1r8dBp18FiwPhaUq94J8LqLWTV-vaR2I1/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-04-04',
    title: 'Circular N54 Multilingual music festival 2024',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1tthAxjp3G9dDjn168jG05OwphoEfX0WP/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-04-15',
    title: 'Circular N55 Informes parciales segundo periodo academico',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1uOlxJQpAvLRl3pAYicBw2qBgEASyU4nO/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-04-16',
    title: 'Circular N56 Novedades mutilingual music festival',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1OZMyj2ExbZksoRARhDfKgiOn5-NSTxGM/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-05-06',
    title: 'Circular N57 Dia compensatorio',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/17lRL8g-II44Qvyz5F3UfsfbB13JAiYrc/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-05-15',
    title: 'Circular N58 Costos 2024-2025',
    category: 'Todos',
    url: 'https://drive.google.com/file/d/1iew-q63tflNl8tZIMr4BXtISMA2pdPx5/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-05-17',
    title: 'Circular N59 Escuela de padres preescolar y primaria',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1ovVP05hUFohyymAmFkUrhHgOHBJVG2ke/view',
  },
  {
    image: ImagesPath.article5,
    date: '2023-05-17',
    title: 'Circular N60 Escuela de padres bachillerato',
    category: 'Bachillerato',
    url: 'https://drive.google.com/file/d/1qULIXEyEVz8Du96i2VcmjzSDljxhtj84/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-05-20',
    title: 'Circular N62 Salida pedagogica parvulos y kinder a-b',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/1ovVP05hUFohyymAmFkUrhHgOHBJVG2ke/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-05-20',
    title: 'Circular N62 Salida pedagogica transicion B',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/1ILRe4zgMPS1PREsW0uY04N3limZqHL9b/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-05-21',
    title: 'Circular N63 Salida pedagogica transicion A',
    category: 'Parvulo',
    url: 'https://drive.google.com/file/d/1Vsnb0QvaztFOcsLbloPq_JhwZy6Hy6VC/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-05-28',
    title: 'Circular N65 Salida pedagogica primero A-B',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1iEPIrBXswmGQGYFXAyX339qYxv032wRn/view',
  },
  {
    image: ImagesPath.article5,
    date: '2024-05-30',
    title: 'Circular N66 Salida pedagogica transicion y primaria',
    category: 'Primaria',
    url: 'https://drive.google.com/file/d/1zEPPxyO8Cm7gjwYfuR2PIMHg26A2B3M1/view',
  },


  // Añade más artículos según sea necesario
];

const ArticleCard = ({ article }) => {
  return (
    <Link href={article.url} legacyBehavior>
      <a className="block p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer">
        <div className="relative pb-2/3 mb-4">
          <img
            src={article.image}
            alt={article.title}
            className="h-36 w-full object-cover rounded-t-lg"
          />
        </div>
        <div className="mb-2 text-sm text-gray-500">
          {new Date(article.date).toLocaleDateString()}
        </div>
        <h2 className="text-lg font-semibold mb-2 text-black">
          {article.title}
        </h2>
        <div className="text-sm font-medium text-gray-700">
          {article.category}
        </div>
      </a>
    </Link>
  );
};

const NewsList = () => {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 6; // Número de artículos por página

  useEffect(() => {
    filterArticles();
  }, [category, sortOrder, searchTitle]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setCategory('');
    setSortOrder('');
    setSearchTitle('');
    setCurrentPage(1); // Reset to first page when filters are cleared
  };

  const filterArticles = () => {
    let result = [...articles];

    if (category) {
      result = result.filter(article => article.category === category);
    }

    if (sortOrder) {
      result.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (sortOrder === 'newest') {
          return dateB - dateA;
        } else if (sortOrder === 'oldest') {
          return dateA - dateB;
        }
        return 0;
      });
    }

    if (searchTitle) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredArticles(result);
  };

  const uniqueCategories = [...new Set(articles.map(article => article.category))];

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Calcular los artículos a mostrar en la página actual
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-center">
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchTitle}
          onChange={handleSearchTitleChange}
          className="w-full border p-2 rounded-lg"
        />
        <div className="flex flex-row justify-between md:space-x-4 w-full">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border p-2 rounded-lg md:w-full w-2/5 text-black"
          >
            <option value="" className='text-black' disabled hidden>Categoría</option>
            {uniqueCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="border p-2 rounded-lg md:w-full w-2/5 text-black"
          >
            <option value="" className='text-black' disabled hidden>Ordenar por fecha</option>
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antigua</option>
          </select>
          <button
            onClick={clearFilters}
            className="border p-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-black"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default NewsList;
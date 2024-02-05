'use client';


import '/app/globals.css';
import React, {  useState, useEffect  } from 'react';
import Link from 'next/link';
import TopHeader from './header/topHeader';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar la visibilidad del menú móvil
  const [isAboutSubMenuOpen, setIsAboutSubMenuOpen] = useState(false);
  // Se mantiene el estado para mostrar u ocultar el TopHeader
  const [showTopHeader, setShowTopHeader] = useState(true);
  // Estado para controlar la visibilidad del segundo div de forma independiente
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowTopHeader(true);
        setShowSecondaryNav(false); // Ocultar el segundo div cuando está en la parte superior
      } else {
        setShowTopHeader(false);
        setShowSecondaryNav(true); // Mostrar el segundo div cuando el usuario se desplaza hacia abajo
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lastDivClass = `${showSecondaryNav ? "fixed inset-x-0 top-0 transform translate-y-0 opacity-100 visible" : "hidden"} transition-transform duration-500 ease-in-out bg-white shadow-md z-50`;

  // Estilos personalizados se mantienen igual
  const logoStyle = {
    marginRight: '0.5rem', // Reducir el margen derecho del logo
    height: '3rem', // Altura del logo
  };

  const dividerStyle = {
    height: '3rem', // Altura de las líneas para que coincidan con el logo
    width: '1px',
    backgroundColor: 'rgba(0,0,0,.05)',
  };

  // El contenedor del menú ahora incluye el trigger y el contenido del menú desplegable
  const menuContainerStyle = {
    position: 'relative', // Posicionamiento relativo para el menú absoluto
    cursor: 'pointer', // Cursor tipo pointer para indicar que es interactivo
    display: 'inline-block', // Hace que el contenedor se ajuste al contenido
  };

  const dropli = {
    padding: '0',
    width: '190px',
    position: 'relative',
    fontWeight: 'normal',
  };

  // Estilos para los items del menú desplegable
  const dropdownItemStyle = {
    padding: '0.5rem 1rem', // Espaciado interno para cada ítem
    borderBottom: '1px solid #E5E7EB', // Línea divisoria entre ítems
  };


  return (
    <nav className="bg-white w-full shadow light:text-gray-400 light:bg-gray-800 ">
      <div className="transition-all duration-500 ease-in-out">
        <TopHeader />
      </div>
      <div className="p-4 container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/images/logo-new-school.png" alt="Logo The New School" style={logoStyle} />
        </a>

            {/* Botón de menú para dispositivos móviles, siempre a la derecha */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)} // Cambia el estado para mostrar/ocultar el menú
                className="md:hidden text-[#2991D6] focus:outline-none"
            >
              {/* Icono de menú de hamburguesa, siempre visible */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                {/* Siempre muestra el icono de hamburguesa */}
                <path d="M4 6h16M4 12h16m-16 6h16"/>
              </svg>
            </button>

          </div>

          {/* Contenido del menú para dispositivos móviles */}
          <div
              className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full mx-auto w-auto min-w-[200px] max-w-sm left-1/2 transform -translate-x-1/2 bg-[#F2F2F2] shadow-md mt-[-2px]`}>
            {/* Menú principal */}
            {/* Menú principal */}
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* HOME */}
              <a href="/" className="text-[#2991D6] block px-3 py-2 rounded-md text-base font-medium">HOME</a>

              {/* ABOUT US y su menú desplegable */}
              <div className="px-3 py-2 relative">
                <button
                    className="text-[#2991D6] block w-full text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsAboutSubMenuOpen(!isAboutSubMenuOpen); // Cambia el estado para mostrar/ocultar el submenú de ABOUT US
                    }}
                >
                  ABOUT US
                </button>
                {/* Menú desplegable de ABOUT US */}
                <div className={`${isAboutSubMenuOpen ? 'block' : 'hidden'} absolute left-0 right-0 bg-[#F2F2F2] shadow-md mt-1`}>
                  <a href="/ourProposalPage" className="block px-3 py-2 text-gray-700 hover:bg-gray-200">Our Proposal</a>
                  <a href="/educationalModelPage" className="block px-3 py-2 text-gray-700 hover:bg-gray-200">Educational Model</a>
                  <a href="/culturaNewlPage" className="block px-3 py-2 text-gray-700 hover:bg-gray-200">Cultura New</a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-200">Campus</a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-200">The New Awareness</a>
                </div>
              </div>

              {/* SCHEDULE */}
              <a href="https://drive.google.com/file/d/1eobMZQVtlE7bKdDe2D8NRNq4rnUNkxtl/view?usp=sharing"
                 className="text-[#2991D6] block px-3 py-2 rounded-md text-base font-medium" target="_blank"
                 rel="noopener noreferrer">SCHEDULE</a>

              {/* CALENDAR */}
              <a href="https://drive.google.com/file/d/16rKV402b2ENKiaGBD-VpSkMr38b1Q3b9/view"
                 className="text-[#2991D6] block px-3 py-2 rounded-md text-base font-medium" target="_blank"
                 rel="noopener noreferrer">CALENDAR</a>

              {/* ADMISSIONS */}
              <a href="/admissions/form"
                 className="text-[#2991D6] block px-3 py-2 rounded-md text-base font-medium">ADMISSIONS</a>

              {/* NEWS */}
              <a href="/news/blog" className="text-[#2991D6] block px-3 py-2 rounded-md text-base font-medium">NEWS</a>

              {/* COMMUNICATIONS */}
              <a href="/communications/circulares"
                 className="text-[#2991D6] block px-3 py-2 rounded-md text-base font-medium">COMMUNICATIONS</a>

              {/* INSPIRING PARENTS TNS */}
              <a href="https://thenewschooledu-my.sharepoint.com/personal/orientacionescolar_thenewschool_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Forientacionescolar%5Fthenewschool%5Fedu%5Fco%2FDocuments%2F5%20ESPACIO%20FORMATIVO%20LIFE%20SKILLS%2FINSPIRING%20PARENTS%20TNS&fromShare=true&ga=1"
                 className="text-[#2991D6] block px-3 py-2 rounded-md text-base font-medium" target="_blank"
                 rel="noopener noreferrer">INSPIRING PARENTS TNS</a>
            </div>
          </div>


          <div className="hidden md:flex items-center flex-grow">
            {/* Inicio */}
            <a href="/" className="text-[#2991D6] py-1 ml-[20px]">HOME</a>

            {/* Separador */}
            <div style={dividerStyle} className="mx-2"></div>
            
          {/* ABOUT US y su menú desplegable */}
          <div
            style={menuContainerStyle}
            className="group z-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            {/* Trigger del menú */}
            <a href="#" className="text-[#2991D6] py-1 mb-0 focus:outline-none" aria-haspopup="true">
              ABOUT US
            </a>


            {/* Menú desplegable */}
            {isHovering && (
              <ul className="group-hover:block absolute hidden bg-[#F2F2F2] shadow-md" aria-label="submenu" style={{ top: 0, marginTop: '0' }}>
                <li style={dropdownItemStyle} className="w-full hover:bg-gray-100">
                  <Link href="/ourProposalPage" className="px-2 py-1 block text-gray-700"
                    style={dropli}>Our
                    Proposal</Link>
                </li>
                <li style={dropdownItemStyle} className="w-full hover:bg-gray-200">
                  <Link href="/educationalModelPage" className="px-2 py-1 block text-gray-700 ">Educational
                    Model</Link>
                </li>
                <li style={dropdownItemStyle} className="w-full hover:bg-gray-200">
                  <Link href="/culturaNewlPage" className="px-2 py-1 block text-gray-700">Cultura
                    New</Link>
                </li>
                <li style={dropdownItemStyle} className="w-full hover:bg-gray-200">
                  <Link href="#" className="px-2 py-1 block text-gray-700">Campus</Link>
                </li>
                <li style={dropdownItemStyle} className="w-full hover:bg-gray-200">
                  <Link href="#" className="px-2 py-1 block text-gray-700">The New
                    Awareness</Link>
                </li>
              </ul>
          </div>

            {/* Repetición de separadores y enlaces para el resto de elementos del menú */}
            <div style={dividerStyle} className="mx-2"></div>
            <a href="https://drive.google.com/file/d/1eobMZQVtlE7bKdDe2D8NRNq4rnUNkxtl/view?usp=sharing"
               className="text-[#2991D6] py-1" target="_blank">SCHEDULE</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="https://drive.google.com/file/d/16rKV402b2ENKiaGBD-VpSkMr38b1Q3b9/view"
               className="text-[#2991D6] py-1" target="_blank">CALENDAR</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="/admissions/form" className="text-[#2991D6] py-1">ADMISSIONS</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="/news/blog" className="text-[#2991D6] py-1">NEWS</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="/communications/circulares" className="text-[#2991D6] py-1">COMMUNICATIONS</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="https://thenewschooledu-my.sharepoint.com/personal/orientacionescolar_thenewschool_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Forientacionescolar%5Fthenewschool%5Fedu%5Fco%2FDocuments%2F5%20ESPACIO%20FORMATIVO%20LIFE%20SKILLS%2FINSPIRING%20PARENTS%20TNS&fromShare=true&ga=1"
               className="text-[#2991D6] py-1" target="_blank">INSPIRING PARENTS TNS</a>
          </div>
        </div>



      <div className={lastDivClass}>
        <div className="p-4 container mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/images/logo-new-school.png" alt="Logo The New School" style={logoStyle} />
          </a>

          {/* Menú de navegación */}
          <div className="hidden md:flex items-center flex-grow">
            {/* Inicio */}
            <a href="/" className="text-[#2991D6] py-1 ml-[20px]">HOME</a>

            {/* Separador */}
            <div style={dividerStyle} className="mx-2"></div>

            {/* ABOUT US y su menú desplegable */}
            <div
              style={menuContainerStyle}
              className="group z-10"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}>
              {/* Trigger del menú */}
              <a href="#" className="text-[#2991D6] py-1 mb-0 focus:outline-none" aria-haspopup="true">
                ABOUT US
              </a>


              {/* Menú desplegable */}
              {isHovering && (
                <ul className="group-hover:block absolute hidden bg-[#F2F2F2] shadow-md" aria-label="submenu" style={{ top: 0, marginTop: '0' }}>
                  <li style={dropdownItemStyle} className="w-full hover:bg-gray-100">
                    <Link href="/ourProposalPage" className="px-2 py-1 block text-gray-700"
                      style={dropli}>Our
                      Proposal</Link>
                  </li>
                  <li style={dropdownItemStyle} className="w-full hover:bg-gray-100">
                    <Link href="/educationalModelPage" className="px-2 py-1 block text-gray-700 ">Educational
                      Model</Link>
                  </li>
                  <li style={dropdownItemStyle} className="w-full hover:bg-gray-100">
                    <Link href="/culturaNewlPage" className="px-2 py-1 block text-gray-700">Cultura
                      New</Link>
                  </li>
                  <li style={dropdownItemStyle} className="w-full hover:bg-gray-100">
                    <Link href="#" className="px-2 py-1 block text-gray-700">Campus</Link>
                  </li>
                  <li style={dropdownItemStyle} className="w-full hover:bg-gray-100">
                    <Link href="#" className="px-2 py-1 block text-gray-700">The New
                      Awareness</Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Repetición de separadores y enlaces para el resto de elementos del menú */}
            <div style={dividerStyle} className="mx-2"></div>
            <a href="https://drive.google.com/file/d/1eobMZQVtlE7bKdDe2D8NRNq4rnUNkxtl/view?usp=sharing" className="text-[#2991D6] py-1" target="_blank">SCHEDULE</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="https://drive.google.com/file/d/16rKV402b2ENKiaGBD-VpSkMr38b1Q3b9/view" className="text-[#2991D6] py-1" target="_blank">CALENDAR</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="/admissions/form" className="text-[#2991D6] py-1">ADMISSIONS</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="/news/blog" className="text-[#2991D6] py-1">NEWS</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="/communications/circulares" className="text-[#2991D6] py-1">COMMUNICATIONS</a>
            <div style={dividerStyle} className="mx-2"></div>
            <a href="https://thenewschooledu-my.sharepoint.com/personal/orientacionescolar_thenewschool_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Forientacionescolar%5Fthenewschool%5Fedu%5Fco%2FDocuments%2F5%20ESPACIO%20FORMATIVO%20LIFE%20SKILLS%2FINSPIRING%20PARENTS%20TNS&fromShare=true&ga=1" className="text-[#2991D6] py-1" target="_blank">INSPIRING PARENTS TNS</a>
          </div>

          {/* Menú de navegación para dispositivos móviles */}
          <div className="md:hidden">
            {/* Implementar aquí el conmutador de menú móvil */}
          </div>
        </div>
      </div>

      </nav>
  );
};

export default Navbar;

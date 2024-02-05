'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TopHeader from './header/topHeader';

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);
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

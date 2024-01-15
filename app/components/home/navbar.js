'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
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
    backgroundColor: '#F2F2F2'
  };

  // Estilos para los items del menú desplegable
  const dropdownItemStyle = {
    padding: '0.5rem 1rem', // Espaciado interno para cada ítem
    borderBottom: '1px solid #E5E7EB', // Línea divisoria entre ítems
  };


  return (
      <nav className="fixed top-0 bg-white py-4 w-full shadow-md z-50">
        <div className="container ml-[auto] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/images/logo-new-school.png" alt="Logo The New School" style={logoStyle}/>
          </a>

        {/* Menú de navegación */}
        <div className="hidden md:flex items-center flex-grow">
          {/* Inicio */}
          <a href="/" className="text-[#2991D6] py-1 ml-[20px]">HOME</a>

          {/* Separador */}
          <div style={dividerStyle} className="mx-2"></div>

          {/* ABOUT US y su menú desplegable */}
          <div style={menuContainerStyle} className="group z-50">
            {/* Trigger del menú */}
            <a href="#" className="text-[#2991D6] py-1 focus:outline-none" aria-haspopup="true">
              ABOUT US
            </a>

              {/* Menú desplegable */}
              <ul className="group-hover:block absolute hidden bg-white shadow-md mt-1 z-50" aria-label="submenu">
                <li style={dropdownItemStyle}>
                  <Link href="/ourProposalPage" className="px-2 py-1 block text-gray-700 hover:bg-gray-100"
                        style={dropli}>Our
                    Proposal</Link>
                </li>
                <li style={dropdownItemStyle}>
                  <Link href="/educationalModelPage" className="px-2 py-1 block text-gray-700 hover:bg-gray-100">Educational
                    Model</Link>
                </li>
                <li style={dropdownItemStyle}>
                  <Link href="#" className="px-2 py-1 block text-gray-700 hover:bg-gray-100">Cultura
                    New</Link>
                </li>
                <li style={dropdownItemStyle}>
                  <Link href="#" className="px-2 py-1 block text-gray-700 hover:bg-gray-100">Campus</Link>
                </li>
                <li style={dropdownItemStyle}>
                  <Link href="#" className="px-2 py-1 block text-gray-700 hover:bg-gray-100">The New
                    Awareness</Link>
                </li>
              </ul>
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
    </nav>
  );
};

export default Navbar;

"use client";
import "/app/globals.css";
import React, { useState, useEffect } from "react";
import TopHeader from "./header/topHeader";

import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Asegúrate de tener 'react-icons' instalado
import LanguageToggle from "../others/button/LanguageToggle";
import { ImagesPath } from "@/app/utils/assetsPath";

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dividerStyle = {
    height: "3rem", // Altura de las líneas para que coincidan con el logo
    width: "1px",
    backgroundColor: "rgba(0,0,0,.05)",
  };
  const menuContainerStyle = {
    position: "relative", // Posicionamiento relativo para el menú absoluto
    cursor: "pointer", // Cursor tipo pointer para indicar que es interactivo
    display: "inline-block", // Hace que el contenedor se ajuste al contenido
  };
  const dropdownItemStyle = {
    padding: "0.5rem 1rem", // Espaciado interno para cada ítem
    borderBottom: "1px solid #E5E7EB", // Línea divisoria entre ítems
  };

  const dropli = {
    padding: "0",
    width: "190px",
    position: "relative",
    fontWeight: "normal",
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowTopHeader(true);
        setShowSecondaryNav(false);
      } else {
        setShowTopHeader(false);
        setShowSecondaryNav(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bg-white w-full shadow">
      <TopHeader />
      {/* TopHeader se muestra o se oculta según el estado */}
      {showTopHeader && (
        <div className="transition-all duration-500 ease-in-out">
          <div className="p-4 container mx-auto flex items-center justify-between">
            {/* Logo */}

            <a href="/" className="flex items-center">
              <img
                src={ImagesPath.logoH}
                alt="Logo The New School"
                style={{ marginRight: "0.5rem", height: "3rem" }}
              />
            </a>

            {/* Botón de hamburguesa para dispositivos móviles */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>

            {/* Menú de navegación (oculto en dispositivos móviles y visible en pantallas más grandes) */}
            <div
              className={`md:flex items-center flex-grow ${
                isMobileMenuOpen ? "flex" : "hidden"
              } flex-col md:flex-row`}
            >
              {/* Inicio */}
              <a href="/" className="text-blueButton py-1 ml-[20px]">
                HOME
              </a>

              {/* Separador */}
              <div style={dividerStyle} className="mx-2"></div>

              {/* ABOUT US y su menú desplegable */}
              <div
                style={menuContainerStyle}
                className="group z-10"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Trigger del menú */}
                <a
                  href="#"
                  className="text-blueButton py-1 mb-0 focus:outline-none"
                  aria-haspopup="true"
                >
                  ABOUT US
                </a>

                {/* Menú desplegable */}
                {isHovering && (
                  <ul
                    className="group-hover:block absolute hidden bg-[#F2F2F2] shadow-md"
                    aria-label="submenu"
                    style={{ top: 0, marginTop: "0" }}
                  >
                    <li
                      style={dropdownItemStyle}
                      className="w-full hover:bg-gray-100"
                    >
                      <Link
                        href="/about_us/our_proposal"
                        className="px-2 py-1 block text-gray-700"
                        style={dropli}
                      >
                        Our Proposal
                      </Link>
                    </li>
                    <li
                      style={dropdownItemStyle}
                      className="w-full hover:bg-gray-100"
                    >
                      <Link
                        href="/about_us/educational_model"
                        className="px-2 py-1 block text-gray-700 "
                      >
                        Educational Model
                      </Link>
                    </li>
                    <li
                      style={dropdownItemStyle}
                      className="w-full hover:bg-gray-100"
                    >
                      <Link
                        href="/about_us/cultura_new"
                        className="px-2 py-1 block text-gray-700"
                      >
                        Cultura New
                      </Link>
                    </li>
                    <li
                      style={dropdownItemStyle}
                      className="w-full hover:bg-gray-100"
                    >
                      <Link
                        href="/about_us/campus"
                        className="px-2 py-1 block text-gray-700"
                      >
                        Campus
                      </Link>
                    </li>
                    <li
                      style={dropdownItemStyle}
                      className="w-full hover:bg-gray-100"
                    >
                      <Link
                        href="/about_us/the_new_awareness"
                        className="px-2 py-1 block text-gray-700"
                      >
                        The New Awareness
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Repetición de separadores y enlaces para el resto de elementos del menú */}
              <div style={dividerStyle} className="mx-2"></div>
              <a
                href="https://drive.google.com/file/d/1gRs1SqN6hQvT22It53ivlkPZXFkgwwYW/view"
                className="text-blueButton py-1"
                target="_blank"
              >
                SCHEDULE
              </a>
              <div style={dividerStyle} className="mx-2"></div>
              <a
                href="https://drive.google.com/file/d/16rKV402b2ENKiaGBD-VpSkMr38b1Q3b9/view"
                className="text-blueButton py-1"
                target="_blank"
              >
                CALENDAR
              </a>
              <div style={dividerStyle} className="mx-2"></div>
              <a href="/admissions/form" className="text-blueButton py-1">
                ADMISSIONS
              </a>
              <div style={dividerStyle} className="mx-2"></div>
              <a href="/news/blog" className="text-blueButton py-1">
                NEWS
              </a>
              <div style={dividerStyle} className="mx-2"></div>
              <a
                href="/communications/circulares"
                className="text-blueButton py-1"
              >
                COMMUNICATIONS
              </a>
              <div style={dividerStyle} className="mx-2"></div>
              <a
                href="https://thenewschooledu-my.sharepoint.com/personal/orientacionescolar_thenewschool_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Forientacionescolar%5Fthenewschool%5Fedu%5Fco%2FDocuments%2F5%20ESPACIO%20FORMATIVO%20LIFE%20SKILLS%2FINSPIRING%20PARENTS%20TNS&fromShare=true&ga=1"
                className="text-blueButton py-1"
                target="_blank"
              >
                INSPIRING PARENTS TNS
              </a>
            </div>
            <LanguageToggle />
          </div>
        </div>
      )}

      {/* Menú secundario que aparece al desplazarse */}
      <div
        className={`${
          showSecondaryNav
            ? "fixed inset-x-0 top-0 z-50 bg-white shadow-md"
            : "hidden"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Repite la estructura del menú o contenido adicional aquí si es necesario */}
      </div>
    </nav>
  );
};
export default Navbar;

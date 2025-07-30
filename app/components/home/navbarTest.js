"use client";
import "/app/globals.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageToggle from "../others/button/LanguageToggle";
import { ImagesPath } from "@/app/utils/assetsPath";

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={ImagesPath.logoH}
            className="h-12 mr-4"
            alt="The New School Logo"
          />
        </Link>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>
        <div
          className={`w-full md:flex md:w-auto ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                HOME
              </Link>
            </li>
            <li className="relative">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                ABOUT US
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <ul
                  className="py-2 text-sm text-blueButton dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <Link
                      href="/about_us/our_proposal"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Our Proposal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about_us/educational_model"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Educational Model
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about_us/cultura_new"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cultura New
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about_us/campus"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Campus
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about_us/the_new_awareness"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      The New Awareness
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1wa-S_MJV6JQLSQppLcfMHHxbJMFaR0x1/view?usp=sharing"
                className="block py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                SCHEDULE
              </a>
            </li>
            <li>
              <a
                href="https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EReMyYaGYL9FtBRJRRRSM9IBoZiq6Ho1XN-tsMj4bYuTEw?e=UvZ7Bf"
                className="block py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                CALENDAR
              </a>
            </li>
            <li>
              <a
                href="/admissions/form"
                className="block py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                ADMISSIONS
              </a>
            </li>
            <li>
              <a
                href="/news/blog"
                className="block py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                NEWS
              </a>
            </li>
            <li>
              <a
                href="/communications/circulares"
                className="block py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                COMMUNICATIONS
              </a>
            </li>
            <li>
              <a
                href="https://thenewschooledu-my.sharepoint.com/:f:/g/personal/orientacionescolar_thenewschool_edu_co/EiHbxhAC_bZNneZN_rLxyMsBVglfux-071AVHQ1GtEpynQ?e=PYj5n9"
                className="block py-2 px-3 text-blueButton rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >INSPIRING PARENTS TNS
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center md:ml-4 md:order-2">
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

'use client'

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 w-full">
      <div className="w-full flex items-center justify-between">
        <div>
          <a href="/" className="text-white text-lg font-bold">
            <img src="/images/logo-new-school.png" alt="Logo" className="h-16" />
          </a>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-[#2991D6]">HOME</a>
          </li>
          <li>
            <a href="/about" className="text-[#2991D6]">ABOUT US</a>
          </li>
          <li>
            <a href="/schedule" className="text-[#2991D6]">SCHEDULE</a>
          </li>
          <li>
            <a href="/calendar" className="text-[#2991D6]">CALENDAR</a>
          </li>
          <li>
            <a href="/admissions" className="text-[#2991D6]">ADMISSIONS</a>
          </li>
          <li>
            <a href="/news" className="text-[#2991D6]">NEWS</a>
          </li>
          <li>

            <a href="/communications" className="text-[#2991D6]">COMMUNICATIONS</a>
          </li>
          <li>
            <a href="/inspiring-parents-tns" className="text-[#2991D6]">INSPIRING PARENTS TNS</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

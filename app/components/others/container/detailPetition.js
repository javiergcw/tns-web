// components/DetailPetition.js
import React from 'react';

const DetailPetition = ({ title, category, description, date, leader, stage }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{title}</h1>
      <div className="flex items-center mb-2">
        <div className="bg-green-300 p-2 rounded-md mr-2"></div>
        <span className="text-green-600 font-semibold">CATEGORIA SELECCIONADA</span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="list-decimal list-inside mb-4">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Vestibulum ante ipsum primis in faucibus orci.</li>
        <li>Consectetur adipiscing elit.</li>
      </ul>
      <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded-md">
        <div className="flex flex-col items-center">
          <div className="bg-green-300 p-2 rounded-md mb-2"></div>
          <span>{date}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-300 p-2 rounded-md mb-2"></div>
          <span>{leader}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-300 p-2 rounded-md mb-2"></div>
          <span>{stage}</span>
        </div>
      </div>
    </div>
  );
}

export default DetailPetition;

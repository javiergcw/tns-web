import React from 'react';

const DetailPetition = ({ title, category, description, date, leader, stage }) => {
  return (
    <div className=" bg-gray-100 shadow-md rounded-lg p-6">
      <div className=" bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-blueSecundary mb-4">{title}</h1>
        <div className="flex items-center mb-4">
          <div className="bg-greenPrimary p-2 rounded-md mr-2"></div>
          <span className="text-greenPrimary font-semibold">{category}</span>
        </div>
        <p className="text-graySecundary mb-4">{description}</p>
        <ul className="list-decimal list-inside mb-4 text-graySecundary">
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Vestibulum ante ipsum primis in faucibus orci.</li>
          <li>Consectetur adipiscing elit.</li>
        </ul>
      </div>
    
        <div className="flex justify-between">
          <div className=" bg-white flex flex-col items-center  p-4 rounded-md shadow-md w-1/3 mx-2">
            <div className="bg-greenPrimary p-2 rounded-md mb-2"></div>
            <span className="text-gray-700 font-semibold">{date}</span>
          </div>
          <div className=" bg-white flex flex-col items-center  p-4 rounded-md shadow-md w-1/3 mx-2">
            <div className="bg-greenPrimary p-2 rounded-md mb-2"></div>
            <span className="text-gray-700 font-semibold">{leader}</span>
          </div>
          <div className=" bg-white flex flex-col items-center  p-6 rounded-md shadow-md w-1/3 mx-2">
            <div className="bg-greenPrimary p-2 rounded-md mb-3"></div>
            <span className="text-gray-700 font-semibold">{stage}</span>
          </div>
        </div>
    </div>
  );
}

export default DetailPetition;

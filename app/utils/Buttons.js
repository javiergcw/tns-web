// components/button/Buttons.js
import React from 'react';

const RedButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red-500 text-white px-4 py-2 rounded ${className}`}
    >
      {text}
    </button>
  );
};

const BlueButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    >
      {text}
    </button>
  );
};

export { RedButton, BlueButton };

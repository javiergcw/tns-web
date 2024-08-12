import React from 'react';

const ContactEmail = ({ email }) => {
  return (
    <div className="text-center bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        ¿Necesitas más información?
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Para más información, comunícate al siguiente correo:
      </p>
      <a
        href={`mailto:${email}`}
        className="text-blue-500 hover:underline text-lg"
      >
        {email}
      </a>
    </div>
  );
};

export default ContactEmail;

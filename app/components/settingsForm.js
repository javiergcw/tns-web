// components/settings/SMTPForm.js
import React from 'react';

const SMTPForm = () => {
  return (
    <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Configuración SMTP</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">Mail To</label>
        <input
          type="email"
          placeholder="Mail To"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">Configuration SMTP Port</label>
        <input
          type="number"
          placeholder="Configuration SMTP Port"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">Configuration SMTP Link</label>
        <input
          type="url"
          placeholder="Configuration SMTP Link"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">Configuration SMTP Password</label>
        <input
          type="password"
          placeholder="Configuration SMTP Password"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Guardar
      </button>
    </form>
  );
};

export default SMTPForm;

import React, { useState } from "react";
import { BlueButton, RedButton } from "@/app/utils/Buttons";

const SMTPForm = () => {
  const initialData = {
    email: "example@mail.com",
    port: "587",
    link: "smtp.example.com",
    password: "password123",
  };

  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos del formulario
    //console.log("Datos enviados:", formData);
  };

  return (
    <div className="flex flex-col items-start my-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Configuraciones</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4  text-blue-800">
          Configuración SMTP
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Mail To
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Mail To"
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Configuration SMTP Port
          </label>
          <input
            type="number"
            name="port"
            value={formData.port}
            onChange={handleInputChange}
            placeholder="Configuration SMTP Port"
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Configuration SMTP Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Configuration SMTP Link"
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Configuration SMTP Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Configuration SMTP Password"
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <BlueButton text="Guardar" type="submit" className="w-full mb-4" />
        <RedButton
          text="Restablecer"
          onClick={handleReset}
          className="w-full"
        />
      </form>
    </div>
  );
};

export default SMTPForm;

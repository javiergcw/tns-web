"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import { register } from "@/app/services/loginService";
import { ImagesPath } from "@/app/utils/assetsPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import LoaderOverlay from "@/app/utils/loaderOverlay";
import PublicRoute from "./publicRoute"; // Importa el HOC PublicRoute

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const response = await register(
        email,
        password,
        confirmPassword,
        name,
        identificationType,
        identificationNumber
      );
      // localStorage.setItem("token", response.data.token);
      //     localStorage.setItem("userId", response.data.id);
      toast.success("Registro exitoso!", {
        onClose: () => router.push("/login"),
      });
    } catch (error) {
      toast.error("Error en el registro ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <ToastContainer autoClose={2000} />
      <div className="w-full lg:w-2/4 h-48 lg:h-screen flex justify-center items-center bg-slate-100">
        <Image
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          layout="intrinsic"
          width={300}
          height={300}
          className="max-w-full max-h-full object-contain lg:object-scale-down"
        />
      </div>
      <div className="w-full lg:w-2/4 h-screen flex justify-center items-center">
        <div className="w-full max-w-md p-4 lg:p-0">
          <form
            className="bg-white p-6 lg:p-8 rounded-lg w-full"
            onSubmit={handleRegister}
          >
            <Text texto="Regístrate" color="blueMain" type="bigTitle" />
            <Text
              texto="Ingresa tu nombre, correo y contraseña para registrarte"
              color="gray6th"
              type="description"
            />
            <br />
            <TextInput
              labelText="Nombre"
              labelColor="gray6th"
              inputSize="large"
              inputType="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInput
              labelText="Correo"
              labelColor="gray6th"
              inputSize="large"
              inputType="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              labelText="Contraseña"
              labelColor="gray6th"
              inputSize="large"
              inputType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              labelText="Confirmar Contraseña"
              labelColor="gray6th"
              inputSize="large"
              inputType="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">
                Tipo de identificación
              </label>
              <select
                name="identification_type"
                value={identificationType}
                onChange={(e) => setIdentificationType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
              >
                <option value="">Seleccione un tipo de identificación</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Cédula de ciudadanía">
                  Cédula de ciudadanía
                </option>
                <option value="Tarjeta de identidad">
                  Tarjeta de identidad
                </option>
              </select>
            </div>
            <TextInput
              labelText="Número de Identificación"
              labelColor="gray6th"
              inputSize="large"
              inputType="text"
              value={identificationNumber}
              onChange={(e) => setIdentificationNumber(e.target.value)}
            />
            <NormalButton
              text="Registrarse"
              color="blueButton"
              size="large"
              additionalClasses="text-white"
            />
          </form>
        </div>
      </div>
      {loading && <LoaderOverlay />}
    </div>
  );
};

// Envuelve RegisterForm con PublicRoute para proteger la ruta
export default PublicRoute(RegisterForm);

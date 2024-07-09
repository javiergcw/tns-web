"use client";

import "/app/globals.css";
import { useState } from "react";
import { useRouter } from "next/router";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import { login } from "@/app/services/apiService";
import Link from 'next/link';
import RememberMeAndForgotPassword from "@/app/components/login/rememberAndForgotpassword";
import RegisterStandart from "@/app/components/login/registerStandart";
import { ImagesPath } from "@/app/utils/assetsPath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      toast.success("Login exitoso!", {
        onClose: () => router.push("/dashboardManager"),
      });
    } catch (error) {
      toast.error("Correo o contraseña inválidos");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer autoClose={2000} />
      {/* Sección izquierda - Imagen corporativa */}
      <div className="w-2/4 h-screen flex justify-center items-center bg-slate-100">
        <img
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* Sección derecha - Formulario de inicio de sesión */}
      <div className=" w-2/4 h-screen flex justify-center items-center ">
        <form className="" onSubmit={handleLogin}>
          <Text texto="Iniciar Sesión" color="blueMain" type="bigTitle" />
          <Text
            texto="Ingresa tu correo y contraseña para iniciar sesión"
            color="gray6th"
            type="description"
          />
          <br />
          <TextInput
            labelText="Correo"
            labelColor="gray6th"
            inputSize="large"
            inputType="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextInput
            labelText="Contraseña"
            labelColor="gray6th"
            inputSize="large"
            inputType="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <RememberMeAndForgotPassword />
          <NormalButton text="Iniciar sesión" color="blueButton" size="large" />
          {loading && <div className="loader">Cargando...</div>}
          <RegisterStandart />
        </form>
      </div>
    </div>
  );
}

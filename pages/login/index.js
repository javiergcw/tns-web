                                                                                                                                                  "use client";

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


/**
 * Login Page
 *
 * Esta página de inicio de sesión está dividida en dos secciones: una imagen corporativa a la izquierda y un formulario de inicio de sesión a la derecha.
 * Utiliza componentes reutilizables como `TextInput`, `NormalButton` y `Text` para la estructura y el diseño.
 *
 * @component
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      console.log("Email:", email); // Para depuración
      console.log("Password:", password); // Para depuración

      const response = await login(email, password);
      // Guardar el token y redirigir a la página de inicio
      console.log("Login response:", response); // Para depuración

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      router.push("/dashboardManager");
    } catch (error) {
      console.error("Login error:", error); // Para depuración
      setError("Invalid email or password");
    }
  };

  const handleEmailChange = (e) => {
    console.log("Email input value:", e.target.value); // Log para depuración
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log("Password input value:", e.target.value); // Log para depuración
    setPassword(e.target.value);
  };

  return (
    <div className="flex h-screen">
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
          {/* Título del formulario */}
          <Text texto="Iniciar Sesión" color="blueMain" type="bigTitle" />
          {/* Subtítulo del formulario */}

          <Text
            texto="Ingresa tu correo y contraseña para iniciar sesión"
            color="gray6th"
            type="description"
          />
          <br />
          {/* Campo de entrada para la dirección de correo electrónico */}
          <TextInput
            labelText="Correo"
            labelColor="gray6th"
            inputSize="large"
            inputType="email"
            value={email}
            onChange={handleEmailChange}
          />
          {/* Campo de entrada para la contraseña */}

          <TextInput
            labelText="Contraseña"
            labelColor="gray6th"
            inputSize="large"
            inputType="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {/* Enlace para recuperar la contraseña */}

          <RememberMeAndForgotPassword />

          {/* Botón de envío del formulario */}
          <NormalButton text="Iniciar sesión" color="blueButton" size="large" />

          <RegisterStandart />
          {/* Mensaje de error */}
          {error && (
            <Text texto={error} color="red" type="error" className="mt-5" />
          )}
        </form>
      </div>
    </div>
  );
}

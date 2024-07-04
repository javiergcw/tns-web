"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";
import { login } from "@/app/services/apiService";

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
      router.push("/home");
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
    <>
      <div className="flex h-screen">
        {/* Sección izquierda - Imagen corporativa */}
        <div className="w-full h-screen m-0 bg-blueSecundary">
          <img
            src="/images/logo-vertical.png"
            alt="Descripción de la imagen"
            className="w-screen h-screen"
          />
        </div>
        {/* Sección derecha - Formulario de inicio de sesión */}
        <div className="w-2/3 flex justify-center items-center bg-slate-100">
          <form
            className="w-1/2 m-8 p-10 bg-white shadow-md"
            onSubmit={handleLogin}
          >
            {/* Título del formulario */}
            <Text texto="LOGIN" color="blue" type="title" />
            {/* Subtítulo del formulario */}
            <Text
              texto="Enter your email and password to login"
              color="green"
              type="description"
            />
            {/* Campo de entrada para la dirección de correo electrónico */}
            <Text texto="Email address" color="black" type="normal" />
            <TextInput
              labelText=""
              labelColor="blue"
              inputSize="large"
              inputType="email"
              value={email}
              onChange={handleEmailChange}
            />
            {/* Campo de entrada para la contraseña */}
            <Text
              texto="Password"
              color="black"
              type="normal"
              className="mt-5"
            />
            <TextInput
              labelText=""
              labelColor="blue"
              inputSize="large"
              inputType="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* Enlace para recuperar la contraseña */}
            <Text
              texto="Forgot your password?"
              color="blue"
              type="normal"
              className="mt-5"
            />
            {/* Botón de envío del formulario */}
            <NormalButton text="Login" color="blue" size="large" />
            {/* Mensaje de error */}
            {error && (
              <Text texto={error} color="red" type="error" className="mt-5" />
            )}
          </form>
        </div>
      </div>
    </>
  );
}

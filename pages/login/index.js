"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";
import Link from "next/link";
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
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch("https://d6d0-190-27-163-119.ngrok-free.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/dashboard"); 
    } else {
      setMessage(`Error: ${data.message}`);
    }
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
            action="#"
            method="POST"
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
            />
            {/* Enlace para recuperar la contraseña */}
            <Link href="/PasswordRecovery">
              <Text
                texto="Forgot your password?"
                color="blue"
                type="normal"
                className="mt-5"
              />
            </Link>
            {/* Botón de envío del formulario */}
            <NormalButton text="Login" color="blue" size="large" />
          </form>
        </div>
      </div>
    </>
  );
}

// src/pages/forgotPassword.js
"use client";
import "/app/globals.css";
import { useState } from "react";
import { useRouter } from "next/router"; // Importa useRouter para redirigir si es necesario
import { ImagesPath } from "@/app/utils/assetsPath";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import TextInput from "@/app/components/others/fields/textInput";
import Link from "next/link";
import { API_BASE_URL } from "@/app/utils/apiConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(""); // Estado para manejar el token
  const [emailSent, setEmailSent] = useState(false); // Controla si el email fue enviado
  const [tokenValidated, setTokenValidated] = useState(false); // Controla si el token fue validado
  const [password, setPassword] = useState(""); // Estado para la nueva contraseña
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // Estado para confirmar contraseña
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const body = {
      user: {
        email: email,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/password/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al recuperar la contraseña");
      }
    } catch (error) {
      setErrorMessage("Error de red: Intenta nuevamente.");
    }
  };

  const handleSubmitToken = async (e) => {
    e.preventDefault();

    // Si el token se valida, activamos la siguiente vista
    if (token) {
      setTokenValidated(true);
    } else {
      setErrorMessage("Debes ingresar un token válido");
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    const body = {
      user: {
        reset_password_token: token,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/password/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Aquí rediriges o muestras un mensaje de éxito
        router.push("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al restablecer la contraseña");
      }
    } catch (error) {
      setErrorMessage("Error de red: Intenta nuevamente.");
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-2/4 h-48 lg:h-screen flex justify-center items-center bg-slate-100">
        <img
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          className="max-w-full max-h-full object-contain lg:object-scale-down"
        />
      </div>
      <div className="w-full lg:w-2/4 h-screen flex justify-center items-center">
        <div className="w-full max-w-md p-4 lg:p-0">
          {!emailSent ? (
            // Formulario para enviar el correo
            <form onSubmit={handleSubmitEmail} className="bg-white p-6 lg:p-8 rounded-lg w-full">
              <Text texto="¿Olvidaste tu contraseña?" color="blueMain" type="bigTitle" />
              <Text texto="Ingresa tu correo y sigue las instrucciones" color="gray6th" type="description" />
              <br />
              <TextInput
                labelText="Email"
                labelColor="gray6th"
                inputSize="large"
                inputType="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              <NormalButton text="Enviar" color="blueButton" size="large" />
              <br />
              <label className="flex items-center">
                <span className="mr-2 text-gray6th">¿Ya tienes cuenta? </span>
                <Link href="/login">
                  <p className="text-blueButton hover:text-blueLight">Inicia sesión aquí</p>
                </Link>
              </label>
            </form>
          ) : !tokenValidated ? (
            // Formulario para validar el token
            <form onSubmit={handleSubmitToken} className="bg-white p-6 lg:p-8 rounded-lg w-full">
              <Text texto="Código de verificación" color="blueMain" type="bigTitle" />
              <Text texto="Ingresa el código enviado a tu correo" color="gray6th" type="description" />
              <br />
              <TextInput
                labelText="Código de verificación"
                labelColor="gray6th"
                inputSize="large"
                inputType="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              <NormalButton text="Validar código" color="blueButton" size="large" />
            </form>
          ) : (
            // Formulario para restablecer la contraseña
            <form onSubmit={handleSubmitNewPassword} className="bg-white p-6 lg:p-8 rounded-lg w-full">
              <Text texto="Restablecer Contraseña" color="blueMain" type="bigTitle" />
              <Text texto="Ingresa tu nueva contraseña" color="gray6th" type="description" />
              <br />
              <TextInput
                labelText="Nueva contraseña"
                labelColor="gray6th"
                inputSize="large"
                inputType="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextInput
                labelText="Confirmar nueva contraseña"
                labelColor="gray6th"
                inputSize="large"
                inputType="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              <NormalButton text="Restablecer Contraseña" color="blueButton" size="large" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ForgotPasswordPage = () => <ForgotPassword />;

export default ForgotPasswordPage;

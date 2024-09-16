"use client";
import { useState } from "react";
import { useRouter } from "next/router"; 
import { ImagesPath } from "@/app/utils/assetsPath";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import TextInput from "@/app/components/others/fields/textInput";
import Link from "next/link";
import { API_BASE_URL } from "@/app/utils/apiConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const router = useRouter();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Activamos el spinner

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
        setErrorMessage(errorData.message || "Correo no asociado a ningun usuario");
      }
    } catch (error) {
      setErrorMessage("Error correo inválido");
    } finally {
      setLoading(false); // Desactivamos el spinner después de la respuesta
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

    setLoading(true); // Activamos el spinner

    try {
      const response = await fetch(`${API_BASE_URL}/password/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Token inválido");
      }
    } catch (error) {
      setErrorMessage("Error de red: Intenta nuevamente.");
    } finally {
      setLoading(false); // Desactivamos el spinner después de la respuesta
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900 z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-blueButton h-16 w-16"></div>
        </div>
      )}
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
              <NormalButton text="Enviar" color="blueButton" size="large" disabled={loading} />
              <br />
              <label className="flex items-center">
                <span className="mr-2 text-gray6th">¿Ya tienes cuenta? </span>
                <Link href="/login">
                  <p className="text-blueButton hover:text-blueLight">Inicia sesión aquí</p>
                </Link>
              </label>
            </form>
          ) : (
            <form onSubmit={handleSubmitNewPassword} className="bg-white p-6 lg:p-8 rounded-lg w-full">
              <Text texto="Restablecer Contraseña" color="blueMain" type="bigTitle" />
              <Text texto="Ingresa tu nueva contraseña y el código enviado a tu correo" color="gray6th" type="description" />
              <br />
              <TextInput
                labelText="Código de verificación"
                labelColor="gray6th"
                inputSize="large"
                inputType="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
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

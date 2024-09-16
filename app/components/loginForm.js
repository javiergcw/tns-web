"use client";
import "/app/globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import { login } from "@/app/services/apiService";
import RememberMeAndForgotPassword from "@/app/components/login/rememberAndForgotpassword";
import RegisterStandart from "@/app/components/login/registerStandart";
import { ImagesPath } from "@/app/utils/assetsPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import LoaderOverlay from "@/app/utils/loaderOverlay";
import PublicRoute from "./publicRoute";
import PurchaseStatusB from "./login/purchaseStatus";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Nuevo estado para "Recordarme"
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Cargar los datos desde localStorage si existen
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberMeEmail");
    const storedPassword = localStorage.getItem("rememberMePassword");

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("profileId", response.data.profile_id);

      // Guardar o limpiar los datos en localStorage dependiendo de "Recordarme"
      if (rememberMe) {
        localStorage.setItem("rememberMeEmail", email);
        localStorage.setItem("rememberMePassword", password);
      } else {
        localStorage.removeItem("rememberMeEmail");
        localStorage.removeItem("rememberMePassword");
      }

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

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <ToastContainer autoClose={2000} />
      {/* Sección izquierda - Imagen corporativa */}
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
      {/* Sección derecha - Formulario de inicio de sesión */}
      <div className="w-full lg:w-2/4 h-screen flex justify-center items-center">
        <div className="w-full max-w-md p-4 lg:p-0">
          <form
            className="bg-white p-6 lg:p-8 rounded-lg w-full"
            onSubmit={handleLogin}
          >
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-600">
                  Recordarme
                </label>
              </div>
              <RememberMeAndForgotPassword />
            </div>


            {/* //<RememberMeAndForgotPassword/> */}
            <NormalButton
              text="Iniciar sesión"
              color="blueButton"
              size="large"
              additionalClasses="text-white"
            />
            <RegisterStandart />
            <PurchaseStatusB></PurchaseStatusB>
          </form>
        </div>
      </div>
      {loading && <LoaderOverlay />}
    </div>
  );
};

// Envuelve LoginForm con PublicRoute para proteger la ruta
export default PublicRoute(LoginForm);
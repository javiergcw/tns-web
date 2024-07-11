"use client";

import "/app/globals.css";
import { useState } from "react";
import { useRouter } from "next/router";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import { login } from "@/app/services/apiService";
import RememberMeAndForgotPassword from "@/app/components/login/rememberAndForgotpassword";
import RegisterStandart from "@/app/components/login/registerStandart";
import { ImagesPath } from "@/app/utils/assetsPath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import LoaderOverlay from "@/app/utils/loaderOverlay";
import Link from "next/link";

const LoginForm = () => {
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

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setLoading(true);
    router.push("/register");
  };

  return (
    <div className="flex h-screen">
      <ToastContainer autoClose={2000} />
      {/* Sección izquierda - Imagen corporativa */}
      <div className="w-2/4 h-screen flex justify-center items-center bg-slate-100">
        <Image
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          layout="intrinsic"
          width={500}
          height={500}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* Sección derecha - Formulario de inicio de sesión */}
      <div className="w-2/4 h-screen flex justify-center items-center">
        <div className="w-full max-w-md">
          <form className="bg-white p-8 rounded-lg w-full" onSubmit={handleLogin}>
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
            <NormalButton text="Iniciar sesión" color="blueButton" size="large" additionalClasses="text-white" />
            <RegisterStandart/>
            <br />
          </form>
        </div>
      </div>

      {loading && <LoaderOverlay />}
    </div>
  );
};

export default LoginForm;

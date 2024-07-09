"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/app/services/loginService";
import { ImagesPath } from "@/app/utils/assetsPath";
import Text from "./others/text/text";
import TextInput from "./others/fields/textInput";
import NormalButton from "./others/button/normalButton";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await register(email, password, confirmPassword, name);
      if (response) {
        setMessage("Usuario registrado con éxito");
        toast.success("Usuario registrado con éxito");
        // Guardar el token y redirigir a la página de inicio después de un tiempo
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("userId", response.data.id);
        setTimeout(() => {
          setLoading(false);
          router.push("/login");
        }, 3000); // 3 segundos de espera
      } else {
        setMessage("Error en el registro");
        toast.error("Error en el registro");
        setLoading(false);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/4 h-screen flex justify-center items-center bg-slate-100">
        <img
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="w-2/4 h-screen flex justify-center items-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg w-full"
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
              labelText="Email"
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

            <NormalButton
              text="Registrarse"
              color="blueButton"
              size="large"
              additionalClasses="text-white"
            />

            {message && <p className="mt-4 text-green-500">{message}</p>}
            <br />
            <label className="flex items-center">
              <span className="mr-2 text-gray6th">¿Ya tienes cuenta? </span>

              <Link href="/login">
                <p className="text-blueButton hover:text-blueLight">
                  Inicia sesión aquí
                </p>
              </Link>
            </label>
          </form>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default RegisterForm;

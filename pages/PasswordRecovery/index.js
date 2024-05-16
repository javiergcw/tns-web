"use client";
import EmailInput from "@/app/components/others/fields/emailInput";
import NormalBlueButton from "@/app/components/others/button/normalBlueButton";
import "/app/globals.css";

export default function PasswordRecovery() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#004F9F]">
        {/* Div del formulario */}
        <div className="w-1/3 p-8 bg-white shadow-md rounded-md">
          <h1 className="text-center text-[#1e73be] text-2xl mb-4 font-semibold">
            Recuperar Contraseña
          </h1>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Por favor, introduce tu correo electrónico:
          </label>
          <EmailInput />
          <div className="mt-6">
            <NormalBlueButton>Enviar correo recuperador</NormalBlueButton>
          </div>
        </div>
      </div>
    </>
  );
}

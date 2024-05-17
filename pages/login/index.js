"use client";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";

export default function Login() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sección izquierda - Imagen corporativa */}
        <div className="w-full h-screen m-0 bg-[#004F9F]">
          <img
            src="/images/logo-vertical.png"
            alt="Descripción de la imagen"
            className="w-screen h-screen"
          />
        </div>
        {/* Segundo Div - formulario */}
        <div className="w-2/3 flex justify-center items-center bg-slate-100">
          <form
            className="w-1/2 m-8 p-10 bg-white shadow-md"
            action="#"
            method="POST"
          >
            <Text texto="LOGIN" color="blue" type="title" />
            <Text
              texto="Enter your email and password to login"
              color="grey"
              type="subtitle"
            />
            <Text texto="Email address" color="black" type="normal" />
            <TextInput
              labelText=""
              labelColor="blue"
              inputSize="large"
              inputType="email"
            />
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
            <Text
              texto="Forgot your password?"
              color="blue"
              type="normal"
              className="mt-5"
            />
            <NormalButton text="Login" color="blue" size="large" />
          </form>
        </div>
      </div>
    </>
  );
}

'use client';
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";

/**
 * Login Page
 *
 * Esta página de inicio de sesión está dividida en dos secciones: una imagen corporativa a la izquierda y un formulario de inicio de sesión a la derecha.
 * Utiliza componentes reutilizables como `TextInput`, `NormalButton` y `Text` para la estructura y el diseño.
 *
 * @component
 */
export default function Login() {
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
            <Text
              texto="Forgot your password?"
              color="blue"
              type="normal"
              className="mt-5"
            />
            {/* Botón de envío del formulario */}
            <NormalButton text="Login" color="blue" size="large" />
          </form>
        </div>
      </div>
    </>
  );
}

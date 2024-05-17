"use client";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";

export default function PasswordRecovery() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#004F9F]">
        {/* Div del formulario */}
        <div className="w-1/3 p-8 bg-white shadow-md rounded-md">
          <Text 
            texto="Recuperar Contraseña" 
            color="blue" 
            type="title" 
          />
          <Text 
            texto="Por favor, introduce tu correo electrónico: " 
            color="grey" 
            type="subtitle" 
          />
          <TextInput 
            labelText="Correo Electrónico"
            labelColor="blue"
            inputSize="large"
            inputType="email"
          />
          <div className="mt-6">
            <NormalButton 
              text="Enviar correo recuperador"
              color="blue"
              size="large"
            />
          </div>
        </div>
      </div>
    </>
  );
}

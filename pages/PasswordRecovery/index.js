'use client';
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";

/**
 * PasswordRecovery Page
 * 
 * Esta página de recuperación de contraseña contiene un formulario simple que solicita la dirección de correo electrónico del usuario
 * para enviar un correo de recuperación. Utiliza componentes reutilizables como `TextInput`, `NormalButton` y `Text` 
 * para la estructura y el diseño.
 * 
 * @component
 */
export default function PasswordRecovery() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blueSecundary">
        {/* Sección del formulario */}
        <div className="w-1/3 p-8 bg-white shadow-md rounded-md">
          {/* Título del formulario */}
          <Text 
            texto="Recuperar Contraseña" 
            color="blue" 
            type="title" 
          />
          {/* Instrucciones del formulario */}
          <Text 
            texto="Por favor, introduce tu correo electrónico:" 
            color="grey" 
            type="subtitle" 
          />
          <br></br>
          {/* Campo de entrada para la dirección de correo electrónico */}
          <TextInput 
            labelText="Correo Electrónico"
            labelColor="blue"
            inputSize="large"
            inputType="email"
          />
          {/* Botón para enviar el correo de recuperación */}
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

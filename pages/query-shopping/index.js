// src/pages/index.js
"use client";
import "/app/globals.css";
import { useState } from "react";
import { ImagesPath } from "@/app/utils/assetsPath";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import TextInput from "@/app/components/others/fields/textInput";
import Link from "next/link";

const QueryShopping = () => {
  const [query, setQuery] = useState("");

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
            //onSubmit={}
            className="bg-white p-8 rounded-lg w-full"
          >
            <Text
              texto="CONSULTA ESTADƒO DE COMPRA"
              color="blueMain"
              type="bigTitle"
            />

            <br />
            <TextInput
              labelText="Consulta tu número de compra"
              labelColor="gray6th"
              inputSize="large"
              inputType="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <NormalButton text="Enviar" color="blueButton" size="large" />

            <NormalButton text="Cancelar" color="redPrimary" size="large" />

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
    </div>
  );
};

const QueryShoppingPage = () => <QueryShopping />;

export default QueryShoppingPage;

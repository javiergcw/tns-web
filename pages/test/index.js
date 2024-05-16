"use client";
import EmailInput from "@/app/components/others/fields/emailInput";
import PasswordInput from "@/app/components/others/fields/passwordInput";
import NormalBlueButton from "@/app/components/others/button/normalBlueButton";
import "/app/globals.css";

export default function admissions() {
  return (
    <>
      <div className="columns-2 gap-0 space-x-0 bg-slate-100">
        {/* primer Div - imagen corporativa */}
        <div className="w-full h-screen m-0 bg-[#004F9F]">
          <img
            src="/images/logo-vertical.png"
            alt="Descripción de la imagen"
            className="w-screen h-screen"
          />
        </div>
        {/* Segundo Div - formulario */}

        <div class="w-full h-screen p-8 flex justify-center ">
          <form
            class="w-1/2 m-8 p-10 bg-white shadow-md "
            action="#"
            method="POST"
          >
            <strong>
              <h1 className="text-center text-[#1e73be] md:text-center mb-4 mt-4">
                LOGIN
              </h1>
              <label
                for="Email"
                class="block text-sm font-medium leading-6 text-gray-900 mb-10"
              >
                Enter your email and password to login
              </label>
            </strong>
            <label
              for="Email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <EmailInput />
            <label
              for="Password"
              class="block text-sm font-medium leading-6 text-gray-900 mt-5"
            >
              Password
            </label>
            <PasswordInput />

            <label
              for="Email"
              class="block text-sm font-medium leading-6 text-[#1e73be] mt-5"
            >
              forgot your password?
            </label>
            <NormalBlueButton/>
          </form>
        </div>
      </div>
    </>
  );
}

import React from "react";
import Link from "next/link";

const RememberMeAndForgotPassword = () => {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blueButton hover:text-blueLight"
        />
        <span className="ml-2 text-blueButton">Recordarme</span>
      </label>
      <Link href="/forgot-password">
        <p className="text-blueButton hover:text-blueLight">
          ¿Olvidaste tu contraseña?
        </p>
      </Link>
    </div>
  );
};

export default RememberMeAndForgotPassword;

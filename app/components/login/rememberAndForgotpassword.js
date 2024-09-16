import React from "react";
import Link from "next/link";

const RememberMeAndForgotPassword = () => {
  return (
    <div className="flex items-center justify-between">

      <Link href="/forgot-password">
        <p className="text-blueButton hover:text-blueLight">
          ¿Olvidaste tu contraseña?
        </p>
      </Link>
    </div>
  );
};

export default RememberMeAndForgotPassword;

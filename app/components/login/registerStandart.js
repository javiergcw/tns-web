import React from "react";
import Link from "next/link";

const RegisterStandart = () => {
  return (
    <div className="mt-4">
      <span className="text-gray-600">¿Aún no tienes una cuenta? </span>
      <Link href="/register">
        <span className="text-blueButton hover:text-blueLight">
          Regístrate Aquí
        </span>
      </Link>
    </div>
  );
};

export default RegisterStandart;

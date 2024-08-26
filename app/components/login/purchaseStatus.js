import React from "react";
import Link from "next/link";

const PurchaseStatusB = () => {
  return (
    <div className="mt-4">
      <span className="text-gray-600">Consulta el estado de tu compra </span>
      <Link href="/purchaseStatus">
        <span className="text-blueButton hover:text-blueLight">
          aquí
        </span>
      </Link>
    </div>
  );
};

export default PurchaseStatusB;

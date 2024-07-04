'use client';
import "/app/globals.css";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";

export default function Login() {
  const columns = ["Nombre", "Apellido", "Edad", "Correo"];
  const data = [
    ["Juan", "Pérez", 25, "juan.perez@example.com"],
    ["María", "García", 30, "maria.garcia@example.com"],
    ["Carlos", "Sánchez", 35, "carlos.sanchez@example.com"],
  ];

  return (
    <>
      <div className="w-2/3 flex justify-center items-center bg-slate-100">
        <CircularDiagram/>
      </div>
    </>
  );
}

"use client";
import "/app/globals.css";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Drawer from "@/app/components/others/drawer/drawer";
import Container from "@/app/components/dashboard/container/container";
import { useState } from "react";
import MonthlyExpenses from "@/app/components/dashboard/monthlyExpenses/monthlyExpenses";
import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";

/**
 * Login Page
 *
 * Esta página muestra un dashboard con un drawer navegable, un carrusel de peticiones recientes,
 * un componente de gastos mensuales y una tabla de seguimiento de peticiones.
 *
 * @component
 */

// Datos de ejemplo para MonthlyExpenses
const expensesData = [
  { value: 456100, title: "Compra computador" },
  { value: 456200, title: "Compra cuadernos" },
  { value: 456100, title: "Compra curso" },
  { value: 1456100, title: "Compra libros" },
  { value: 456100, title: "Compra computador" },
];

// Datos de ejemplo para RequestsCarousel
const requestsData = [
  {
    area: "SISTEMAS",
    leader: "Jaime Piedrata Lozano",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ex a lorem viverra eleifend ac ut massa. Vestibulum ante ipsum primis in faucibus orci.",
  },
  {
    area: "FINANZAS",
    leader: "María García Pérez",
    description:
      "Suspendisse potenti. Sed ut eros vitae ipsum convallis venenatis. Curabitur at velit sit amet est consequat bibendum.",
  },
  {
    area: "RECURSOS HUMANOS",
    leader: "Carlos Rodríguez Díaz",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean nec arcu efficitur, fermentum nisi et, pretium urna.",
  },
  {
    area: "COMPRAS",
    leader: "Ana Fernández López",
    description:
      "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.",
  },
  {
    area: "RECURSOS HUMANOS",
    leader: "Carlos Rodríguez Díaz",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean nec arcu efficitur, fermentum nisi et, pretium urna.",
  },
  {
    area: "COMPRAS",
    leader: "Ana Fernández López",
    description:
      "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.",
  },
  {
    area: "RECURSOS HUMANOS",
    leader: "Carlos Rodríguez Díaz",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean nec arcu efficitur, fermentum nisi et, pretium urna.",
  },
  {
    area: "COMPRAS",
    leader: "Ana Fernández López",
    description:
      "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.",
  },
];

// Calcula el total de los gastos
const totalExpenses = expensesData.reduce(
  (acc, expense) => acc + expense.value,
  0
);

// Datos de ejemplo para TrackingTable
const trackingData = [
  {
    item: "computador",
    leader: "Mateo Lopez",
    status: "Aprobado",
    requestDate: "01/01/1999",
    approvedDate: "02/01/1999",
    endDate: "03/01/1999",
  },
  {
    item: "libro la trova",
    leader: "Bibliotecaria",
    status: "cancelado",
    requestDate: "05/05/2023",
    approvedDate: "",
    endDate: "05/06/2024",
  },
  {
    item: "computador",
    leader: "Mateo Lopez",
    status: "Aprobado",
    requestDate: "01/01/1999",
    approvedDate: "02/01/1999",
    endDate: "03/01/1999",
  },
  {
    item: "libro la trova",
    leader: "Bibliotecaria",
    status: "cancelado",
    requestDate: "05/05/2023",
    approvedDate: "",
    endDate: "05/06/2024",
  },
  {
    item: "computador",
    leader: "Mateo Lopez",
    status: "Aprobado",
    requestDate: "01/01/1999",
    approvedDate: "02/01/1999",
    endDate: "03/01/1999",
  },
  {
    item: "libro la trova",
    leader: "Bibliotecaria",
    status: "cancelado",
    requestDate: "05/05/2023",
    approvedDate: "",
    endDate: "05/06/2024",
  },
];

/**
 * dashboardManager Page
 *
 * Esta page muestra la inofrmacion necesaria para el administrador
 * @component
 */

export default function dashboardManager() {
  // Estado para controlar si el drawer está abierto o cerrado
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Función para alternar el estado del drawer
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    // Contenedor principal con flex para el layout
    <div className="flex h-screen overflow-hidden">
      {/* Drawer que se puede alternar */}
      <Drawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle} />
      {/* Contenedor principal que ajusta su margen según el estado del drawer */}
      <Container isDrawerOpen={isDrawerOpen}>
        <hr className="my-5" />
        {/* Carrusel de peticiones recientes */}
        <RequestsCarousel requestsData={requestsData} />
        <hr className="my-5" />
        {/* Componente de gastos mensuales */}
     
        <hr className="my-5" />
        {/* Tabla de seguimiento de peticiones */}
        <TrackingTable data={trackingData} />
      </Container>
    </div>
  );
}

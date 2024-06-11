"use client";
import "/app/globals.css";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Drawer from "@/app/components/others/drawer/drawer";
import Container from "@/app/components/dashboard/container/container";
import { useState } from "react";
import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";
import Text from "@/app/components/others/text/text";

/**
 * PurchaseDetails Page
 *
 * Esta page muestra la información realacionada con una compra especifica.
 * @component
 */

export default function purchaseDetails() {
  // Estado para controlar si el drawer está abierto o cerrado
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Función para alternar el estado del drawer
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Drawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle} />
      <Container isDrawerOpen={isDrawerOpen}>
        <Text texto="PURCHASE DETAILS" color="blue" type="title" />
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden"><p>hola</p></div>
        <div class="columns-3">
          
        </div>
      </Container>
    </div>
  );
}

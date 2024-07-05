"use client";
import "/app/globals.css";
import React from "react";
import Drawer from "@/app/components/others/drawer/drawer";
import { useState, useEffect } from "react";
import Container from "@/app/components/dashboard/container/container";
import FiltersComponent from "@/app/components/view-product/view-product";
import Text from "@/app/components/others/text/text";

export default function ViewProduct() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Drawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle} />
      <Container isDrawerOpen={isDrawerOpen}>
        <hr className="my-5" />
        <Text texto="COMPRAS" color="blue-secondary" type="header" />

        <hr className="my-5" />
        <FiltersComponent />
        <product />
      </Container>
    </div>
  );
}

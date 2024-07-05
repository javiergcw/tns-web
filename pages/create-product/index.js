"use client";
import "/app/globals.css";
import React from "react";
import Drawer from "@/app/components/others/drawer/drawer";
import { useState, useEffect } from "react";
import Container from "@/app/components/dashboard/container/container";
import CreatePurchaseForm from "@/app/components/others/container/createPurchaseForm";

export default function CreateProduct() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Drawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle} />
      <Container isDrawerOpen={isDrawerOpen}>
        <CreatePurchaseForm />
      </Container>
    </div>
  );
}

"use client";
import "/app/globals.css";
import React from "react";
import Drawer from "@/app/components/others/drawer/drawer";
import { useState, useEffect } from "react";

export default function CreateProduct() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Drawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle} />
      crate product
    </div>
  );
}

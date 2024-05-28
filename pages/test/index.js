"use client";
import React, { useState } from "react";
import Drawer from "@/app/components/others/drawer/drawer";
import CircleAvatar from "@/app/components/others/circleAvatar/circleAvatar";
import TextInput from "@/app/components/others/fields/textInput";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";

const Profile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Drawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle} />
      <div className="ml-20" isDrawerOpen={isDrawerOpen}>
        <div className="p-8 bg-white rounded-md shadow-md w-full max-w-4xl mx-auto">
          <Text texto="MI PERFIL" color="blue" type="header" />
          <div className="flex flex-col items-center mt-8">
            <CircleAvatar
              imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              borderColor="green"
              size="big"
            />
            <form className="w-full mt-8 space-y-4">
              <TextInput labelText="Nombre completo:" labelColor="blue" inputSize="large" inputType="text" />
              <TextInput labelText="Celular:" labelColor="blue" inputSize="large" inputType="text" />
              <TextInput labelText="Contraseña:" labelColor="blue" inputSize="large" inputType="password" />
              <NormalButton text="Guardar" color="blue" size="large" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

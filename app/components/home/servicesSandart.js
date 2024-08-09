"use client";

import React, { useEffect, useState } from "react";
import SocialMedia from "./socialMedia";
import ResponsiveTriangles from "./triangle";
import "../../globals.css";
import { ImagesPath } from "@/app/utils/assetsPath";

// Componente ServicesStandart
const ServicesStandart = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full bg-[#004f9f] px-4 py-8">
      <ContainerService
        title="Proyecto educativo"
        text="Conoce nuestro proyecto educativo"
        imageUrl={ImagesPath.rocket}
        href="https://drive.google.com/file/d/1kJfbDVMG2Bl36uECJL-gY87miejbMPI-/view?usp=sharing"
      />
      <ContainerService
        title="Reglamento interno de trabajo"
        text="Reglamento interno de trabajo"
        imageUrl={ImagesPath.rules}
        href="https://drive.google.com/file/d/1n3JxMB0Io2ITXErKz-NLxun0UeYfXIYH/view?usp=sharing"
      />
      <ContainerService
        title="Resolucion de costos educativos"
        text="Vigente para los años 2024-2025"
        imageUrl={ImagesPath.money}
        href="https://drive.google.com/file/d/1oha_AkRS85DfrONBL8VWhHQ8NYL2bCrC/view"
      />

      <ContainerService
        title="Utiles escolares"
        text="Vigente para los años 2024-2025"
        imageUrl={ImagesPath.backpack}
        href="https://drive.google.com/file/d/1xd9BXj2NDgOLlqeAetadnkpHjMGLgJAw/view?usp=sharing"
      />
      <ContainerService
        title="Manual de convivencia"
        text="Lee nuestro manual de convivencia"
        imageUrl={ImagesPath.people}
        href="https://drive.google.com/file/d/1dfQFNVT9u-3l3-Qm36qkYiefvnLr4t00/view"
      />
      <ContainerService
        title="Costos"
        text="Vigente para los años 2024-2025"
        imageUrl={ImagesPath.money}
        href="https://drive.google.com/file/d/1qnQYq5PiKRpvgOoqkjtJm8VDZA7VIK7d/view?usp=sharing"
      />
      <SocialMedia />
    </div>
  );
};

export default ServicesStandart;

const ContainerService = ({ title, text, imageUrl, href }) => {
  return (
    <a
      href={href}
      className="group block text-center w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
    >
      <div className="p-4 transform transition duration-300 ease-in-out hover:-translate-y-2">
        <div className="w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="mx-auto w-auto h-24 object-scale-down"
          />
        </div>
        <h3 className="text-white text-md mt-3 font-bold">{title}</h3>
        <p className="text-white mt-2 text-xs sm:text-sm">{text}</p>
      </div>
    </a>
  );
};

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
        href="https://drive.google.com/file/d/1O_f1s9jdCwhFjk9U1Ml49dp5PeKnAq3U/view?usp=sharing"
      />
      <ContainerService
        title="Reglamento interno de trabajo"
        text="Reglamento interno de trabajo"
        imageUrl={ImagesPath.rules}
        href="https://drive.google.com/file/d/1n3JxMB0Io2ITXErKz-NLxun0UeYfXIYH/view?usp=sharing"
      />
      <ContainerService
        title="Resolucion de costos educativos"
        text="Vigente para los años 2025-2026"
        imageUrl={ImagesPath.money}
        href="https://drive.google.com/file/d/1l96twazMz181JDEsVPRXoUvUtPGc25cY/view?usp=sharing"
      />

      <ContainerService
        title="Utiles escolares"
        text="Vigente para los años 2025-2026"
        imageUrl={ImagesPath.backpack}
        href="https://drive.google.com/file/d/1Q7kJldPJxyfP2nsnH1CPgRI33JwPGD__/view?usp=sharing"
      />
      <ContainerService
        title="Manual de convivencia"
        text="Lee nuestro manual de convivencia"
        imageUrl={ImagesPath.people}
        href="https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EZc7ye1H9_BCvV77XVn_1ZABsyafQVQEvO0BdWj_dVzRng?e=OFa5kG"
      />
      <ContainerService
        title="Costos"
        text="Vigente para los años 2025-2026"
        imageUrl={ImagesPath.money}
        href="https://drive.google.com/file/d/10VAnKRM6O3o6yQKS_zuGNvlN7brpcFV7/view?usp=sharing"
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

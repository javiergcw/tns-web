"use client"
import React from 'react';
import PhotoGallery from './instagram/photoGallery';

// SocialMedia ajustado para responsividad
const SocialMedia = () => {
  return (
    <div className="w-full flex justify-center flex-wrap gap-4 p-4">
      <div className="flex justify-center items-center m-2  w-full sm:w-1/2 md:w-1/3">
        <PhotoGallery  />
      </div>
      <div className="flex justify-center items-center bg-blue-300 m-2 w-full sm:w-1/2 md:w-1/3">
        <p>Facebook</p>
      </div>
    </div>
  );
};


export default SocialMedia;



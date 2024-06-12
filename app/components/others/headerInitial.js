import { ImagesPath } from '@/app/utils/imagesPath';
import React from 'react';

const HeaderInitial = () => {
  return (
    <div className="w-full">
      {/* Asegúrate de que la ruta a la imagen sea correcta */}
      <img src={ImagesPath.bk} alt="Descripción" className="w-full h-48" />
    </div>
  );
}

export default HeaderInitial;
import React from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/solid'; // Asegúrate de instalar heroicons si aún no lo has hecho

const ReadMoreButton = () => {
    return (
        <button className="flex items-center border border-gray-300 bg-whiteBg1 rounded-lg overflow-hidden focus:outline-none group text-sm">
            <span className="flex items-center transition-colors justify-center bg-whiteBg2 ease-in-out group-hover:bg-whiteBg3 text-white p-2 rounded-l-lg">
                <Squares2X2Icon className="text-gray4th h-4 w-4" /> {/* Ajustado para mantener proporcionalidad */}
            </span>
            <span className="px-2 py-1 transition-colors duration-300 ease-in-out group-hover:bg-whiteBg2 text-gray3th flex-1">
                Read more
            </span>
        </button>
    );
};

export default ReadMoreButton;

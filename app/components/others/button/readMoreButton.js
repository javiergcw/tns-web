import React from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/solid'; // Asegúrate de instalar heroicons si aún no lo has hecho

const ReadMoreButton = () => {
    return (
        <button className="flex items-center border border-gray-300 bg-[#F6F6F6] rounded-lg overflow-hidden focus:outline-none group text-sm">
            <span className="flex items-center transition-colors justify-center bg-[#EAEAEA] ease-in-out group-hover:bg-[#DEDEDE] text-white p-2 rounded-l-lg">
                <Squares2X2Icon className="text-[#757575] h-4 w-4" /> {/* Ajustado para mantener proporcionalidad */}
            </span>
            <span className="px-2 py-1 transition-colors duration-300 ease-in-out group-hover:bg-[#EAEAEA] text-[#8D8D8D] flex-1">
                Read more
            </span>
        </button>
    );
};

export default ReadMoreButton;

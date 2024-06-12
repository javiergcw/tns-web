import React from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/solid'; // Asegúrate de instalar heroicons si aún no lo has hecho

const ReadBlueButton = ({ buttonText = 'Read more', redirectUrl }) => {
    const handleClick = () => {
        if (redirectUrl) {
            window.open(redirectUrl, '_blank');
        }
    };
    return (
        <button
            onClick={handleClick}
            className="flex items-center border border-gray-300 bg-blueLight rounded-lg overflow-hidden focus:outline-none group text-sm"
        >
            <span className="flex items-center transition-colors justify-center bg-[#448AC6] ease-in-out group-hover:bg-[#4183BB] text-white p-2 rounded-l-lg">
                <Squares2X2Icon className="text-[#224563] h-4 w-4" /> {/* Ajustado para mantener proporcionalidad */}
            </span>
            <span className="px-2 py-1 transition-colors duration-300 ease-in-out group-hover:bg-[#448AC5] text-white flex-1">
                {buttonText}
            </span>
        </button>
    );
};

export default ReadBlueButton;

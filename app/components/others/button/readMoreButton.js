import React from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/solid'; // Asegúrate de instalar heroicons si aún no lo has hecho

const ReadMoreButton = () => {
    return (
        <button className="flex items-center border border-gray-300 bg-gray-200 rounded-lg overflow-hidden focus:outline-none group">
            <span className="flex items-center transition-colors justify-center bg-gray-400 ease-in-out group-hover:bg-gray-600 text-white p-2 rounded-l-lg">
                <Squares2X2Icon className="h-6 w-6" />
            </span>
            <span className="px-4 py-2 transition-colors duration-300 ease-in-out group-hover:bg-gray-600 text-gray-700 group-hover:text-white flex-1">
                Read more
            </span>
        </button>
    );
};

export default ReadMoreButton;

import React from 'react';

const NormalBlueButton = ({ buttonText = 'LOGIN', redirectUrl }) => {
    const handleClick = () => {
        if (redirectUrl) {
            window.open(redirectUrl, '_blank');
        }
    };
    return (
        <button
            onClick={handleClick}
            className="flex items-center w-full border border-gray-300 bg-[#4891D1] rounded-lg overflow-hidden focus:outline-none group text-sm mt-5"
        >
            <span className="px-2 py-1 transition-colors duration-300 ease-in-out group-hover:bg-[#448AC5] text-white flex-1">
                {buttonText}
            </span>
        </button>
    );
};

export default NormalBlueButton;

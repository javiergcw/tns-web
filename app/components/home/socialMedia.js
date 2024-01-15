import React from 'react';

const SocialMedia = () => {
    return (
        <div className="flex  p-10"> {/* Ajusta el color del fondo y el padding */}
            <div className="flex-1 flex items-center justify-center bg-blue-300 m-2 h-40 w-40"> {/* Ajusta el color del fondo y los márgenes */}
                <p>Instagram</p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-blue-300 m-2 h-40 w-40"> {/* Ajusta el color del fondo y los márgenes */}
                <p>Facebook</p>
            </div>
        </div>
    );
}

export default SocialMedia;


'use client'
import React, { useState, useEffect } from 'react';

const ResponsiveTriangles = () => {
    const [sizes, setSizes] = useState({
        baseSize: 30,
        middleSize: 45,
        baseBorderSize: 30,
        middleBorderSize: 40,
    });

    useEffect(() => {
        // Función para ajustar tamaños basados en el ancho de la ventana
        const adjustSizes = () => {
            if (window.innerWidth <= 768) {
                setSizes({
                    baseSize: 20,
                    middleSize: 30,
                    baseBorderSize: 20,
                    middleBorderSize: 25,
                });
            } else if (window.innerWidth <= 480) {
                setSizes({
                    baseSize: 15,
                    middleSize: 22,
                    baseBorderSize: 15,
                    middleBorderSize: 18,
                });
            } else {
                setSizes({
                    baseSize: 30,
                    middleSize: 45,
                    baseBorderSize: 30,
                    middleBorderSize: 40,
                });
            }
        };

        // Ajustar los tamaños al montar y en cambios del tamaño de la ventana
        adjustSizes();
        window.addEventListener('resize', adjustSizes);

        // Limpiar el evento al desmontar
        return () => window.removeEventListener('resize', adjustSizes);
    }, []);

    const { baseSize, middleSize, baseBorderSize, middleBorderSize } = sizes;

    return (
        <div className="flex justify-center">
            <div className="flex justify-center items-end">
                <div style={{ width: 0, height: 0, borderBottom: `${baseSize}px solid #004F9F`, borderLeft: `${baseBorderSize}px solid transparent`, borderRight: `${baseBorderSize}px solid transparent` }}></div>
                <div style={{ width: 0, height: 0, borderBottom: `${middleSize}px solid #004F9F`, borderLeft: `${middleBorderSize}px solid transparent`, borderRight: `${middleBorderSize}px solid transparent`, margin: '0 1px' }}></div>
                <div style={{ width: 0, height: 0, borderBottom: `${baseSize}px solid #004F9F`, borderLeft: `${baseBorderSize}px solid transparent`, borderRight: `${baseBorderSize}px solid transparent` }}></div>
            </div>
        </div>
    );
};

export default ResponsiveTriangles;

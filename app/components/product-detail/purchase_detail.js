import React, { useState, useEffect } from 'react';
import { getShoppingById } from '@/app/services/shoppingService';

const CustomComponent = ({ shoppingId }) => {
    const [purchaseStatus, setPurchaseStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShopping = async () => {
            try {
                const shoppingData = await getShoppingById(shoppingId);
                console.log('shoppingData:', JSON.stringify(shoppingData, null, 2));
                console.log('Has logs?', shoppingData.hasOwnProperty('logs'), 'Logs:', shoppingData.logs);
                setPurchaseStatus(shoppingData);
            } catch (err) {
                console.error('Error fetching shopping:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                });
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShopping();
    }, [shoppingId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const items = purchaseStatus ? purchaseStatus.products : [];

    // Función para formatear fechas
    const formatDate = (dateString) => {
        return dateString
            ? new Date(dateString).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            : 'N/A';
    };

    // Función para formatear moneda
    const formatCurrency = (value) => {
        const numericValue = parseFloat(value);
        return !isNaN(numericValue)
            ? new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(numericValue)
            : 'N/A';
    };

    // Función auxiliar para obtener la información del log de creación
    const getCreationLogInfo = () => {
        console.log('purchaseStatus:', JSON.stringify(purchaseStatus, null, 2));
        if (!purchaseStatus?.logs || !Array.isArray(purchaseStatus.logs)) {
            console.log('No logs found or logs is not an array:', purchaseStatus?.logs);
            return { name: 'N/A', date: 'N/A' };
        }

        const creationLog = purchaseStatus.logs.find(log => log.status?.trim().toLowerCase() === 'creado');
        console.log('creationLog:', creationLog);

        if (!creationLog) {
            console.log('No creation log found in:', purchaseStatus.logs);
            return { name: 'N/A', date: 'N/A' };
        }

        const name = creationLog.user?.profile?.name || 'N/A';
        const date = formatDate(creationLog.created_at_date);

        console.log('Creation log info:', { name, date, rawDate: creationLog.created_at_date });
        return { name, date };
    };

    // Obtener la información del log
    const { name: creatorName, date: creatorDate } = getCreationLogInfo();

    return (
        <div className="flex flex-col lg:flex-row p-4 bg-gray-100">
            <div className="flex flex-col items-start p-4 bg-gray-100 w-full lg:w-4/6">
                {/* Título y descripción */}
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg w-full mb-4">
                    <p className="text-lg text-black lg:text-2xl font-bold mb-2">{purchaseStatus.title || "Título no disponible"}</p>
                    <p className="text-black">{purchaseStatus.description || "Descripción no disponible"}</p>
                </div>

                {/* Información adicional */}
                {purchaseStatus && (
                    <div className="flex flex-wrap justify-between w-full mb-4">
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-3">
                            <span className="text-2xl lg:text-3xl">📅</span>
                            <p className="text-gray-700 font-bold">Fecha</p>
                            <p className="text-gray-700">{new Date(purchaseStatus.request_date).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-3">
                            <span className="text-2xl lg:text-3xl">📋</span>
                            <p className="text-gray-700 font-bold">Estado</p>
                            <p className="text-gray-700">{purchaseStatus.status.name}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-3">
                            <span className="text-2xl lg:text-3xl">🧑🏻</span>
                            <p className="text-gray-700 font-bold">Líder</p>
                            <p className="text-gray-700">{purchaseStatus.user.profile.name}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-3">
                            <span className="text-2xl lg:text-3xl">🚀</span>
                            <p className="text-gray-700 font-bold">Innovación</p>
                            <p className="text-gray-700">{purchaseStatus.innovated ? '✔️' : '❌'}</p>
                        </div>
                    </div>
                )}

                {/* Nuevos contenedores para retefuente, subtotal y total */}
                {purchaseStatus && (
                    <div className="flex flex-wrap justify-between w-full">
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-0">
                            <span className="text-2xl lg:text-3xl">🧾</span>
                            <p className="text-gray-700 font-bold">Subtotal</p>
                            <p className="text-gray-700">{formatCurrency(purchaseStatus.subtotal)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-0">
                            <span className="text-2xl lg:text-3xl">🧮</span>
                            <p className="text-gray-700 font-bold">IVA</p>
                            <p className="text-gray-700">{formatCurrency(purchaseStatus.iva)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-0">
                            <span className="text-2xl lg:text-3xl">💰</span>
                            <p className="text-gray-700 font-bold">ReteFuente</p>
                            <p className="text-gray-700">{formatCurrency(purchaseStatus.retefuente)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/5 mx-1 mb-4 lg:mb-0">
                            <span className="text-2xl lg:text-3xl">💳</span>
                            <p className="text-gray-700 font-bold">Total</p>
                            <p className="text-gray-700">{formatCurrency(purchaseStatus.total)}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Listado de productos */}
            <div className="flex flex-col items-start px-4 py-4 bg-gray-100 w-full lg:w-2/6 overflow-y-auto" style={{ maxHeight: '700px' }}>
                <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full">
                    <span className="text-2xl lg:text-3xl">✍️</span>
                    <p className="text-gray-700 font-bold">Creado por</p>
                    <p className="text-gray-700">{creatorName}</p>
                    <p className="text-gray-700">{creatorDate}</p>
                </div>
                {items.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-lg mb-4 w-full h-auto flex-shrink-0">
                        <h3 className="text-black lg:text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-black">{item.description}</p>
                        <p className="text-black">Precio: {formatCurrency(item.price)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomComponent;
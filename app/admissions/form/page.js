// app/admissions/form/page.js

"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Provider } from 'react-redux';
import store from '../../store/store';
import MainLayout from '@/app/components/layout/mainLayout';

const AdmissionsVideoPage = () => {
    const [isVideoFinished, setIsVideoFinished] = useState(false);

    const handleVideoEnd = () => {
        setIsVideoFinished(true);
    };

    const handleReplay = () => {
        setIsVideoFinished(false);
    };

    return (
        <Provider store={store}>
            <MainLayout>
                <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">

                    {!isVideoFinished ? (
                        <div className="w-full max-w-[400px]">
                            <h1 className="text-3xl font-bold text-center text-blueButton mb-8">Proceso de Admisiones</h1>
                            <video
                                // --- CAMBIO AQUÍ: Usamos la URL de tu servidor S3 ---
                                src="https://s3.thenewschool.edu.co/my-bucket-1/videos/admissions-video.mp4"
                                autoPlay
                                muted
                                playsInline
                                onEnded={handleVideoEnd}
                                controls
                                className="w-full h-auto rounded-lg shadow-2xl"
                            >
                                Tu navegador no soporta la etiqueta de video.
                            </video>
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-white rounded-lg shadow-2xl animate-fade-in">
                            <h2 className="text-3xl font-bold text-blueButton mb-4">¡Gracias por tu interés!</h2>
                            <p className="text-gray-700 mb-6">El siguiente paso es agendar una cita con nuestro equipo.</p>
                            <Link
                                href="https://outlook.office.com/book/INGRESOPADRESNUEVOS@thenewschool.edu.co/?ismsaljsauthenabled"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blueButton text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                Agendar Cita Ahora
                            </Link>

                            <div className="mt-4">
                                <button
                                    onClick={handleReplay}
                                    className="text-sm text-gray-600 hover:text-blueButton hover:underline focus:outline-none"
                                >
                                    Ver video de nuevo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </MainLayout>
        </Provider>
    );
};

export default AdmissionsVideoPage;
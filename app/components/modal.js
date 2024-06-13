// components/Modal.js
import { useEffect } from 'react';

const Modal = ({ setShowModal }) => {

  useEffect(() => {
    const acceptButton = document.getElementById('accept-button');
    const declineButton = document.getElementById('decline-button');
    const closeButton = document.getElementById('close-modal');

    acceptButton.addEventListener('click', () => {
      window.location.href = '/videos'; // Cambia esta URL a donde quieras redirigir
    });

    const hideModal = () => {
      setShowModal(false);
    };

    declineButton.addEventListener('click', hideModal);
    closeButton.addEventListener('click', hideModal);

    return () => {
      acceptButton.removeEventListener('click', () => {});
      declineButton.removeEventListener('click', hideModal);
      closeButton.removeEventListener('click', hideModal);
    };
  }, [setShowModal]);

  return (
    <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">¡Aviso importante! </h3>
            <button type="button" id="close-modal" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
            Estimado estudiante,

No olvides completar el proceso de matrícula a tiempo para asegurar tu lugar en el próximo ciclo académico. Es crucial que sigas todos los pasos detallados en los videos guía proporcionados por la institución. Estos videos contienen instrucciones claras y precisas que te ayudarán a realizar el proceso de manera eficiente y sin contratiempos. Asegúrate de tener todos los documentos necesarios y de verificar cada uno de los requisitos antes de proceder.
            </p>
            <p className="text-base font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
            Además, es importante que estés atento a las fechas límite y a cualquier actualización que pueda surgir durante el proceso de matrícula. La guía de videos está diseñada para facilitarte el camino y garantizar que no te pierdas ningún detalle importante. Siguiendo estas instrucciones al pie de la letra, podrás completar tu matrícula de manera exitosa y sin inconvenientes.
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button id="accept-button" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver videos</button>
            <button id="decline-button" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

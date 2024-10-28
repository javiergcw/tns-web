import { useEffect } from "react";

export default function Modal({ setShowModal, pdfUrl }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full h-[80vh] overflow-hidden">
        {/* Header del Modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Extensión Académica</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-red-500 transition"
          >
            X
          </button>
        </div>

        {/* Contenedor con Scroll para el PDF */}
        <div className="w-full h-full overflow-auto">
          <embed src={pdfUrl} type="application/pdf" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

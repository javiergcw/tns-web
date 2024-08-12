import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table"; // Importar el componente Table
import { getAllBugs } from "@/app/services/bugService"; // Asegúrate de que la ruta sea correcta
import Lottie from "react-lottie";
import animationData from "@/public/videos/errorData.json";
import { BlueButton, RedButton } from "@/app/utils/Buttons"; // Importar los botones constantes

Modal.setAppElement("#__next");

const BugTable = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const data = await getAllBugs();
      setBugs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bugs:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (bug) => {
    setSelectedBug(bug);
    setIsModalOpen(true);
  };

  const handleUpdateBug = async () => {
    // Implementa la lógica para actualizar el bug aquí
    setIsModalOpen(false);
    fetchBugs();
  };

  const columns = [
    "ID",
    "Título",
    "Categoría",
    "Descripción",
    "Creado por",
    "Creado en",
    "Actualizado en",
  ];

  const rows = bugs.map((bug) => [
    bug.id,
    bug.title,
    bug.category_bug,                                                                            
    bug.description,
    bug.user ? bug.user.email : "Desconocido",
    new Date(bug.created_at).toLocaleString(),
    new Date(bug.updated_at).toLocaleString(),
  ]);

  // Configuración de la animación Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Bugs</h2>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      {!loading && bugs.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
        </div>
      )}
      {!loading && bugs.length > 0 && (
        <div className="overflow-y-auto h-full">
          <Table columns={columns} data={rows} />
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-red-500 text-lg mt-4">Error: {error}</p>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Bug"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Editar Bug</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Título
          </label>
          <input
            type="text"
            value={selectedBug ? selectedBug.title : ""}
            onChange={(e) =>
              setSelectedBug({ ...selectedBug, title: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Descripción
          </label>
          <textarea
            value={selectedBug ? selectedBug.description : ""}
            onChange={(e) =>
              setSelectedBug({ ...selectedBug, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <BlueButton text="Guardar" onClick={handleUpdateBug} />
        <RedButton
          text="Cancelar"
          onClick={() => setIsModalOpen(false)}
          className="ml-2"
        />
      </Modal>
    </div>
  );
};

export default BugTable;

import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table"; // Importar el componente Table
import { getStatuses, addStatus, deleteStatus } from "@/app/services/statusService";
import Lottie from 'react-lottie';
import animationData from "@/public/videos/errorData.json";

Modal.setAppElement("#__next");

const StatusTable = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatusName, setNewStatusName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      setLoading(true); // Inicia la carga
      const data = await getStatuses();
      setStatuses(data);
      setLoading(false); // Finaliza la carga
    } catch (error) {
      setError("Failed to fetch statuses. Please check your authorization.");
      setLoading(false); // Finaliza la carga
    }
  };

  const handleAddStatus = async () => {
    if (newStatusName.trim() === '') {
      return;
    }
    try {
      setLoading(true); // Inicia la carga
      await addStatus(newStatusName);
      setNewStatusName('');
      fetchStatuses();
      setIsModalOpen(false);
    } catch (error) {
      setError("Failed to add status. Please check your authorization.");
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  const handleDeleteStatus = async (id) => {
    try {
      setLoading(true); // Inicia la carga
      await deleteStatus(id);
      fetchStatuses();
    } catch (error) {
      setError("Failed to delete status. Please check your authorization.");
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  const columns = [
    "ID",
    "Nombre",
    "Acciones"
  ];

  const rows = statuses.map(status => [
    status.id,
    status.name,
    <button
      onClick={() => handleDeleteStatus(status.id)}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      Eliminar
    </button>
  ]);

  // Configuración de la animación Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Utilizar directamente el objeto JSON de la animación
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Estados</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Estado
        </button>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      {!loading && statuses.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
        </div>
      )}
      {!loading && statuses.length > 0 && (
        <div className="overflow-y-auto h-full">
          <Table columns={columns} data={rows} />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Agregar Estado"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >

        <div className="p-6 bg-white rounded-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Agregar Estado</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre del Estado</label>
            <input
              type="text"
              value={newStatusName}
              onChange={(e) => setNewStatusName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 p-2 bg-red-500 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddStatus}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md ml-2"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StatusTable;

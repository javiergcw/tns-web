import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table"; // Importar el componente Table
import { getStatuses, addStatus, deleteStatus } from "@/app/services/statusService";
import Lottie from 'react-lottie';
import animationData from "@/public/videos/errorData.json";
import RedButton from "@/app/utils/buttonConfirmation"; // Importar el botón constante
import LoaderOverlay from "@/app/utils/loaderOverlay"; // Importar el LoaderOverlay

Modal.setAppElement("#__next");

const StatusTable = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatusName, setNewStatusName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

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

  const openDeleteModal = (status) => {
    setSelectedStatus(status);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteStatus = async () => {
    try {
      setLoading(true); // Inicia la carga
      await deleteStatus(selectedStatus.id);
      fetchStatuses();
      setIsDeleteModalOpen(false);
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
    <RedButton
      text="Eliminar"
      onClick={() => openDeleteModal(status)}
      className="px-2 py-1"
    />
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
        <LoaderOverlay />
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
      {error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-red-500 text-lg mt-4">Error: {error}</p>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Agregar Estado"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Agregar Estado</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre del Estado</label>
          <input
            type="text"
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button onClick={handleAddStatus} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Confirmar Eliminación"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
        <p>¿Está seguro que desea eliminar el estado "{selectedStatus?.name}"?</p>
        <div className="mt-4 flex justify-end">
          <RedButton
            text="Eliminar"
            onClick={handleDeleteStatus}
            className="mr-2"
          />
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StatusTable;

import { useState, useEffect } from 'react';
import { getStatuses, addStatus, deleteStatus } from '@/app/services/statusService';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const StatusTable = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatusName, setNewStatusName] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const data = await getStatuses();
      setStatuses(data);
    } catch (error) {
      setError("Failed to fetch statuses. Please check your authorization.");
    }
  };

  const handleAddStatus = async () => {
    if (newStatusName.trim() === '') {
      return;
    }
    try {
      await addStatus(newStatusName);
      setNewStatusName('');
      fetchStatuses();
      setIsModalOpen(false);
    } catch (error) {
      setError("Failed to add status. Please check your authorization.");
    }
  };

  const handleDeleteStatus = async (id) => {
    try {
      await deleteStatus(id);
      fetchStatuses();
    } catch (error) {
      setError("Failed to delete status. Please check your authorization.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Estados</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Estado
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border text-black px-4 py-2">ID</th>
            <th className="border text-black px-4 py-2">Nombre</th>
            <th className="border text-black px-2 py-2">Acciones</th>
          </tr>
        </thead> 
        <tbody>
          {statuses.map((status) => (
            <tr key={status.id}>
              <td className="border text-black px-4 py-2">{status.id}</td>
              <td className="border text-black px-4 py-2">{status.name}</td>
              <td className="border text-black px-4 py-2">
                <button
                  onClick={() => handleDeleteStatus(status.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Agregar Estado"
        className="modal"
        overlayClassName="modal-overlay"
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

import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table"; // Importar el componente Table
import { getRoles, addRole, deleteRole } from "@/app/services/roleService";
import { VideoPath } from "@/app/utils/assetsPath";
import Lottie from 'react-lottie';
import animationData from "@/public/videos/errorData.json";

Modal.setAppElement("#__next");

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      setRoles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleAddRole = async () => {
    try {
      setLoading(true);
      await addRole(newRoleName);
      fetchRoles();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding role:', error);
      setError('Failed to add role.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      setLoading(true);
      await deleteRole(id);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      setError('Failed to delete role.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    "ID",
    "Nombre",
    "Creado en",
    "Actualizado en",
    "Acciones"
  ];

  const rows = roles.map(role => [
    role.id,
    role.name,
    new Date(role.created_at).toLocaleString(),
    new Date(role.updated_at).toLocaleString(),
    <button
      onClick={() => handleDeleteRole(role.id)}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      Eliminar
    </button>
  ]);

  // Configuración de la animación Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Roles</h2>
      <div className='mb-4'>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Añadir Rol
        </button>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      {!loading && roles.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
        </div>
      )}
      {!loading && roles.length > 0 && (
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
        contentLabel="Añadir Rol"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Añadir Rol</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre del Rol</label>
          <input
            type="text"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button onClick={handleAddRole} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
      </Modal>
    </div>
  );
};

export default RoleTable;

import { useState, useEffect } from 'react';
import { getRoles, addRole, deleteRole } from '@/app/services/roleService';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Asegúrate de que esto apunta al elemento correcto

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true); // Inicia la carga
      const data = await getRoles();
      setRoles(data);
      setLoading(false); // Finaliza la carga
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError(error.message);
      setLoading(false); // Finaliza la carga
    }
  };

  const handleAddRole = async () => {
    try {
      setLoading(true); // Inicia la carga
      await addRole(newRoleName);
      fetchRoles();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding role:', error);
      setError('Failed to add role.');
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      setLoading(true); // Inicia la carga
      await deleteRole(id);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      setError('Failed to delete role.');
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
      <div className="overflow-y-auto h-full">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">ID</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Nombre</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Creado en</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Actualizado en</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t border-gray-200">
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{role.id}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{role.name}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{new Date(role.created_at).toLocaleString()}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{new Date(role.updated_at).toLocaleString()}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default RoleTable;

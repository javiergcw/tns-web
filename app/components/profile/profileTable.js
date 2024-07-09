import { useState, useEffect } from 'react';
import { getAllProfiles, updateProfile } from '@/app/services/profileService';
import { getRoles } from '@/app/services/roleService';
import { register } from '@/app/services/loginService';
import Modal from 'react-modal';
import { documentTypeOptions } from '@/app/utils/dataGeneral';

Modal.setAppElement('#__next');

const ProfileTable = () => {
  const [profiles, setProfiles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [name, setName] = useState('');
  const [identificationType, setIdentificationType] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', password_confirmation: '' });

  useEffect(() => {
    fetchProfiles();
    fetchRoles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const data = await getAllProfiles();
      setProfiles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setName(profile.name);
    setIdentificationType(profile.identificationType || '');
    setIdentificationNumber(profile.identificationNumber);
    setSelectedRoleId(profile.rol ? profile.rol.id : '');
    setIsModalOpen(true);
  };

  const handleIdentificationNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setIdentificationNumber(e.target.value);
    }
  };

  const handleUpdateProfile = async () => {
    if (!/^\d+$/.test(identificationNumber)) {
      alert('El número de identificación solo debe contener números.');
      return;
    }

    setLoading(true);
    try {
      await updateProfile(selectedProfile.id, {
        name,
        identification_type: identificationType,
        identification_number: identificationNumber,
        rol_id: selectedRoleId,
      });
      setIsModalOpen(false);
      fetchProfiles();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please check your authorization.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (newUser.password !== newUser.password_confirmation) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      console.log("Adding user:", newUser); // Log para depuración
      await register(newUser.email, newUser.password, newUser.password_confirmation, newUser.name);
      setIsAddModalOpen(false);
      fetchProfiles();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please check your input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Usuarios</h2>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Agregar Usuario
      </button>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="overflow-y-auto h-full">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">ID</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Nombre</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Tipo de Identificación</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Número de Identificación</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Rol</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Creado en</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Actualizado en</th>
              <th className="py-1 px-2 border text-black border-gray-300 text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="border-t border-gray-200">
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{profile.id}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{profile.name}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{profile.identificationType}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{profile.identificationNumber}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{profile.rol ? profile.rol.name : 'N/A'}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{new Date(profile.createdAt).toLocaleString()}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">{new Date(profile.updatedAt).toLocaleString()}</td>
                <td className="py-1 px-2 border text-black border-gray-300 text-sm">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Editar
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
        contentLabel="Editar Perfil"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tipo de Identificación</label>
          <select
            value={identificationType}
            onChange={(e) => setIdentificationType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecciona un tipo</option>
            {documentTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Número de Identificación</label>
          <input
            type="text"
            value={identificationNumber}
            onChange={handleIdentificationNumberChange}
            className="w-full p-2 border border-gray-300 rounded"
            pattern="\d*"
            title="Por favor ingrese solo números"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Rol</label>
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecciona un rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleUpdateProfile} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loader"></div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Agregar Usuario"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Agregar Usuario</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
          <input
            type="password"
            name="password_confirmation"
            value={newUser.password_confirmation}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loader"></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfileTable;

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Table from '@/app/components/others/table/table'; // Importar el componente Table
import { getAllProfiles, updateProfile } from '@/app/services/profileService';
import { getRoles } from '@/app/services/roleService';
import { register } from '@/app/services/loginService';
import { documentTypeOptions } from '@/app/utils/dataGeneral';
import Lottie from 'react-lottie';
import animationData from '@/public/videos/errorData.json';
import { BlueButton, RedButton } from '@/app/utils/Buttons'; // Importar los botones constantes

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
      setLoading(true);
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
      //console.log("Adding user:", newUser); // Log para depuración
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

  const columns = [
    "ID",
    "Nombre",
    "Tipo de Identificación",
    "Número de Identificación",
    "Rol",
    "Creado en",
    "Actualizado en",
    "Acciones"
  ];

  const rows = profiles.map(profile => [
    profile.id,
    profile.name,
    profile.identificationType,
    profile.identificationNumber,
    profile.rol ? profile.rol.name : 'N/A',
    new Date(profile.createdAt).toLocaleString(),
    new Date(profile.updatedAt).toLocaleString(),
    <BlueButton
      text="Editar"
      onClick={() => handleEdit(profile)}
      className="px-2 py-1"
    />
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
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Usuarios</h2>
      <BlueButton
        text="Agregar Usuario"
        onClick={() => setIsAddModalOpen(true)}
        className="mb-4"
      />
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      {!loading && profiles.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
        </div>
      )}
      {!loading && profiles.length > 0 && (
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
        <BlueButton
          text="Guardar"
          onClick={handleUpdateProfile}
        />
        <RedButton
          text="Cancelar"
          onClick={() => setIsModalOpen(false)}
          className="ml-2"
        />
      </Modal>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Agregar Usuario"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10 relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="absolute top-1 right-2 text-black text-4xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Agregar Usuario</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Nombre</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Contraseña</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Confirmar Contraseña</label>
          <input
            type="password"
            name="password_confirmation"
            value={newUser.password_confirmation}
            onChange={handleAddUserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <BlueButton
          text="Guardar"
          onClick={handleAddUser}
        />
        <RedButton
          text="Cancelar"
          onClick={() => setIsAddModalOpen(false)}
          className="ml-2"
        />
      </Modal>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      {!loading && profiles.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-red-500 text-lg mt-4">Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileTable;

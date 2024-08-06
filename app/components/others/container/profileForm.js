import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import TextInput from "@/app/components/others/fields/textInput";
import TextDisplay from "./textDisplay";
import { updateProfile, getProfileById } from "@/app/services/profileService";
import { ImagesPath } from "@/app/utils/assetsPath";
import { documentTypeOptions } from "@/app/utils/dataGeneral";
import { FiEdit } from "react-icons/fi";

Modal.setAppElement("#__next");

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        //console.log("Retrieved userId from localStorage:", storedUserId);
        if (storedUserId) {
          setUserId(storedUserId);
          const profile = await getProfileById(storedUserId);
          //console.log("Fetched profile:", profile);
          setName(profile.name);
          setPhone(profile.identificationNumber);
          setRole(profile.rol ? profile.rol.name : "");
          setPhoto(profile.photo);
          setIdentificationType(profile.identificationType || "");
          setIdentificationNumber(profile.identificationNumber || "");
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentificationTypeChange = (e) => {
    setIdentificationType(e.target.value);
  };

  const handleIdentificationNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setIdentificationNumber(e.target.value);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const updatedProfile = {
      name,
      identification_type: identificationType,
      identification_number: identificationNumber,
      phone,
      rol_id: 1,
      password,
      photo,
    };

    try {
      await updateProfile(userId, updatedProfile);
      closeModal();
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  mx-auto px-4 sm:px-8">
      <div className="mb-4 flex flex-col items-center sm:flex-row sm:items-start">
        <div className="flex w-1/4 flex-col items-center sm:mr-8">
          <img
            src={photo || ImagesPath.defaultProfilePhoto}
            alt="Profile"
            className="w-32 h-32 sm:w-60 sm:h-60 rounded-full border-2 border-green-500 object-cover"
          />
          <button
            onClick={openModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md w-full sm:w-auto text-lg"
          >
            Editar Perfil
          </button>
        </div>
        <div className=" w-2/4 space-y-4 mt-4 sm:mt-0">
          <TextDisplay
            labelText="Nombre"
            labelColor="blue"
            displaySize="large"
            value={name}
          />

          <TextDisplay
            labelText="Celular"
            labelColor="blue"
            displaySize="large"
            value={phone}
          />

          <TextDisplay
            labelText="Rol"
            labelColor="blue"
            displaySize="large"
            value={role}
          />

          <TextDisplay
            labelText="Tipo de Documento"
            labelColor="blue"
            displaySize="large"
            value={identificationType}
          />

          <TextDisplay
            labelText="Número de Documento"
            labelColor="blue"
            displaySize="large"
            value={identificationNumber}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Perfil"
        className="bg-white rounded-md p-6 w-full max-w-lg mx-auto relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-2 text-black text-4xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Editar Perfil</h2>
        <div className="mb-4 flex flex-col items-center relative">
          <img
            src={photo || ImagesPath.defaultProfilePhoto}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-greenDrawer cursor-pointer mb-2"
            onClick={() => fileInputRef.current.click()}
          />
          <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            <FiEdit className="text-white text-2xl sm:text-4xl bg-black bg-opacity-50 rounded-full p-2 sm:p-4 absolute opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer" onClick={() => fileInputRef.current.click()} />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <div className="mb-4 w-full">
          <TextInput
            labelText="Nombre"
            labelColor="blue"
            inputSize="large"
            inputType="text"
            value={name}
            onChange={handleNameChange}
            className="w-full text-base p-2"
          />
        </div>
        <div className="mb-4 w-full">
          <TextInput
            labelText="Celular"
            labelColor="blue"
            inputSize="large"
            inputType="text"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full text-base p-2"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-large font-medium mb-2 text-sky-500">
            Tipo de Documento
          </label>
          <select
            value={identificationType}
            onChange={handleIdentificationTypeChange}
            className="w-full p-2 border border-gray-300 rounded text-base"
          >
            <option value="">Selecciona un tipo</option>
            {documentTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <TextInput
            labelText="Número de Documento"
            labelColor="blue"
            inputSize="large"
            inputType="text"
            value={identificationNumber}
            onChange={handleIdentificationNumberChange}
            className="w-full text-base p-2"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-end">
          <button
            onClick={closeModal}
            className="mt-4 p-2 bg-red-500 text-white rounded-md w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md sm:ml-2 w-full sm:w-auto"
          >
            Guardar
          </button>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loader"></div>
          </div>
        )}
      </Modal>



    </div>
  );
};

export default ProfileForm;

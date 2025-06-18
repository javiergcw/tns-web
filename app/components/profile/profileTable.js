import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table";
import { getAllProfiles, updateProfile } from "@/app/services/profileService";
import { getRoles } from "@/app/services/roleService";
import { register } from "@/app/services/loginService";
import { documentTypeOptions } from "@/app/utils/dataGeneral";
import Lottie from "react-lottie";
import animationData from "@/public/videos/errorData.json";
import { BlueButton, RedButton } from "@/app/utils/Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#__next");

const ProfileTable = ({ role }) => {
  const [profiles, setProfiles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    identification_type: "",
    identification_number: "",
    rol_id: "",
    issue_place: "",
    position: "",
    contract_type: "",
    hire_date: "",
    base_salary: "",
    study_bonus: "",
    responsibility_bonus: "",
    status: "active",
  });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    identification_type: "",
    identification_number: "",
    rol_id: "",
    issue_place: "",
    position: "",
    contract_type: "",
    hire_date: "",
    base_salary: "",
    study_bonus: "",
    responsibility_bonus: "",
    status: "active",
  });

  // Depuración: Observar cambios en formData
  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);

  useEffect(() => {
    fetchProfiles();
    fetchRoles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await getAllProfiles();
      console.log("Fetched profiles:", data); // Depuración
      setProfiles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      console.log("Fetched roles:", data); // Depuración
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEdit = (profile) => {
    console.log("Profile data in handleEdit:", profile); // Depuración
    setSelectedProfile(profile);
    const newFormData = {
      name: profile.name || "",
      identification_type: profile.identification_type || "",
      identification_number: profile.identification_number || "",
      rol_id: profile.rol ? String(profile.rol.id) : "",
      issue_place: profile.issue_place || "",
      position: profile.position || "",
      contract_type: profile.contract_type || "",
      hire_date: profile.hire_date ? profile.hire_date.split("T")[0] : "",
      base_salary: profile.base_salary !== undefined ? String(profile.base_salary) : "",
      study_bonus: profile.study_bonus !== undefined ? String(profile.study_bonus) : "",
      responsibility_bonus: profile.responsibility_bonus !== undefined ? String(profile.responsibility_bonus) : "",
      status: profile.status || "active",
    };
    setFormData(newFormData);
    console.log("FormData set to:", newFormData); // Depuración
    setErrors({});
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleIdentificationNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setFormData({ ...formData, identification_number: e.target.value });
    }
  };

  const handleNewUserIdentificationNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setNewUser({ ...newUser, identification_number: e.target.value });
    }
  };

  const validateForm = (data) => {
    let formIsValid = true;
    let tempErrors = {};

    if (data.name.trim() === "") {
      tempErrors.name = "El nombre es obligatorio";
      formIsValid = false;
    }
    if (data.identification_type.trim() === "") {
      tempErrors.identification_type = "El tipo de identificación es obligatorio";
      formIsValid = false;
    }
    if (data.identification_number.trim() === "" || !/^\d+$/.test(data.identification_number)) {
      tempErrors.identification_number = "El número de identificación solo debe contener números";
      formIsValid = false;
    }
    if (data.rol_id === "") {
      tempErrors.rol_id = "El rol es obligatorio";
      formIsValid = false;
    }
    if (["admin", "Gestión Humana"].includes(role)) {
      if (data.issue_place.trim() === "") {
        tempErrors.issue_place = "El lugar de expedición es obligatorio";
        formIsValid = false;
      }
      if (data.position.trim() === "") {
        tempErrors.position = "El cargo es obligatorio";
        formIsValid = false;
      }
      if (data.contract_type.trim() === "") {
        tempErrors.contract_type = "El tipo de contrato es obligatorio";
        formIsValid = false;
      }
      if (data.hire_date === "") {
        tempErrors.hire_date = "La fecha de ingreso es obligatoria";
        formIsValid = false;
      }
      if (data.base_salary === "" || isNaN(data.base_salary) || Number(data.base_salary) <= 0) {
        tempErrors.base_salary = "El salario básico debe ser un número positivo";
        formIsValid = false;
      }
      if (data.study_bonus && (isNaN(data.study_bonus) || Number(data.study_bonus) < 0)) {
        tempErrors.study_bonus = "La bonificación por estudios debe ser un número no negativo";
        formIsValid = false;
      }
      if (data.responsibility_bonus && (isNaN(data.responsibility_bonus) || Number(data.responsibility_bonus) < 0)) {
        tempErrors.responsibility_bonus = "La bonificación por responsabilidad debe ser un número no negativo";
        formIsValid = false;
      }
      if (!["active", "inactive"].includes(data.status)) {
        tempErrors.status = "El estado debe ser 'active' o 'inactive'";
        formIsValid = false;
      }
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleUpdateProfile = async () => {
    if (!validateForm(formData)) return;

    setLoading(true);
    try {
      await updateProfile(selectedProfile.id, {
        ...formData,
        base_salary: Number(formData.base_salary),
        study_bonus: Number(formData.study_bonus) || 0,
        responsibility_bonus: Number(formData.responsibility_bonus) || 0,
      });
      setIsModalOpen(false);
      fetchProfiles();
      toast.success("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("No se pudo actualizar el perfil. Verifique su autorización.");
      toast.error("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    let formIsValid = true;
    let tempErrors = {};

    if (newUser.email.trim() === "") {
      tempErrors.email = "El email es obligatorio";
      formIsValid = false;
    }
    if (newUser.password.trim() === "") {
      tempErrors.password = "La contraseña es obligatoria";
      formIsValid = false;
    }
    if (newUser.password !== newUser.password_confirmation) {
      tempErrors.password_confirmation = "Las contraseñas no coinciden";
      formIsValid = false;
    }

    if (!validateForm(newUser)) {
      formIsValid = false;
    }

    setErrors(tempErrors);

    if (!formIsValid) return;

    setLoading(true);
    try {
      await register(
          newUser.email,
          newUser.password,
          newUser.password_confirmation,
          newUser.name,
          newUser.identification_type,
          newUser.identification_number,
          newUser.rol_id,
          newUser.issue_place,
          newUser.position,
          newUser.contract_type,
          newUser.hire_date,
          Number(newUser.base_salary),
          Number(newUser.study_bonus) || 0,
          Number(newUser.responsibility_bonus) || 0,
          newUser.status
      );
      setIsAddModalOpen(false);
      fetchProfiles();
      setNewUser({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        identification_type: "",
        identification_number: "",
        rol_id: "",
        issue_place: "",
        position: "",
        contract_type: "",
        hire_date: "",
        base_salary: "",
        study_bonus: "",
        responsibility_bonus: "",
        status: "active",
      });
      setErrors({});
      toast.success("Usuario añadido exitosamente");
    } catch (error) {
      console.error("Error adding user:", error);
      setError("No se pudo añadir el usuario. Verifique los datos.");
      toast.error("Error al añadir el usuario");
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
    ...(role === "admin" ? ["Estado", "Cargo", "Salario Básico"] : []),
    "Creado en",
    "Actualizado en",
    "Acciones",
  ];

  const rows = profiles.map((profile) => {
    console.log("Profile in rows:", profile); // Depuración
    return [
      profile.id,
      profile.name || "N/A",
      profile.identification_type || "N/A",
      profile.identification_number || "N/A",
      profile.rol ? profile.rol.name : "N/A",
      ...(role === "admin" ? [
        profile.status || "N/A",
        profile.position || "N/A",
        profile.base_salary ? `$${parseFloat(profile.base_salary).toLocaleString()}` : "N/A",
      ] : []),
      new Date(profile.created_at).toLocaleString(),
      new Date(profile.updated_at).toLocaleString(),
      <BlueButton
          text="Editar"
          onClick={() => handleEdit(profile)}
          className="px-2 py-1"
      />,
    ];
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const isAdminOrGestionHumana = ["admin", "Gestión Humana"].includes(role);

  return (
      <div className="container mx-auto p-4">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Usuarios</h2>
        <BlueButton
            text="Agregar Usuario"
            onClick={() => setIsAddModalOpen(true)}
            className="mb-4 font-bold"
        />
        {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="loader"></div>
            </div>
        )}
        {!loading && profiles.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center h-full">
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
              <p className="text-red-500 text-lg mt-4">Error: {error}</p>
            </div>
        )}
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Editar Perfil"
            className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10"
        >
          <div className="max-h-[80vh] overflow-y-auto px-4 py-6 flex flex-col">
            <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-2 text-black text-4xl font-bold z-10"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">Editar Perfil</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Nombre</label>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded text-black`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Tipo de Identificación</label>
              <select
                  name="identification_type"
                  value={formData.identification_type}
                  onChange={handleFormChange}
                  className={`w-full p-2 border ${errors.identification_type ? "border-red-500" : "border-gray-300"} rounded text-black`}
              >
                <option value="">Selecciona un tipo</option>
                {documentTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                ))}
              </select>
              {errors.identification_type && <p className="text-red-500 text-sm mt-1">{errors.identification_type}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Número de Identificación</label>
              <input
                  type="text"
                  name="identification_number"
                  value={formData.identification_number}
                  onChange={handleIdentificationNumberChange}
                  className={`w-full p-2 border ${errors.identification_number ? "border-red-500" : "border-gray-300"} rounded text-black`}
                  pattern="\d*"
                  title="Por favor ingrese solo números"
              />
              {errors.identification_number && <p className="text-red-500 text-sm mt-1">{errors.identification_number}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Rol</label>
              <select
                  name="rol_id"
                  value={formData.rol_id}
                  onChange={handleFormChange}
                  className={`w-full p-2 border ${errors.rol_id ? "border-red-500" : "border-gray-300"} rounded text-black`}
              >
                <option value="">Selecciona un rol</option>
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                ))}
              </select>
              {errors.rol_id && <p className="text-red-500 text-sm mt-1">{errors.rol_id}</p>}
            </div>
            {isAdminOrGestionHumana && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Lugar de Expedición</label>
                    <input
                        type="text"
                        name="issue_place"
                        value={formData.issue_place}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.issue_place ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.issue_place && <p className="text-red-500 text-sm mt-1">{errors.issue_place}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Cargo</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.position ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Tipo de Contrato</label>
                    <input
                        type="text"
                        name="contract_type"
                        value={formData.contract_type}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.contract_type ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.contract_type && <p className="text-red-500 text-sm mt-1">{errors.contract_type}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Fecha de Ingreso</label>
                    <input
                        type="date"
                        name="hire_date"
                        value={formData.hire_date}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.hire_date ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.hire_date && <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Salario Básico</label>
                    <input
                        type="number"
                        name="base_salary"
                        value={formData.base_salary}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.base_salary ? "border-red-500" : "border-gray-300"} rounded text-black`}
                        step="0.01"
                        min="0"
                    />
                    {errors.base_salary && <p className="text-red-500 text-sm mt-1">{errors.base_salary}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Bonificación por Estudios</label>
                    <input
                        type="number"
                        name="study_bonus"
                        value={formData.study_bonus}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.study_bonus ? "border-red-500" : "border-gray-300"} rounded text-black`}
                        step="0.01"
                        min="0"
                    />
                    {errors.study_bonus && <p className="text-red-500 text-sm mt-1">{errors.study_bonus}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Bonificación por Responsabilidad</label>
                    <input
                        type="number"
                        name="responsibility_bonus"
                        value={formData.responsibility_bonus}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.responsibility_bonus ? "border-red-500" : "border-gray-300"} rounded text-black`}
                        step="0.01"
                        min="0"
                    />
                    {errors.responsibility_bonus && <p className="text-red-500 text-sm mt-1">{errors.responsibility_bonus}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Estado</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className={`w-full p-2 border ${errors.status ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                  </div>
                </>
            )}
            <div className="flex justify-end space-x-2 mt-4 sticky bottom-0 bg-white py-2">
              <BlueButton text="Guardar" onClick={handleUpdateProfile} />
              <RedButton text="Cancelar" onClick={() => setIsModalOpen(false)} />
            </div>
          </div>
        </Modal>

        <Modal
            isOpen={isAddModalOpen}
            onRequestClose={() => setIsAddModalOpen(false)}
            contentLabel="Agregar Usuario"
            className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10"
        >
          <div className="max-h-[80vh] overflow-y-auto px-4 py-6 flex flex-col">
            <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-0 right-2 text-black text-4xl font-bold z-10"
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
                  onChange={handleNewUserChange}
                  className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded text-black`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Email</label>
              <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded text-black`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Contraseña</label>
              <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  className={`w-full p-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded text-black`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Confirmar Contraseña</label>
              <input
                  type="password"
                  name="password_confirmation"
                  value={newUser.password_confirmation}
                  onChange={handleNewUserChange}
                  className={`w-full p-2 border ${errors.password_confirmation ? "border-red-500" : "border-gray-300"} rounded text-black`}
              />
              {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Tipo de Identificación</label>
              <select
                  name="identification_type"
                  value={newUser.identification_type}
                  onChange={handleNewUserChange}
                  className={`w-full p-2 border ${errors.identification_type ? "border-red-500" : "border-gray-300"} rounded text-black`}
              >
                <option value="">Selecciona un tipo</option>
                {documentTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                ))}
              </select>
              {errors.identification_type && <p className="text-red-500 text-sm mt-1">{errors.identification_type}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Número de Identificación</label>
              <input
                  type="text"
                  name="identification_number"
                  value={newUser.identification_number}
                  onChange={handleNewUserIdentificationNumberChange}
                  className={`w-full p-2 border ${errors.identification_number ? "border-red-500" : "border-gray-300"} rounded text-black`}
                  pattern="\d*"
                  title="Por favor ingrese solo números"
              />
              {errors.identification_number && <p className="text-red-500 text-sm mt-1">{errors.identification_number}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-black">Rol</label>
              <select
                  name="rol_id"
                  value={newUser.rol_id}
                  onChange={handleNewUserChange}
                  className={`w-full p-2 border ${errors.rol_id ? "border-red-500" : "border-gray-300"} rounded text-black`}
              >
                <option value="">Selecciona un rol</option>
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                ))}
              </select>
              {errors.rol_id && <p className="text-red-500 text-sm mt-1">{errors.rol_id}</p>}
            </div>
            {isAdminOrGestionHumana && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Lugar de Expedición</label>
                    <input
                        type="text"
                        name="issue_place"
                        value={newUser.issue_place}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.issue_place ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.issue_place && <p className="text-red-500 text-sm mt-1">{errors.issue_place}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Cargo</label>
                    <input
                        type="text"
                        name="position"
                        value={newUser.position}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.position ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Tipo de Contrato</label>
                    <input
                        type="text"
                        name="contract_type"
                        value={newUser.contract_type}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.contract_type ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.contract_type && <p className="text-red-500 text-sm mt-1">{errors.contract_type}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Fecha de Ingreso</label>
                    <input
                        type="date"
                        name="hire_date"
                        value={newUser.hire_date}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.hire_date ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    />
                    {errors.hire_date && <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Salario Básico</label>
                    <input
                        type="number"
                        name="base_salary"
                        value={newUser.base_salary}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.base_salary ? "border-red-500" : "border-gray-300"} rounded text-black`}
                        step="0.01"
                        min="0"
                    />
                    {errors.base_salary && <p className="text-red-500 text-sm mt-1">{errors.base_salary}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Bonificación por Estudios</label>
                    <input
                        type="number"
                        name="study_bonus"
                        value={newUser.study_bonus}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.study_bonus ? "border-red-500" : "border-gray-300"} rounded text-black`}
                        step="0.01"
                        min="0"
                    />
                    {errors.study_bonus && <p className="text-red-500 text-sm mt-1">{errors.study_bonus}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Bonificación por Responsabilidad</label>
                    <input
                        type="number"
                        name="responsibility_bonus"
                        value={newUser.responsibility_bonus}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.responsibility_bonus ? "border-red-500" : "border-gray-300"} rounded text-black`}
                        step="0.01"
                        min="0"
                    />
                    {errors.responsibility_bonus && <p className="text-red-500 text-sm mt-1">{errors.responsibility_bonus}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Estado</label>
                    <select
                        name="status"
                        value={newUser.status}
                        onChange={handleNewUserChange}
                        className={`w-full p-2 border ${errors.status ? "border-red-500" : "border-gray-300"} rounded text-black`}
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                  </div>
                </>
            )}
            <div className="flex justify-end space-x-2 mt-4 sticky bottom-0 bg-white py-2">
              <BlueButton text="Guardar" onClick={handleAddUser} />
              <RedButton text="Cancelar" onClick={() => setIsAddModalOpen(false)} />
            </div>
          </div>
        </Modal>
      </div>
  );
};

export default ProfileTable;
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table";
import { getAllAreas, createArea, updateArea, deleteArea } from "@/app/services/areaService";
import { RedButton, BlueButton } from "@/app/utils/Buttons";
import LoaderOverlay from "@/app/utils/loaderOverlay";
import ConfirmationModal from "../modals/modalConfirmation";
import { getProfileById, getAllProfiles } from "@/app/services/profileService";

Modal.setAppElement("#__next");

const AreaTable = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [newAreaName, setNewAreaName] = useState("");
    const [newAreaDescription, setNewAreaDescription] = useState("");
    const [selectedArea, setSelectedArea] = useState(null);
    const [validationError, setValidationError] = useState("");
    const [role, setRole] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUserId = localStorage.getItem("profileId");
                if (storedUserId) {
                    const userProfile = await getProfileById(storedUserId);
                    setRole(userProfile?.rol?.name || "");
                } else {
                    throw new Error("User ID not found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchAreas();
        fetchProfile();
        fetchUsers();
    }, []);

    const fetchAreas = async () => {
        try {
            setLoading(true);
            const data = await getAllAreas();
            setAreas(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching areas:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllProfiles();
            const filteredUsers = data.filter(
                (user) => user.rol?.name === "Lider de presupuesto" || user.rol?.name === "admin" || user.rol?.name === "Compras"
            );
            setUsers(filteredUsers);
            console.log("Usuarios filtrados:", filteredUsers); // Depuración
        } catch (error) {
            setError("Error al obtener usuarios.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddArea = async () => {
        if (!newAreaName.trim() || !newAreaDescription.trim() || !selectedUserId) {
            setValidationError("Por favor, complete todos los campos.");
            return;
        }

        try {
            setLoading(true);
            await createArea({
                name: newAreaName,
                description: newAreaDescription,
                id_area: parseInt(selectedUserId, 10),
            });
            setNewAreaName("");
            setNewAreaDescription("");
            setSelectedUserId("");
            fetchAreas();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding area:", error);
            setError("Failed to add area.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditArea = async () => {
        if (!newAreaName.trim() || !newAreaDescription.trim() || !selectedUserId) {
            setValidationError("Por favor, complete todos los campos.");
            return;
        }

        try {
            setLoading(true);
            await updateArea(selectedArea.id, {
                name: newAreaName,
                description: newAreaDescription,
                id_area: parseInt(selectedUserId, 10),
            });
            fetchAreas();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating area:", error);
            setError("Failed to update area.");
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setNewAreaName("");
        setNewAreaDescription("");
        setSelectedUserId("");
        setValidationError("");
        setIsModalOpen(true);
    };

    const openEditModal = (area) => {
        setSelectedArea(area);
        setNewAreaName(area.name);
        setNewAreaDescription(area.description);
        // Buscar el líder correspondiente según id_area y asignar su ID
        const leader = users.find((user) => parseInt(user.id, 10) === parseInt(area.id_area, 10));
        setSelectedUserId(leader ? leader.id.toString() : ""); // Convertir a string para el select
        setValidationError("");
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (area) => {
        setSelectedArea(area);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteArea = async () => {
        try {
            setLoading(true);
            await deleteArea(selectedArea.id);
            fetchAreas();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting area:", error);
            setError("Failed to delete area.");
        } finally {
            setLoading(false);
        }
    };

    const columns = ["ID", "Nombre", "Descripción", "Creado en", "Actualizado en", "Líder de Presupuesto", "Acciones"];

    const rows = areas.map((area) => {
        const leader = users.find((user) => parseInt(user.id, 10) === parseInt(area.id_area, 10));
        console.log(`Area ID: ${area.id}, id_area: ${area.id_area}, Leader: ${leader ? leader.name : "No encontrado"}`); // Depuración

        return [
            area.id,
            area.name,
            area.description,
            new Date(area.created_at).toLocaleString(),
            new Date(area.updated_at).toLocaleString(),
            leader ? leader.name : "Sin líder asignado", // Mostrar el nombre del líder o un mensaje por defecto
            <>
                <BlueButton
                    text="Editar"
                    onClick={() => openEditModal(area)}
                    className="px-2 py-1"
                />
                {(role === "admin" || role === "Developer") && (
                    <RedButton
                        text="Eliminar"
                        onClick={() => openDeleteModal(area)}
                        className="px-2 py-1 ml-2"
                    />
                )}
            </>,
        ];
    });

    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Áreas</h2>
            <div className="mb-4">
                <BlueButton
                    text="Añadir Área"
                    onClick={openAddModal}
                    className="mt-4 p-2"
                />
                {role === "Compras" && (
                    <RedButton
                        text="Eliminar"
                        onClick={openInfoModal}
                        className="ml-4 mt-4 p-2"
                    />
                )}
            </div>
            {loading && <LoaderOverlay />}
            {!loading && areas.length === 0 && !error && (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
                </div>
            )}
            {!loading && areas.length > 0 && (
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
                contentLabel="Añadir Área"
                className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative flex flex-col px-4 py-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-0 right-2 text-black text-4xl font-bold"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-black">Añadir Área</h2>
                {validationError && (
                    <div className="text-red-500 mb-4">{validationError}</div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Nombre del Área</label>
                    <input
                        type="text"
                        value={newAreaName}
                        onChange={(e) => setNewAreaName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Descripción del Área</label>
                    <textarea
                        value={newAreaDescription}
                        onChange={(e) => setNewAreaDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Líder de Presupuesto</label>
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    >
                        <option value="">Seleccione un Líder de Presupuesto</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <BlueButton text="Guardar" onClick={handleAddArea} />
                    <RedButton text="Cancelar" onClick={() => setIsModalOpen(false)} />
                </div>
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Editar Área"
                className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative flex flex-col px-4 py-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="absolute top-0 right-2 text-black text-4xl font-bold"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-black">Editar Área</h2>
                {validationError && (
                    <div className="text-red-500 mb-4">{validationError}</div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Nombre del Área</label>
                    <input
                        type="text"
                        value={newAreaName}
                        onChange={(e) => setNewAreaName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Descripción del Área</label>
                    <textarea
                        value={newAreaDescription}
                        onChange={(e) => setNewAreaDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">Líder de Presupuesto</label>
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    >
                        <option value="">Seleccione un Líder de Presupuesto</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <BlueButton text="Actualizar" onClick={handleEditArea} />
                    <RedButton text="Cancelar" onClick={() => setIsEditModalOpen(false)} />
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteArea}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar el área "${selectedArea?.name}"?`}
            />

            <Modal
                isOpen={isInfoModalOpen}
                onRequestClose={() => setIsInfoModalOpen(false)}
                contentLabel="Sin Permisos"
                className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative flex flex-col px-4 py-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <button
                    onClick={() => setIsInfoModalOpen(false)}
                    className="absolute top-0 right-2 text-black text-4xl font-bold"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-black">Sin Permisos</h2>
                <p className="text-black mb-4">
                    Comunícate con un administrador para eliminar esta área.
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                    <BlueButton text="Cerrar" onClick={() => setIsInfoModalOpen(false)} />
                </div>
            </Modal>
        </div>
    );
};

export default AreaTable;
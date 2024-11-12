import { useState, useEffect } from "react";
import Modal from "react-modal";
import { BlueButton, RedButton } from "@/app/utils/Buttons"; // Asumo que este es tu componente de botón
import { getAllAdmissions } from "@/app/services/admissionService"; // Servicio para obtener todas las admisiones
import { updateAdmission } from "@/app/services/admissionService";
import { deleteAdmission } from "@/app/services/admissionService"; // Tu servicio de actualización
// Tu servicio de actualización
import AdmissionModel from "@/app/models/admission/admissionModel";
import ViewAdmissionModal from "./detailModal";
import Table from "../others/table/table";
import ConfirmationModal from "../modals/modalConfirmation";
import LoaderOverlay from "@/app/utils/loaderOverlay";
import EditAdmissionModal from "./ediAdmissionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// Nuevo estado para el modal de visualización


const AdmissionsTable = () => {
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAdmission, setSelectedAdmission] = useState(new AdmissionModel());
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    useEffect(() => {
        fetchAdmissions();
    }, []);
    const openViewModal = (admission) => {
        setSelectedAdmission(admission);
        setIsViewModalOpen(true);
    };
    const fetchAdmissions = async () => {
        try {
            setLoading(true);
            const data = await getAllAdmissions();
            // Ordenamos las admisiones por la fecha de creación (created_at)
            const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setAdmissions(sortedData);
        } catch (error) {
            console.error("Error al obtener las admisiones:", error);
            setError("Error al obtener las admisiones");
        } finally {
            setLoading(false);
        }
    };


    const openEditModal = (admission) => {
        setSelectedAdmission(admission);
        setIsEditModalOpen(true);
    };

    const handleEditAdmission = async () => {
        try {
            await updateAdmission(selectedAdmission.id, selectedAdmission);
            setIsEditModalOpen(false);
            fetchAdmissions();
        } catch (error) {
            console.error("Error al actualizar la admisión:", error);
            alert("Hubo un error al actualizar la admisión");
        }
    };

    const handleDeleteAdmission = async () => {
        try {
            await deleteAdmission(selectedAdmission.id); // Llamamos al servicio de eliminación
            setIsDeleteModalOpen(false);
            fetchAdmissions(); // Recargamos las admisiones después de eliminar
        } catch (error) {
            console.error("Error al eliminar la admisión:", error);
            alert("Hubo un error al eliminar la admisión");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
        setSelectedAdmission((prev) => ({ ...prev, [name]: fieldValue }));
    };

    const openDeleteModal = (admission) => {
        setSelectedAdmission(admission);
        setIsDeleteModalOpen(true);
    };

    const columns = [
        "ID",
        "Nombre del Estudiante",
        "Edad",
        "Fecha de Nacimiento",
        "Vive con",
        "Grado Aspirado",
        "Nivel de inglés",
        "Apoyo terapéutico",
        "Tipo de apoyo terapéutico",
        "Acciones",
    ];

    const rows = admissions.map((admission) => [
        admission.id,
        admission.student_name,
        admission.student_age,
        admission.birth_date,
        admission.living_with,
        admission.aspired_grade,
        admission.english_level,
        admission.therapy_support ? "Sí" : "No",
        admission.therapy_type || "N/A",
        <div className="flex flex-col space-y-2">
            <BlueButton
                text="Editar"
                onClick={() => openEditModal(admission)}
                className="px-2 py-1"
            />
            <RedButton
                text="Eliminar"
                onClick={() => openDeleteModal(admission)}
                className="px-2 py-1"
            />
            <button
                onClick={() => openViewModal(admission)}
                className="text-blue-500 hover:text-blue-700 flex items-center"
            >
                <FontAwesomeIcon icon={faEye} className="h-5 w-5 mr-1" /> {/* Icono de ojo de FontAwesome */}
            </button>
        </div>

    ]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Admisiones</h2>
            {loading && <LoaderOverlay />}
            {!loading && admissions.length === 0 && !error && (
                <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
            )}
            {!loading && admissions.length > 0 && (
                <div className="flex-grow overflow-y-auto">
                    <Table columns={columns} data={rows} />
                </div>
            )}
            {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

            <EditAdmissionModal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                admission={selectedAdmission}
                onChange={handleChange}
                onSave={handleEditAdmission}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar la admisión de "${selectedAdmission?.student_name}"?`}
                onConfirm={handleDeleteAdmission}
            />
            <ViewAdmissionModal
                isOpen={isViewModalOpen}
                onRequestClose={() => setIsViewModalOpen(false)}
                admission={selectedAdmission}
            />
        </div>
    );

};

export default AdmissionsTable;
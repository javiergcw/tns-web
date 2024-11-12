import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Importamos el icono de cierre

const ViewAdmissionModal = ({ isOpen, onRequestClose, admission }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50" // Centra el modal
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40" // Fondo semitransparente
    >
        <div className="relative bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto shadow-lg text-black">
            {/* Icono de cierre en la esquina superior derecha */}
            <button
                onClick={onRequestClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
                <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Título del modal */}
            <h2 className="text-xl font-bold mb-4">
                Admisión: {admission.student_name}
            </h2>

            {/* Contenido del modal */}
            <p className="text-black"><strong>Nombre del Estudiante:</strong> {admission.student_name}</p>
            <p className="text-black"><strong>Edad:</strong> {admission.student_age}</p>
            <p className="text-black"><strong>Fecha de Nacimiento:</strong> {admission.birth_date}</p>
            <p className="text-black"><strong>Religión:</strong> {admission.religion}</p>
            <p className="text-black"><strong>Vive con:</strong> {admission.living_with}</p>
            <p className="text-black"><strong>Grado Aspirado:</strong> {admission.aspired_grade}</p>
            <p className="text-black"><strong>¿Tiene hermanos?</strong> {admission.has_siblings ? "Sí" : "No"}</p>
            <p className="text-black"><strong>Nombre del Hermano:</strong> {admission.sibling_name || "N/A"}</p>
            <p className="text-black"><strong>Escuela Anterior:</strong> {admission.previous_school}</p>
            <p className="text-black"><strong>Calendario Escolar:</strong> {admission.school_calendar}</p>
            <p className="text-black"><strong>Duración en Escuela Anterior:</strong> {admission.previous_school_duration}</p>
            <p className="text-black"><strong>Ciudad y País:</strong> {admission.city_country}</p>
            <p className="text-black"><strong>Nivel de Inglés:</strong> {admission.english_level}</p>
            <p className="text-black"><strong>Apoyo Terapéutico:</strong> {admission.therapy_support ? "Sí" : "No"}</p>
            <p className="text-black"><strong>Tipo de Apoyo Terapéutico:</strong> {admission.therapy_type || "N/A"}</p>
            <p className="text-black"><strong>Fuente de Referencia:</strong> {admission.referral_source}</p>


            {/* Información de los padres */}
            <h3 className="text-lg font-semibold mt-4 text-black">Información de la Madre</h3>
            <p className="text-black"><strong>Nombre:</strong> {admission.mother_name}</p>
            <p className="text-black"><strong>Tipo de Identificación:</strong> {admission.mother_id_type}</p>
            <p className="text-black"><strong>Número de Identificación:</strong> {admission.mother_id_number}</p>
            <p className="text-black"><strong>Teléfono:</strong> {admission.mother_phone}</p>
            <p className="text-black"><strong>Email:</strong> {admission.mother_email}</p>
            <p className="text-black"><strong>Nivel de Educación:</strong> {admission.mother_education_level}</p>
            <p className="text-black"><strong>Ocupación:</strong> {admission.mother_occupation}</p>


            <h3 className="text-lg font-semibold mt-4 text-black">Información del Padre</h3>
            <p className="text-black"><strong>Nombre:</strong> {admission.father_name}</p>
            <p className="text-black"><strong>Tipo de Identificación:</strong> {admission.father_id_type}</p>
            <p className="text-black"><strong>Número de Identificación:</strong> {admission.father_id_number}</p>
            <p className="text-black"><strong>Teléfono:</strong> {admission.father_phone}</p>
            <p className="text-black"><strong>Email:</strong> {admission.father_email}</p>
            <p className="text-black"><strong>Nivel de Educación:</strong> {admission.father_education_level}</p>
            <p className="text-black"><strong>Ocupación:</strong> {admission.father_occupation}</p>
            <p className="text-black"><strong>Información Clarificada:</strong> {admission.info_clear ? "Sí" : "No"}</p>


        </div>
    </Modal>
);

export default ViewAdmissionModal;

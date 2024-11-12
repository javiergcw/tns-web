import React, { useState } from "react";
import Modal from "react-modal";

// Campos que no serán editables
const excludedFields = ["id", "has_siblings", "info_clear", "referral_source", "created_at", "updated_at"];

// Opciones predefinidas para los radio buttons
const englishLevelOptions = ["Muy bueno", "Bueno", "Regular", "No habla"];
const schoolCalendarOptions = ["A", "B", "C"];
const idTypeOptions = ["CC", "CE", "Pasaporte", "PPT", "VISA", "OTRO"];
const educationLevelOptions = ["Bachiller", "Pregrado", "Postgrado", "Maestría", "Doctorado"];
const therapySupportOptions = [true, false]; // Opciones para therapy_support

const EditAdmissionModal = ({
    isOpen,
    onRequestClose,
    admission,
    onChange,
    onSave,
}) => {
    const [error, setError] = useState("");

    const validateForm = () => {
        const missingFields = Object.keys(admission)
            .filter((key) => !excludedFields.includes(key) && admission[key] === "")
            .map((key) => key.replace(/_/g, " ").toUpperCase());

        if (missingFields.length > 0) {
            setError(`Los siguientes campos son obligatorios: ${missingFields.join(", ")}`);
            return false;
        }
        setError("");
        return true;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave();
        }
    };

    const renderRadioGroup = (name, options, labels = options) => (
        <div className="flex space-x-4">
            {options.map((option, index) => (
                <label key={option} className="flex items-center text-black">
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={admission[name] === option}
                        onChange={() => onChange({ target: { name, value: option } })}
                        className="mr-2"
                    />
                    {labels[index]}
                </label>
            ))}
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar Admisión"
            className="edit-modal"
            overlayClassName="overlay"
        >
            <button
                onClick={onRequestClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
            <h2 className="text-lg font-bold mb-4 text-center text-black">Editar Admisión</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {Object.keys(admission)
                    .filter((key) => !excludedFields.includes(key)) // Excluir campos no editables
                    .map((key) => {
                        if (key === "therapy_type" && !admission.therapy_support) return null;

                        return (
                            <div key={key}>
                                <label className="block text-sm font-semibold mb-1 text-black">
                                    {key.replace(/_/g, " ").toUpperCase()} <span className="text-red-500">*</span>
                                </label>
                                {key === "english_level"
                                    ? renderRadioGroup(key, englishLevelOptions)
                                    : key === "school_calendar"
                                        ? renderRadioGroup(key, schoolCalendarOptions)
                                        : key === "mother_id_type" || key === "father_id_type"
                                            ? renderRadioGroup(key, idTypeOptions)
                                            : key === "mother_education_level" || key === "father_education_level"
                                                ? renderRadioGroup(key, educationLevelOptions)
                                                : key === "therapy_support"
                                                    ? renderRadioGroup(key, therapySupportOptions, ["Sí", "No"])
                                                    : (
                                                        <input
                                                            type={typeof admission[key] === "boolean" ? "checkbox" : "text"}
                                                            name={key}
                                                            value={admission[key]}
                                                            checked={admission[key]}
                                                            onChange={onChange}
                                                            className="w-full p-2 border rounded text-black"
                                                        />
                                                    )}
                            </div>
                        );
                    })}
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

Modal.setAppElement("#__next");

export default EditAdmissionModal;

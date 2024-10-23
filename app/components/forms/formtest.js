// pages/admission.js
import { useState } from 'react';
import Stepper from '../admisiones/steeper';
import AdmissionModel from '@/app/models/admission/admissionModel';
import { createAdmission } from '@/app/services/admissionService';



const steps = ['Datos del Estudiante', 'Confirmación'];

const AdmissionForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(new AdmissionModel());

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateStep1 = () => {
        const {
            student_name,
            student_age,
            birth_date,
            living_with,
            aspired_grade,
            previous_school,
            english_level,
            therapy_support,
            referral_source,
        } = formData;

        if (
            !student_name ||
            !student_age ||
            !birth_date ||
            !living_with ||
            !aspired_grade ||
            !previous_school ||
            !english_level ||
            !referral_source ||
            (therapy_support === 'Sí' && !formData.therapy_type)
        ) {
            alert('Por favor completa todos los campos obligatorios.');
            return false;
        }
        return true;
    };


    const handleNext = () => {
        if (currentStep === 0 && !validateStep1()) return;
        if (currentStep === 1 && !validateStep2()) return;
        setCurrentStep((prev) => prev + 1);
    };


    const handleBack = () => setCurrentStep((prev) => prev - 1);

    const validateStep2 = () => {
        const {
            mother_name,
            mother_id_type,
            mother_id_number,
            mother_phone,
            mother_email,
            mother_education_level,
            mother_occupation,
            father_name,
            father_id_type,
            father_id_number,
            father_phone,
            father_email,
            father_education_level,
            father_occupation,
            info_clear,
        } = formData;

        if (
            !mother_name ||
            !mother_id_type ||
            !mother_id_number ||
            !mother_phone ||
            !mother_email ||
            !mother_education_level ||
            !mother_occupation ||
            !father_name ||
            !father_id_type ||
            !father_id_number ||
            !father_phone ||
            !father_email ||
            !father_education_level ||
            !father_occupation ||
            !info_clear
        ) {
            alert('Por favor completa todos los campos obligatorios.');
            return false;
        }
        return true;
    };



    const handleSubmit = async () => {
        console.log(formData); // Verifica el estado actual del formulario

        if (!validateStep2()) return; // Valida antes de enviar

        try {
            await createAdmission(formData);
            alert('Formulario enviado exitosamente.');

            // Restablece el estado del formulario
            setFormData(new AdmissionModel());

            // Recarga la página
            window.location.reload();
        } catch (error) {
            console.error('Error al enviar:', error);
            alert('Error al enviar el formulario.');
        }
    };


    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Nombre del Estudiante <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="student_name"
                                value={formData.student_name}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Edad del Estudiante <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="student_age"
                                value={formData.student_age}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Fecha de Nacimiento <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                ¿Con quién vive? <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="living_with"
                                value={formData.living_with}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Grado Aspirado <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="aspired_grade"
                                value={formData.aspired_grade}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Colegio de Procedencia <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="previous_school"
                                value={formData.previous_school}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Calendario
                            </label>
                            <div className="grid grid-cols-3 gap-x-6 gap-y-2 mb-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="school_calendar"
                                        value="A"
                                        onChange={handleChange}
                                        checked={formData.school_calendar === 'A'}
                                    />
                                    <span className="text-black">A</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="school_calendar"
                                        value="B"
                                        onChange={handleChange}
                                        checked={formData.school_calendar === 'B'}
                                    />
                                    <span className="text-black">B</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="school_calendar"
                                        value="C"
                                        onChange={handleChange}
                                        checked={formData.school_calendar === 'C'}
                                    />
                                    <span className="text-black">C</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Ciudad y País
                            </label>
                            <input
                                type="text"
                                name="city_country"
                                value={formData.city_country}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Nivel de Inglés <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="english_level"
                                        value="Muy bueno"
                                        onChange={handleChange}
                                        checked={formData.english_level === 'Muy bueno'}
                                    />
                                    <span className="text-black">Muy bueno</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="english_level"
                                        value="Bueno"
                                        onChange={handleChange}
                                        checked={formData.english_level === 'Bueno'}
                                    />
                                    <span className="text-black">Bueno</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="english_level"
                                        value="Regular"
                                        onChange={handleChange}
                                        checked={formData.english_level === 'Regular'}
                                    />
                                    <span className="text-black">Regular</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="english_level"
                                        value="No habla"
                                        onChange={handleChange}
                                        checked={formData.english_level === 'No habla'}
                                    />
                                    <span className="text-black">No habla</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                ¿Ha tenido apoyo terapéutico? <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center space-x-8">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="therapy_support"
                                        value="Sí"
                                        onChange={handleChange}
                                        checked={formData.therapy_support === 'Sí'}
                                    />
                                    <span className="text-black">Sí</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="therapy_support"
                                        value="No"
                                        onChange={handleChange}
                                        checked={formData.therapy_support === 'No'}
                                    />
                                    <span className="text-black">No</span>
                                </label>
                            </div>

                            {formData.therapy_support === 'Sí' && (
                                <div>
                                    <label className="block text-lg font-semibold text-black">
                                        ¿Cuál? <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="therapy_type"
                                        value={formData.therapy_type}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                ¿A través de qué medio se enteró del colegio? <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Google"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Google'}
                                    />
                                    <span className="text-black">Google</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Instagram"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Instagram'}
                                    />
                                    <span className="text-black">Instagram</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Facebook"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Facebook'}
                                    />
                                    <span>Facebook</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Otra persona"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Otra persona'}
                                    />
                                    <span>Otra persona</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Junta directiva"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Junta directiva'}
                                    />
                                    <span>Junta directiva</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Empleado TNS"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Empleado TNS'}
                                    />
                                    <span>Empleado TNS</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Medios de comunicación"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Medios de comunicación'}
                                    />
                                    <span>Medios de comunicación</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Vía las palmas"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Vía las palmas'}
                                    />
                                    <span>Vía las palmas</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Otra institución educativa"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Otra institución educativa'}
                                    />
                                    <span>Otra institución educativa</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="TNS graduados"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'TNS graduados'}
                                    />
                                    <span>TNS graduados</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="referral_source"
                                        value="Familia TNS"
                                        onChange={handleChange}
                                        checked={formData.referral_source === 'Familia TNS'}
                                    />
                                    <span>Familia TNS</span>
                                </label>
                            </div>
                        </div>

                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Nombre de la Madre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mother_name"
                                value={formData.mother_name}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Tipo de Documento Mamá <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap space-x-4">
                                {['CC', 'CE', 'Pasaporte', 'PPT', 'VISA', 'OTRO'].map((option) => (
                                    <label key={option} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="mother_id_type"
                                            value={option}
                                            checked={formData.mother_id_type === option}
                                            onChange={(e) => setFormData({ ...formData, mother_id_type: e.target.value })}
                                        />
                                        <span className="text-black text-lg">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Número de Documento <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mother_id_number"
                                value={formData.mother_id_number}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Celular Mamá <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mother_phone"
                                value={formData.mother_phone}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Email Mamá <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="mother_email"
                                value={formData.mother_email}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Nivel Educativo Mamá <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap space-x-4">
                                {['Bachiller', 'Pregrado', 'Postgrado', 'Maestría', 'Doctorado'].map((option) => (
                                    <label key={option} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="mother_education_level"
                                            value={option}
                                            checked={formData.mother_education_level === option}
                                            onChange={(e) => setFormData({ ...formData, mother_education_level: e.target.value })}
                                        />
                                        <span className="text-black text-lg">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Ocupación <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mother_occupation"
                                value={formData.mother_occupation}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Nombre Papá <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Tipo de Documento Papá <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap space-x-4">
                                {['CC', 'CE', 'Pasaporte', 'PPT', 'VISA', 'OTRO'].map((option) => (
                                    <label key={option} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="father_id_type"
                                            value={option}
                                            checked={formData.father_id_type === option}
                                            onChange={(e) => setFormData({ ...formData, father_id_type: e.target.value })}
                                        />
                                        <span className="text-black text-lg">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Número de Documento <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="father_id_number"
                                value={formData.father_id_number}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Celular Papá <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="father_phone"
                                value={formData.father_phone}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Email Papá <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="father_email"
                                value={formData.father_email}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Nivel Educativo Papá <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap space-x-4">
                                {['Bachiller', 'Pregrado', 'Postgrado', 'Maestría', 'Doctorado'].map((option) => (
                                    <label key={option} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="father_education_level"
                                            value={option}
                                            checked={formData.father_education_level === option}
                                            onChange={(e) => setFormData({ ...formData, father_education_level: e.target.value })}
                                        />
                                        <span className="text-black text-lg">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-black">
                                Ocupación <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="father_occupation"
                                value={formData.father_occupation}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        {/* <div className="flex items-center space-x-8">
                            <button onClick={handleSubmit} className="btn btn-primary">
                                Enviar
                            </button>
                        </div> */}
                        <div className="flex flex-col space-y-6">
                            <p className="text-black text-lg">
                                Por favor enviar al siguiente correo, las notas finales del último año aprobado,
                                los periodos finalizados del grado en curso, y la ficha observador:
                                <a href="mailto:aspirantes@thenewschool.edu.co" className="text-blue-500 underline ml-1">
                                    aspirantes@thenewschool.edu.co
                                </a>
                            </p>

                            <div className="flex items-center space-x-8">
                                <label className="text-black text-lg font-semibold">
                                    ¿La información fue clara? <span className="text-red-500">*</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="info_clear"
                                        value="Sí"
                                        onChange={handleChange}
                                        checked={formData.info_clear === 'Sí'}
                                    />
                                    <span className="text-black text-lg">Sí</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="info_clear"
                                        value="No"
                                        onChange={handleChange}
                                        checked={formData.info_clear === 'No'}
                                    />
                                    <span className="text-black text-lg">No</span>
                                </label>
                            </div>
                        </div>
                    </div>

                );


            default:
                return null;
        }
    };

    return (
        // Contenedor del formulario con padding superior e inferior
        <div className="container max-w-3xl mx-auto p-8 mb-10 bg-white shadow-lg rounded-lg">

            <h1 className="text-2xl font-bold text-center mb-6">Formulario de Admisión</h1>

            <Stepper steps={steps} currentStep={currentStep} />

            <div className="py-8">
                {renderStepContent()}
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="btn btn-secondary"
                >
                    Atrás
                </button>
                {currentStep === steps.length - 1 ? (
                    <button onClick={handleSubmit} className="btn btn-primary">
                        Enviar
                    </button>
                ) : (
                    <button onClick={handleNext} className="btn btn-primary">
                        Siguiente
                    </button>
                )}
            </div>
        </div>

    );
};

export default AdmissionForm;
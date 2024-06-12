import React, { useState } from 'react';
import 'flowbite';
import { Player } from '@lottiefiles/react-lottie-player';
import { errorMessages, limitInputDigit } from '../utils/settings';
import { emailRegex } from '../utils/expressionRegular';
import { calendarOptions, englishLevelOptions, genderOptions, medioOptions} from '../utils/dataGeneral';
import { documentTypeOptions } from '../utils/dataGeneral';
import {educationLevelOptions} from '../utils/dataGeneral';
import {inputClasses} from '../utils/dataGeneral';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    fechaNacimiento: '',
    religion: '',
    viveCon: '',
    gradoAspira: '',
    tieneHermanos: '',
    nombreHermano: '',
    colegioProcedencia: '',
    calendario: '',
    tiempoUltimaInstitucion: '',
    ciudadPais: '',
    nivelIngles: '',
    haTenidoApoyo: '',
    cualApoyo: '',
    medioConocimiento: [],
    nombreMama: '',
    tipoDocumentoMama: '',
    numeroDocumentoMama: '',
    celularMama: '',
    emailMama: '',
    escolaridadMama: '',
    ocupacionMama: '',
    nombrePapa: '',
    tipoDocumentoPapa: '',
    numeroDocumentoPapa: '',
    celularPapa: '',
    emailPapa: '',
    escolaridadPapa: '',
    ocupacionPapa: '',
    notasFinales: null,
    periodosFinalizados: null,
    fichaObservador: null
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleNextStep = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({ ...formData, medioConocimiento: [...formData.medioConocimiento, value] });
    } else {
      setFormData({ ...formData, medioConocimiento: formData.medioConocimiento.filter(item => item !== value) });
    }
  };

  const validateForm = () => {
    let errors = {};
    

    if (currentStep === 1) {
      if (!formData.nombre || formData.nombre.length < limitInputDigit) {
        errors.nombre = errorMessages.minLength('Nombre',limitInputDigit);
      }
      if (!formData.edad) {
        errors.edad = errorMessages.required('Edad');
      }
      if (!formData.fechaNacimiento) {
        errors.fechaNacimiento = errorMessages.required('Fecha de nacimiento');
      }
      if (!formData.religion || formData.religion.length < limitInputDigit) {
        errors.religion = errorMessages.minLength('Religión',limitInputDigit);
      }
      if (!formData.genero) {
        errors.genero = errorMessages.required('Genero');
      }
    }
    if (currentStep === 2) {
      if (!formData.viveCon || formData.viveCon.length < limitInputDigit) {
        errors.viveCon = errorMessages.minLength('Vive con',limitInputDigit);
      }
      if (!formData.gradoAspira || formData.gradoAspira.length < limitInputDigit) {
        errors.gradoAspira = errorMessages.minLength('Grado que es apira',limitInputDigit);
      }
      if (!formData.tieneHermanos) {
        errors.tieneHermanos = errorMessages.required('Tiene hermanos');
      }
      if (formData.tieneHermanos === 'si' && (!formData.nombreHermano || formData.nombreHermano.length < limitInputDigit)) {
        errors.nombreHermano = errorMessages.minLength('Nombre del hermano',limitInputDigit);
      }
    }
    if (currentStep === 3) {
      if (!formData.colegioProcedencia || formData.colegioProcedencia.length < limitInputDigit) {
        errors.colegioProcedencia = errorMessages.minLength('Colegio de procedencia ',limitInputDigit);
      }
      if (!formData.calendario) {
        errors.calendario = errorMessages.required('Calendario es requerido');
      }
      if (!formData.tiempoUltimaInstitucion || formData.tiempoUltimaInstitucion.length < limitInputDigit) {
        errors.tiempoUltimaInstitucion = errorMessages.minLength( 'Tiempo en la ultima institución ',limitInputDigit);
      }
      if (!formData.ciudadPais || formData.ciudadPais.length < limitInputDigit) {
        errors.ciudadPais = errorMessages.minLength('Ciudad y Pais ',limitInputDigit);
      }
    }
    if (currentStep === 4) {
      if (!formData.nivelIngles) {
        errors.nivelIngles = errorMessages.required('Nivel de ingles');
      }
      if (!formData.haTenidoApoyo) {
        errors.haTenidoApoyo = errorMessages.required('¿Ha tenido apoyo?');
      }
      if (formData.haTenidoApoyo === 'si' && (!formData.cualApoyo || formData.cualApoyo.length < limitInputDigit)) {
        errors.cualApoyo = errorMessages.minLength('Ha tenido apoyo ',limitInputDigit);
      }
    }
    if (currentStep === 5) {
      if (formData.medioConocimiento.length === 0) {
        errors.medioConocimiento = errorMessages.required('Medios');
      }
    }
    if (currentStep === 6) {
      if (!formData.nombreMama || formData.nombreMama.length < limitInputDigit) {
        errors.nombreMama = errorMessages.minLength('Nombre ',limitInputDigit);
      }
      if (!formData.tipoDocumentoMama) {
        errors.tipoDocumentoMama = errorMessages.required('Tipo documento');
      }
      if (!formData.numeroDocumentoMama || formData.numeroDocumentoMama.length < limitInputDigit) {
        errors.numeroDocumentoMama = errorMessages.minLength('Numero documento ',limitInputDigit);
      }
      if (!formData.celularMama || formData.celularMama.length < limitInputDigit) {
        errors.celularMama = errorMessages.minLength('Numero celular ',limitInputDigit);
      }
      if (!formData.emailMama || !emailRegex.test(formData.emailMama)) {
        errors.emailMama = errorMessages.required('Email');
      }
      if (!formData.escolaridadMama) {
        errors.escolaridadMama = errorMessages.required('Nivel escolar');
      }
      if (!formData.ocupacionMama || formData.ocupacionMama.length < limitInputDigit) {
        errors.ocupacionMama =errorMessages.minLength('Ocupacion ',limitInputDigit);
      }
      if (!formData.nombrePapa || formData.nombrePapa.length < limitInputDigit) {
        errors.nombrePapa = errorMessages.minLength('Nombre papá ',limitInputDigit);
      }
      if (!formData.tipoDocumentoPapa) {
        errors.tipoDocumentoPapa = errorMessages.required('Tipo documento');
      }
      if (!formData.numeroDocumentoPapa || formData.numeroDocumentoPapa.length < limitInputDigit) {
        errors.numeroDocumentoPapa = errorMessages.minLength('Numero documento ',limitInputDigit);
      }
      if (!formData.celularPapa || formData.celularPapa.length < 3) {
        errors.celularPapa = errorMessages.minLength('Celular papá',limitInputDigit);
      }
      if (!formData.emailPapa || !emailRegex.test(formData.emailPapa)) {
        errors.emailPapa = errorMessages.required('Email');
      }
      if (!formData.escolaridadPapa) {
        errors.escolaridadPapa = errorMessages.required('Nivel escolar');
      }
      if (!formData.ocupacionPapa || formData.ocupacionPapa.length < limitInputDigit) {
        errors.ocupacionPapa = errorMessages.minLength('Ocupación ',limitInputDigit);
      }
    }
    if (currentStep === 7) {
      if (!formData.notasFinales) {
        errors.notasFinales = errorMessages.required('Notas finales');
      }
      if (!formData.periodosFinalizados) {
        errors.periodosFinalizados = errorMessages.required('Periodos finalizados');
      }
      if (!formData.fichaObservador) {
        errors.fichaObservador = errorMessages.required('Ficha del observador');
      }
    }
    return errors;
  };

  const steps = [
    'Datos personales',
    'Información de contacto',
    'Información académica',
    'Nivel de inglés',
    'Medio de conocimiento',
    'Datos de los padres',
    'Subir documentos'
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const confirmSubmit = () => {
    setIsModalOpen(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult(true); // Simular éxito
      setTimeout(() => setSubmissionResult(null), 3000);
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Formulario de Inscripción</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
            {steps.map((step, index) => (
              <li key={index} className={`flex-1 flex items-center ${currentStep >= index + 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className="flex flex-col items-center">
                  {currentStep > index + 1 ? (
                    <svg className="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                  ) : (
                    <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 mb-1">
                      {index + 1}
                    </span>
                  )}
                  <span className="text-sm sm:text-base">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-full h-1 bg-gray-200 flex-1 mx-4"></div>
                )}
              </li>
            ))}
          </ol>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre del estudiante</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={inputClasses} />
                {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Edad del estudiante</label>
                <input type="number" name="edad" value={formData.edad} onChange={handleChange} className={inputClasses}/>
                {errors.edad && <span className="text-red-500 text-sm">{errors.edad}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className={inputClasses} />
                {errors.fechaNacimiento && <span className="text-red-500 text-sm">{errors.fechaNacimiento}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Religión</label>
                <input type="text" name="religion" value={formData.religion} onChange={handleChange} className={inputClasses} />
                {errors.religion && <span className="text-red-500 text-sm">{errors.religion}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Género</label>
                <select name="genero" value={formData.genero} onChange={handleChange} className={inputClasses}>
                  <option value="">Seleccione</option>
                  {genderOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.genero && <span className="text-red-500 text-sm">{errors.genero}</span>}
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep} disabled={currentStep === 1}>Atrás</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Siguiente</button>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">¿Con quién vive?</label>
                <input type="text" name="viveCon" value={formData.viveCon} onChange={handleChange} className={inputClasses} />
                {errors.viveCon && <span className="text-red-500 text-sm">{errors.viveCon}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Grado al que aspira</label>
                <input type="text" name="gradoAspira" value={formData.gradoAspira} onChange={handleChange} className={inputClasses} />
                {errors.gradoAspira && <span className="text-red-500 text-sm">{errors.gradoAspira}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">¿Tiene hermanos en la institución?</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hermanoSi"
                    name="tieneHermanos"
                    value="si"
                    className="mr-2"
                    checked={formData.tieneHermanos === 'si'}
                    onChange={handleChange}
                  />
                  <label htmlFor="hermanoSi" className="mr-4">Sí</label>
                  <input
                    type="radio"
                    id="hermanoNo"
                    name="tieneHermanos"
                    value="no"
                    className="mr-2"
                    checked={formData.tieneHermanos === 'no'}
                    onChange={handleChange}
                  />
                  <label htmlFor="hermanoNo">No</label>
                </div>
                {errors.tieneHermanos && <span className="text-red-500 text-sm">{errors.tieneHermanos}</span>}
              </div>
              {formData.tieneHermanos === 'si' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Nombre completo del herman@</label>
                  <input type="text" name="nombreHermano" value={formData.nombreHermano} onChange={handleChange} className={inputClasses} />
                  {errors.nombreHermano && <span className="text-red-500 text-sm">{errors.nombreHermano}</span>}
                </div>
              )}
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Atrás</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Siguiente</button>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Colegio de procedencia</label>
                <input type="text" name="colegioProcedencia" value={formData.colegioProcedencia} onChange={handleChange} className={inputClasses} />
                {errors.colegioProcedencia && <span className="text-red-500 text-sm">{errors.colegioProcedencia}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Calendario</label>
                <select name="calendario" value={formData.calendario} onChange={handleChange} className={inputClasses}>
                  <option value="">Seleccione</option>
                  {calendarOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.calendario && <span className="text-red-500 text-sm">{errors.calendario}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tiempo en la última institución</label>
                <input type="text" name="tiempoUltimaInstitucion" value={formData.tiempoUltimaInstitucion} onChange={handleChange} className={inputClasses} />
                {errors.tiempoUltimaInstitucion && <span className="text-red-500 text-sm">{errors.tiempoUltimaInstitucion}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ciudad y País</label>
                <input type="text" name="ciudadPais" value={formData.ciudadPais} onChange={handleChange} className={inputClasses} />
                {errors.ciudadPais && <span className="text-red-500 text-sm">{errors.ciudadPais}</span>}
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Atrás</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Siguiente</button>
              </div>
            </>
          )}
          {currentStep === 4 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Nivel de inglés</label>
                <select name="nivelIngles" value={formData.nivelIngles} onChange={handleChange} className={inputClasses}>
                  <option value="">Seleccione</option>
                  {englishLevelOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.nivelIngles && <span className="text-red-500 text-sm">{errors.nivelIngles}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">¿Ha tenido apoyo terapéutico?</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="apoyoSi"
                    name="haTenidoApoyo"
                    value="si"
                    className="mr-2"
                    checked={formData.haTenidoApoyo === 'si'}
                    onChange={handleChange}
                  />
                  <label htmlFor="apoyoSi" className="mr-4">Sí</label>
                  <input
                    type="radio"
                    id="apoyoNo"
                    name="haTenidoApoyo"
                    value="no"
                    className="mr-2"
                    checked={formData.haTenidoApoyo === 'no'}
                    onChange={handleChange}
                  />
                  <label htmlFor="apoyoNo">No</label>
                </div>
                {errors.haTenidoApoyo && <span className="text-red-500 text-sm">{errors.haTenidoApoyo}</span>}
              </div>
              {formData.haTenidoApoyo === 'si' && (
                <div className="mb-4">
                  <label className="block text-gray-700">¿Cuál?</label>
                  <input type="text" name="cualApoyo" value={formData.cualApoyo} onChange={handleChange} className={inputClasses} />
                  {errors.cualApoyo && <span className="text-red-500 text-sm">{errors.cualApoyo}</span>}
                </div>
              )}
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Atrás</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Siguiente</button>
              </div>
            </>
          )}
          {currentStep === 5 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">¿A través de qué medio se enteró del colegio?</label>
                <div className="flex flex-wrap">
                  {medioOptions.map(medio => (
                    <div key={medio} className="mr-4 mb-2">
                      <input
                        type="checkbox"
                        id={medio}
                        value={medio}
                        className="mr-2"
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={medio}>{medio}</label>
                    </div>
                  ))}
                </div>
                {errors.medioConocimiento && <span className="text-red-500 text-sm">{errors.medioConocimiento}</span>}
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Atrás</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Siguiente</button>
              </div>
            </>
          )}
          {currentStep === 6 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre mamá</label>
                <input type="text" name="nombreMama" value={formData.nombreMama} onChange={handleChange} className={inputClasses} />
                {errors.nombreMama && <span className="text-red-500 text-sm">{errors.nombreMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tipo de documento</label>
                <select name="tipoDocumentoMama" value={formData.tipoDocumentoMama} onChange={handleChange} className={inputClasses}>
                  <option value="">Seleccione</option>
                  {documentTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.tipoDocumentoMama && <span className="text-red-500 text-sm">{errors.tipoDocumentoMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Número de documento</label>
                <input type="text" name="numeroDocumentoMama" value={formData.numeroDocumentoMama} onChange={handleChange} className={inputClasses} />
                {errors.numeroDocumentoMama && <span className="text-red-500 text-sm">{errors.numeroDocumentoMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Celular mamá</label>
                <input type="text" name="celularMama" value={formData.celularMama} onChange={handleChange} className={inputClasses} />
                {errors.celularMama && <span className="text-red-500 text-sm">{errors.celularMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email mamá</label>
                <input type="email" name="emailMama" value={formData.emailMama} onChange={handleChange} className={inputClasses} />
                {errors.emailMama && <span className="text-red-500 text-sm">{errors.emailMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nivel de Escolaridad</label>
                <select name="escolaridadMama" value={formData.escolaridadMama} onChange={handleChange} className={inputClasses}>
                  <option value="">Seleccione</option>
                  {educationLevelOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.escolaridadMama && <span className="text-red-500 text-sm">{errors.escolaridadMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ocupación</label>
                <input type="text" name="ocupacionMama" value={formData.ocupacionMama} onChange={handleChange} className={inputClasses} />
                {errors.ocupacionMama && <span className="text-red-500 text-sm">{errors.ocupacionMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre papá</label>
                <input type="text" name="nombrePapa" value={formData.nombrePapa} onChange={handleChange} className={inputClasses} />
                {errors.nombrePapa && <span className="text-red-500 text-sm">{errors.nombrePapa}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tipo de documento</label>
                <select name="tipoDocumentoPapa" value={formData.tipoDocumentoPapa} onChange={handleChange} className={inputClasses}>
                  <option value="">Seleccione</option>
                  {documentTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.tipoDocumentoPapa && <span className="text-red-500 text-sm">{errors.tipoDocumentoPapa}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Número de documento</label>
                <input type="text" name="numeroDocumentoPapa" value={formData.numeroDocumentoPapa} onChange={handleChange} className={inputClasses} />
                {errors.numeroDocumentoPapa && <span className="text-red-500 text-sm">{errors.numeroDocumentoPapa}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Celular papá</label>
                <input type="text" name="celularPapa" value={formData.celularPapa} onChange={handleChange} className={inputClasses} />
                {errors.celularPapa && <span className="text-red-500 text-sm">{errors.celularPapa}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email papá</label>
                <input type="email" name="emailPapa" value={formData.emailPapa} onChange={handleChange} className={inputClasses} />
                {errors.emailPapa && <span className="text-red-500 text-sm">{errors.emailPapa}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nivel de Escolaridad</label>
                <select name="escolaridadPapa" value={formData.escolaridadPapa} onChange={handleChange} className={inputClasses}>
                  <option value="">Seleccione</option>
                  {educationLevelOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.escolaridadMama && <span className="text-red-500 text-sm">{errors.escolaridadMama}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ocupación</label>
                <input type="text" name="ocupacionPapa" value={formData.ocupacionPapa} onChange={handleChange} className={inputClasses} />
                {errors.ocupacionPapa && <span className="text-red-500 text-sm">{errors.ocupacionPapa}</span>}
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Atrás</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Siguiente</button>
              </div>
            </>
          )}
          {currentStep === 7 && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="notasFinales">Notas finales del último año aprobado</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="notasFinales" type="file" name="notasFinales" onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="periodosFinalizados">Periodos finalizados del grado en curso</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="periodosFinalizados" type="file" name="periodosFinalizados" onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="fichaObservador">Ficha observador</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="fichaObservador" type="file" name="fichaObservador" onChange={handleChange} required />
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Atrás</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
              </div>
            </>
          )}
        </form>
      </div>

      {isModalOpen && (
        <div id="static-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirmar Envío
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas enviar los archivos subidos?
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={confirmSubmit}>Aceptar</button>
              <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Player
            autoplay
            loop
            src="https://lottie.host/ce4d38d6-701d-4bcb-bd9d-09f2994d4b09/10Zo3GofkI.json"
            style={{ height: '300px', width: '300px' }}
          />
        </div>
      )}

      {submissionResult !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-8">
            {submissionResult ? (
              <>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">¡Éxito!</h3>
                <p className="text-gray-500 dark:text-gray-400">El formulario se ha enviado correctamente.</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Error</h3>
                <p className="text-gray-500 dark:text-gray-400">Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

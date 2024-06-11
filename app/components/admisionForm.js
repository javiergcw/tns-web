import React, { useState } from 'react';

const FormularioPorEtapas = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    fechaNacimiento: '',
    religion: '',
    viveCon: '',
    grado: '',
    hermanosInstitucion: '',
    nombreHermano: '',
    colegioProcedencia: '',
    calendario: '',
    tiempoInstitucion: '',
    ciudadPais: '',
    nivelIngles: '',
    apoyoTerapeutico: '',
    cualApoyo: '',
    medioEntero: '',
    // Nuevas preguntas
    nombreMama: '',
    tipoDocumentoMama: '',
    numeroDocumentoMama: '',
    celularMama: '',
    emailMama: '',
    nivelEscolaridadMama: '',
    ocupacionMama: '',
    nombrePapa: '',
    tipoDocumentoPapa: '',
    numeroDocumentoPapa: '',
    celularPapa: '',
    emailPapa: '',
    nivelEscolaridadPapa: '',
    ocupacionPapa: '',
    informacionClara: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'edad' || name === 'numeroDocumentoMama' || name === 'celularMama' || name === 'numeroDocumentoPapa' || name === 'celularPapa') {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep = () => {
    let newErrors = {};
    switch (step) {
      case 1:
        if (!formData.nombre) newErrors.nombre = 'Este campo es requerido';
        if (!formData.edad) newErrors.edad = 'Este campo es requerido';
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'Este campo es requerido';
        if (!formData.viveCon) newErrors.viveCon = 'Este campo es requerido';
        break;
      case 2:
        if (!formData.grado) newErrors.grado = 'Este campo es requerido';
        if (!formData.colegioProcedencia) newErrors.colegioProcedencia = 'Este campo es requerido';
        break;
      case 3:
        if (!formData.nivelIngles) newErrors.nivelIngles = 'Este campo es requerido';
        break;
      case 4:
        if (!formData.medioEntero) newErrors.medioEntero = 'Este campo es requerido';
        break;
      case 5:
        if (!formData.nombreMama) newErrors.nombreMama = 'Este campo es requerido';
        if (!formData.tipoDocumentoMama) newErrors.tipoDocumentoMama = 'Este campo es requerido';
        if (!formData.numeroDocumentoMama) newErrors.numeroDocumentoMama = 'Este campo es requerido';
        if (!formData.celularMama) newErrors.celularMama = 'Este campo es requerido';
        if (!formData.emailMama) newErrors.emailMama = 'Este campo es requerido';
        if (!formData.nivelEscolaridadMama) newErrors.nivelEscolaridadMama = 'Este campo es requerido';
        if (!formData.ocupacionMama) newErrors.ocupacionMama = 'Este campo es requerido';
        break;
      case 6:
        if (!formData.nombrePapa) newErrors.nombrePapa = 'Este campo es requerido';
        if (!formData.tipoDocumentoPapa) newErrors.tipoDocumentoPapa = 'Este campo es requerido';
        if (!formData.numeroDocumentoPapa) newErrors.numeroDocumentoPapa = 'Este campo es requerido';
        if (!formData.celularPapa) newErrors.celularPapa = 'Este campo es requerido';
        if (!formData.emailPapa) newErrors.emailPapa = 'Este campo es requerido';
        if (!formData.nivelEscolaridadPapa) newErrors.nivelEscolaridadPapa = 'Este campo es requerido';
        if (!formData.ocupacionPapa) newErrors.ocupacionPapa = 'Este campo es requerido';
        if (!formData.informacionClara) newErrors.informacionClara = 'Este campo es requerido';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Datos del Estudiante</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre del estudiante *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Edad del estudiante *</label>
              <input
                type="text"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.edad && <p className="text-red-500 text-sm">{errors.edad}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento *</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {errors.fechaNacimiento && <p className="text-red-500 text-sm">{errors.fechaNacimiento}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Religión</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">¿Con quién vive? *</label>
              <input
                type="text"
                name="viveCon"
                value={formData.viveCon}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.viveCon && <p className="text-red-500 text-sm">{errors.viveCon}</p>}
            </div>
            <div className="flex justify-end">
              <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Siguiente</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Más Datos del Estudiante</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Grado al que aspira *</label>
              <input
                type="text"
                name="grado"
                value={formData.grado}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.grado && <p className="text-red-500 text-sm">{errors.grado}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">¿Tiene hermanos en la institución?</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="hermanosInstitucion"
                  value="Sí"
                  checked={formData.hermanosInstitucion === 'Sí'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="mr-4">Sí</label>
                <input
                  type="radio"
                  name="hermanosInstitucion"
                  value="No"
                  checked={formData.hermanosInstitucion === 'No'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label>No</label>
              </div>
            </div>
            {formData.hermanosInstitucion === 'Sí' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nombre completo del herman@</label>
                <input
                  type="text"
                  name="nombreHermano"
                  value={formData.nombreHermano}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Escriba su respuesta"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Colegio de procedencia *</label>
              <input
                type="text"
                name="colegioProcedencia"
                value={formData.colegioProcedencia}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.colegioProcedencia && <p className="text-red-500 text-sm">{errors.colegioProcedencia}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Calendario</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="calendario"
                  value="A"
                  checked={formData.calendario === 'A'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="mr-4">A</label>
                <input
                  type="radio"
                  name="calendario"
                  value="B"
                  checked={formData.calendario === 'B'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="mr-4">B</label>
                <input
                  type="radio"
                  name="calendario"
                  value="C"
                  checked={formData.calendario === 'C'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label>C</label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tiempo en la última institución</label>
              <input
                type="text"
                name="tiempoInstitucion"
                value={formData.tiempoInstitucion}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
              />
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Anterior</button>
              <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Siguiente</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Datos Adicionales</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ciudad y País</label>
              <input
                type="text"
                name="ciudadPais"
                value={formData.ciudadPais}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nivel de inglés *</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="nivelIngles"
                  value="Muy bueno"
                  checked={formData.nivelIngles === 'Muy bueno'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label className="mr-4">Muy bueno</label>
                <input
                  type="radio"
                  name="nivelIngles"
                  value="Bueno"
                  checked={formData.nivelIngles === 'Bueno'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label className="mr-4">Bueno</label>
                <input
                  type="radio"
                  name="nivelIngles"
                  value="Regular"
                  checked={formData.nivelIngles === 'Regular'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label className="mr-4">Regular</label>
                <input
                  type="radio"
                  name="nivelIngles"
                  value="No habla"
                  checked={formData.nivelIngles === 'No habla'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label>No habla</label>
              </div>
              {errors.nivelIngles && <p className="text-red-500 text-sm">{errors.nivelIngles}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">¿Ha tenido apoyo terapéutico?</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="apoyoTerapeutico"
                  value="Sí"
                  checked={formData.apoyoTerapeutico === 'Sí'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="mr-4">Sí</label>
                <input
                  type="radio"
                  name="apoyoTerapeutico"
                  value="No"
                  checked={formData.apoyoTerapeutico === 'No'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label>No</label>
              </div>
            </div>
            {formData.apoyoTerapeutico === 'Sí' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">¿Cuál?</label>
                <input
                  type="text"
                  name="cualApoyo"
                  value={formData.cualApoyo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Escriba su respuesta"
                />
              </div>
            )}
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Anterior</button>
              <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Siguiente</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Medio de Conocimiento</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">¿A través de qué medio se enteró del colegio? *</label>
              <div className="flex flex-col">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Google"
                    checked={formData.medioEntero === 'Google'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Google</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Instagram"
                    checked={formData.medioEntero === 'Instagram'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Instagram</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Facebook"
                    checked={formData.medioEntero === 'Facebook'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Facebook</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Otra persona"
                    checked={formData.medioEntero === 'Otra persona'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Otra persona</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Junta Directiva"
                    checked={formData.medioEntero === 'Junta Directiva'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Junta Directiva</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Empleados TNS"
                    checked={formData.medioEntero === 'Empleados TNS'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Empleados TNS</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Medios de comunicación"
                    checked={formData.medioEntero === 'Medios de comunicación'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Medios de comunicación</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Vía Las Palmas"
                    checked={formData.medioEntero === 'Vía Las Palmas'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Vía Las Palmas</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Otra institución educativa"
                    checked={formData.medioEntero === 'Otra institución educativa'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Otra institución educativa</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="TNS graduados"
                    checked={formData.medioEntero === 'TNS graduados'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">TNS graduados</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="medioEntero"
                    value="Familia TNS"
                    checked={formData.medioEntero === 'Familia TNS'}
                    onChange={handleInputChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Familia TNS</span>
                </label>
              </div>
              {errors.medioEntero && <p className="text-red-500 text-sm">{errors.medioEntero}</p>}
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Anterior</button>
              <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Siguiente</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Datos de Representantes</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre mamá *</label>
              <input
                type="text"
                name="nombreMama"
                value={formData.nombreMama}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.nombreMama && <p className="text-red-500 text-sm">{errors.nombreMama}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tipo de documento *</label>
              <div className="flex flex-col">
                {['CC', 'CE', 'Pasaporte', 'PPT', 'Visa', 'Otro'].map((tipo) => (
                  <label key={tipo} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="tipoDocumentoMama"
                      value={tipo}
                      checked={formData.tipoDocumentoMama === tipo}
                      onChange={handleInputChange}
                      className="form-radio"
                      required
                    />
                    <span className="ml-2">{tipo}</span>
                  </label>
                ))}
              </div>
              {errors.tipoDocumentoMama && <p className="text-red-500 text-sm">{errors.tipoDocumentoMama}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Número de documento *</label>
              <input
                type="text"
                name="numeroDocumentoMama"
                value={formData.numeroDocumentoMama}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.numeroDocumentoMama && <p className="text-red-500 text-sm">{errors.numeroDocumentoMama}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Celular mamá *</label>
              <input
                type="text"
                name="celularMama"
                value={formData.celularMama}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.celularMama && <p className="text-red-500 text-sm">{errors.celularMama}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email mamá *</label>
              <input
                type="email"
                name="emailMama"
                value={formData.emailMama}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.emailMama && <p className="text-red-500 text-sm">{errors.emailMama}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nivel de Escolaridad *</label>
              <div className="flex flex-col">
                {['Bachiller', 'Pregrado', 'Postgrado', 'Maestría', 'Doctorado'].map((nivel) => (
                  <label key={nivel} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="nivelEscolaridadMama"
                      value={nivel}
                      checked={formData.nivelEscolaridadMama === nivel}
                      onChange={handleInputChange}
                      className="form-radio"
                      required
                    />
                    <span className="ml-2">{nivel}</span>
                  </label>
                ))}
              </div>
              {errors.nivelEscolaridadMama && <p className="text-red-500 text-sm">{errors.nivelEscolaridadMama}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ocupación *</label>
              <input
                type="text"
                name="ocupacionMama"
                value={formData.ocupacionMama}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.ocupacionMama && <p className="text-red-500 text-sm">{errors.ocupacionMama}</p>}
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Anterior</button>
              <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">Siguiente</button>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Datos del Papá</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre papá *</label>
              <input
                type="text"
                name="nombrePapa"
                value={formData.nombrePapa}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.nombrePapa && <p className="text-red-500 text-sm">{errors.nombrePapa}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tipo de documento *</label>
              <div className="flex flex-col">
                {['CC', 'CE', 'Pasaporte', 'PPT', 'Visa', 'Otro'].map((tipo) => (
                  <label key={tipo} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="tipoDocumentoPapa"
                      value={tipo}
                      checked={formData.tipoDocumentoPapa === tipo}
                      onChange={handleInputChange}
                      className="form-radio"
                      required
                    />
                    <span className="ml-2">{tipo}</span>
                  </label>
                ))}
              </div>
              {errors.tipoDocumentoPapa && <p className="text-red-500 text-sm">{errors.tipoDocumentoPapa}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Número de documento *</label>
              <input
                type="text"
                name="numeroDocumentoPapa"
                value={formData.numeroDocumentoPapa}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.numeroDocumentoPapa && <p className="text-red-500 text-sm">{errors.numeroDocumentoPapa}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Celular papá *</label>
              <input
                type="text"
                name="celularPapa"
                value={formData.celularPapa}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.celularPapa && <p className="text-red-500 text-sm">{errors.celularPapa}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email papá *</label>
              <input
                type="email"
                name="emailPapa"
                value={formData.emailPapa}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.emailPapa && <p className="text-red-500 text-sm">{errors.emailPapa}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nivel de Escolaridad *</label>
              <div className="flex flex-col">
                {['Bachiller', 'Pregrado', 'Postgrado', 'Maestría', 'Doctorado'].map((nivel) => (
                  <label key={nivel} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="nivelEscolaridadPapa"
                      value={nivel}
                      checked={formData.nivelEscolaridadPapa === nivel}
                      onChange={handleInputChange}
                      className="form-radio"
                      required
                    />
                    <span className="ml-2">{nivel}</span>
                  </label>
                ))}
              </div>
              {errors.nivelEscolaridadPapa && <p className="text-red-500 text-sm">{errors.nivelEscolaridadPapa}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ocupación *</label>
              <input
                type="text"
                name="ocupacionPapa"
                value={formData.ocupacionPapa}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Escriba su respuesta"
                required
              />
              {errors.ocupacionPapa && <p className="text-red-500 text-sm">{errors.ocupacionPapa}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">¿La información fue clara? *</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="informacionClara"
                  value="Sí"
                  checked={formData.informacionClara === 'Sí'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label className="mr-4">Sí</label>
                <input
                  type="radio"
                  name="informacionClara"
                  value="No"
                  checked={formData.informacionClara === 'No'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label>No</label>
              </div>
              {errors.informacionClara && <p className="text-red-500 text-sm">{errors.informacionClara}</p>}
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Anterior</button>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Enviar</button>
            </div>
          </div>
        );
      default:
        return <div>Formulario completado</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-center mb-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i + 1}
            className={`mx-2 w-8 h-8 rounded-full flex items-center justify-center ${
              step === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {renderStep()}
    </div>
  );
};

export default FormularioPorEtapas;

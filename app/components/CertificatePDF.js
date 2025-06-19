"use client";
import React, { useEffect } from "react";

// Función para formatear los montos con separador de miles
const formatCurrency = (value) => {
    return isNaN(value)
        ? "0"
        : parseFloat(value).toLocaleString("es-CO", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
};

// Función para formatear la fecha en "XX días del mes de XX de 20XX"
const formatDate = (input) => {
    if (!input) return "01 días del mes de enero de 2025";

    let year, month, day;

    if (typeof input === "string") {
        const [y, m, d] = input.split("-").map(Number);
        if (!y || !m || !d) return "01 días del mes de enero de 2025";
        year = y;
        month = m;
        day = d;
    } else if (input instanceof Date) {
        year = input.getFullYear();
        month = input.getMonth() + 1;
        day = input.getDate();
    } else {
        return "01 días del mes de enero de 2025";
    }

    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
    ];
    const monthName = monthNames[month - 1];
    const formattedDay = day.toString().padStart(2, "0");

    return `${formattedDay} días del mes de ${monthName} de ${year}`;
};

// Función para convertir el salario a texto
const numberToWords = (num) => {
    const units = ["", "mil", "millón", "mil millones"];
    const tens = [
        "", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa",
    ];
    const ones = [
        "", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
        "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
    ];

    if (num === 0) return "cero pesos";

    let words = "";
    let unitIndex = 0;

    while (num > 0) {
        let chunk = num % 1000;
        if (chunk > 0) {
            let chunkWords = "";
            if (chunk >= 100) {
                const hundreds = Math.floor(chunk / 100);
                chunkWords += ones[hundreds] + (hundreds === 1 && chunk === 100 ? " cien" : hundreds === 1 ? " ciento" : " cientos") + " ";
                chunk %= 100;
            }
            if (chunk >= 20) {
                const tensDigit = Math.floor(chunk / 10);
                chunkWords += tens[tensDigit] + (chunk % 10 > 0 ? " y " : " ");
                chunk %= 10;
            }
            if (chunk > 0 && chunk < 20) {
                chunkWords += ones[chunk] + " ";
            }
            words = chunkWords + (unitIndex === 2 && chunk !== 1 ? "millones" : units[unitIndex]) + (unitIndex > 0 && words ? " " : "") + words;
        }
        num = Math.floor(num / 1000);
        unitIndex++;
    }

    return words.trim() + " pesos";
};

// Función para formatear el tipo de contrato
const formatContractType = (contractType) => {
    switch (contractType?.toLowerCase()) {
        case "indefinido":
        case "término indefinido":
            return "indefinido";
        case "fijo":
        case "término fijo":
            return "fijo";
        case "prestación de servicios":
            return "de prestación de servicios";
        default:
            return "indefinido";
    }
};

// Función para validar el tipo de documento
const formatIdentificationType = (type) => {
    const validTypes = ["CC", "CE", "PPT", "TI", "RC", "PA", "PE", "NI"];
    return validTypes.includes(type?.toUpperCase()) ? type.toUpperCase() : "CC";
};

// Función para determinar el tratamiento según el género
const getGenderTerms = (gender) => {
    switch (gender?.toLowerCase()) {
        case "female":
            return {
                title: "señora",
                identificadx: "identificada",
                vinculadx: "vinculada",
            };
        case "male":
            return {
                title: "señor",
                identificadx: "identificado",
                vinculadx: "vinculado",
            };
        default:
            return {
                title: "señor/a",
                identificadx: "identificado/a",
                vinculadx: "vinculado/a",
            };
    }
};

export const CertificatePDF = ({ profile, onReady }) => {
    useEffect(() => {
        if (onReady) onReady();
    }, [onReady]);

    // Datos del perfil
    const {
        name = "Nombre del empleado",
        identification_type = "CC",
        identification_number = "XXX",
        issue_place = "Desconocido",
        position = "Administrativo",
        hire_date = "2025-01-01",
        base_salary = 0,
        contract_type = "indefinido",
        gender,
    } = profile || {};

    const currentDate = formatDate(new Date());
    const formattedHireDate = formatDate(hire_date);
    const { title, identificadx, vinculadx } = getGenderTerms(gender);

    return (
        <div
            id="pdf-content"
            className="w-[794px] min-h-[1123px] bg-white text-black font-sans"
            style={{ margin: 0, padding: 0, fontSize: "12px", lineHeight: "1.5" }}
        >
            {/* Encabezado */}
            <img
                src="/images/pdf/header.png"
                alt="Encabezado"
                className="w-full h-[240px] object-cover"
                style={{ display: "block", margin: 0, padding: 0 }}
                onError={(e) => (e.target.src = "/images/pdf/fallback-header.png")}
            />

            {/* Contenido Principal */}
            <div className="px-8 mt-12 mb-32">
                <h1 className="text-2xl font-bold text-gray-500 uppercase mb-4 text-center">
                    LA SOCIEDAD CIVIL EL NUEVO COLEGIO S.A.
                </h1>
                <h2 className="text-xl font-bold text-gray-500 uppercase mb-4 text-center">
                    THE NEW SCHOOL
                </h2>
                <h3 className="text-lg font-bold text-gray-500 uppercase mb-12 text-center">
                    CERTIFICA
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                    Que el/la {title} <span className="font-semibold">{name}</span>, {identificadx} con{" "}
                    <span className="font-semibold">{formatIdentificationType(identification_type)}</span>{" "}
                    <span className="font-semibold">{identification_number}</span> de{" "}
                    <span className="font-semibold">{issue_place}</span>, está {vinculadx} a nuestra
                    Institución desempeñándose como <span className="font-semibold">{position}</span> desde el{" "}
                    <span className="font-semibold">{formattedHireDate}</span>. Actualmente recibe un salario de{" "}
                    <span className="font-semibold">{numberToWords(base_salary)}</span> ($
                    <span className="font-semibold">{formatCurrency(base_salary)}</span>). Con contrato de trabajo{" "}
                    <span className="font-semibold">{formatContractType(contract_type)}</span>.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                    Se realiza este certificado a los{" "}
                    <span className="font-semibold">{currentDate}</span>.
                </p>
            </div>

            {/* Firma */}
            <div className="px-8 mb-12 text-left">
                <img
                    src="/images/pdf/firma_gestion_humana.png"
                    alt="Firma Gestión Humana"
                    className="w-[150px] h-auto mb-2"
                    style={{ display: "block" }}
                    onError={(e) => (e.target.src = "/images/pdf/fallback-firma.png")}
                />
                <p className="mb-2 border-t border-gray-400 w-64"></p>
                <p className="text-sm text-gray-600">Isabel Vásquez Moreno.</p>
                <p className="text-sm text-gray-600">Líder Gestión Humana</p>
                <p className="text-sm text-gray-600">The New School.</p>
                <p className="text-sm text-gray-600">PBX: 5207270</p>
            </div>

            {/* Pie de Página */}
            <img
                src="/images/pdf/footer.png"
                alt="Pie de Página"
                className="w-full h-[50px] object-cover absolute bottom-0"
                style={{ display: "block", margin: 0, padding: 0 }}
                onError={(e) => (e.target.src = "/images/pdf/fallback-footer.png")}
            />
        </div>
    );
};
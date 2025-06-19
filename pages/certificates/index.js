import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import DrawerLayout from "@/app/components/layout/drawerLayout";
import { getProfileById } from "@/app/services/profileService";
import { CertificatePDF } from "@/app/components/CertificatePDF";
import { TeacherCertificatePDF } from "@/app/components/TeacherCertificatePDF";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Certificado() {
    const router = useRouter();
    const [role, setRole] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const pdfRef = useRef();

    // Mapa de roles a componentes de certificado
    const getCertificateComponent = (roleName) => {
        const administrativeRoles = [
            "admin",
            "Compras",
            "Developer",
            "Lider de presupuesto",
            "Gestión Humana",
            "Administrativo",
        ];
        if (roleName === "Docente") {
            return TeacherCertificatePDF;
        } else if (administrativeRoles.includes(roleName)) {
            return CertificatePDF;
        }
        return null; // Para roles no permitidos
    };

    // Verificar autenticación y obtener el perfil
    useEffect(() => {
        const token = localStorage.getItem("token");
        const profileId = localStorage.getItem("profileId");

        if (!token || !profileId) {
            window.location.href = "https://thenewschool.edu.co/login";
            return;
        }

        const fetchProfile = async () => {
            try {
                const profileData = await getProfileById(profileId);
                setProfile(profileData);
                const roleName = profileData.rol?.name || "Sin rol";
                setRole(roleName);
            } catch (error) {
                console.error("Error fetching profile:", error);
                window.location.href = "https://thenewschool.edu.co/login";
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleDownload = async () => {
        if (!pdfRef.current) {
            console.error("Referencia al PDF no encontrada.");
            return;
        }

        try {
            const canvas = await html2canvas(pdfRef.current, {
                scale: 2,
                useCORS: true,
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [794, 1123],
            });

            pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
            pdf.save(`certificado_laboral_${profile?.name || "usuario"}.pdf`);

            console.log("Certificado laboral descargado.");
        } catch (error) {
            console.error("Error generando el PDF:", error);
            alert("Error al generar el PDF. Inténtalo de nuevo.");
        }
    };

    if (loading) {
        return (
            <DrawerLayout role={role}>
                <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
                    Cargando...
                </div>
            </DrawerLayout>
        );
    }

    // Determinar qué certificado renderizar según el rol
    const CertificateComponent = getCertificateComponent(role);
    const validRoles = [
        "Docente",
        "admin",
        "Compras",
        "Developer",
        "Lider de presupuesto",
        "Gestión Humana",
        "Administrativo",
    ];

    return (
        <DrawerLayout role={role}>
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
                <h1
                    className="text-3xl font-bold text-blue-800 mb-6"
                    style={{ fontFamily: "Patua One, sans-serif" }}
                >
                    Certificado Laboral
                </h1>
                {validRoles.includes(role) ? (
                    <>
                        <button
                            onClick={handleDownload}
                            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto text-lg font-semibold"
                        >
                            Descargar Certificado Laboral
                        </button>
                        {/* Renderizar el PDF en un contenedor oculto */}
                        <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
                            <div ref={pdfRef}>
                                {CertificateComponent && (
                                    <CertificateComponent
                                        profile={profile}
                                        onReady={() => console.log("CertificatePDF listo")}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-red-600 text-lg">
                        No tienes permisos para descargar un certificado laboral.
                    </p>
                )}
            </div>
        </DrawerLayout>
    );
}
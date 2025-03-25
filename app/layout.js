"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = cargando, true = autenticado, false = no autenticado

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.replace("/login"); // Redirige a la ruta interna /login
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, [router]);

    // Mientras se valida la autenticación, no renderizamos nada o mostramos un loading
    if (isAuthenticated === null) {
        return (
            <html lang="en">
            <body className={inter.className}>
            <div>Loading...</div> {/* Puedes usar un componente de Loader aquí */}
            </body>
            </html>
        );
    }

    // Si no está autenticado, no renderizamos el contenido
    if (!isAuthenticated) {
        return null; // La redirección ya está manejada por el router.replace
    }

    // Si está autenticado, renderizamos los hijos (páginas y componentes)
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
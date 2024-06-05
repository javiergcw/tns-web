import { useEffect } from 'react';

const FormInscription = () => {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=GxPUyoHSe0KuXPduWcGPzWxbX51u9cdNlldIgWpMxGJUQVpMNjhDUzNLVzdZUDQ1TTFCUFoyRjNRVy4u&embed=true";
        },); // Redirigir después de 3 segundos
    }, []);

    return (
        <div className="px-4 md:px-8 lg:px-16 mb-8 mt-8">
            {/* Contenido para dispositivos móviles */}
            <div className="block md:hidden text-center">
                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=GxPUyoHSe0KuXPduWcGPzWxbX51u9cdNlldIgWpMxGJUQVpMNjhDUzNLVzdZUDQ1TTFCUFoyRjNRVy4u&embed=true" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Escanea el siguiente código QR o haz clic aquí
                </a>
                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=GxPUyoHSe0KuXPduWcGPzWxbX51u9cdNlldIgWpMxGJUQVpMNjhDUzNLVzdZUDQ1TTFCUFoyRjNRVy4u&embed=true" target="_blank" rel="noopener noreferrer">
                    <img
                        src="/images/others/qrform.png"
                        alt="descarga"
                        width="800"
                        height="800"
                        className="mx-auto"
                    />
                </a>
                <center><b><span lang="es-CO">I voluntarily authorize THE NEW SCHOOL...</span></b></center>
            </div>

            {/* Contenido para escritorio */}
            <div className="hidden md:block">
                <div className="text-center relative">
                    {/* <div className="p-4 bg-blue-100 border border-blue-300 rounded-md">
                        <p className="text-blue-700 font-semibold text-lg">Estás siendo redireccionado...</p>
                        <p className="text-blue-500">Estamos preparando todo para ti, por favor espera un momento.</p>
                    </div> */}
                   <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=GxPUyoHSe0KuXPduWcGPzWxbX51u9cdNlldIgWpMxGJUQVpMNjhDUzNLVzdZUDQ1TTFCUFoyRjNRVy4u&embed=true">
                   <img
                        src="/images/form_parents.png"
                        alt="Formulario de Padres"
                        className="w-full max-w-full max-h-[100vh] mx-auto"
                    />
                   </a>
                </div>
                <center><b><span lang="es-CO">I voluntarily authorize THE NEW SCHOOL...</span></b></center>
            </div>
        </div>
    );
}

export default FormInscription;

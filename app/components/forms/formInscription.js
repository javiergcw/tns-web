const FormInscription = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 mb-8 mt-8">
            {/* Contenido para dispositivos móviles */}
            <div className="block md:hidden text-center">
                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=GxPUyoHSe0KuXPduWcGPzWxbX51u9cdNlldIgWpMxGJUQVpMNjhDUzNLVzdZUDQ1TTFCUFoyRjNRVy4u&embed=true" target="_blank" rel="noopener noreferrer">
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
                <div className="text-center">
                    <iframe
                        className="border-none w-full max-w-full max-h-[100vh]"
                        src="https://forms.office.com/Pages/ResponsePage.aspx?id=GxPUyoHSe0KuXPduWcGPzWxbX51u9cdNlldIgWpMxGJUQVpMNjhDUzNLVzdZUDQ1TTFCUFoyRjNRVy4u&embed=true"
                        width="840"
                        height="1080"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
                <center><b><span lang="es-CO">I voluntarily authorize THE NEW SCHOOL...</span></b></center>
            </div>
        </div>
    );
}

export default FormInscription;

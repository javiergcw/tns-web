export default function Bilingue() {
    return (
        <div className="backgroundImagefaith">
            <div className="contenedor flex justify-center items-center min-h-screen">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h3 className="text-4xl text-[#444444] mb-4">Propuesta Bilingüe</h3>
                        <h4 className="text-3xl text-[#444444] mb-4">Por qué apostamos a una propuesta bilingüe</h4>
                        <p className="text-gray-500 text-[13px]">
                            Hoy más que nunca resulta imprescindible aprender inglés. Es indiscutible: el inglés se ha convertido en el idioma global de comunicación por excelencia. Es indispensable cuando viajamos, ya sea por turismo o negocios.
                            <br></br>
                            En estos casos, es necesario hablar inglés para ir de compras, aprender inglés para poder tomar un tren sin perderse o para pedir la cuenta en un restaurante donde hablan solamente inglés. Además, la mayoría de las páginas de Internet, prensa mundial e información científica se encuentran en idioma inglés.
                            <br></br>
                            Nuestra institución le apunta al idioma inglés como una de las herramientas que le damos al estudiante para alcanzar sus metas en la vida y para incursionar en el multilingüismo, este año la básica secundaria cuenta con clases de francés.
                        </p>
                    </div>

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[420px]"
                             src="http://www.thenewschool.edu.co/wp-content/uploads/2015/09/thumbnail_fadfs.jpg"
                             alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>
            </div>
        </div>
    );
}

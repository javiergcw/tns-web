import Link from 'next/link';

// 1. AÑADE 'slug' A LAS PROPS QUE RECIBES
export default function CardNew({ date, imageUrl, title, slug }) {
    // 2. YA NO NECESITAS ESTA LÍNEA, ASÍ QUE LA ELIMINAMOS:
    // const titleSlug = encodeURI(title.toLowerCase().replace(/ /g, "-"));

    return (
        // 3. USA LA PROP 'slug' DIRECTAMENTE AQUÍ
        <Link href={`/blogs/${slug}`}>
            <div className="cursor-pointer block">
                <div className="relative group">
                    <img src={imageUrl} className="w-full h-60 object-cover" alt={title} /> {/* Es bueno añadir alt a las imágenes */}
                    <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute bottom-0 p-4">
                        <div className="flex items-center text-white">
                            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 6v6l4 2"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                            <span>{date}</span>
                        </div>
                        {/* Corregí text-black aquí, probablemente querías que el título fuera blanco sobre el gradiente */}
                        <h3 className="text-white text-lg mt-2">{title}</h3>
                        <div className="h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
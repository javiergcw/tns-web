'use client'
import React from 'react';
import Link from 'next/link'; // Importa Link de next/link
import ReadMoreButton from '../others/button/readMoreButton';

const BlogsSection = ({ blogs }) => {

    const generateSlug = (title) => {
        return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };
    
    return (
        <div className="text-center mb-20 w-screen h-auto bg-white pt-8">
            <p className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-400 uppercase tracking-wide bounce">
                BE UP TO DATE WITH
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-blueButton mb-5 sm:mb-8 md:mb-10 bounce">
                <strong>OUR ACTIVITIES</strong>
            </h1>

            <div className="flex justify-center flex-wrap gap-4 gap-12 mt-4">
                {blogs.slice(0, 4).map((blog, index) => (
                    <Link href={`/blogs/${generateSlug(blog.title)}`} key={index}>
                        <div className="relative group m-0 h-[400px] w-[300px] cursor-pointer flex flex-col">
                            {/* Fecha */}
                            <div className="absolute top-4 left-2 z-20 bg-whitePrimary text-gray5th py-1 px-2 text-sm transform -translate-x-1/4">
                                {blog.date}
                                <div className="absolute top-1/2 right-0 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-whitePrimary transform -translate-y-1/2 translate-x-full" />
                            </div>
                            {/* Contenedor de la imagen con efecto de hover */}
                            <div className="flex justify-center items-center h-[70%] border-8 border-whitePrimary group-hover:border-blueButton transition duration-300 ease-in-out transform group-hover:-translate-y-2 overflow-hidden">
                                <img src={blog.imageUrl} alt="Content" className="block w-full h-full object-cover" />
                            </div>
                            {/* Título */}
                            <div className="flex-grow">
                                <p className="font-black text-lg mt-4 text-slate-950 text-center break-words whitespace-normal">
                                    {blog.title}
                                </p>
                            </div>
                            {/* Divider - Solo en pantallas mayores a 'sm' */}
                            <hr className="my-2 border-t-2 border-blueButton hidden sm:block w-full" />
                            {/* Botón Read More - Solo en pantallas mayores a 'sm' */}
                            <center className="pt-4 hidden sm:block">
                                <ReadMoreButton />
                            </center>
                        </div>
                    </Link>
                ))}
            </div>
            <img src="/images/others/bg-home1.jpg" alt="Decorative Background" className="w-screen h-auto pt-40" />
        </div>
    );
};

export default BlogsSection;

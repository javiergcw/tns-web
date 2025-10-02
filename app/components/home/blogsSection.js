'use client'
import React from 'react';
import Link from 'next/link';
import ReadMoreButton from '../others/button/readMoreButton';

const BlogsSection = ({ blogs }) => {

    // Función para estandarizar el formato de la fecha
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).replace(/(\d+)/, '$1'); // Añade coma después del día
    };

    return (
        <div className="text-center mb-20 w-screen h-auto bg-white pt-8">
            <p className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-400 uppercase tracking-wide bounce">
                BE UP TO DATE WITH
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-blueButton mb-5 sm:mb-8 md:mb-10 bounce">
                <strong>OUR ACTIVITIES</strong>
            </h1>

            <div className="flex justify-center flex-wrap gap-4 mt-4">
                {blogs.slice(0, 4).map((blog, index) => (
                    <Link href={`/blogs/${blog.slug}`} key={index}>
                        <div className="relative group m-0 h-[400px] w-[300px] cursor-pointer flex flex-col justify-between">
                            {/* Fecha */}
                            <div className="absolute top-4 left-2 z-20 bg-whitePrimary text-gray5th py-1 px-2 text-sm transform -translate-x-1/4">
                                {formatDate(blog.date)}
                                <div className="absolute top-1/2 right-0 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-whitePrimary transform -translate-y-1/2 translate-x-full" />
                            </div>
                            {/* Contenedor de la imagen */}
                            <div className="h-[70%] border-8 border-whitePrimary group-hover:border-blueButton transition duration-300 ease-in-out overflow-hidden">
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Contenido inferior (título, divider, botón) */}
                            <div className="flex flex-col justify-between h-[30%] p-2">
                                <p className="font-black text-lg text-slate-950 text-center break-words whitespace-normal">
                                    {blog.title}
                                </p>
                                <hr className="my-2 border-t-2 border-blueButton hidden sm:block w-full" />
                                <div className="hidden sm:flex justify-center">
                                    <ReadMoreButton />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <img src="/images/others/bg-home1.jpg" alt="Decorative Background" className="w-screen h-auto pt-40" />
        </div>
    );
};

export default BlogsSection;
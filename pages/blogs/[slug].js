import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import blogList from '@/app/data/blogData';
import { Dialog } from '@headlessui/react';
import Footer from '@/app/components/home/footer/footer'
import TopHeader from '@/app/components/home/header/topHeader'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import SocialShareButtons from '@/app/components/news/socialShareButtons';

const BlogDetail = () => {
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [blog, setBlog] = useState(null); // Corrige esto para usar el hook de estado adecuadamente

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        // Asegúrate de que la generación de slug aquí coincida con la generación de slug en BlogsSection
        const generateSlug = (title) => {
            return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        };

        // Utiliza la generación de slug para encontrar el blog correcto
        const blogFound = blogList.find(b => generateSlug(b.title) === slug);
        setBlog(blogFound); // Actualiza el estado con el blog encontrado

    }, [router.isReady, slug]);


    if (!blog) return <p>Blog no encontrado</p>;

    const toggleImagePopup = () => setImagePopupOpen(!isImagePopupOpen);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center my-8">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <div className="flex items-center mb-2">
                    <span className="inline-block bg-gray-200 p-2 rounded-full mr-2">👤</span>
                    <span>Published by admin</span>
                    <span className="ml-4">{blog.date}</span>
                </div>
                <div className="relative group w-full h-72 overflow-hidden flex justify-center items-center my-8">
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110 cursor-pointer"
                        onClick={toggleImagePopup}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                        onClick={toggleImagePopup}>
                        <div className="bg-white bg-opacity-50 w-full h-56"></div>
                        <div className="h-16 bg-blue-500 bg-opacity-90 w-full flex items-center justify-center">
                            <span className="text-white text-3xl">
                                🔍
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <SocialShareButtons blogUrl={`https://tuurl.com/${blog.slug}`} />
            <Dialog open={isImagePopupOpen} onClose={toggleImagePopup} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                    <div className="relative bg-white max-w-lg mx-auto p-4">
                        <img src={blog.imageUrl} alt={blog.title} className="max-w-full h-auto" />
                    </div>
                </div>
            </Dialog>
            <FooterTwo />
            <Footer />
        </>
    );
};

export default BlogDetail;

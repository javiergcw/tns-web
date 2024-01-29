import { useState } from 'react';
import { useRouter } from 'next/router';
import blogList from '@/app/data/blogData';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

import Footer from '@/app/components/home/footer/footer'
import TopHeader from '@/app/components/home/header/topHeader'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'

const BlogDetail = () => {
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const router = useRouter();
    const { slug } = router.query;

    const blog = blogList.find(b => b.title === slug);

    if (!blog) return <p>Blog no encontrado</p>;

    const toggleImagePopup = () => setImagePopupOpen(!isImagePopupOpen);

    return (
        <>
            <TopHeader />
            <Navbar />
            <div className="flex flex-col items-center my-8">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <div className="flex items-center mb-2">
                    <span className="inline-block bg-gray-200 p-2 rounded-full mr-2">👤</span>
                    <span>Published by admin</span>
                    <span className="ml-4">{blog.date}</span>
                </div>
                <div className="relative">
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="hover:opacity-75 transition duration-300 ease-in-out"
                        width={600}
                        height={300}
                        onClick={toggleImagePopup}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-500 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                        <span className="text-white text-3xl">🔍</span>
                    </div>
                </div>
            </div>
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

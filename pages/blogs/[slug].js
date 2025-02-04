import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import blogList from '@/app/data/blogData';
import { Dialog } from '@headlessui/react';

import SocialShareButtons from '@/app/components/news/socialShareButtons';
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import MainLayout from '@/app/components/layout/mainLayout';

const BlogDetail = () => {
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [blog, setBlog] = useState(null);

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        const generateSlug = (title) => {
            return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        };

        const blogFound = blogList.find(b => generateSlug(b.title) === slug);
        setBlog(blogFound);
    }, [router.isReady, slug]);

    if (!blog) return <p>Blog no encontrado</p>;

    const toggleImagePopup = () => setImagePopupOpen(!isImagePopupOpen);

    return (
        <Provider store={store}>
            <MainLayout>
            <div className='flex flex-col px-4 md:px-24 pb-22 my-8'>
                <div className="md:flex-row flex flex-col-reverse items-start gap-4 md:gap-8">
                    <div className="w-full md:w-1/5 flex flex-col justify-start text-black">
                        <SocialShareButtons blogUrl={`https://tuurl.com/${blog.slug}`} />
                    </div>
                    <div className="w-full md:w-4/5">
                        <h1 className="text-4xl text-black font-bold mb-4">{blog.title}</h1>
                        <div className="flex items-center mb-2">
                            <span className="inline-block bg-gray-200 p-2 rounded-full mr-2">👤</span>
                            <span className="text-black">Published by admin,</span>
                            <span className="ml-4 text-black">{blog.date}</span>
                        </div>
                        <div className="relative group w-full overflow-hidden flex justify-center items-center my-8">
                            {blog.banner ? (
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110 cursor-pointer"
                                    style={{ maxHeight: '500px' }}
                                    onClick={toggleImagePopup}
                                />
                            ) : (
                                <div className="w-full h-full" style={{ maxHeight: '500px' }}></div>
                            )}
                            {blog.banner && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                                    onClick={toggleImagePopup}>
                                    <div className="bg-white bg-opacity-50 w-full h-full"></div>
                                    <div className="absolute flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
                                        <span className="text-white text-3xl">🔍</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:flex-row flex flex-col-reverse items-start gap-4 md:gap-8">
                    <div className="w-full md:w-1/5 flex flex-col justify-start">
                    </div>
                    <div className="w-full md:w-4/5">
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.body }}
                            className="blog-body-content text-slate-950"
                        ></div>
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
            </div>
            </MainLayout>
        </Provider>
    );
};

export default BlogDetail;

import VideoCard from "@/app/components/others/container/videoCard";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '/app/globals.css'
import React from 'react'
import { useState } from 'react';
import SearchFilterBar from "@/app/components/others/container/searchFilterBar";
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import HeaderInitial from "@/app/components/others/headerInitial";
import MainLayout from "@/app/components/layout/mainLayout";
import Pagination from "@/app/components/others/button/pagination";
import { VideoPath } from "@/app/utils/assetsPath";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedVideo, setSelectedVideo] = useState(null); // Estado para almacenar el video seleccionado
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el modal está abierto

    const allVideos = [
        {
            link: VideoPath.inscription,
            title: 'Video de ejemplo',
            date: 'Septiembre 29',
            duration: '12 min',
            category: 'Category 1',
            color: 'bg-green-500',
        },

        // Agrega más videos según sea necesario
    ];

    const filteredVideos = allVideos.filter(video =>
        (category === 'All' || video.category === category) &&
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const videosPerPage = 3;
    const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
    const displayedVideos = filteredVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setCategory('All');
        setCurrentPage(1);
    };

    const openVideoModal = (video) => {
        setSelectedVideo(video);
        setIsOpen(true);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
        setIsOpen(false);
    };

    return (
        <Provider store={store}>
            <MainLayout>
                <HeaderInitial/>
                <div className="container mx-auto mt-10">
                    <h1 className="text-4xl font-bold mb-6">VIDEOS</h1>
                    <SearchFilterBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        category={category}
                        onCategoryChange={handleCategoryChange}
                        onClearFilters={handleClearFilters}
                    />
                    <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedVideos.map((video, index) => (
                            <CSSTransition key={index} timeout={300} classNames="fade">
                                <div className="cursor-pointer" onClick={() => openVideoModal(video)}>
                                    <VideoCard
                                        link={video.link}
                                        title={video.title}
                                        date={video.date}
                                        duration={video.duration}
                                        category={video.category}
                                        color={video.color}
                                    />
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    {/* Modal para mostrar el video */}
                    {isOpen && selectedVideo && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                            <div className="max-w-lg w-full p-4 bg-white rounded-lg shadow-lg">
                                <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        src={selectedVideo.link}
                                        title={selectedVideo.title}
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0"
                                        allowFullScreen
                                        autoPlay  // Agregamos autoPlay aquí para evitar la reproducción en segundo plano
                                    />
                                </div>
                                <button className="absolute top-0 right-0 m-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900" onClick={closeVideoModal}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M13.707 6.293a1 1 0 010 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
                <br/>
                <br/>
            </MainLayout>
        </Provider>
    );
}
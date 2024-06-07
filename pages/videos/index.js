import VideoCard from "@/app/components/others/container/videoCard";
import Pagination from "@/app/components/others/button/pagination";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import "/app/globals.css";
import React from 'react'
import { useState } from 'react';
import SearchFilterBar from "@/app/components/others/container/searchFilterBar";
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import HeaderInitial from "@/app/components/others/headerInitial";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const allVideos = [
        {
            link: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            title: 'Video de ejemplo',
            date: 'Septiembre 29',
            duration: '12 min',
            category: 'Category 1',
            color: 'bg-green-500',
        },
        {
            link: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
            title: 'Video de ejemplo 2',
            date: 'Septiembre 29',
            duration: '30 seg',
            category: 'Category 2',
            color: 'bg-red-500',
        },
        {
            link: 'https://www.youtube.com/embed/V-_O7nl0Ii0',
            title: 'Video de ejemplo 3',
            date: 'Septiembre 29',
            duration: '30 seg',
            category: 'Category 3',
            color: 'bg-blue-500',
        },
        {
            link: 'https://www.youtube.com/embed/V-_O7nl0Ii0',
            title: 'Video de ejemplo 3',
            date: 'Septiembre 29',
            duration: '30 seg',
            category: 'Category 3',
            color: 'bg-blue-500',
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

    return (
        <Provider store={store}>

      
                <Navbar />
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
                            <VideoCard
                                link={video.link}
                                title={video.title}
                                date={video.date}
                                duration={video.duration}
                                category={video.category}
                                color={video.color}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                {/* <div className="flex justify-center mt-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div> */}
                </div>
                <br/>
                <br/>
                <FooterTwo />
                <Footer />
    
        </Provider>
    );
}
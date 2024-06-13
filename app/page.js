'use client'
import { useState, useEffect } from 'react';

import Modal from "./components/modal"; // Importa el componente del modal
import BannerCarousel from "./components/home/bannerCarrouselHome";
import ServicesHome from "./components/home/servicesHome";
import CalendarScheduleHome from "./components/home/calendarScheduleHome";
import BlogsSection from "./components/home/blogsSection";
import ServicesStandart from "./components/home/servicesSandart";
import blogList from "./data/blogData";
import './globals.css'
import { Provider } from 'react-redux';
import store from './store/store'
import { ImagesPath } from "./utils/imagesPath";
import MainLayout from './components/layouts/mainLayout';

export default function Home() {
  const [showModal, setShowModal] = useState(true); // Establece el estado inicial del modal en true

  useEffect(() => {
    setShowModal(true); // Muestra el modal al montar el componente
  }, []);

  const imagePaths = [
    ImagesPath.banner7,
    ImagesPath.banner8,
    ImagesPath.banner1,
    ImagesPath.banner2,
  ];

  const servicesList = [
    { href: 'http://mail.thenewschool.edu.co/', src: ImagesPath.cloud, alt: 'TNS CLOUD' },
    { href: 'services/others', src: ImagesPath.services, alt: 'Services' },
    { href: 'services/beam', src: ImagesPath.beam, alt: 'Beam' },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Provider store={store}>
      <MainLayout>
        {showModal && <Modal setShowModal={setShowModal} />}
        <BannerCarousel imagePaths={imagePaths} />
        <ServicesHome images={servicesList} />
        <BlogsSection blogs={blogList} />
        <CalendarScheduleHome />
        <ServicesStandart />
      </MainLayout>
    </Provider>
  )
}

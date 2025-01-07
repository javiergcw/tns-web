"use client";
import "./globals.css";
import { useState, useEffect } from "react";
 // Importa el nuevo modal
import BannerCarousel from "./components/home/bannerCarrouselHome";
import ServicesHome from "./components/home/servicesHome";
import CalendarScheduleHome from "./components/home/calendarScheduleHome";
import BlogsSection from "./components/home/blogsSection";
import ServicesStandart from "./components/home/servicesSandart";
import blogList from "./data/blogData";
import { Provider } from "react-redux";
import store from "./store/store";
import { ImagesPath } from "./utils/assetsPath";
import MainLayout from "./components/layout/mainLayout";
import ModalImage from "./components/home/ModalImage";

export default function Home() {
  const [showModal, setShowModal] = useState(true); // Modal visible al inicio

  const imageUrl = "/images/pendon_preescolar.png"; // Ruta de la imagen que deseas mostrar

  useEffect(() => {
    setShowModal(true); // Muestra el modal al montar el componente
  }, []);

  const imagePaths = [
    ImagesPath.banner9,
    ImagesPath.banner10,
    ImagesPath.banner11,
  ];

  const servicesList = [
    {
      href: "http://mail.thenewschool.edu.co/",
      src: ImagesPath.cloud,
      alt: "TNS CLOUD",
    },
    { href: "services/others", src: ImagesPath.services, alt: "Services" },
    { href: "services/beam", src: ImagesPath.beam, alt: "Beam" },
    {
      href: "https://podcasters.spotify.com/pod/show/the-new-school",
      src: ImagesPath.podcast,
      alt: "Podcast",
    },
    {
      href: "https://thenewschool.edu.co/login",
      src: ImagesPath.shopping,
      alt: "Shopping",
    },
  ];

  return (
    <Provider store={store}>
      <MainLayout>
        {/* {showModal && <ModalImage setShowModal={setShowModal} imageUrl={imageUrl} />} */}
        <BannerCarousel imagePaths={imagePaths} />
        <ServicesHome images={servicesList} />
        <BlogsSection blogs={blogList} />
        <CalendarScheduleHome />
        <ServicesStandart />
      </MainLayout>
    </Provider>
  );
}

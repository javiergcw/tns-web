"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import Image from "next/image";
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

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  const imageUrl = "/images/journey/vacaciones.jpeg"; // Ruta de la imagen

  useEffect(() => {
    setShowModal(true); // Mostrar el modal al cargar la página
  }, []);

  const videoPaths = [
    "/videos/tns-slide-1.mp4",
    "/videos/tns-slide-2.mp4",
    "/videos/tns-slide-3.mp4",
  ];

  const servicesList = [
    {
      href: "https://forms.office.com/Pages/ResponsePage.aspx?id=GxPUyoHSe0KuXPduWcGPzWxbX51u9cdNlldIgWpMxGJUQVpMNjhDUzNLVzdZUDQ1TTFCUFoyRjNRVy4u&embed=true",
      src: ImagesPath.admissions,
      alt: "admissions",
      className: "w-[130px] h-auto",
    },
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
      href: "/my_journey",
      src: ImagesPath.myjourney,
      alt: "My Journey",
      className: "w-[140px] h-auto",
    },
    {
      href: "https://thenewschool.edu.co/login",
      src: ImagesPath.shopping,
      alt: "Shopping",
      className: "w-[130px] h-auto",
    },
  ];

  return (
      <Provider store={store}>
        <MainLayout>

          <BannerCarousel videoPaths={videoPaths} />
          <ServicesHome images={servicesList} />
          <BlogsSection blogs={blogList} />
          <CalendarScheduleHome />
          <ServicesStandart />
        </MainLayout>
      </Provider>
  );
}
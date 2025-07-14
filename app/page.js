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
    },
  ];

  return (
      <Provider store={store}>
        <MainLayout>
          {showModal && (
              <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
                  onClick={() => setShowModal(false)} // Cierra el modal al hacer clic fuera
              >
                <div
                    style={{
                      position: "relative",
                      maxWidth: "90%",
                      maxHeight: "90%",
                      background: "white",
                      padding: "20px",
                      borderRadius: "8px",
                    }}
                    onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
                >
                  <Image
                      src={imageUrl}
                      alt="Pop-up de vacaciones"
                      width={600} // Ajusta según el tamaño de la imagen
                      height={400} // Ajusta según el tamaño de la imagen
                      style={{ objectFit: "contain" }}
                  />
                  <button
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
          )}
          <BannerCarousel videoPaths={videoPaths} />
          <ServicesHome images={servicesList} />
          <BlogsSection blogs={blogList} />
          <CalendarScheduleHome />
          <ServicesStandart />
        </MainLayout>
      </Provider>
  );
}
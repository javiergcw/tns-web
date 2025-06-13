"use client";
import "./globals.css";
import { useState, useEffect } from "react";
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
  const [showModal, setShowModal] = useState(true); // Corregido el typo 'showisztModal'

  const imageUrl = "/images/pendon_preescolar.png";

  useEffect(() => {
    setShowModal(true);
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
      href: "https://thenewschool.edu.co/login",
      src: ImagesPath.shopping,
      alt: "Shopping",
    },
  ];

  return (
      <Provider store={store}>
        <MainLayout>
          {/* {showModal && <ModalImage setShowModal={setShowModal} imageUrl={imageUrl} />} */}
          <BannerCarousel videoPaths={videoPaths} />
          <ServicesHome images={servicesList} />
          <BlogsSection blogs={blogList} />
          <CalendarScheduleHome />
          <ServicesStandart />
        </MainLayout>
      </Provider>
  );
}
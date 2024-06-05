'use client'
import BannerCarousel from "./components/home/bannerCarrouselHome";
import ServicesHome from "./components/home/servicesHome";
import CalendarScheduleHome from "./components/home/calendarScheduleHome";
import Navbar from "./components/home/navbar";
import BlogsSection from "./components/home/blogsSection";
import Footer from "./components/home/footer/footer";
import FooterTwo from "./components/home/footer/footerTwo";
import ServicesStandart from "./components/home/servicesSandart";
import blogList from "./data/blogData";
import '/app/globals.css'
import { Provider } from 'react-redux';
import store from '../app/store/store'
import InfoCard from "./components/others/container/infoCard";



export default function Home() {

  const imagePaths = [
    "/images/banner/banner7.gif",
    "/images/banner/banner8.gif",
    "/images/banner/banner1.png",
    "/images/banner/banner2.png",
  ];

// .
  const servicesList = [
    { href: 'http://mail.thenewschool.edu.co/', src: '/images/services/cloud.png', alt: 'TNS CLOUD' },
    { href: 'services/others', src: '/images/services/services.png', alt: 'Services' },
    { href: 'services/beam', src: '/images/services/beam.png', alt: 'Beam' },
  ];



  return (
    <main className="">
      <Provider store={store}>
        <Navbar />
        <BannerCarousel imagePaths={imagePaths} />
        <ServicesHome images={servicesList} />
        <BlogsSection blogs={blogList} />
        <CalendarScheduleHome />
        <ServicesStandart />
        <FooterTwo />
        <Footer />

      </Provider>
    </main>
  )
}
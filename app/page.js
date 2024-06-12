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
import { ImagesPath } from "./utils/imagesPath";



export default function Home() {

  const imagePaths = [
    ImagesPath.banner7,
    ImagesPath.banner8,
    ImagesPath.banner1,
    ImagesPath.banner2,
  ];

  // .
  const servicesList = [
    { href: 'http://mail.thenewschool.edu.co/', src: ImagesPath.cloud, alt: 'TNS CLOUD' },
    { href: 'services/others', src: ImagesPath.services, alt: 'Services' },
    { href: 'services/beam', src: ImagesPath.beam, alt: 'Beam' },
  ];

  return (
    < Provider store={store} >
      <Navbar />
      <BannerCarousel imagePaths={imagePaths} />
      <ServicesHome images={servicesList} />
      <BlogsSection blogs={blogList} />
      <CalendarScheduleHome />
      <ServicesStandart />
      <FooterTwo />
      <Footer />
    </Provider  >
  )

}
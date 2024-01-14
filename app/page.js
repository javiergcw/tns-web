
import BannerCarousel from "./components/home/bannerCarrouselHome";
import ServicesHome from "./components/home/servicesHome";
import CalendarScheduleHome from "./components/home/calendarScheduleHome";
import TopHeader from "./components/home/header/topHeader";
import Navbar from "./components/home/navbar";
import EducationalModel from "./components/home/educationalModel";
import Link from 'next/link'
import AsiSomos from "@/app/components/somos/indexOur";
import BlogsSection from "./components/home/blogsSection";
import Footer from "./components/home/footer/footer";
import FooterTwo from "./components/home/footer/footerTwo";
import ServicesStandart from "./components/home/servicesSandart";


export default function Home() {
  const imagePaths = [
    "images/banner/banner1.png",
    "images/banner/banner2.png",
    "images/banner/banner3.png",
    "images/banner/banner4.png",
    "images/banner/banner5.png",
  ];


  const servicesList = [
    { href: 'https://google.com', src: 'images/services/cloud.png', alt: 'TNS CLOUD' },
    { href: 'https://google.com', src: 'images/services/services.png', alt: 'Services' },
    { href: 'https://google.com', src: 'images/services/beam.png', alt: 'Beam' },
  ];


  const blogList = [
    {
      date: "December 12,2023",
      imageUrl: 'images/blogs/blog1.jpg',
      title: "Blog Title 1"
    },
    {
      date: "October 4,2023",
      imageUrl: "images/blogs/blog2.jpeg",
      title: "Blog Title 2"
    },
    {
      date: "2024-01-03",
      imageUrl: "images/blogs/blog3.jpg",
      title: "Blog Title 3"
    },
    {
      date: "2024-01-04",
      imageUrl: "images/blogs/blog4.jpeg",
      title: "Blog Title 4"
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <TopHeader />
      <Navbar />
      <BannerCarousel imagePaths={imagePaths} />
      <ServicesHome images={servicesList} />
      <BlogsSection blogs={blogList} />
      <CalendarScheduleHome />
      <EducationalModel />
      < AsiSomos />
      <ServicesStandart/>
      <FooterTwo/>
      <Footer/>
    </main>


  )
}
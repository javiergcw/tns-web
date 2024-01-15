
import BannerCarousel from "./components/home/bannerCarrouselHome";
import ServicesHome from "./components/home/servicesHome";
import CalendarScheduleHome from "./components/home/calendarScheduleHome";
import TopHeader from "./components/home/header/topHeader";
import Navbar from "./components/home/navbar";
import EducationalModel from "./components/educational/educationalModel";
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
    { href: 'services/others', src: 'images/services/services.png', alt: 'Services' },
    { href: 'services/beam', src: 'images/services/beam.png', alt: 'Beam' },
  ];


  const blogList = [
    {
      date: "December 12,2023",
      imageUrl: 'images/blogs/blog1.jpg',
      title: "TNS Formadores de consciencia"
    },
    {
      date: "October 4,2023",
      imageUrl: "images/blogs/blog2.jpeg",
      title: "Padres inspiradores"
    },
    {
      date: "2024-01-03",
      imageUrl: "images/blogs/blog3.jpg",
      title: "El Modelo de la Organización de las Naciones Unidas (ONU) cumple tres años en The New School. ¡Tejidos de sueños que se proyectan en el tiempo!"
    },
    {
      date: "2022-03-10",
      imageUrl: "images/blogs/blog5.jpeg",
      title: "5 tips para fortalecer el proceso de lecto-escritura"
    },
    {
      date: "2024-04-12",
      imageUrl: "images/blogs/blog6.jpeg",
      title: "Soy porque somos"
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-20">

      <TopHeader />
      <Navbar />
      <BannerCarousel imagePaths={imagePaths} />
      <ServicesHome images={servicesList} />
      <BlogsSection blogs={blogList} />
      <CalendarScheduleHome />
      <ServicesStandart />
      <FooterTwo />
      <Footer />
    </main>


  )
}
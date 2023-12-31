
import BannerCarousel from "./components/home/bannerCarrouselHome";
import ServicesHome from "./components/home/servicesHome";
import CalendarScheduleHome from "./components/home/calendarScheduleHome";
import TopHeader from "./components/home/header/topHeader";
import Navbar from "./components/home/navbar";


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

    // ... más imágenes ...
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <TopHeader/>
      <Navbar/>
      <BannerCarousel imagePaths={imagePaths} />
      <ServicesHome images={servicesList} />
      <CalendarScheduleHome />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

        <nav>
          <ul>
            <li>
              <a href="/acerca">Acerca de</a>
            </li>
            <li>
              <a href="/contact">Contacto</a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

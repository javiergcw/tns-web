'use client';

import RazonDeSeR from './razon_ser'
import MisionVision from './mision_vision'
import Historia from './historia'
import Valores from './valores'
import Cultura from './cultura'
import Filosofia from './filosofia'
import Formacion from './formacion'
import Promueve from './promueve'
import Bilingue from './bilingue'
import Navbar from "@/app/components/home/navbar";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Footer from "@/app/components/home/footer/footer";
import HeaderSomos from "@/app/components/home/headersomos";
import ResponsiveImageGallery from './responsive_image_gallery';
import Members from './members';
import TheNewAwareness from './the_new_awareness';


export default function AsiSomos() {
  return (
    <>
      <Navbar />
      <HeaderSomos />
      <RazonDeSeR />
      <MisionVision />
      <Historia />
      <Valores />
      <Cultura />
      <Filosofia />
      <Formacion />
      <Bilingue />
      <ResponsiveImageGallery />
      <Members />
      <TheNewAwareness />
      <FooterTwo />
      <Footer />
    </>
  );
}
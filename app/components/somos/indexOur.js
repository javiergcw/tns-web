'use client';

import RazonDeSeR from './razon_ser'
import MisionVision from './mision_vision'
import Historia from './historia'
import Valores from './valores'
import Navbar from "@/app/components/home/navbar";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Footer from "@/app/components/home/footer/footer";
import HeaderSomos from "@/app/components/home/headersomos";


export default function AsiSomos() {
  return (
    <>
      <Navbar />
      <HeaderSomos />
      <RazonDeSeR />
      <MisionVision />
      <Historia />
      <Valores />
      <FooterTwo />
      <Footer />
    </>
  );
}
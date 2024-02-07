'use client';

import Navbar from "@/app/components/home/navbar";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Footer from "@/app/components/home/footer/footer";
import CulturaNewModel from "@/app/components/cultura/culturaNewModel";
import HeaderSomos from "@/app/components/home/headersomos";



export default function IndexCulturaNew() {
    return (
        <div className='contenedor_principal'>
            <Navbar />
            <HeaderSomos />
            <CulturaNewModel />
            <FooterTwo />
            <Footer />
        </div>
    );
}
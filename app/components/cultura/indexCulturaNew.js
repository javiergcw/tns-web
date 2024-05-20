'use client';

import Navbar from "@/app/components/home/navbar";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Footer from "@/app/components/home/footer/footer";
import HeaderSomos from "@/app/components/home/headersomos";
import Filosofia from "../somos/filosofia";
import Formacion from "../somos/formacion";
import Bilingue from "../somos/bilingue";



export default function IndexCulturaNew() {
    return (
        <div className='contenedor_principal'>
            <Navbar />
            <HeaderSomos />
            <Filosofia />
            <Formacion />
            <Bilingue />
            <FooterTwo />
            <Footer />
        </div>
    );
}
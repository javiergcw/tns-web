'use client';

import Navbar from "@/app/components/home/navbar";
import EducationalModel from "@/app/components/educational/educationalModel";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Footer from "@/app/components/home/footer/footer";
import HeaderSomos from "@/app/components/home/headersomos";
import Filosofia from "../somos/filosofia";
import Formacion from "../somos/formacion";
import Bilingue from "../somos/bilingue";
import ResponsiveImageGallery from "../somos/responsive_image_gallery";
import Members from "../somos/members";
import TheNewAwareness from "../somos/the_new_awareness";
import Cultura from "../somos/cultura";
import { LanguageProvider } from "@/app/context/language_context";



export default function IndexEducational() {
    return (
        <>
            <LanguageProvider>
                <Navbar />
                <HeaderSomos />
                <Cultura />
                <FooterTwo />
                <Footer />
            </LanguageProvider>

        </>
    );
}
'use client';
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar';
import HeaderInitial from '@/app/components/others/headerInitial';
import CircularesComponent from '@/app/components/others/circularesComponent';
import FooterTwo from '@/app/components/home/footer/footerTwo';
import Footer from '@/app/components/home/footer/footer';
import { LanguageProvider } from '@/app/context/language_context';

const enlaces = [
    {
        href: "https://www.soyservitravel.com/",
        src: "/images/services/other/Group-5.png",
        alt: "Group 5"
    },
    {
        href: "https://laprovenzana.co",
        src: "/images/services/other/Group-6.png",
        alt: "Group 6"
    }
];
const Others = () => {
    return (

        <LanguageProvider>
            <Navbar />
            <HeaderInitial />
            <CircularesComponent enlaces={enlaces} />
            <FooterTwo />
            <Footer />
        </LanguageProvider>
    )
}

export default Others;

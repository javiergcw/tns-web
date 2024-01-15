'use client';
import TopHeader from '@/app/components/home/header/topHeader';
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar';
import HeaderInitial from '@/app/components/others/headerInitial';
import CircularesComponent from '@/app/components/others/circularesComponent';
import FooterTwo from '@/app/components/home/footer/footerTwo';
import Footer from '@/app/components/home/footer/footer';

const enlaces = [
    {
        href: "https://www.soyservitravel.com/",
        src: "http://www.thenewschool.edu.co/wp-content/uploads/2023/06/Group-5.png",
        alt: "Group 5"
    },
    {
        href: "https://laprovenzana.co",
        src: "http://www.thenewschool.edu.co/wp-content/uploads/2023/06/Group-6.png",
        alt: "Group 6"
    }
];
const Others = () => {
    return (
        <> <TopHeader />
            <Navbar />
            <HeaderInitial />
            <CircularesComponent enlaces={enlaces} />
            <FooterTwo />
            <Footer />
        </ >
    )
}

export default Others;

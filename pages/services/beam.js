'use client';
import TopHeader from '@/app/components/home/header/topHeader';
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar';
import HeaderInitial from '@/app/components/others/headerInitial';
import CircularesComponent from '@/app/components/others/circularesComponent';
import FooterTwo from '@/app/components/home/footer/footerTwo';
import Footer from '@/app/components/home/footer/footer';


const Beam = () => {

    const enlaces = [
        {
            href: "https://thenewschool.beam.com.co/Docentes/activacion",
            src: "/images/services/beam/Group-4.png",
            alt: "Group 4"
        },
        {
            href: "https://beam14.beam.com.co/BeamWebTheNewSchool/Account/Login",
            src: "/images/services/beam/Group-3-1.png",
            alt: "Group 3 (1)"
        },
        {
            href: "https://beam14.beam.com.co/beamacademicTheNewSchool/beamacademic.aspx",
            src: "/images/services/beam/Group-2.png",
            alt: "Group 2"
        },
        {
            href: "https://thenewschool.beam.com.co/admisiones/login-family",
            src: "/images/services/beam/Group-1-1.png",
            alt: "Group 1 (1)"
        }
    ];


    return (
        <>
            <Navbar />
            <HeaderInitial />
            <CircularesComponent enlaces={enlaces} />
            <FooterTwo />
            <Footer />
        </>
    )
}

export default Beam;

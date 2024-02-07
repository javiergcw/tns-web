'use client'
import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import TopHeader from '@/app/components/home/header/topHeader'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'
import Circulares from '@/app/components/others/circularesComponent'

const circulares = () => {
    const enlaces = [
        {
            href: "https://drive.google.com/file/d/1MnfOcySR7VsoFA_Pa35ktoe5sXndX8Bz/view?usp=drive_link",
            src: "/images/others/Group-10.png",
            alt: "Group 10"
        },
        {
            href: "https://drive.google.com/file/d/1htevKxxZBcxtePDrtYWvHATqFjLBvBtf/view?usp=drive_link",
            src: "/images/others/Group-9.png",
            alt: "Group 9"
        },
        {
            href: "https://drive.google.com/file/d/1989mYYqU_M7gWSpGG478JgiO7bPMN4vA/view?usp=drive_link",
            src: "/images/others/Group-8.png",
            alt: "Group 8"
        },
        {
            href: "https://drive.google.com/file/d/1E_S9R_li0lWkI5GBrmo1KxSVZs2tr99j/view?usp=drive_link",
            src: "/images/others/Group-7-1.png",
            alt: "Group 7 (1)"
        },
        {
            href: "https://drive.google.com/file/d/1QsvOQLCD7RgRiSlDwblTEkXlg1Oiryvu/view?usp=drive_link",
            src: "/images/others/Group-61.png",
            alt: "Group 6"
        },
        {
            href: "https://drive.google.com/file/d/1T_XPlUMHnHYBeTg8UBNDaKELm9wnQwpp/view?usp=drive_link",
            src: "/images/others/Group-11.png",
            alt: "Group 1"
        },
        {
            href: "https://drive.google.com/file/d/1OJ2bODOiJj72EYA8k4_ZdMHDUCR30u-Z/view?usp=drive_link",
            src: "/images/others/Group-41.png",
            alt: "Group 4"
        },
        {
            href: "https://drive.google.com/file/d/10osj00C85MEdqmXakUZ5nAkrjNRudpcD/view?usp=drive_link",
            src: "/images/others/Group-3.png",
            alt: "Group 3"
        },
        {
            href: "https://drive.google.com/file/d/1E2hQNcwJO_n60F2KXxj2X86LOeGL9z4G/view?usp=drive_link",
            src: "/images/others/Group-21.png",
            alt: "Group 2"
        },
        {
            href: "https://drive.google.com/file/d/1qQMzFZ7mbUBo5afJYPjqb7lA3ob2c9lF/view?usp=drive_link",
            src: "/images/others/Group-51.png",
            alt: "Group 5"
        }
    ];

    return (
        <>
            <Navbar />
            <HeaderInitial />
            <Circulares enlaces={enlaces} />
            <FooterTwo />
            <Footer />
        </>)
}

export default circulares
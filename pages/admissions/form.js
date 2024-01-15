'use client'
import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import TopHeader from '@/app/components/home/header/topHeader'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'
import FormInscription from '@/app/components/forms/formInscription'


export default function admissions() {
    return (
        <>
            <TopHeader />
            <Navbar />
            <HeaderInitial />
            <FormInscription />

            <FooterTwo />
            <Footer />
        </>
    )
}
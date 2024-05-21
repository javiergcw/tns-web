'use client'
import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'
import FormInscription from '@/app/components/forms/formInscription'
import { LanguageProvider } from '@/app/context/language_context'


export default function admissions() {
    return (
        <LanguageProvider>
            <Navbar />
            <HeaderInitial />
            <FormInscription />
            <FooterTwo />
            <Footer />
        </LanguageProvider>
    )
}
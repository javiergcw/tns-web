'use client'
import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import TopHeader from '@/app/components/home/header/topHeader'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'
import Circulares from '@/app/components/others/circularesComponent'
import CircularList from '@/app/components/others/circularesComponent2024'
import { LanguageProvider } from '@/app/context/language_context'

const circulares = () => {

    return (
        <LanguageProvider >
            <Navbar />
            <HeaderInitial />
            <CircularList />
            <FooterTwo />
            <Footer />
        </LanguageProvider>
    )
}

export default circulares
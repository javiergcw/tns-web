'use client'
import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import TopHeader from '@/app/components/home/header/topHeader'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'

const blog = () => {
    return (
        <>
            <TopHeader />
            <Navbar />
            <HeaderInitial />
            <FooterTwo />
            <Footer />
        </>
    )
}

export default blog
import Footer from '@/app/components/home/footer/footer'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import Navbar from '@/app/components/home/navbar'
import TheNewAwareness from '@/app/components/somos/the_new_awareness'
import { LanguageProvider } from '@/app/context/language_context'
import React from 'react'

const TheNewAwarenessView = () => {
    return (
        <div className='contenedor_principal'>
            <LanguageProvider>
                <Navbar />
                <TheNewAwareness />
                <FooterTwo />
                <Footer />
            </LanguageProvider>
        </div>
    )
}

export default TheNewAwarenessView
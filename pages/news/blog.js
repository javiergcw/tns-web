'use client'
import '/app/globals.css'

import Footer from '@/app/components/home/footer/footer'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'
import CardNew from '@/app/components/news/cardNew'
import blogList from '@/app/data/blogData'
import { LanguageProvider } from '@/app/context/language_context'

const blog = () => {


    return (

        <LanguageProvider><Navbar />
            <HeaderInitial />
            <br />
            <div className="flex flex-wrap justify-center gap-4">
                {blogList.map((data, index) => (
                    <div key={index} className="w-full md:w-1/3 ">
                        <CardNew {...data} />
                    </div>
                ))}
            </div>
            <br />
            <FooterTwo />
            <Footer />
        </LanguageProvider>

    )
}

export default blog
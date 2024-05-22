
import '/app/globals.css'

import Footer from '@/app/components/home/footer/footer'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'
import CardNew from '@/app/components/news/cardNew'
import blogList from '@/app/data/blogData'

const blog = () => {


    return (
        <>
            <Navbar />
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
        </>
    )
}

export default blog
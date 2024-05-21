'use client';

import Footer from "@/app/components/home/footer/footer";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Navbar from "@/app/components/home/navbar";
import Members from "@/app/components/somos/members";
import ResponsiveImageGallery from "@/app/components/somos/responsive_image_gallery";
import TheNewAwareness from "@/app/components/somos/the_new_awareness";

const Campus = () => {
    return (
        <div className="contenedor_principal s">
            <Navbar />
            <ResponsiveImageGallery />
            <Members />

            <FooterTwo />
            <Footer />
        </div>
    )
}

export default Campus
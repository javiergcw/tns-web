import Navbar from "@/app/components/home/navbar";
import EducationalModel from "@/app/components/educational/educationalModel";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Footer from "@/app/components/home/footer/footer";
import HeaderSomos from "@/app/components/home/headersomos";



export default function IndexEducational() {
    return (
        <div className='contenedor_principal'>
           <Navbar />
            <HeaderSomos />
           <EducationalModel />
           <FooterTwo/>
           <Footer/>
        </div>
    );
}


import Footer from "@/app/components/home/footer/footer";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Navbar from "@/app/components/home/navbar";
import Members from "@/app/components/somos/members";
import ResponsiveImageGallery from "@/app/components/somos/responsive_image_gallery";
import { Provider } from "react-redux";
import store from '../../app/store/store';

const Campus = () => {
    return (
        <Provider store={store}>
            <div className="contenedor_principal">
            <Navbar />
            <ResponsiveImageGallery />
            <Members />
            <FooterTwo />
            <Footer />
        </div>
        </Provider>
        
    )
}

export default Campus
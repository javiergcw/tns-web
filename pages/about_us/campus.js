


import Members from "@/app/components/somos/members";
import ResponsiveImageGallery from "@/app/components/somos/responsive_image_gallery";
import { Provider } from "react-redux";
import store from '../../app/store/store';
import MainLayout from "@/app/components/layouts/mainLayout";

const Campus = () => {
    return (
        <Provider store={store}>
            <MainLayout>
                <div className="contenedor_principal">
                    <ResponsiveImageGallery />
                    <Members />
                </div>
            </MainLayout>
        </Provider>
    )
}

export default Campus
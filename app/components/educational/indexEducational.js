

import Navbar from "@/app/components/home/navbar";
import FooterTwo from "@/app/components/home/footer/footerTwo";
import Footer from "@/app/components/home/footer/footer";
import HeaderSomos from "@/app/components/home/headersomos";
import Cultura from "../somos/cultura";
import { Provider } from "react-redux";
import store from '../../../app/store/store';
import MainLayout from "../layouts/mainLayout";


export default function IndexEducational() {
    return (
        <Provider store={store}>
            <MainLayout>
            <HeaderSomos />
            <Cultura />
            </MainLayout>
        </Provider>


    );
}
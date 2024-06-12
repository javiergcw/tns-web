
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar';
import HeaderInitial from '@/app/components/others/headerInitial';
import CircularesComponent from '@/app/components/others/circularesComponent';
import FooterTwo from '@/app/components/home/footer/footerTwo';
import Footer from '@/app/components/home/footer/footer';
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import { ImagesPath } from '@/app/utils/imagesPath';


const enlaces = [
    {
        href: "https://www.soyservitravel.com/",
        src: ImagesPath.group5,
        alt: "Group 5"
    },
    {
        href: "https://laprovenzana.co",
        src: ImagesPath.group6,
        alt: "Group 6"
    }
];
const Others = () => {
    return (
        <Provider store={store}>
            <Navbar />
            <HeaderInitial />
            <CircularesComponent enlaces={enlaces} />
            <FooterTwo />
            <Footer />
        </Provider >
    )
}

export default Others;

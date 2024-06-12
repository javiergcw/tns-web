
import TopHeader from '@/app/components/home/header/topHeader';
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar';
import HeaderInitial from '@/app/components/others/headerInitial';
import CircularesComponent from '@/app/components/others/circularesComponent';
import FooterTwo from '@/app/components/home/footer/footerTwo';
import Footer from '@/app/components/home/footer/footer';
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import { ImagesPath } from '@/app/utils/imagesPath';


const Beam = () => {

    const enlaces = [
        {
            href: "https://thenewschool.beam.com.co/Docentes/activacion",
            src: ImagesPath.group4,
            alt: "Group 4"
        },
        {
            href: "https://beam14.beam.com.co/BeamWebTheNewSchool/Account/Login",
            src: ImagesPath.group3,
            alt: "Group 3 (1)"
        },
        {
            href: "https://beam14.beam.com.co/beamacademicTheNewSchool/beamacademic.aspx",
            src: ImagesPath.group2,
            alt: "Group 2"
        },
        {
            href: "https://thenewschool.beam.com.co/admisiones/login-family",
            src: ImagesPath.group1,
            alt: "Group 1 (1)"
        }
    ];


    return (
        <Provider store={store}>
            <Navbar />
            <HeaderInitial />
            <CircularesComponent enlaces={enlaces} />
            <FooterTwo />
            <Footer />
        </Provider>
    )
}

export default Beam;

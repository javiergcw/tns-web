
import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'
import FormInscription from '@/app/components/forms/formInscription'
import { Provider } from 'react-redux';
import store from '../../app/store/store';


export default function admissions() {
    return (
        <Provider store={store}>
            <Navbar />
            <HeaderInitial />
            <FormInscription />
            <FooterTwo />
            <Footer />
        </Provider>
    )
}

import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'

import CircularList from '@/app/components/others/circularesComponent2024'

import { Provider } from 'react-redux';
import store from '../../app/store/store'

const circulares = () => {

    return (
        <Provider store={store}>
            <Navbar />
            <HeaderInitial />
            <CircularList />
            <FooterTwo />
            <Footer />
        </Provider>

    )
}

export default circulares
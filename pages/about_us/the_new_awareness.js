import Footer from '@/app/components/home/footer/footer'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import Navbar from '@/app/components/home/navbar'
import TheNewAwareness from '@/app/components/somos/the_new_awareness'
import React from 'react'
import { Provider } from "react-redux";
import store from '../../app/store/store';

const TheNewAwarenessView = () => {
    return (
        <Provider store={store}>
            <div className='contenedor_principal'>
                <Navbar />
                <TheNewAwareness />
                <FooterTwo />
                <Footer />
            </div>
        </Provider>
    )
}

export default TheNewAwarenessView
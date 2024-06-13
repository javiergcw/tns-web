
import TheNewAwareness from '@/app/components/somos/the_new_awareness'
import React from 'react'
import { Provider } from "react-redux";
import store from '../../app/store/store';
import MainLayout from '@/app/components/layouts/mainLayout'

const TheNewAwarenessView = () => {
    return (
        <Provider store={store}>
            <MainLayout>
            <div className='contenedor_principal'>
                <TheNewAwareness />
            </div>
            </MainLayout>
        </Provider>
    )
}

export default TheNewAwarenessView
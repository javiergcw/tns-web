

import '/app/globals.css'

import HeaderInitial from '@/app/components/others/headerInitial'

import CircularList from '@/app/components/others/circularesComponent2024'

import { Provider } from 'react-redux';
import store from '../../app/store/store'
import MainLayout from '@/app/components/layout/mainLayout'

const circulares = () => {

    return (
        <Provider store={store}>
            <MainLayout>
            <HeaderInitial />
            <CircularList />
            </MainLayout>
        </Provider>

    )
}

export default circulares
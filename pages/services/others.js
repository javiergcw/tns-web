
import '/app/globals.css'
import HeaderInitial from '@/app/components/others/headerInitial';
import CircularesComponent from '@/app/components/others/circularesComponent';
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import { ImagesPath } from '@/app/utils/assetsPath';
import MainLayout from '@/app/components/layout/mainLayout';


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
            <MainLayout>
            <HeaderInitial />
            <CircularesComponent enlaces={enlaces} />
            </MainLayout>
        </Provider >
    )
}

export default Others;

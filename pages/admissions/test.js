
import '/app/globals.css';
import HeaderInitial from '@/app/components/others/headerInitial';
import { Provider } from 'react-redux';
import store from '../../app/store/store';
import Form from '@/app/components/admisionForm';
import MainLayout from '@/app/components/layouts/mainLayout';


export default function admissions() {
    return (
        <Provider store={store}>
            <MainLayout>
                <HeaderInitial />
                <Form></Form>
            </MainLayout>
        </Provider>
    )
}
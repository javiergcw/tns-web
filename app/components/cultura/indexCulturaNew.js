
import HeaderSomos from "@/app/components/home/headersomos";
import Filosofia from "../somos/filosofia";
import Formacion from "../somos/formacion";
import Bilingue from "../somos/bilingue";
import { Provider } from "react-redux";
import store from '../../../app/store/store';
import MainLayout from '../../app/components/layouts/mainLayout';


export default function IndexCulturaNew() {
    return (
        <Provider store={store}>
            <MainLayout>
            <div className='contenedor_principal'>
                <HeaderSomos />
                <Filosofia />
                <Formacion />
                <Bilingue />

            </div>
            </MainLayout>
        </Provider>
    );
}
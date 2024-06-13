
import RazonDeSeR from './razon_ser'
import MisionVision from './mision_vision'
import Historia from './historia'
import Valores from './valores'
import HeaderSomos from "@/app/components/home/headersomos";
import { Provider } from 'react-redux';
import store from '../../../app/store/store';
import MainLayout from '../layout/mainLayout';



export default function AsiSomos() {
  return (
    <Provider store={store}>
      <MainLayout>
      <HeaderSomos />
      <RazonDeSeR />
      <MisionVision />
      <Historia />
      <Valores />
      </MainLayout>
    </Provider>
  );
}
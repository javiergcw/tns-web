
import '/app/globals.css'

import HeaderInitial from '@/app/components/others/headerInitial'

import { Provider } from 'react-redux';
import store from '../../app/store/store'
import NewsList from '@/app/components/news/circularesPueba'
import MainLayout from '@/app/components/layout/mainLayout'

const circulares = () => {
  return (
    <Provider store={store}>
      <MainLayout>
        <HeaderInitial />
        <NewsList />
      </MainLayout>
    </Provider>
  );
};

export default circulares;

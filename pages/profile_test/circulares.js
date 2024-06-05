import Footer from '@/app/components/home/footer/footer'
import '/app/globals.css'
import Navbar from '@/app/components/home/navbar'
import FooterTwo from '@/app/components/home/footer/footerTwo'
import HeaderInitial from '@/app/components/others/headerInitial'

import { Provider } from 'react-redux';
import store from '../../app/store/store'
import NewsList from '@/app/components/news/circularesPueba'

const circulares = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <HeaderInitial />
       <NewsList/>
      <FooterTwo />
      <Footer />
    </Provider>
  );
};

export default circulares;

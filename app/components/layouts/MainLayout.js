// components/layouts/MainLayout.js

import Footer from "../home/footer/footer";
import FooterTwo from "../home/footer/footerTwo";
import Navbar from "../home/navbarTest";


const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
      <FooterTwo/>
      <Footer></Footer>
      
    </div>
  );
};

export default MainLayout;

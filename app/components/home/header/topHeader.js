import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const TopHeader = () => {
  return (
    <div className="bg-[#2C2C2C] w-full h-12 flex justify-between items-center px-4">
      <div className="flex items-center text-white">
        <span className="mr-4">Colegio Bilingüe en Medellín</span>
        <a href="tel:+573008909800">
          <a className="flex items-center text-[#2991D6] mr-2">
            <FaPhone className="mr-1" />
            +573008909800
          </a>
        </a>
        <a href="tel:(4)5207270">
          <a className="flex items-center text-[#2991D6] mr-2">
            <FaPhone className="mr-1" />
            (4)5207270
          </a>
        </a>
        <a href="mailto:correo@thenewschool.edu.co">
          <a className="flex items-center text-[#2991D6]">
            <FaEnvelope className="mr-1" />
            correo@thenewschool.edu.co
          </a>
        </a>
      </div>
      <div className="flex items-center">
        <a href="https://www.facebook.com">
          <a className="flex items-center text-[#2991D6] mr-2">
            <FaFacebookF className="mr-1" />
          </a>
        </a>
        <a href="https://www.twitter.com">
          <a className="flex items-center text-[#2991D6] mr-2">
            <FaTwitter className="mr-1" />
          </a>
        </a>
        <a href="https://www.youtube.com">
          <a className="flex items-center text-[#2991D6] mr-2">
            <FaYoutube className="mr-1" />
          </a>
        </a>
        <a href="https://www.instagram.com">
          <a className="flex items-center text-[#2991D6]">
            <FaInstagram className="mr-1" />
          </a>
        </a>
      </div>
    </div>
  );
};

export default TopHeader;

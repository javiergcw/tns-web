import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const TopHeader = () => {
  return (
    <div className="nav bg-[#2C2C2C] w-full h-auto flex justify-between items-center px-4 flex-wrap py-4">
      <div className="flex items-center text-white text-xs sm:text-sm flex-wrap">
        <span className="hidden sm:flex mr-4 text-[#626262]">Colegio Bilingüe en Medellín</span>
        <a href="tel:+573008909800" className="flex items-center text-[#2991D6] mr-2 underline">
          <FaPhone className="mr-1 text-[#626262] text-lg sm:text-base" />
          +573008909800
        </a>
        <a href="tel:(4)5207270" className="hidden sm:flex items-center text-[#2991D6] mr-2 underline">
          <FaPhone className="mr-1 text-[#626262] text-lg sm:text-base" />
          (4)5207270
        </a>
        <a href="mailto:correo@thenewschool.edu.co" className="flex items-center text-[#2991D6] underline">
          <FaEnvelope className="mr-1 text-[#626262] text-lg sm:text-base" />
          correo@thenewschool.edu.co
        </a>
      </div>
      <div className="flex items-center">
        <a href="https://www.facebook.com/thenewschool95/" className="flex items-center text-[#626262] mr-2 transform hover:scale-110 transition duration-300">
          <FaFacebookF className="text-lg sm:text-base" />
        </a>
        <a href="https://twitter.com/thenewschool95/" className="flex items-center text-[#626262] mr-2 transform hover:scale-110 transition duration-300">
          <FaTwitter className="text-lg sm:text-base" />
        </a>
        <a href="https://www.youtube.com/@thenewschool1995" className="flex items-center text-[#626262] mr-2 transform hover:scale-110 transition duration-300">
          <FaYoutube className="text-lg sm:text-base" />
        </a>
        <a href="https://www.instagram.com/thenewschool95/" className="flex items-center text-[#626262] transform hover:scale-110 transition duration-300">
          <FaInstagram className="text-lg sm:text-base" />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;

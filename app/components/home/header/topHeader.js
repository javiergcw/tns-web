import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const TopHeader = () => {
  return (
    <div className="bg-[#2C2C2C] w-full h-12 flex justify-between items-center px-4">
      <div className="flex items-center text-white">
        <span className="mr-4 text-[#626262] text-xs">Colegio Bilingüe en Medellín</span>
        <a href="tel:+573008909800" className="flex items-center text-[#2991D6] mr-2 underline text-xs">
          <FaPhone className="mr-1 text-[#626262]" />
          +573008909800
        </a>
        <a href="tel:(4)5207270" className="flex items-center text-[#2991D6] mr-2 underline text-xs">
          <FaPhone className="mr-1 text-[#626262]" />
          (4)5207270
        </a>
        <a href="mailto:correo@thenewschool.edu.co" className="flex items-center text-[#2991D6] underline text-xs">
          <FaEnvelope className="mr-1 text-[#626262]" />
          correo@thenewschool.edu.co
        </a>
      </div>
      <div className="flex items-center">
        <a href="https://www.facebook.com" className="flex items-center text-[#626262] mr-2 transform hover:scale-110 transition duration-300">
          <FaFacebookF className="mr-1" />
        </a>
        <a href="https://www.twitter.com" className="flex items-center text-[#626262] mr-2 transform hover:scale-110 transition duration-300">
          <FaTwitter className="mr-1" />
        </a>
        <a href="https://www.youtube.com" className="flex items-center text-[#626262] mr-2 transform hover:scale-110 transition duration-300">
          <FaYoutube className="mr-1" />
        </a>
        <a href="https://www.instagram.com" className="flex items-center text-[#626262] transform hover:scale-110 transition duration-300">
          <FaInstagram className="mr-1" />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;

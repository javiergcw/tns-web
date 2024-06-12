import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { AiOutlineArrowUp } from 'react-icons/ai';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full flex justify-between items-center h-24 bg-greenPrimary text-white px-10">
            <div>© 2024 The New School. All Rights Reserved V.4.1</div>
            <div className="flex items-center">
                <a href="https://www.facebook.com/thenewschool95/" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaFacebookF className="mr-1" />
                </a>
                <a href="https://twitter.com/thenewschool95/" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaTwitter className="mr-1" />
                </a>
                <a href="https://www.youtube.com/@thenewschool1995" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaYoutube className="mr-1" />
                </a>
                <a href="https://www.instagram.com/thenewschool95/" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaInstagram className="mr-1" />
                </a>
                <div className="ml-4 p-2 border border-white rounded cursor-pointer transform hover:scale-110 transition duration-300" onClick={scrollToTop}>
                    <AiOutlineArrowUp />
                </div>
            </div>
        </footer>
    );
}

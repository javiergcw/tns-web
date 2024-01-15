'use client'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { AiOutlineArrowUp } from 'react-icons/ai';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full flex justify-between items-center h-24 bg-[#96c11f] text-white px-10">
            <div>© 2024 The New School. All Rights Reserved.</div>
            <div className="flex items-center">
                <a href="https://www.facebook.com" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaFacebookF className="mr-1" />
                </a>
                <a href="https://www.twitter.com" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaTwitter className="mr-1" />
                </a>
                <a href="https://www.youtube.com" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaYoutube className="mr-1" />
                </a>
                <a href="https://www.instagram.com" className="mx-2 cursor-pointer transform hover:scale-110 transition duration-300">
                    <FaInstagram className="mr-1" />
                </a>
                <div className="ml-4 p-2 border border-white rounded cursor-pointer transform hover:scale-110 transition duration-300" onClick={scrollToTop}>
                    <AiOutlineArrowUp />
                </div>
            </div>
        </footer>
    );
}

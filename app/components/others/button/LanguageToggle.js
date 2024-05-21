import { useLanguage } from "@/app/context/language_context";

export default function LanguageToggle() {
    const { isEnglish, toggleLanguage } = useLanguage();

    return (
        <div className="flex items-center">
            <div
                onClick={toggleLanguage}
                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${isEnglish ? 'bg-gray-300' : 'bg-gray-300'}`}
            >
                <div
                    className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isEnglish ? 'translate-x-7' : ''}`}
                    style={{
                        backgroundImage: `url(${isEnglish ? '/images/flags/uk.png' : '/images/flags/col.png'})`,
                        backgroundSize: 'cover',
                    }}
                />


            </div>

        </div>

    );
}
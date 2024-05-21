"use client"
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
    return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
    const [isEnglish, setIsEnglish] = useState(true);

    const toggleLanguage = () => {
        setIsEnglish(!isEnglish);
    };

    return (
        <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

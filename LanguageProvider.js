import React, { createContext, useState, useContext } from 'react';

// Create a Context for the language
const LanguageContext = createContext();

// Create a provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook to use the LanguageContext
export const useLanguage = () => {
  return useContext(LanguageContext);
};

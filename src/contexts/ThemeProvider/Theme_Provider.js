import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

function Theme_Provider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Áp dụng theme khi component mount
  useEffect(() => {
    const currentTheme = isDark ? "dark" : "light";
    document.querySelector("body").setAttribute("data-theme", currentTheme);
  }, [isDark]);
  
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setIsDark(true);
    localStorage.setItem("theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setIsDark(false);
    localStorage.setItem("theme", "light");
  };

  const value = {
    isDark,
    setDarkMode,
    setLightMode,
  };
  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}

export default Theme_Provider;

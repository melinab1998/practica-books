import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.context";
import { DARK_THEME, LIGHT_THEME } from "../consts";

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || LIGHT_THEME
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
        document.documentElement.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
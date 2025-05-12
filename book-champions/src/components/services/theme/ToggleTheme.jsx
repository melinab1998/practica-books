import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../theme/theme.context";
import { LIGHT_THEME } from "../../services/consts.js";
import { useTranslate } from "../../../custom/useTranslate/useTranslate.jsx";

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const translate = useTranslate();  

    return (
        <Button onClick={toggleTheme} className="me-3 my-3">
            {theme === LIGHT_THEME 
                ? translate("dark_theme_change")   
                : translate("light_theme_change")  
            }
        </Button>
    );
};

export default ToggleTheme;
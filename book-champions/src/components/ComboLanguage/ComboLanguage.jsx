import { useContext } from "react";
import { Form } from "react-bootstrap";
import {TranslationContext} from "../services/translation/translation.context";
import {useTranslate} from "../../custom/useTranslate/useTranslate"

const comboLanguage = () => {
    const {language, changeLanguageHandler} = useContext(TranslationContext);
    const translate = useTranslate();
    const changeLanguage = (event) => {
        changeLanguageHandler(event.target.value);
    };

    return (
        <Form.Select onChange={changeLanguage} value={language} aria-label="Select Language" className="w-50 mb-4">
            <option value="es">{translate("spanish_lang")}</option>
            <option value="en">{translate("english_lang")}</option>
        </Form.Select>
    )
}

export default comboLanguage;
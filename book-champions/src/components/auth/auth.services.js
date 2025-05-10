import {jwtDecode} from "jwt-decode"

export const validateString = (str, minLenght, maxLength) => {
    if(minLenght && str.length < minLenght)
        return false;
    else if(maxLength && str.length > maxLength)
        return false;
    return true;
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/; // solo letras y números
    return username && usernameRegex.test(username) && username.length <= 13;
};


export const validatePassword = (password, minLength, maxLength, needsUppercase, needsNumber) => {
    if (minLength && password.length < minLength) return false;
    if (maxLength && password.length > maxLength) return false;
    if (needsUppercase && !/[A-Z]/.test(password)) return false;
    if (needsNumber && !/\d/.test(password)) return false;
    return true;
};

export const validateLoginUser = ({ email, password }) => {
    if (!email || !validateEmail(email)) {
        return {
            error: true,
            message: "Mail inválido"
        };
    }

    if (!password || !validatePassword(password, 7, undefined, true, true)) {
        return {
            error: true,
            message: "Contraseña inválida"
        };
    }

    return { error: false, message: "" };
};

export const validateRegisterUser = ({ name, email, password }) => {
    const result = { error: false, message: "" };

    const nameRegex = /^[a-zA-Z0-9]+$/;
    if (!name || !nameRegex.test(name) || name.length > 13) {
        result.error = true;
        result.message = "Nombre inválido: debe ser alfanumérico y tener hasta 13 caracteres.";
    } else if (!validateEmail(email)) {
        result.error = true;
        result.message = "Email inválido.";
    } else if (!validatePassword(password)) {
        result.error = true;
        result.message = "Contraseña inválida: debe tener más de 7 caracteres, una mayúscula y una minúscula.";
    }

    return result;
};

export const isTokenValid = (token) => {
    if (!token) return false;
    try{
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return currentTime < decodedToken.exp;
    } catch(error){
        console.log('Error decoding token:', error);
        return false;
    }
}
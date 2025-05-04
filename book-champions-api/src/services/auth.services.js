import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateLoginUser, validateRegisterUser } from "../helpers/validations.js";

export const registerUser = async (req, res) => {
    const result = validateRegisterUser(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).send({ message: "Usuario existente" });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json(newUser.id);
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
};

export const loginUser = async (req, res) => {
    const result = validateLoginUser(req.body);
    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).send({ message: "Usuario no existente" });
        }

        const comparison = await bcrypt.compare(password, user.password);
        if (!comparison) {
            return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
        }

        const secretKey = "programacion3-2025";
        const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

        return res.json(token);
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).send({ message: "Error interno del servidor" });
    }
};
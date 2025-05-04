import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../AuthContainer/AuthContainer";
import { useState, useRef } from "react";
import { validateEmail, validatePassword } from "../auth.services.js";  
import { errorToast, successToast } from "../../../utils/notifications.js";  
const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({ name: false, email: false, password: false });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);

    const handleChangeName = (e) => {
        setName(e.target.value);
        setErrors({ ...errors, name: false }); 
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setErrors({ ...errors, email: false });
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setErrors({ ...errors, password: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !validateEmail(email)) {
            setErrors({ ...errors, email: true });
            errorToast("¡Email incorrecto!");
            emailRef.current.focus();
            return;
        } else if (!password || !validatePassword(password, 7, null, true, true)) {
            setErrors({ ...errors, password: true });
            errorToast("¡Contraseña incorrecta!");
            passwordRef.current.focus();
            return;
        }

        fetch("http://localhost:3000/register", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ name, email, password })
        })
        .then(res => res.json())
        .then(() => {
            successToast("¡Usuario creado exitosamente!");
            navigate("/login");
        })
        .catch(err => console.log(err));
    };

    return (
        <AuthContainer>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Nombre de usuario"
                        value={name}
                        onChange={handleChangeName}
                        ref={nameRef}
                        className={errors.name ? "border border-danger" : ""}
                    />
                    {errors.name && (
                        <p className="text-danger mt-1 mb-0">El nombre es obligatorio.</p>
                    )}
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={handleChangeEmail}
                        ref={emailRef}
                        className={errors.email ? "border border-danger" : ""}
                    />
                    {errors.email && (
                        <p className="text-danger mt-1 mb-0">Por favor ingresa un email válido.</p>
                    )}
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handleChangePassword}
                        ref={passwordRef}
                        className={errors.password ? "border border-danger" : ""}
                    />
                    {errors.password && (
                        <p className="text-danger mt-1 mb-0">
                            La contraseña debe tener al menos 7 caracteres, con una minúscula y una mayúscula.
                        </p>
                    )}
                </FormGroup>
                <Row>
                    <Col className="d-flex justify-content-start">
                        <Link to="/login">
                            <Button variant="secondary" className="w-100">
                                Iniciar sesión
                            </Button>
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                    </Col>
                </Row>
            </Form>
        </AuthContainer>
    );
};

export default Register;
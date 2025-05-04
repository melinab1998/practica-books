import { useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router";
import AuthContainer from "../../AuthContainer/AuthContainer"
import { validateEmail, validatePassword } from "../auth.services";
import { errorToast} from "../../../utils/notifications.js"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    if (!emailRef.current.value.length || !validateEmail(email)) {
      setErrors({ ...errors, email: true });
      errorToast("¡Email incorrecto!");
      emailRef.current.focus();
      return;
    } else if (!password.length || !validatePassword(password, 7, null, true, true)) {
      setErrors({ ...errors, password: true });
      errorToast("¡Password incorrecto!")
      passwordRef.current.focus();
      return;
    }
    setErrors({email: false, password: false})
    onLogin();
    fetch("http://localhost:3000/login", {
      headers: {
        "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(token => {
      localStorage.setItem("book-champions-token", token)
      navigate("/library");
    })
    .catch(err => console.log(err))
  };

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-4">
          <Form.Control
            type="email"
            ref={emailRef}
            placeholder="Ingresar email"
            className={errors.email ? "border border-danger" : ""}
            onChange={handleEmailChange}
            value={email}
          />
          {errors.email && (
            <p className="text-danger mt-1 mb-0">Debes ingresar un email para iniciar sesión.</p>
          )}
        </FormGroup>
        <FormGroup className="mb-4">
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="Ingresar contraseña"
            className={errors.password ? "border border-danger" : ""}
            onChange={handlePasswordChange}
            value={password}
          />
          {errors.password && (
            <p className="text-danger mt-1 mb-0">
              Debes ingresar una contraseña de al menos 7 caracteres.
            </p>
          )}
        </FormGroup>
        <Row>
          <Col />
          <Col md={6} className="d-flex justify-content-end">
            <Button variant="secondary" type="submit">
              Iniciar sesión
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="text-center mt-4">
        <p className="mb-2">¿Aún no tienes cuenta?</p>
        <Link to="/register"><Button variant="primary">Registrarse</Button></Link>
      </div>
    </AuthContainer>
  );
};

export default Login;

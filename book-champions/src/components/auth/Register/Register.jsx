import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../AuthContainer/AuthContainer";
import { useState } from "react";
import { successToast } from "../../../utils/notifications";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (!name || !email || password.length < 7) {
            alert("Todos los campos son obligatorios y la contraseña debe tener al menos 7 caracteres.");
            return;
        }
        
        fetch("http://localhost:3000/register", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({name, email, password})
        })
        .then(res => res.json())
        .then(()=>{
            successToast("¡Usuario creado exitosamente!")
            navigate("/login");
        })
        .catch(err => console.log(err))
    }

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            value={name}
            onChange={handleChangeName}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleChangeEmail}
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handleChangePassword}
          />
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
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContainer from "../../AuthContainer/AuthContainer";

const Register = () => {
  return (
    <AuthContainer>
      <Form>
        <FormGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <Form.Control
            type="password"
            placeholder="Contraseña"
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
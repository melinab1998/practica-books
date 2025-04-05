import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setErrors({ ...errors, email: false })
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setErrors({ ...errors, password: false })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRef.current.value.length) {
      setErrors({ ...errors, email: true });
      alert("¡Email vacío!");
      emailRef.current.focus();
      return;
    }

    else if (!password.length || password.length < 7) {
      setErrors({ ...errors, password: true });
      alert("¡Password vacío o menor a 7 caracteres!");
      passwordRef.current.focus();
      return;
    }

    setErrors({ email: false, password: false })
    alert(`El email ingresado es: ${email} y el password es ${password}`)
  }

  return (
    <Card className="mt-5 mx-3 p-3 px-5 shadow">
      <Card.Body>
        <Row className="mb-2">
          <h5>¡Bienvenidos a Books Champion!</h5>
        </Row>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="email"
              /*required*/
              ref={emailRef}
              placeholder="Ingresar email"
              className={errors.email && "border border-danger"}
              onChange={handleEmailChange}
              value={email} />
            {errors.email && (
              <p className="text-danger mt-1 mb-0">Debes ingresar un email para iniciar sesión.</p>)}
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              /*required*/
              placeholder="Ingresar contraseña"
              className={`form-control ${errors.password ? "border border-danger" : ""}`}
              onChange={handlePasswordChange}
              value={password}
            />
            {errors.password && (
              <p className="text-danger mt-1 mb-0">Debes ingresar una contraseña de al menos 7 caracteres.</p>
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
      </Card.Body>
    </Card>
  );
};


export default Login;
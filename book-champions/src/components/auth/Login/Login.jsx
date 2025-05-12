import { useContext, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router";
import AuthContainer from "../../AuthContainer/AuthContainer"
import { validateEmail, validatePassword } from "../auth.services";
import { errorToast } from "../../../utils/notifications.js"
import { loginUser } from "../../library/Dashboard/Dashboard.services.js";
import { AuthenticationContext } from "../../services/auth/auth.context.jsx";
import ToggleTheme from "../../services/theme/ToggleTheme"
import {useTranslate} from "../../../custom/useTranslate/useTranslate.jsx"
import ComboLanguage from "../../ComboLanguage/ComboLanguage.jsx";

const Login = () => {
  const translate = useTranslate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const { handleUserLogin } = useContext(AuthenticationContext);

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
    setErrors({ email: false, password: false })
    loginUser(email, password,
      (token) => {
        handleUserLogin(token)
        navigate("/library");
      },
      (err) => {
        errorToast(err.message);
      }
    );
  };

  return (
    <AuthContainer>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <ComboLanguage /> 
        <ToggleTheme />
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-4">
          <Form.Control
            type="email"
            ref={emailRef}
            placeholder={translate("email")} 
            className={errors.email ? "border border-danger" : ""}
            onChange={handleEmailChange}
            value={email}
          />
          {errors.email && (
            <p className="text-danger mt-1 mb-0">{translate("email_empty")}</p> 
          )}
        </FormGroup>
        <FormGroup className="mb-4">
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder={translate("password")} 
            className={errors.password ? "border border-danger" : ""}
            onChange={handlePasswordChange}
            value={password}
          />
          {errors.password && (
            <p className="text-danger mt-1 mb-0">
              {translate("password_empty")} 
            </p>
          )}
        </FormGroup>
        <Row>
          <Col />
          <Col md={6} className="d-flex justify-content-end">
            <Button variant="secondary" type="submit">
              {translate("login")} 
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="text-center mt-4">
        <p className="mb-2">{translate("login_no_account")}</p> 
        <Link to="/register">
          <Button variant="primary">{translate("register")}</Button> 
        </Link>
      </div>
    </AuthContainer>
  );
};


export default Login;

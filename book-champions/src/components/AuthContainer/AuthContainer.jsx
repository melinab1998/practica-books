import { Card, Container } from "react-bootstrap";
import "./AuthContainer.css"

const AuthContainer = ({ children }) => {
  return (
    <div className="auth-container"
    >
      <Container>
        <Card className="p-4 shadow">
          <Card.Body>
            <h3 className="text-center mb-4">¡Bienvenidos a Books Champion!</h3>
            {children}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AuthContainer;
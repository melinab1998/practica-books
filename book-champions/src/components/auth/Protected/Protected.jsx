import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthenticationContext } from "../../services/auth/auth.context";
import { isTokenValid } from "../auth.services.js";

const Protected = () => {
  const { token } = useContext(AuthenticationContext);
  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />
}

export default Protected;
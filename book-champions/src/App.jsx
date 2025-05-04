import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import Login from "./components/auth/Login/Login";
import Dashboard from "./components/library/Dashboard/Dashboard";
import NotFound from "./components/ui/NotFound/NotFound";
import Protected from "./components/auth/Protected/Protected";
import Register from "./components/auth/Register/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogIn} />} />
        <Route path="/register" element={<Register/>}/>
        <Route element={<Protected isSignedIn={loggedIn} />}>
          <Route path="/library/*" element={<Dashboard onLogout={handleLogOut} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer /> 
    </BrowserRouter>
  );
}

export default App;
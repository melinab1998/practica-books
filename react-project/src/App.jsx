import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Dashboard from "./components/library/Dashboard/Dashboard";
import NotFound from "./components/ui/NotFound/NotFound";
import Protected from "./components/auth/Protected/Protected";
import { useState } from "react";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(true);
  }

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogIn} />} />

        <Route element={<Protected isSignedIn={loggedIn} />}>
          <Route path="/library/*" element={<Dashboard onLogout={handleLogOut} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
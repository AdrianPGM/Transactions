import { Route, Routes, BrowserRouter } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

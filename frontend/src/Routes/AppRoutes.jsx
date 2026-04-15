import { Routes, Route, useLocation,Navigate } from "react-router-dom";
import Home from "../presentation/pages/Home/Home";
import Registro from "../presentation/pages/Auth/Registro";
import Inicio from "../presentation/pages/Auth/Inicio";
import Perfil from "../presentation/pages/Perfil/Perfil";
import Login from "../presentation/pages/Auth/Login";
import Perfil from "../presentation/pages/perfil/perfil";
import ResetPassword from "../presentation/pages/Auth/ResetPassword";

import { ProtectedRoute } from "../presentation/components/shared/Navigation/Route/ProtectedRoute";
import ConfigPerfil from "../presentation/pages/Perfil/ConfigPerfil";
import PublicPerfil from "../presentation/pages/Perfil/PublicPerfil";

export default function AppRoutes() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* --- RUTAS PRIVADAS (Solo con sesión) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/settings/profile" element={<ConfigPerfil />} />
          <Route path="/u/:id" element={<PublicPerfil />} />
        </Route>

        {/* Redirección por si escriben cualquier cosa loca */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* --- MODALES (Rutas que se abren encima) --- */}
      {background && (
        <Routes>
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      )}
    </>
  );
}

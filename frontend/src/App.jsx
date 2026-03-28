import React from "react";
import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./presentation/pages/Home.jsx";
import "../src/App.css";
import Registro from "./presentation/pages/Registro.jsx";
import Login from "./presentation/pages/Login.jsx";
import Inicio from "./presentation/pages/Inicio.jsx";
import Perfil from "./presentation/pages/Perfil.jsx";

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Login></Login>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/registro" element={<Registro></Registro>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/inicio" element={<Inicio></Inicio>} />
        <Route path="/Perfil" element={<Perfil></Perfil>} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/inicio" element={<Inicio></Inicio>} />
          <Route path="/registro" element={<Registro></Registro>} />
        </Routes>
      )}
    </>
  );
}

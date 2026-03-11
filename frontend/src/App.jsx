import React from "react";
import { useState } from "react";
import { Routes, Route,useNavigate, useLocation } from "react-router-dom";
import Home from "./presentation/pages/Home.jsx";
import "../src/App.css";
import Registro from "./presentation/pages/Registro.jsx";
import Login from "./presentation/pages/Login.jsx";

export default function App() {
  const location= useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Login></Login>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/registro" element={<Registro></Registro>} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/registro" element={<Registro></Registro>} />
        </Routes>
      )}
    </>
  );
}

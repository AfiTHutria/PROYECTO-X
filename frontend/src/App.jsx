import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./presentation/pages/Home.jsx";
import "../src/App.css";
import Registro from "./presentation/pages/Registro.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/registro" element={<Registro></Registro>} />
      </Routes>
    </>
  );
}

import React from "react";
import Bar from "../components/Bar.jsx";
import Publicaciones from "../components/Publicaciones.jsx";
import Publicacion from "../components/Publicacion.jsx";
import Avisos from "../components/Avisos.jsx";

export default function Home() {
  return (
    <div className="fondo flex">
      <Bar></Bar>

      <div>
        <Publicaciones></Publicaciones>
        <div className=" h-[900px] overflow-y-auto mt-[20px] ">
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
          <Publicacion></Publicacion>
        </div>
      </div>
      <Avisos></Avisos>
    </div>
  );
}

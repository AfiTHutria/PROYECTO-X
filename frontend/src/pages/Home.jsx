import React from 'react'
import Bar from '../componentes/Bar.jsx'
import Publicaciones from '../componentes/Publicaciones.jsx'
import Publicacion from '../componentes/Publicacion.jsx'
import Avisos from '../componentes/Avisos.jsx'
export default function Home() {
  return (
    <div className='fondo flex'>
      <Bar></Bar>

      <div>
        <Publicaciones></Publicaciones>
        <div className=' h-[900px] overflow-y-auto mt-[20px] '>
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
  )
}

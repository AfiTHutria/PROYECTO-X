import React from 'react'
import Bar from '../components/Bar.jsx'
import Publicaciones from '../components/Publicaciones.jsx'
import Publicacion from '../components/Publicacion.jsx'
import Avisos from '../components/Avisos.jsx'
import styles from '../components/publicacion.module.css'
import Perfil from './Perfil.jsx'
export default function Home() {
  return (
    <div className="fondo flex">
      <Bar></Bar>

      <div>

        <Publicaciones></Publicaciones>
        {/* scroll para deslizar */}
        <div className={styles.scroll}>

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

import styles from "./Perfil.module.css";
import Button from "../../components/ui/Button.jsx";
import LOGO from "../../assets/images/LOGO_X.jpeg";
import { useNavigate } from "react-router-dom";
import { VscArrowLeft, VscSearch } from "react-icons/vsc";
import Layout from "../../components/shared/Layout/Layout.jsx";

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <Layout>
          <header className={styles.header_perfil}>
            <Button
              label={<VscArrowLeft className="icon_cerrar" />}
              onClick={() => navigate(-1)}
              variant="atras"
              type="button"
              styles={styles}
            />

            <div className={styles.info_usuario_header}>
              <h2 className={styles.nombre_usuario_header}>NOT ARDR "USUARIO"</h2>
              <p className={styles.conteo_posts}>0 Posts</p>
            </div>  

            <div className={styles.wrapper_buscar}>
              <Button
                label={<VscSearch className="icon_buscar" />}
                onClick={() => navigate("/Home")}
                variant="buscar"
                type="button"
                styles={styles}
              />
            </div>  
          </header>

        {/* Sección Visual: Banner y Avatar */}
          <section className={styles.seccion_imagenes}>
            <div className={styles.banner_fondo}></div>
            <img className={styles.foto_perfil_avatar} src={LOGO} alt="Avatar" />
          </section>

        {/* Información de Identidad */}
          <section className={styles.info_detallada}>
            <div className={styles.nombres_caja}>
              <h1 className={styles.nombre_display}>NOT ARDR "USUARIO"</h1>
              <p className={styles.handle_gris}>@usuario</p>
            </div>

            <p className={styles.fecha_union}>
              <span className={styles.icono_calendario}>📅</span> Se unió en marzo
              de 2026
            </p>

            <div className={styles.metricas_sociales}>
              <p className={styles.metrica}>
                <span className={styles.valor_metrica}>1</span> Siguiendo
              </p>
              <p className={styles.metrica}>
              <span className={styles.valor_metrica}>0</span> Seguidores
              </p>
            </div>
          </section>
    </Layout>
  );
}

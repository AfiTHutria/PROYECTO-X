import { useEffect, useState } from "react";
import styles from "./Perfil.module.css";
import Button from "../../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
import Layout from "../../components/shared/Layout/Layout.jsx";
import { usuarioRepository } from "../../../infrastructure/repositories/UsuarioRepository.js";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import LogoDefault from "../../assets/images/LOGO_X.jpeg";

export default function Perfil() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const me = await usuarioRepository.getMe();
        if (!cancelled) setPerfil(me);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const p = perfil || user;
  const nombre = p?.Nombre || "Usuario";
  const username = p?.username || (nombre || "usuario").toLowerCase().replace(/\s/g, "");
  const postsCount = p?.publicaciones_count ?? 0;
  const followingCount = p?.following_count ?? 0;
  const followersCount = p?.followers_count ?? 0;
  
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
          <h2 className={styles.nombre_usuario_header}>{nombre}</h2>
          <p className={styles.conteo_posts}>{postsCount} Posts</p>
        </div>

        <div className={styles.wrapper_buscar}>
          <Button
            label="Editar"
            onClick={() => navigate("/settings/profile")}
            variant="buscar"
            type="button"
            styles={styles}
            title="Editar perfil"
          />
        </div>
      </header>

      <section className={styles.seccion_imagenes}>
        <div
          className={styles.banner_fondo}
          style={{
            backgroundImage: p?.banner_url ? `url(${p.banner_url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <img className={styles.foto_perfil_avatar} src={p?.avatar_url || LogoDefault} alt="Avatar" />
      </section>

      <section className={styles.info_detallada}>
        {loading && <p className={styles.handle_gris}>Cargando…</p>}
        <div className={styles.nombres_caja}>
          <h1 className={styles.nombre_display}>{nombre}</h1>
          <p className={styles.handle_gris}>@{username}</p>
          {p?.bio && <p className={styles.handle_gris}>{p.bio}</p>}
        </div>

        <div className={styles.metricas_sociales}>
          <p className={styles.metrica}>
            <span className={styles.valor_metrica}>{followingCount}</span> Siguiendo
          </p>
          <p className={styles.metrica}>
            <span className={styles.valor_metrica}>{followersCount}</span> Seguidores
          </p>
        </div>
      </section>
    </Layout>
  );
}

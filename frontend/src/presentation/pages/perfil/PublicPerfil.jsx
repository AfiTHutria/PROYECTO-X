import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout.jsx";
import styles from "./PublicPerfil.module.css";
import Button from "../../components/ui/Button.jsx";
import { usuarioRepository } from "../../../infrastructure/repositories/UsuarioRepository.js";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import LogoDefault from "../../assets/images/LOGO_X.jpeg";

export default function PublicPerfil() {
  const { id } = useParams();
  const { user } = useAuth();

  const isMe = useMemo(() => user?.id && id === user.id, [id, user?.id]);

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [followBusy, setFollowBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const p = await usuarioRepository.getPerfil(id);
        if (!cancelled) setPerfil(p);
      } catch (e) {
        if (!cancelled) setError(e.message || "Error cargando perfil");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function openFollowers() {
    setFollowersOpen(true);
    try {
      const list = await usuarioRepository.listFollowers(id);
      setFollowers(list || []);
    } catch {
      setFollowers([]);
    }
  }

  async function openFollowing() {
    setFollowingOpen(true);
    try {
      const list = await usuarioRepository.listFollowing(id);
      setFollowing(list || []);
    } catch {
      setFollowing([]);
    }
  }

  async function toggleFollow() {
    if (!user?.id || isMe || followBusy) return;
    setFollowBusy(true);
    try {
      const res = await usuarioRepository.toggleFollow(id);
      setPerfil((p) =>
        p
          ? {
              ...p,
              is_followed_by_me: res.following,
              followers_count: res.followers_count,
            }
          : p,
      );
    } finally {
      setFollowBusy(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className={styles.placeholder}>Cargando…</div>
      </Layout>
    );
  }

  if (error || !perfil) {
    return (
      <Layout>
        <div className={styles.error}>{error || "No se encontró el perfil"}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.banner} style={{ backgroundImage: perfil.banner_url ? `url(${perfil.banner_url})` : "none" }} />

        <div className={styles.headerRow}>
          <img className={styles.avatar} src={perfil.avatar_url || LogoDefault} alt={perfil.Nombre} />

          {!isMe && (
            <Button
              label={perfil.is_followed_by_me ? "Siguiendo" : "Seguir"}
              onClick={toggleFollow}
              disabled={!user?.id || followBusy}
              variant={perfil.is_followed_by_me ? "secondary" : "primary"}
              styles={styles}
            />
          )}
        </div>

        <div className={styles.identidad}>
          <h1 className={styles.nombre}>{perfil.Nombre || "Usuario"}</h1>
          <div className={styles.username}>@{perfil.username || (perfil.Nombre || "usuario").toLowerCase().replace(/\s/g, "")}</div>
          {perfil.bio && <div className={styles.bio}>{perfil.bio}</div>}
          <div className={styles.meta}>
            {perfil.location && <span>{perfil.location}</span>}
            {perfil.website && (
              <a className={styles.link} href={perfil.website} target="_blank" rel="noreferrer">
                {perfil.website}
              </a>
            )}
          </div>
        </div>

        <div className={styles.social}>
          <button type="button" className={styles.socialBtn} onClick={openFollowing}>
            <strong>{perfil.following_count ?? 0}</strong> Siguiendo
          </button>
          <button type="button" className={styles.socialBtn} onClick={openFollowers}>
            <strong>{perfil.followers_count ?? 0}</strong> Seguidores
          </button>
          <span className={styles.socialStat}>
            <strong>{perfil.publicaciones_count ?? 0}</strong> Posts
          </span>
        </div>

        {followersOpen && (
          <div className={styles.modalBackdrop} onClick={() => setFollowersOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Seguidores</h2>
                <button className={styles.modalClose} onClick={() => setFollowersOpen(false)} type="button">
                  Cerrar
                </button>
              </div>
              <ul className={styles.userList}>
                {followers.map((u) => (
                  <li key={u.id} className={styles.userRow}>
                    <img className={styles.userAvatar} src={u.avatar_url || LogoDefault} alt={u.Nombre} />
                    <div className={styles.userText}>
                      <div className={styles.userName}>{u.Nombre || "Usuario"}</div>
                      <div className={styles.userHandle}>@{u.username || (u.Nombre || "usuario").toLowerCase().replace(/\s/g, "")}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {followingOpen && (
          <div className={styles.modalBackdrop} onClick={() => setFollowingOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Siguiendo</h2>
                <button className={styles.modalClose} onClick={() => setFollowingOpen(false)} type="button">
                  Cerrar
                </button>
              </div>
              <ul className={styles.userList}>
                {following.map((u) => (
                  <li key={u.id} className={styles.userRow}>
                    <img className={styles.userAvatar} src={u.avatar_url || LogoDefault} alt={u.Nombre} />
                    <div className={styles.userText}>
                      <div className={styles.userName}>{u.Nombre || "Usuario"}</div>
                      <div className={styles.userHandle}>@{u.username || (u.Nombre || "usuario").toLowerCase().replace(/\s/g, "")}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}


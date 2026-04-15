import styles from "./SideBar.module.css";
import avatarDefault from "../../../../assets/images/LOGO_X.jpeg";

import { VscHome, VscSearch, VscBell, VscMail } from "react-icons/vsc";
import { RiMoreLine, RiTwitterXFill } from "react-icons/ri";
import { HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2";
import { IoPersonAddOutline, IoPersonOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../contexts/AuthContext";
import { usuarioRepository } from "../../../../../infrastructure/repositories/UsuarioRepository";

import Button from "../../../ui/Button";

import { useEffect, useRef, useState } from "react";

export default function Bar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [perfil, setPerfil] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // =========================
  // CARGAR PERFIL COMPLETO
  // =========================

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const me = await usuarioRepository.getMe();
        if (!cancelled) setPerfil(me);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================
  // PERFIL ACTIVO
  // =========================

  const p = perfil || user;

  const nombre = p?.Nombre || "Usuario";

  const username =
    p?.username ||
    (nombre || "usuario").toLowerCase().replace(/\s/g, "");

  // =========================
  // MENÚ PERFIL
  // =========================

  const handleProfileClick = () => setMenuOpen((v) => !v);

  useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDown);

    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <main className={styles.sidebar}>
      
      {/* LOGO */}
      <div>
        <Button
          label={
            <div className={styles.label}>
              <RiTwitterXFill className={styles.icon} />
              <span></span>
            </div>
          }
          onClick={() => navigate("/home")}
          type="button"
          styles={styles}
        />
      </div>

      <nav className={styles.navContainer}>

        {/* HOME */}
        <div className={styles.navItem}>
          <Button
            label={
              <>
                <VscHome className={styles.icon} />
                <span className={styles.label}>Inicio</span>
              </>
            }
            onClick={() => navigate("/home")}
            type="button"
            styles={styles}
          />
        </div>

        {/* EXPLORAR */}
        <div className={styles.navItem}>
          <Button
            label={
              <>
                <VscSearch className={styles.icon} />
                <span className={styles.label}>Explorar</span>
              </>
            }
            onClick={() => navigate("/explore")}
            type="button"
            styles={styles}
          />
        </div>

        {/* NOTIFICACIONES */}
        <div className={styles.navItem}>
          <Button
            label={
              <>
                <VscBell className={styles.icon} />
                <span className={styles.label}>Notificaciones</span>
              </>
            }
            onClick={() => navigate("/notifications")}
            type="button"
            styles={styles}
          />
        </div>

        {/* SEGUIR */}
        <div className={styles.navItem}>
          <Button
            label={
              <>
                <IoPersonAddOutline className={styles.icon} />
                <span className={styles.label}>Seguir</span>
              </>
            }
            onClick={() => navigate("/connect_people")}
            type="button"
            styles={styles}
          />
        </div>

        {/* CHAT */}
        <div className={styles.navItem}>
          <Button
            label={
              <>
                <VscMail className={styles.icon} />
                <span className={styles.label}>Chat</span>
              </>
            }
            onClick={() => navigate("/chat")}
            type="button"
            styles={styles}
          />
        </div>

        {/* PERFIL */}
        <div className={styles.navItem}>
          <Button
            label={
              <>
                <IoPersonOutline className={styles.icon} />
                <span className={styles.label}>Perfil</span>
              </>
            }
            onClick={() => navigate("/perfil")}
            type="button"
            styles={styles}
          />
        </div>

        {/* MÁS OPCIONES */}
        <div className={styles.navItem}>
          <Button
            label={
              <>
                <HiOutlineEllipsisHorizontalCircle className={styles.icon} />
                <span className={styles.label}>Más Opciones</span>
              </>
            }
            type="button"
            styles={styles}
          />
        </div>

        {/* BOTÓN POSTEAR */}
        <div className={styles.postButtonContainer}>
          <Button
            label="Postear"
            variant="secondary"
            type="button"
            styles={styles}
          />
        </div>

        {/* ========================= */}
        {/* PERFIL DINÁMICO */}
        {/* ========================= */}

        {p && (
          <div className={styles.profileBoxContainer} ref={menuRef}>
            <Button
              onClick={handleProfileClick}
              label={
                <>
                  <img
                    src={p?.avatar_url || avatarDefault}
                    className={styles.avatar}
                    alt={`Perfil de ${nombre}`}
                  />

                  <div className={styles.TextGroup}>
                    <span className={styles.name}>{nombre}</span>
                    <span className={styles.handle}>@{username}</span>
                  </div>

                  <RiMoreLine className={styles.icon} />
                </>
              }
              variant="cajaperfil"
              styles={styles}
            />

            {menuOpen && (
              <div
                className={styles.profileMenu}
                role="menu"
                aria-label="Menú de usuario"
              >
                <button
                  type="button"
                  className={styles.profileMenuItem}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/settings/profile");
                  }}
                >
                  Configurar perfil
                </button>

                <button
                  type="button"
                  className={`${styles.profileMenuItem} ${styles.profileMenuDanger}`}
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </main>
  );
}
import styles from "./SideBar.module.css";
import avatarDefault from '../../../../assets/images/LOGO_X.jpeg'; // Avatar por defecto
import { VscHome, VscSearch, VscBell, VscMail, VscRocket } from "react-icons/vsc";
import { RiMoreLine, RiTwitterXFill } from "react-icons/ri";
import { HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2";
import { IoPersonAddOutline, IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../contexts/AuthContext"; // Importamos el hook
import Button from "../../../ui/Button";

export default function Bar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Extraemos el usuario y el logout del contexto

  // Función para manejar el clic en el perfil (puedes mostrar un menú o desloguear)
  const handleProfileClick = () => {
    // Por ahora, si quieres que al hacer clic se abra una opción de logout
    if (window.confirm("¿Deseas cerrar sesión?")) {
      logout();
    }
  };

  return (
    <main className={styles.sidebar}>
      <div>
        <Button 
          label={
            <div className={styles.label}>
              <RiTwitterXFill className={styles.icon}/>
              <span></span>
            </div>
          }  
          onClick={() => navigate('/home')} 
          type="button" 
          styles={styles} 
        />
      </div>
      
      <nav className={styles.navContainer}>
        {/* HOME */}
        <div className={styles.navItem}>
          <Button label={<>
            <VscHome className={styles.icon } />
            <span className={styles.label}>Inicio</span>
            </>}  
            onClick={() => navigate('/home')} 
            type="button" 
            styles={styles}
          /> 
        </div>

        {/* EXPLORAR */}
        <div className={styles.navItem}>
          <Button label={<>
            <VscSearch className={styles.icon} />
            <span className={styles.label}>Explorar</span>
            </>}  
            onClick={() => navigate('/explore')} 
            type="button" 
            styles={styles}
          /> 
        </div>

        {/* NOTIFICACIONES */}
        <div className={styles.navItem}>
          <Button label={<>
            <VscBell className={styles.icon} />
            <span className={styles.label}>Notificaciones</span>
            </>}  
            onClick={() => navigate('/notifications')} 
            type="button" 
            styles={styles}
          /> 
        </div>

        {/* SEGUIR */}
        <div className={styles.navItem}>
          <Button label={<>
            <IoPersonAddOutline className={styles.icon} />
            <span className={styles.label}>Seguir</span>
            </>}  
            onClick={() => navigate('/connect_people')} 
            type="button" 
            styles={styles}
          /> 
        </div>

        {/* CHAT */}
        <div className={styles.navItem}>
          <Button label={<>
            <VscMail className={styles.icon} />
            <span className={styles.label}>Chat</span>
            </>}  
            onClick={() => navigate('/chat')} 
            type="button" 
            styles={styles}
          /> 
        </div>

        {/* PERFIL */}
        <div className={styles.navItem}>
          <Button label={<>
            <IoPersonOutline className={styles.icon} />
            <span className={styles.label}>Perfil</span>
            </>}  
            onClick={() => navigate('/perfil')} 
            type="button" 
            styles={styles}
          /> 
        </div>

        {/* MÁS OPCIONES */}
        <div className={styles.navItem}>
          <Button label={<>
            <HiOutlineEllipsisHorizontalCircle className={styles.icon} />
            <span className={styles.label}>Más Opciones</span>
            </>}  
            type="button" 
            styles={styles}
          /> 
        </div>

        {/* BOTÓN POSTEAR */}
        <div className={styles.postButtonContainer}>
          <Button label='Postear' variant="secondary" type="button" styles={styles}/>
        </div>

        {/* CAJA DE PERFIL DINÁMICA */}
        {user && (
          <div className={styles.profileBoxContainer}>
            <Button
              onClick={handleProfileClick}
              label={
                <>
                  <img 
                    src={user.avatar_url || avatarDefault} 
                    className={styles.avatar} 
                    alt={`Perfil de ${user.Nombre}`} 
                  />

                  <div className={styles.TextGroup}>
                    {/* Usamos los datos reales del objeto user */}
                    <span className={styles.name}>{user.Nombre || 'Usuario'}</span>
                    <span className={styles.handle}>@{user.Nombre?.toLowerCase().replace(/\s/g, '') || 'usuario'}</span>
                  </div>

                  <RiMoreLine className={styles.icon}/>
                </>
              }
              variant="cajaperfil"
              styles={styles}
            />
          </div>
        )}
      </nav>
    </main>
  );
}
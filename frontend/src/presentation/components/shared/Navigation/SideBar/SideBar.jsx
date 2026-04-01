import styles from "./SideBar.module.css";
import avatar from '../../../../assets/images/LOGO_X.jpeg'
import { VscHome, VscSearch, VscBell, VscBellDot, VscMail, VscRocket } from "react-icons/vsc";
import { RiMoreLine, RiTwitterXFill } from "react-icons/ri";
import { HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2";
import { IoPersonAddOutline, IoPersonOutline, } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Premiun from "../../../../pages/Premiun/Premiun";
import Button from "../../../ui/Button";

export default function Bar() {
  const navigate = useNavigate();
  return (
    <main className={styles.sidebar}>
      <div>
        <Button label={<div className={styles.label}>
          <RiTwitterXFill className={styles.icon} />
          <span></span>
        </div>
        }
          onClick={() => navigate('/')} type="button" styles={styles} />
      </div>

      <nav className={styles.navContainer}>
        {/* HOME */}
        <div className={styles.navItem}>
          <Button label={<>
            <VscHome className={styles.icon} />
            <span className={styles.label}>Inicio</span>
          </>
          }
            onClick={() => navigate('/home')} type="button" styles={styles}
          />
        </div>

        {/* EXPLORAR */}
        <div className={styles.navItem}>

          <Button label={<>
            <VscSearch className={styles.icon} />
            <span className={styles.label}>Explorar</span>
          </>
          }
            onClick={() => navigate('/explore')} type="button" styles={styles}
          />
        </div>


        {/* NOTIFICACIONES */}
        <div className={styles.navItem}>

          <Button label={<>
            <VscBell className={styles.icon} />
            <span className={styles.label}>Notificaciones</span>
          </>
          }
            onClick={() => navigate('/noitifications')} type="button" styles={styles}
          />
        </div>

        {/* SEGUIR */}
        <div className={styles.navItem}>

          <Button label={<>
            <IoPersonAddOutline className={styles.icon} />
            <span className={styles.label}>Seguir</span>
          </>
          }
            onClick={() => navigate('/connect_people')} type="button" styles={styles}
          />
        </div>

        {/* CHAT */}
        <div className={styles.navItem}>

          <Button label={<>
            <VscMail className={styles.icon} />
            <span className={styles.label}>Chat</span>
          </>
          }
            onClick={() => navigate('/chat')} type="button" styles={styles}
          />
        </div>

        {/* CREATOR STUDIO */}
        <div className={styles.navItem}>

          <Button label={<>
            <VscRocket className={styles.icon} />
            <span className={styles.label}>Estudio para Cre...</span>
          </>
          }
            onClick={() => navigate('/creators')} type="button" styles={styles}
          />
        </div>

        {/* PREMIUM */}
        <div className={styles.navItem}>

          <Button label={<>
            <RiTwitterXFill className={styles.icon} />
            <span className={styles.label}>Premiun</span>
          </>
          }
            onClick={() => navigate('/premiun')} type="button" styles={styles}
          />
        </div>

        {/* PERFIL */}
        <div className={styles.navItem}>
          <Button label={<>
            <IoPersonOutline className={styles.icon} />
            <span className={styles.label}>Perfil</span>
          </>
          }
            onClick={() => navigate('/perfil')} type="button" styles={styles}
          />
        </div>

        {/* MÁS OPCIONES */}
        <div className={styles.navItem}>

          <Button label={<>
            <HiOutlineEllipsisHorizontalCircle className={styles.icon} />
            <span className={styles.label}>Más Opciones</span>
          </>
          }
            type="button" styles={styles}
          />
        </div>

        {/* boton postear */}
        <>
          <Button label='Postear' variant="secondary" type="button" styles={styles} />
        </>

        <>
          <Button
            label={
              <>
                <img src={avatar} className={styles.avatar} alt={`Perfil de `} />

                <div className={styles.TextGroup}>
                  <span className={styles.name}> pedro </span>
                  <span className={styles.handle} > peperp</span>
                </div>

                <RiMoreLine className={styles.icon} />
              </>
            }
            variant="cajaperfil"
          />
        </>
      </nav>
    </main>
  );
}

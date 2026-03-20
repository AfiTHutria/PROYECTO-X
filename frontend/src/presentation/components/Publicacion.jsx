
import Button from './Button';
import {CiHeart} from "react-icons/ci";
import {LuRepeat2} from "react-icons/lu";
import {FiMessageCircle} from "react-icons/fi";
import {BiBarChart} from "react-icons/bi";
import {MdOutlineLabel} from "react-icons/md";
import {FiShare}  from "react-icons/fi";
import styles from './publicacion.module.css'

export default function Publicacion() {

    return (
  <section className={styles.cajadepublicacion}>

    {/* IZQUIERDA (avatar) */}
    <div className={styles.parteIzquierda}>
      <img 
        src="https://pbs.twimg.com/profile_images/1616598736094417920/1n9s8XoL_400x400.jpg"  
        alt="Foto de perfil" 
        className={styles.fotodeperfil}
      />
    </div>

    {/* DERECHA (todo lo demás) */}
    <div className={styles.parteDerecha}>

      <div className={styles.userInfo}>
        <span className={styles.name}>Usuario</span>
        <span className={styles.username}>@usuario · 5h</span>
      </div>

      <div className={styles.content}>
        <p>
          TUNOMETEKBRASARAMBICHE😭😭
        </p>
      </div>

      <div className={styles.media}>
        <img 
          src="https://pbs.twimg.com/media/FakeImage.jpg" 
          alt="post" 
        />
      </div>

      <div className={styles.icons}>
        <div>
          <Button label={<CiHeart className={styles.like}/>} variant='btlike' />
        </div>
        <div>
          <Button label={<LuRepeat2 className={styles.repost}/>} variant='btrepost' />
        </div>
        <div>
          <Button label={<FiMessageCircle className={styles.mensaje}/>} variant='btmensaje' />
        </div>
        <div>
          <Button label={<BiBarChart className={styles.reproducciones}/>} variant='btreproducciones' />
        </div>
        <div>
          <Button label={<MdOutlineLabel className={styles.marcador}/>} variant='btmarcador' />
        </div>
        <div>
          <Button label={<FiShare className={styles.compartir}/>} variant='btcompartir' />
        </div>
      </div>

    </div>

  </section>
)     

}
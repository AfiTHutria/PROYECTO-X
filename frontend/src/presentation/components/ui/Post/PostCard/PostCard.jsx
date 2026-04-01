import styles from './PostCard.module.css';
import { RiHeartLine, RiChat1Line, RiRepeatLine, RiShareLine } from "react-icons/ri";
import LogoDefault from "../../../../../presentation/assets/images/LOGO_X.jpeg";

export default function PostCard({ post }) {
    // Extraemos los datos basándonos en tu respuesta JSON
    const { contenido, created_at, usuarios, imagen_url, likes_count } = post;
    
    // Formatear fecha simple (puedes usar date-fns después)
    const fecha = new Date(created_at).toLocaleDateString();

    return (
        <div className={styles.card}>
            {/* Lado Izquierdo: Avatar */}
            <div className={styles.avatarContainer}>
                <img 
                    src={usuarios?.avatar_url || LogoDefault} 
                    alt={usuarios?.Nombre} 
                    className={styles.avatar} 
                />
            </div>

            {/* Lado Derecho: Contenido */}
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.name}>{usuarios?.Nombre || "Usuario"}</span>
                    <span className={styles.username}>@{usuarios?.Nombre?.toLowerCase().replace(/\s/g, '')}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.date}>{fecha}</span>
                </div>

                <div className={styles.text}>
                    {contenido}
                </div>

                {imagen_url && (
                    <div className={styles.imageContainer}>
                        <img src={imagen_url} alt="Post content" className={styles.postImage} />
                    </div>
                )}

                {/* Barra de Acciones estilo X */}
                <div className={styles.actions}>
                    <div className={styles.actionItem}><RiChat1Line /> <span>0</span></div>
                    <div className={styles.actionItem}><RiRepeatLine /> <span>0</span></div>
                    <div className={`${styles.actionItem} ${styles.heart}`}><RiHeartLine /> <span>{likes_count || 0}</span></div>
                    <div className={styles.actionItem}><RiShareLine /></div>
                </div>
            </div>
        </div>
    );
}
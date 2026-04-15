import { useState, useRef } from "react";
import styles from './PostEditor.module.css'
import Button from "../../Button.jsx";
import { useAuth } from "../../../../../contexts/AuthContext.jsx";
import { RiImageLine, RiFileGifLine, RiListRadio, RiEmotionHappyLine, RiCalendarEventLine, RiMapPin2Line } from "react-icons/ri";
import Logo from "../../../../../presentation/assets/images/LOGO_X.jpeg";
import { PublicacionRepository } from "../../../../../infrastructure/repositories/PublicacionRepository.js";

export default function PostEditor({ onPostCreated }) {
    // Corregido: isCheckingSession (chequear se escribe con 'ck')
    
    const { user, isCheckingSession } = useAuth();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
        setContent(target.value);
    };
    
    const handlePost = async () => {
        if (!content.trim() || loading) return;

        setLoading(true);
        try {
            // Llamada formal al repositorio
            const nuevaPublicacion = await PublicacionRepository.crear(user.id, content);
            
            // Si el padre (Feed) nos pasó una función, le enviamos el post nuevo
            if (onPostCreated) onPostCreated(nuevaPublicacion);
            
            setContent(""); 
            if (textareaRef.current) textareaRef.current.style.height = "auto";
        } catch (error) {
            console.error("Error en el flujo:", error.message);
        } finally {
            setLoading(false);
        }
    };

    if (isCheckingSession) return null;

    return (
        <div className={styles.container}>
            {/* IZQUIERDA: AVATAR O LOGO */}
            <div className={styles.avatarSection}>
                {user?.avatar_url ? (
                    <img src={user.avatar_url} alt={user.Nombre} className={styles.avatar} />
                ) : (
                    <img src={Logo} alt="Logo ProyectoX" className={styles.avatarCircle} />
                )}
            </div>

            {/* DERECHA: TEXTAREA Y BOTONES (Todo esto va en una columna) */}
            <div className={styles.contensection}>
                <textarea
                    ref={textareaRef}
                    name="content"
                    className={styles.textarea}
                    placeholder="¿Qué está pensando?"
                    value={content}
                    onInput={handleInput}
                    rows="1"
                />

                <div className={styles.actionsBar}>
                    <div className={styles.iconsGroup}>
                        <RiImageLine className={styles.actionIcon} />
                        <RiFileGifLine className={styles.actionIcon} />
                        <RiListRadio className={styles.actionIcon} />
                        <RiEmotionHappyLine className={styles.actionIcon} />
                        <RiCalendarEventLine className={styles.actionIcon} />
                        <RiMapPin2Line className={styles.actionIcon} />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <Button
                            label="Postear"
                            onClick={handlePost}
                            disabled={!content.trim()}
                            variant="primary"
                            styles={styles}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
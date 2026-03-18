import styles from './login.module.css'
import Button from "../components/Button.jsx";
import LOGO_X from '../assets/LOGO_X.jpeg';
import { useNavigate, useLocation } from "react-router-dom";


export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className={styles.General}>
            <div className={styles.imagen}>
                <img src={LOGO_X} alt="Logo X" />
            </div>
            <section className={styles.formsection}>
                <div className={styles.tittle}>
                    <h1>Lo que está pasando ahora</h1>
                </div>
                <div className={styles.subtitle}>
                    <p>Únete hoy</p>
                </div>
                <div className={styles.regapps}>
                    <Button label="Registrarse con Google" onClick={() => { }} variant="primary" type="button" styles={styles}/>
                </div>
                <div className={styles.division}>
                    <p>-------------------------O----------------------------</p>
                </div>
                {/* botton crear cuenta */}
                <div className={styles.regdb}>
                    <Button label="Crear cuenta" onClick={() => { navigate("/registro", { state: { background: location } }) }} variant="primary" type="button" styles={styles}/>
                </div>
                <div className={styles.privacy}>
                    Al registrarte, aceptas nuestras condiciones de uso y política de privacidad, incluida la política de uso de cookies. Es posible que te enviemos correos electrónicos con actualizaciones, ofertas y otra información relacionada con el servicio. Puedes darte de baja de estos correos electrónicos en cualquier momento.
                </div>
                <div className={styles.subtitle2}>
                    <p>¿Ya tienes una cuenta? </p>
                </div>
                <div className={styles.login}>
                    <Button label="Iniciar sesión" onClick={() => { navigate("/Inicio", { state: { background: location } }) }} variant="secondary" type="button"styles={styles}/>
                </div>
            </section>

            <div className={styles.footer}>
                Información | Descarga la app de X | Grok | Centro de Ayuda | Condiciones de Servicio | Política de Privacidad | Política de cookies | Accesibilidad | Información de anuncios | Blog
                | Empleos | Recursos para marcas | Publicidad | Marketing | X para empresas | Desarrolladores | Noticias | Configuración | © 2026 X Corp.
            </div>
        </div>


    )
}
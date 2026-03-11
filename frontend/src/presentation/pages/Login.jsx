import './login.css';
<<<<<<< HEAD
import { useNavigate, useLocation} from "react-router-dom";
=======
>>>>>>> 8171530957688570961ea71194f20556f95f8dec
import Button from "../components/Button.jsx";
import LOGO_X from '../assets/LOGO_X.jpeg';
import { useNavigate, useLocation } from "react-router-dom";


export default function Login() {
<<<<<<< HEAD
    const location= useLocation();
=======
    const location = useLocation();
>>>>>>> 8171530957688570961ea71194f20556f95f8dec
    const navigate = useNavigate();
    return (
        <div className="General">
            <div className="imagen">
                <img src={LOGO_X} alt="Logo X" />
            </div>
            <section className='form-section'>
<<<<<<< HEAD
            <div className="tittle">
                <h1>Lo que está pasando ahora</h1>
            </div>
            <div className="subtitle">
                <p>Únete hoy</p>
            </div>
            <div className="reg-apps">   
                <Button label="Registrarse con Google" onClick={()=> {}} variant="primary" type= "button"/>
            </div>
            <div className="division">
                <p>-------------------------O----------------------------</p>
            </div>
            <div className="reg-db">
                <Button label="Crear cuenta" onClick={()=> {navigate("/registro",{state: {background: location}})}} variant="primary" type="button"/>   
            </div>
            <div className="privacy">
                Al registrarte, aceptas nuestras condiciones de uso y política de privacidad, incluida la política de uso de cookies. Es posible que te enviemos correos electrónicos con actualizaciones, ofertas y otra información relacionada con el servicio. Puedes darte de baja de estos correos electrónicos en cualquier momento.
            </div>
            <div className="subtitle-2">
                <p>¿Ya tienes una cuenta? </p>
            </div>
            <div className="login">
                <Button label="Iniciar sesión" onClick={()=> {navigate("/home")}} variant="secondary" type="button" />
            </div>
=======
                <div className="tittle">
                    <h1>Lo que está pasando ahora</h1>
                </div>
                <div className="subtitle">
                    <p>Únete hoy</p>
                </div>
                <div className="reg-apps">
                    <Button label="Registrarse con Google" onClick={() => { }} variant="primary" type="button" />
                </div>
                <div className="division">
                    <p>-------------------------O----------------------------</p>
                </div>
                {/* botton crear cuenta */}
                <div className="reg-db">
                    <Button label="Crear cuenta" onClick={() => { navigate("/registro", { state: { background: location } }) }} variant="primary" type="button" />
                </div>
                <div className="privacy">
                    Al registrarte, aceptas nuestras condiciones de uso y política de privacidad, incluida la política de uso de cookies. Es posible que te enviemos correos electrónicos con actualizaciones, ofertas y otra información relacionada con el servicio. Puedes darte de baja de estos correos electrónicos en cualquier momento.
                </div>
                <div className="subtitle-2">
                    <p>¿Ya tienes una cuenta? </p>
                </div>
                <div className="login">
                    <Button label="Iniciar sesión" onClick={() => { navigate("/home") }} variant="secondary" type="button" />
                </div>
>>>>>>> 8171530957688570961ea71194f20556f95f8dec
            </section>

            <div className="footer">
                Información | Descarga la app de X | Grok | Centro de Ayuda | Condiciones de Servicio | Política de Privacidad | Política de cookies | Accesibilidad | Información de anuncios | Blog
                | Empleos | Recursos para marcas | Publicidad | Marketing | X para empresas | Desarrolladores | Noticias | Configuración | © 2026 X Corp.
            </div>
        </div>


    )
}
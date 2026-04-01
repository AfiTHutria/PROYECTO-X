import React, { useState, useEffect } from 'react'
import Button from '../../components/ui/Button.jsx'
import LOGO from '../../assets/images/LOGO_X.jpeg'
import { useAuthLogin } from '../../ViewModels/useAuthModels.js'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Login.module.css'
import { useAuth } from '../../../contexts/AuthContext.jsx'

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    
    // Protección contra el error de "pantalla blanca"
    const setUser = auth ? auth.setUser : null;

    const { loading, error, success, handleLogin } = useAuthLogin();
    const [formData, setFormData] = useState({
        Email: '',
        Contraseña: ''
    });

    // Limpieza de rastro de sesión anterior al cargar
    useEffect(() => {
        if (setUser) {
            setUser(null);
        }
    }, [setUser]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const resultado = await handleLogin(formData);
        if (resultado) {
            navigate("/home", { replace: true });
        }
    }

    // Si el contexto falla, mostramos un aviso simple en lugar de romper la app
    if (!auth) return <div style={{color: 'white'}}>Error: AuthProvider no detectado</div>;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.encabezado}>
                    <Button 
                        label="X" 
                        onClick={() => { navigate("/") }} 
                        variant="cerrar" 
                        type="button" 
                        title="Cerrar" 
                    />
                    <img src={LOGO} alt="Logo" className={styles.logo} />
                </div>

                <div className={styles.titulo}>
                    <h2><strong>Inicia Sesión en X</strong></h2>
                </div>

                <div>
                    {error && <p className="error-message" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                    
                    <form onSubmit={onSubmit}>
                        <div className={styles.continps}>
                            <input 
                                className={styles.inp}
                                type="text"
                                placeholder="Correo"
                                value={formData.Email}
                                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                            />
                        </div>

                        <div className={styles.continps}>
                            <input 
                                className={styles.inp}
                                type="password"
                                placeholder="Contraseña"
                                value={formData.Contraseña}
                                onChange={(e) => setFormData({ ...formData, Contraseña: e.target.value })}
                            />
                        </div>

                        {/* Mantenemos tu estructura de botones original */}
                        <div className={styles.cajaboton}>
                            <Button 
                                variant='primary' 
                                type='submit' 
                                disabled={loading} 
                                styles={styles}
                                label={loading ? "Iniciando sesion..." : "Iniciar Sesion"} 
                            />
                        </div>

                        <div className={styles.cajaboton}>
                            <Button 
                                label={'¿Olvidaste tu contrasña?'} 
                                variant='secondary' 
                                styles={styles}
                                onClick={() => { navigate("/reset", { state: { background: { pathname: "/" } } }) }} 
                            />
                        </div>

                        <div className={styles.Cnotienescuenta}>
                            <p>¿No tienes una cuenta?</p>
                            <Button 
                                label={"Regístrate"} 
                                variant='third' 
                                styles={styles} 
                                onClick={() => { navigate("/registro", { state: { background: { pathname: "/" } } }) }} 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
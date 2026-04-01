import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../ViewModels/useAuthModels.js'; 
import Button from '../../components/ui/Button.jsx';
import LOGO from '../../assets/images/LOGO_X.jpeg';
import styles from './ResetPassword.module.css';

export default function ResetPassword() {
    const navigate = useNavigate();
    
    // 1. Extraemos todo lo necesario de nuestro nuevo ViewModel
    const { 
        step, 
        loading,setStep, 
        error, 
        sendEmail,  
        finalizeReset,
        goToPreviousStep,
    } = useResetPassword();
    
    // Estados locales para los inputs de cada "Caja"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const type = params.get("type");

    if (accessToken && type === "recovery") {
        setIsPasswordRecovery(true);
        setStep(3); // mostrar formulario de nueva contraseña
    }
    }, []);

    // Manejador del formulario principal
    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (step === 1) {
            await sendEmail(email);
        } else if (step === 2) {
            await finalizeReset(password);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Cabecera común para todos los pasos */}
                <div className={styles.header}>
                    <Button 
                        label={step === 1 ? "X" : "←"} // Si no es el paso 1, mostramos flecha atrás
                        onClick={step === 1 ? () => navigate("/") : goToPreviousStep} 
                        variant="cerrar" 
                        type="button" 
                    />
                    <img src={LOGO} alt="X Logo" className={styles.logo} />
                </div>

                <div className={styles.content}>
                    <form onSubmit={onSubmit} noValidate>
                        
                        {/* --- CAJA 1: BUSCAR CUENTA --- */}
                        {step === 1 && (
                            <>
                                <div className={styles.titulo}>
                                    <h2><strong>Encuentra tu cuenta de X</strong></h2>
                                    <p className={styles.subtitulo}>Introduce el correo asociado a tu cuenta.</p>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        className={`${styles.inp} ${error ? styles.inpError : ''}`}
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </>
                        )}


                        {/* --- CAJA 2: NUEVA CONTRASEÑA --- */}
                        {step === 2 && (
                            <>
                                <div className={styles.titulo}>
                                    <h2><strong>Elige una nueva contraseña</strong></h2>
                                    <p className={styles.subtitulo}>Asegúrate de que tenga al menos 8 caracteres.</p>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        className={`${styles.inp} ${error ? styles.inpError : ''}`}
                                        type="password"
                                        placeholder="Nueva contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {/* Mensajes de error globales del ViewModel */}
                        {error && <p className={styles.errorMessage}>{error}</p>}

                        <div className={styles.cajaboton}>
                            <Button 
                                variant='primary' 
                                type='submit' 
                                disabled={loading} 
                                label={loading ? "Cargando..." : step === 3 ? "Actualizar" : "Siguiente"} 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
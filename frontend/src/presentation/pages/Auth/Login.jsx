import React,{ useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import LOGO from '../../assets/images/LOGO_X.jpeg'
import { useAuthLogin } from '../../ViewModels/useAuthModels.js'
import { Navigate,useLocation,useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

export default function Login(){
     const navigate = useNavigate(); 
        const location = useLocation();
    
        const { loading, error, success, handleLogin } = useAuthLogin();
        const [formData,setFormData]= useState({
            Email: '',
            Contraseña:''
        });
        
    
        const onSubmit = async  (e) =>{
            e.preventDefault();
            const resultado=await handleLogin(formData);
            if(resultado){
                navigate("/home")
            }
        }
    
      
        return (
    
            <>
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.encabezado} >
                            {/* cerrar ventanita */}
                            <Button label="X" onClick={() => { navigate("/") }} variant="cerrar" type="button" title="Cerrar" />
                            <img src={LOGO} alt="" className= {styles.logo} />
                        </div>
                        <div className={styles.titulo}>
                            <h2 ><strong>Inicia Sesión en X</strong></h2>
                        </div>
                        <div>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message"></p>}
                            <form onSubmit={onSubmit}>
                                <div className={styles.continps} >
    
                                    <input className={styles.inp}
                                        type="text"
                                        placeholder="Correo"
                                        value={formData.Email}
                                        onChange={(e)=> setFormData({...formData, Email: e.target.value})}
    
                                    />
                                    
                                </div>
    
                                <div className= {styles.continps} >
                                    <input className= {styles.inp}
                                        type="password"
                                        placeholder="Contraseña"
                                        value={formData.Contraseña}
                                        onChange={(e)=> setFormData({...formData, Contraseña: e.target.value})}
                                    />
                                    
                                </div>
    
                                {/* btn de enviado */}
                                <div className={styles.cajaboton}>
                                    <Button variant='primary' type='submit' disabled={loading} styles={styles}
                                    label={loading ? "Iniciando sesion..." : "Iniciar Sesion"} />
                                    
                                </div> 
    
                                <div className={styles.cajaboton}> 
                                    <Button label={'¿Olvidaste tu contrasña?'} variant='secondary' styles={styles}
                                    onClick={ () => {navigate ("/reset",{state:{background:{pathname: "/"}}} )}} />
                                </div>
                                <div className={styles.Cnotienescuenta}>
                                    <p>¿No tienes una cuenta?</p>
                                    <Button label={"Regístrate"} variant='third' styles={styles} 
                                    onClick={() => {navigate("/registro",{state:{background: {pathname: "/"}}})}}/>
                                </div>
                            </form>
    
                        </div>
    
    
                    </div>
                </div>
    
            </>
    
        );
}
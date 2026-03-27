import React, { useState } from 'react'
import Button from '../components/Button'
import LOGO from '../assets/LOGO_X.jpeg'
import { useAuthModels } from '../ViewModels/useAuthModels';
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./VI.module.css"



export default function VistaInicio() {
    const navigate = useNavigate(); 

     const { loading, error, success, handleLogin } = useAuthModels();
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
                        <Button label="X" onClick={() => { navigate("/") }} variant="cerrar" type="button" title="Cerrar"/>
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
                                <span className={styles.contador}>
                                    0/50
                                </span>
                            </div>

                            <div className= {styles.continps} >
                                <input className= {styles.inp}
                                    type="password"
                                    placeholder="Contraseña"
                                    value={formData.Contraseña}
                                    onChange={(e)=> setFormData({...formData, Contraseña: e.target.value})}
                                />
                                <span className={styles.contador}>
                                    0/8
                                </span>
                            </div>
                            {/* btn de enviado */}
                            <div className= {styles.btnenviar} >
                                <button className={styles.enviar} type="submit" disabled={loading}>
                                    {loading ? "Iniciando sesion..." : "Iniciar Sesion"}
                                </button>
                            </div> 
                        </form>

                    </div>


                </div>
            </div>

        </>

    )

}

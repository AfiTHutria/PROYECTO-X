import React, { useState } from "react";
import { useAuthModels } from "../ViewModels/useAuthModels";
import LOGO from '../assets/LOGO_X.jpeg'
import styles from './RV.module.css';
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";


export default function RegistroVista() {
  const navigate= useNavigate();
    const { loading, error, success, handleRegistro } = useAuthModels();
    const [formData, setFormData] = useState({
        Nombre: '',
        Telefono: '',
        FechaNacimiento: '',
        Email: '',
        Contraseña: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleRegistro(formData);
    }

    return (
        <>
            <div id="overlay" class={styles.overlay}>
                <div class={styles.modal}>
                    <div className={styles.encabezado} >
                        {/* cerrar ventanita */}
                        <Button label="X" onClick={() => {navigate("/") }} variant="cerrar" type="button" styles={styles}/>
                        <img src={LOGO} alt="" className={styles.logo} />
                    </div>
                    <div className={styles.titulo}>
                        <h2 ><strong>Crea Tu Cuenta</strong></h2>
                    </div>



                    {/* formulario */}
                    <div className={styles.formulario} >

                        <form onSubmit={onSubmit}>
                            <div className={styles.continps} >

                                <input className={styles.inp}
                                    type="text"
                                    placeholder="Nombre"
                                    value={formData.Nombre}
                                    onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
                                />
                                <span className={styles.contador}>
                                    0/50
                                </span>
                            </div>
                            <div className={styles.continps} >
                                <input
                                    className={styles.inp}
                                    type="tel"
                                    placeholder="Teléfono"
                                    value={formData.Telefono}
                                    onChange={(e) => setFormData({ ...formData, Telefono: e.target.value })}
                                />
                                <span className={styles.contador}>
                                    0/50
                                </span>
                            </div>
                            <div  >

                                <input className={styles.inp}
                                    type="date"
                                    placeholder="Fecha de Nacimiento"
                                    value={formData.FechaNacimiento}
                                    onChange={(e) => setFormData({ ...formData, FechaNacimiento: e.target.value })}
                                />

                            </div>
                            <div className={styles.continps} >
                                <input className={styles.inp}
                                    type="email"
                                    placeholder="Email"
                                    value={formData.Email}
                                    onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                                />
                                <span className={styles.contador}>
                                    0/50
                                </span>
                            </div>
                            <div className={styles.continps} >
                                <input className={styles.inp}
                                    type="password"
                                    placeholder="Contraseña"
                                    value={formData.Contraseña}
                                    onChange={(e) => setFormData({ ...formData, Contraseña: e.target.value })}
                                />
                                <span className={styles.contador}>
                                    0/8
                                </span>
                            </div >

                            {/* btn de enviado */}
                            <div className={styles.btnenviar} >
                                <button className={styles.enviar} type="submit" disabled={loading}>
                                    {loading ? "Registrando..." : "Registrar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
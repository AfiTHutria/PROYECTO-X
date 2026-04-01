import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Button from '../../components/ui/Button'
import LOGO from '../../assets/images/LOGO_X.jpeg'
import styles from './Registro.module.css'; 

export default function Registro() {
    const navigate = useNavigate();
    const { TempData, updateTempData, registerUser, loading, error } = useAuth();
    const handlechange = (e) => {
        updateTempData({ [e.target.name]: e.target.value });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await registerUser();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                
                {/* Header del Modal */}
                <header className={styles.encabezado}>
                    <div className={styles.cerrar_wrapper}>
                        <Button 
                            label="✕" 
                            onClick={() => navigate("/")} 
                            variant="cerrar" 
                            styles={styles} 
                        />
                    </div>
                    <img src={LOGO} alt="X Logo" className={styles.logo} />
                </header>

                <div className={styles.cuerpo_modal}>
                    <h2 className={styles.titulo}>Crea tu cuenta</h2>

                    <form onSubmit={onSubmit} className={styles.formulario}>
                        
                        {/* Campo Nombre */}
                        <div className={styles.continps}>
                            <input 
                                className={styles.inp}
                                name="Nombre"
                                type="text"
                                placeholder="Nombre"
                                value={TempData.Nombre}
                                onChange={handlechange}
                                required
                            />
                            <span className={styles.contador}>{TempData.Nombre.length}/50</span>
                        </div>

                        {/* Campo Teléfono */}
                        <div className={styles.continps}>
                            <input 
                                className={styles.inp}
                                name="Telefono"
                                type="tel"
                                placeholder="Teléfono"
                                value={TempData.Telefono}
                                onChange={handlechange}
                            />
                        </div>

                        {/* Campo Fecha */}
                        <div className={styles.continps}>
                            <label className={styles.label_fecha}>Fecha de nacimiento</label>
                            <input 
                                className={styles.inp_fecha}
                                name="FechaNacimiento"
                                type="date"
                                value={TempData.FechaNacimiento}
                                onChange={handlechange}
                                required
                            />
                        </div>

                        {/* Campo Email */}
                        <div className={styles.continps}>
                            <input 
                                className={styles.inp}
                                name="Email"
                                type="email"
                                placeholder="Email"
                                value={TempData.Email}
                                onChange={handlechange}
                                required
                            />
                        </div>

                        {/* Campo Password */}
                        <div className={styles.continps}>
                            <input 
                                className={styles.inp}
                                name="Contraseña"
                                type="password"
                                placeholder="Contraseña"
                                value={TempData.Contraseña}
                                onChange={handlechange}
                                required
                            />
                        </div>

                        {/* Mostrar error si el ViewModel lo devuelve */}
                        {error && <p className={styles.error_msg}>{error}</p>}

                        <button 
                            className={styles.enviar} 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Registrar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
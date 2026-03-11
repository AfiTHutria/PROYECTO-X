import React, { useState } from "react";
import { useAuthModels } from "../ViewModels/useAuthModels";
import LOGO from '../assets/LOGO_X.jpeg'
import '../components/RV.css';
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
            <div id="overlay" class="overlay">
                <div class="modal">
                    <div className="encabezado " >
                        {/* cerrar ventanita */}
                        <Button label="X" onClick={() => {navigate("/") }} variant="cerrar" type="button" />
                        <img src={LOGO} alt="" className=" h-[30px] w-[30px] mx-[90px] " />
                    </div>
                    <div className="titulo text-[30px]  mt-[40px] ml-[10px] ">
                        <h2 ><strong>Crea Tu Cuenta</strong></h2>
                    </div>



                    {/* formulario */}
                    <div className="formulario" >

                        <form onSubmit={onSubmit}>
                            <div className="continps" >

                                <input className="inp"
                                    type="text"
                                    placeholder="Nombre"
                                    value={formData.Nombre}
                                    onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
                                />
                                <span className="contador">
                                    0/50
                                </span>
                            </div>
                            <div className="continps" >
                                <input
                                    className="inp"
                                    type="tel"
                                    placeholder="Teléfono"
                                    value={formData.Telefono}
                                    onChange={(e) => setFormData({ ...formData, Telefono: e.target.value })}
                                />
                                <span className="contador">
                                    0/50
                                </span>
                            </div>
                            <div  >

                                <input className=" inp"
                                    type="date"
                                    placeholder="Fecha de Nacimiento"
                                    value={formData.FechaNacimiento}
                                    onChange={(e) => setFormData({ ...formData, FechaNacimiento: e.target.value })}
                                />

                            </div>
                            <div className="continps" >
                                <input className="inp"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.Email}
                                    onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                                />
                                <span className="contador">
                                    0/50
                                </span>
                            </div>
                            <div className="continps" >
                                <input className="inp"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={formData.Contraseña}
                                    onChange={(e) => setFormData({ ...formData, Contraseña: e.target.value })}
                                />
                                <span className="contador">
                                    0/8
                                </span>
                            </div >

                            {/* btn de enviado */}
                            <div className="btnenviar mt-[30px]  f">
                                <button className="enviar bg-white rounded-full text-[black]  " type="submit" disabled={loading}>
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
import React, { useState } from 'react'
import Button from '../components/Button'
import LOGO from '../assets/LOGO_X.jpeg'
import { useAuthModels } from '../ViewModels/useAuthModels';
import { Navigate, useNavigate } from "react-router-dom";
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
            <div id="overlay" class="overlay">
                <div class="modal">
                    <div className="encabezado " >
                        {/* cerrar ventanita */}
                        <Button label="X" onClick={() => { navigate("/") }} variant="cerrar" type="button" />
                        <img src={LOGO} alt="" className=" h-[30px] w-[30px] mx-[90px] " />
                    </div>
                    <div className="titulo text-[30px]  mt-[40px] ml-[10px] ">
                        <h2 ><strong>Inicia Sesión</strong></h2>
                    </div>
                    <div>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message"></p>}
                        <form onSubmit={onSubmit}>
                            <div className="continps" >

                                <input className="inp"
                                    type="text"
                                    placeholder="Correo"
                                    value={formData.Email}
                                    onChange={(e)=> setFormData({...formData, Email: e.target.value})}

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
                                    onChange={(e)=> setFormData({...formData, Contraseña: e.target.value})}
                                />
                                <span className="contador">
                                    0/8
                                </span>
                            </div>
                            {/* btn de enviado */}
                            <div className="btnenviar mt-[30px]  f">
                                <button className="enviar bg-white rounded-full text-[black]  " type="submit" disabled={loading}>
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

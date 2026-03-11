import React from 'react'
import Button from '../components/Button'
import LOGO from '../assets/LOGO_X.jpeg'
import { Navigate, useNavigate } from "react-router-dom";
export default function VistaInicio() {

    {/*
     const { loading, error, success, handleRegistro } = useAuthModels();
     const [formData, setFormData] = useState({
        Correo: '',
        Contraseña: ''});
    */}
    const navigate = useNavigate(); 

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
                        <form action="" method="post">
                            <div className="continps" >

                                <input className="inp"
                                    type="text"
                                    placeholder="Correo"

                                />
                                <span className="contador">
                                    0/50
                                </span>
                            </div>

                            <div className="continps" >
                                <input className="inp"
                                    type="password"
                                    placeholder="Contraseña"

                                />
                                <span className="contador">
                                    0/8
                                </span>
                            </div>
                            {/* btn de enviado */}
                            {/* <div className="btnenviar mt-[30px]  f">
                                <button className="enviar bg-white rounded-full text-[black]  " type="submit" disabled={loading}>
                                    {loading ? "Iniciando sesion..." : "Iniciar Sesion"}
                                </button>
                            </div> */}
                        </form>

                    </div>


                </div>
            </div>

        </>

    )

}

import React, { useState } from "react";
import { useAuthModels } from "../ViewModels/useAuthModels";
import LOGO from '../assets/LOGO_X.jpeg'
export default function RegistroVista() {

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
            <div className="flex flex-col">
                <div className=" flex h-[600px] ">
                    {/* imagen LOGO X */}
                    <div className=" mt-[300px] ml-[400px] ">
                        <img src={LOGO} alt="" className=" w-[300px] h-[300px] overflow-auto " />
                    </div>
                    {/* text formulario  */}
                    <div className="registro-container  h-dvh  flex flex-col ml-[300px] mt-[80px]  ">
                        <div className=" h-[100px] w-[500px] ">

                            <h1 className=" text-[70px] "><strong>Lo que está pasando ahora</strong> </h1>
                            <br />
                            <h1 className="text-[30px] "><strong>Únete Hoy</strong> </h1>
                        </div>
                        <div className="mt-[200px]  ">

                            <h2 className="text-[20px] ">Registro de Usuario</h2>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">Registro exitoso</p>}
                        </div>
                        <div className=" flex  w-[200px] ">
                            <form onSubmit={onSubmit}>
                                <div className=" mt-[20px] rounded border-1 border-[gray] p-1 ">

                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        value={formData.Nombre}
                                        onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
                                    />
                                </div>
                                <div className=" mt-[20px] rounded border-1 border-[gray] p-1 ">
                                    <input
                                        type="tel"
                                        placeholder="Teléfono"
                                        value={formData.Telefono}
                                        onChange={(e) => setFormData({ ...formData, Telefono: e.target.value })}
                                    />
                                </div>
                                <div className=" mt-[20px] rounded border-1 border-[gray] p-1 ">

                                    <input
                                        type="date"
                                        placeholder="Fecha de Nacimiento"
                                        value={formData.FechaNacimiento}
                                        onChange={(e) => setFormData({ ...formData, FechaNacimiento: e.target.value })}
                                    />
                                </div>
                                <div className=" mt-[20px] rounded border-1 border-[gray] p-1 ">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.Email}
                                        onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                                    />
                                </div>
                                <div className=" mt-[20px] rounded border-1 border-[gray] p-1 ">
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        value={formData.Contraseña}
                                        onChange={(e) => setFormData({ ...formData, Contraseña: e.target.value })}
                                    />
                                </div >

                                <p className=" text-[12px] w-[300px] ">
                                    Al registrarte, aceptas los <a className="text-blue-400 " href="">Términos de servicio</a> y la <a className="text-blue-400 " href="">Política de privacidad</a>, incluida la política de <a className="text-blue-400    " F href="">Uso de Cookies</a>.
                                </p>

                                <div className="mt-[20px] ">
                                    <button className="bg-white rounded-full text-[black] text-[20px] h-[50px] w-[140px] " type="submit" disabled={loading}>
                                        {loading ? "Registrando..." : "Registrar"}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div  >
                    <h1 className=" text-gray-600 text-[12px] w-[100%]  mt-[300px] ml-[80px] ">
                        Información
                        |
                        Descarga la app de X
                        |
                        Grok
                        |
                        Centro de Ayuda
                        |
                        Condiciones de Servicio
                        |
                        Política de Privacidad
                        |
                        Política de cookies
                        |
                        Accesibilidad
                        |
                        Información de anuncios
                        |
                        Blog
                        |
                        Empleos
                        |
                        Recursos para marcas
                        |
                        Publicidad
                        |
                        Marketing
                        |
                        X para empresas
                        |
                        Desarrolladores
                        |
                        Noticias
                        |
                        Configuración
                        |
                        © 2026 X Corp.</h1>
                </div>
            </div>
        </>
    )
}
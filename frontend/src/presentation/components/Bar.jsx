import React from 'react'
import Logo from '../assets/LOGO_X.jpeg'
import Lab from '../assets/tubo.png'
import { RiHome2Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { Navigate, useNavigate } from "react-router-dom";
import Button from './Button';

export default function Bar() {
    const navigate = useNavigate();
    return (
        <>
            {/* barra izquierda */}
            <main className='ml-[20%] mr-[30px]  mt-[30px] w-[200px] '>
                {/* loguito  izq  arriba */}
                <div className='flex flex-col gap-[12px]'>

                    {/* HOME */}
                    <div className='flex items-center gap-[12px]'>
                        <RiHome2Line size={28} />
                        <button className='text-white text-[18px]'>Home</button>
                    </div>

                    {/* EXPLORAR */}
                    <div className='flex items-center gap-[12px]'>
                        <CiSearch size={28} />
                        <button className='text-white text-[18px]'>Explorar</button>
                    </div>

                    {/* NOTIFICACIONES */}
                    <div className='flex items-center gap-[12px]'>
                        <IoNotificationsOutline size={28} />
                        <button className='text-white text-[18px]'>Notificaciones</button>
                    </div>

                    {/* SEGUIR */}
                    <div className='flex items-center gap-[12px]'>
                        <IoPersonAddOutline size={28} />
                        <button className='text-white text-[18px]'>Seguir</button>
                    </div>

                    {/* CHAT */}
                    <div className='flex items-center gap-[12px]'>
                        <LuMail size={28} />
                        <button className='text-white text-[18px]'>Chat</button>
                    </div>

                    {/* CREATOR STUDIO (IMAGEN) */}
                    <div className='flex items-center gap-[12px]'>
                        <img src={Lab} alt="" className='h-[28px] w-[28px]' />
                        <button className='text-white text-[18px]'>Creator Studio</button>
                    </div>

                    {/* X PREMIUM (IMAGEN) */}
                    <div className='flex items-center gap-[12px]'>
                        <img src={Logo} alt="" className='h-[28px] w-[28px]' />
                        <button className='text-white text-[18px]'>Premium</button>
                    </div>

                    {/* PERFIL */}
                    <div className='flex items-center gap-[12px]'>

                        <button className='text-white text-[18px] flex gap-3 ' onClick={() => { navigate("/Perfil") }}>  <IoPersonOutline size={28} />Perfil</button>
                    </div>

                    {/* MÁS OPCIONES */}
                    <div className='flex items-center gap-[12px]'>
                        <SlOptions size={28} />
                        <button className='text-white text-[18px]'>Más opciones</button>
                    </div>

                </div>
            </main>

        </>

    )
}



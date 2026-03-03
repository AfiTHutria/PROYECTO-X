import React from 'react'
import LOGO from '../assets/usuario.png'
import usuario from '../assets/usuario.png'
import chat from '../assets/chat.png'
import share from '../assets/share.png'
import corazon from '../assets/corazon.png'
import barras from '../assets/barras.png'
import marcador from '../assets/marcador.png'
import descargar from '../assets/descargar.png'
export default function Publicacion() {
    return (
        <>
            {/* perfil */}
            <div className=' flex justify-center    rounded border-1 border-gray-700 p-1 '>
                <div className='h-[200px]'>
                    <img src={usuario} alt="" className=' h-[30px] w-[30px] rounded-full mx-[30px]' />
                </div>
                <div className='w-[500px]'>
                    <div className='flex'>
                        <h1>
                            <strong>USUARIO USUARIO</strong>
                        </h1>
                        <h1 className=' text-[gray] '> @USUARIO</h1>
                    </div>
                    <div className=' w-[400px] mt-[20px] ' >
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro asperiores voluptates delectus natus culpa,
                            deleniti illo molestias atque,
                            incidunt magnam itaque maxime nostrum quasi adipisci ex voluptas.
                            Incidunt, numquam consectetur.

                        </p>
                    </div>
                    <div className=' flex gap-[30px] justify-center mt-[20px] mr-[150px] '>
                        <div>
                            <button><img className='w-[15px] h-[15px] ' src={chat} alt="" /></button> 24
                        </div>
                        <div>
                            <button><img className='w-[15px] h-[15px] ' src={share} alt="" /></button> 12
                        </div>
                        <div>
                            <button><img className='w-[15px] h-[15px] ' src={corazon} alt="" /></button> 432
                        </div>
                        <div>
                            <button><img className='w-[15px] h-[15px] ' src={barras} alt="" /></button> 99
                        </div>

                        <div className='flex flex-end ml-[20px] '>
                            <button> <img className=' w-[15px] h-[15px] ' src={descargar} alt="" /> </button>
                            <button> <img className=' w-[15px] h-[15px] ' src={marcador} alt="" /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

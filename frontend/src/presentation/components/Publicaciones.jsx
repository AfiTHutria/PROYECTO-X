import React from 'react'
import LOGO from '../assets/usuario.png'
import foto from '../assets/marco-de-la-foto.png'
import gif from '../assets/gif.png'
import menu from '../assets/menu-puntos.png'
import emoji from '../assets/sonreir.png'
export default function Publicaciones() {
    return (
        <>
            <div className=' w-[650px] mt-[20px] rounded border-1  border-gray-700 p-1'>
                {/* orden dee publicaciones */}
                <div className='text-white '>
                    <button className=' w-[50%] text-[20px]  rounded border-1  border-gray-700 p-1'>  For You</button>
                    <button className='w-[50%] text-[20px] rounded border-1  border-gray-700p-1'>   Following</button>
                </div>
                {/* forulario de post */}
                <div class="composer flex  ">
                    <img src={LOGO} alt="" className='mt-[20px] ml-[20px] mr-[20px] h-[30px] w-[30px] rounded-full ' />

                    <div class="content mt-[20px]  ">
                        <textarea placeholder="What’s happening?" maxlength="280"></textarea>

                        <div class="actions gap-[10px] flex ">
                            <div class="icons gap-5 ">
                                <button className='mx-[8px] ' ><img className=' w-[25px] h-[25px] ' src={foto} alt="" /></button>
                                <button className='mx-[8px] ' ><img className=' w-[25px] h-[25px] ' src={gif} alt="" /></button>
                                <button className='mx-[8px] ' ><img className=' w-[25px] h-[25px] ' src={menu} alt="" /></button>
                                <button className='mx-[8px] ' ><img className=' w-[25px] h-[25px] ' src={emoji} alt="" /></button>


                            </div>

                            <button className='mt-[10px] text-[Black] ml-[270px]  border-gray-700 rounded-full h-[40px] w-[70px]'>Post</button>
                        </div>
                    </div>
                </div>
                <div>

                </div>

            </div>
        </>
    )
}

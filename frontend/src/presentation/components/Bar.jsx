import React from 'react'
import Logo from '../assets/LOGO_X.jpeg'

export default function Bar() {
    return (
        <>
        {/* barra izquierda */}
            <main className='ml-[20%] mr-[30px]  mt-[30px] w-[200px] '>
{/* loguito  izq  arriba */}
                <img src={Logo} alt="" className=' h-[20px]  w-[20px] mb-[20px]' />
{/*  */}
                <div className=' flex flex-col flex-start text-[20px] font-stretch-extra-condensed gap-[10px] '>
                    <div className=' flex flex-start text-[20px] font-stretch-extra-condensed items-center gap-[10px]  '>
                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]' />
                        <button className='text-[white] h-[70px] w-[130px] text-left '>
                            Home
                        </button>
                    </div>

                    <div className=' flex  flex-start text-[20px] font-stretch-extra-condensed  items-center gap-[10px]'>
                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]' />
                        <button className='text-[white]  h-[70px] w-[130px]text-left'>
                            Explore
                        </button>
                    </div>

                    <div className=' flex  flex-start text-[20px] font-stretch-extra-condensed  items-center gap-[10px] '>
                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]' />
                        <button className='text-[white]  h-[70px] w-[130px] text-left'>
                            Follow
                        </button>
                    </div>


                    <div className=' flex  flex-start text-[20px] font-stretch-extra-condensed  items-center   gap-[10px]'>

                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]  ' />
                        <button className='text-[white]  h-[70px] w-[130px]text-left'>
                            Chat
                        </button>
                    </div>

                    <div className=' flex  flex-start text-[20px] font-stretch-extra-condensed items-center  gap-[10px]  '>
                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]' />
                        <button className=' text-[white]  h-[70px] w-[130px]text-left'>
                            Creator Studio
                        </button>
                    </div>

                    <div className=' flex  flex-start text-[20px] font-stretch-extra-condensed items-center  gap-[10px]'>
                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]' />
                        <button className='text-[white]  h-[70px] w-[130px]text-left'>
                            Premiun
                        </button>
                    </div>

                    <div className=' flex flex-start text-[20px] font-stretch-extra-condensed items-center  gap-[10px]'>
                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]' />
                        <button className='text-[white]  h-[70px] w-[130px]text-left'>
                            Profile
                        </button>
                    </div>


                    <div className=' flex  flex-start text-[20px] font-stretch-extra-condensed  items-center  gap-[10px]'>
                        <img src={Logo} alt="" className=' h-[20px]  w-[20px]' />
                        <button className='text-[white]  h-[70px] w-[130px]text-left'>
                            More
                        </button>
                    </div>
                </div>
                <div className='mt-[30px]'>
                    <button>
                        <button className='text-[black] bg-white rounded-full h-[70px] w-[200px]' >Post</button>
                    </button>
                </div>
{/* boton  postear */}
                <div className=' mt-[40px]' >
                    <button  className='  text-white flex items-center h-[70px]w[200px] gap-[10px]'>
                        <img src={Logo} alt="" className=' h-[30px]  w-[30px] rounded-full' />
                        {/* usuario izq abajo */}
                        <div>
                            <h1>  usuario  nombre</h1>
                            <p>@usuarioX</p>
                        </div>

                    </button>
                </div>
            </main>

        </>
    )
}

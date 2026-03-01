import React from 'react'
import LOGO from '../assets/LOGO_X.jpeg'
export default function Publicacion() {
    return (
        <>
            {/* perfil */}
            <div className=' flex justify-center    rounded border-1 border-[gray] p-1 '>
                <div className='h-[200px]'>
                    <img src={LOGO} alt="" className=' h-[30px] w-[30px] rounded-full mx-[10px]:' />
                </div>
                <div className='w-[500px]'>
                    <h1>
                        USUARIO USUARIO @USUARIO
                    </h1>

                    <div className=' w-[400px]' >
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro asperiores voluptates delectus natus culpa,
                            deleniti illo molestias atque,
                            incidunt magnam itaque maxime nostrum quasi adipisci ex voluptas.
                            Incidunt, numquam consectetur.

                        </p>
                    </div>
                    <div className=' flex gap-[30px] justify-center  '>
                        <div>
                            <button>🌐</button> 24
                        </div>
                        <div>
                            <button>🌐</button> 12
                        </div>
                        <div>
                            <button>🌐</button> 432
                        </div>
                        <div>
                            <button>🌐</button> 99
                        </div>
                        <div>
                            <button>🌐</button> 999
                        </div>


                        <div className='flex flex-end'>
                            <button>🌐</button>
                            <button>🌐</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

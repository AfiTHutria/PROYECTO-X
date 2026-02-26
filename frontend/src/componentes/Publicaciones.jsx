import React from 'react'
import LOGO from '../assents/LOGO_X.jpeg'
export default function Publicaciones() {
    return (
        <>
            <div className=' w-[650px] mt-[20px] rounded border-1 border-[gray] p-1'>
                {/* orden dee publicaciones */}
                <div className='text-white '>
                    <button className=' w-[50%] text-[20px]  rounded border-1 border-[gray] p-1'>  For You</button>
                    <button className='w-[50%] text-[20px] rounded border-1 border-[gray] p-1'>   Following</button>
                </div>
                {/* forulario de post */}
                <div class="composer flex m">
                    <img src={LOGO} alt="" className='mt-[20px] ml-[20px]  h-[30px] w-[30px] rounded-full mx-[10px]:' />

                    <div class="content mt-[20px]  ">
                        <textarea placeholder="What’s happening?" maxlength="280"></textarea>

                        <div class="actions gap-[10px] flex ">
                            <div class="icons gap-[10px]">
                                <i class="fa-regular fa-image">🌐</i>
                                <i class="fa-solid fa-gift">🌐</i>
                                <i class="fa-solid fa-chart-simple">🌐</i>
                                <i class="fa-regular fa-face-smile">🌐</i>
                                <i class="fa-regular fa-calendar">🌐</i>
                                <i class="fa-solid fa-location-dot">🌐</i>
                            </div>

                            <button className='mt-[10px] text-[Black] ml-[300px] bg-[gray] rounded-full h-[40px] w-[70px]'>Post</button>
                        </div>
                    </div>
                </div>
                <div>

                </div>

            </div>
        </>
    )
}

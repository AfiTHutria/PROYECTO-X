
import styles from '../components/avisos.module.css'
export default function Avisos() {
    return (
        <>
            <div className=''>

                <div className='h-[50px] w-[300px] ml-[50px] text-white  rounded border-1 border-[gray] p-1'>
                    <input type="text" placeholder="🔍Search" maxLength="280" />
                </div>
                <div className={styles.scroll} >




                    <div className=' w-[300px] rounded border-1 border-[gray] p-1 p-[20px] '>
                        <h1>
                            Subscribe to Premium
                            <strong>50% off</strong>
                        </h1>
                        <p>
                            Get rid of ads, see your analytics, boost your replies and unlock 20+ features.
                        </p>
                        <button className=' bg-blue-400  h-[35px] w-[100px] rounded-full mt-[10px] ' > <strong>Subscribe</strong> </button>
                    </div>




                    <div className='w-[300px]  rounded border-1 border-[gray] p-1 p-[20px] mt-[20px] '>
                        <h1>
                            Today’s News
                        </h1>
                        <div className=' overflow-auto m-[15px] '>

                            <h2>Tangkwa and Nur Charm Fans in Baby Bright TikTok Live</h2>
                            <br />

                            <p>
                                2 days ago · Entertainment · 13.2K posts</p>
                        </div>
                        <div className=' overflow-auto m-[15px] '>

                            <h2>Tangkwa and Nur Charm Fans in Baby Bright TikTok Live</h2>
                            <br />
                            <p>
                                2 days ago · Entertainment · 13.2K posts</p>
                        </div>
                        <div className=' overflow-auto m-[15px] '>

                            <h2>Tangkwa and Nur Charm Fans in Baby Bright TikTok Live</h2>
                            <br />
                            <p>
                                2 days ago · Entertainment · 13.2K posts</p>
                        </div>

                    </div>

                    <div className='w-[300px]  rounded border-1 border-[gray] p-1 p-[20px] mt-[20px] '>
                        <h1>
                            Today’s News
                        </h1>
                        <div className=' overflow-auto m-[15px] '>

                            <h2>Tangkwa and Nur Charm Fans in Baby Bright TikTok Live</h2>
                            <br />

                            <p>
                                2 days ago · Entertainment · 13.2K posts</p>
                        </div>
                        <div className=' overflow-auto m-[15px] '>

                            <h2>Tangkwa and Nur Charm Fans in Baby Bright TikTok Live</h2>
                            <br />
                            <p>
                                2 days ago · Entertainment · 13.2K posts</p>
                        </div>
                        <div className=' overflow-auto m-[15px] '>

                            <h2>Tangkwa and Nur Charm Fans in Baby Bright TikTok Live</h2>
                            <br />
                            <p>
                                2 days ago · Entertainment · 13.2K posts</p>
                        </div>

                    </div>

                </div>


            </div>
        </>
    )
}

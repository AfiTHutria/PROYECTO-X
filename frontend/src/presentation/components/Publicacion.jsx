import './publicacion.module.css'
import Button from './Button';
import {Heart, RepeatAlt, MessageCircleReply, BarChart, Bookmark, ArrowFromBottom} from '@boxicons/react';
import styles from './publicacion.module.css'

export default function Publicacion() {
    




    return (
        <div className={styles.cajadepublicacion}>

            <div className={styles.perfil}>
                <img src="https://pbs.twimg.com/profile_images/1616598736094417920/1n9s8XoL_400x400.jpg" alt="Foto de perfil" className={styles.fotodeperfil} />
                <div className={styles.nombreusuario}>
                    <p><strong>Usuario</strong></p>
                    <p>@usuario</p>
                </div>
            </div>
            
            <section className={styles.texto}>
                <p>hola </p>
            </section>

            <section className={styles.icons}>
                <div>
                    <Button label= {<Heart className={styles.like}/>} type= "button" onClick={() => { navigate("/registro") }} variant='like' styles={styles} />
                </div>
                <div>
                    <Button label= {<RepeatAlt className={styles.repost}/>} type= "button" onClick={() => { navigate("/registro") }} variant='btrepost' styles={styles} />
                </div>
                <div>
                    <Button label= {<MessageCircleReply className='reply'/>} type= "button" onClick={() => { navigate("/registro") }} variant='reply' styles={styles} />
                </div>
                <div>
                    <Button label= {<BarChart className='chart'/>} type= "button" onClick={() => { navigate("/registro") }} variant='chart' styles={styles} />
                </div>
                <div>
                    <Button label= {<Bookmark className='bookmark'/>} type= "button" onClick={() => { navigate("/registro") }} variant='bookmark' styles={styles} />
                </div>
                <div>
                    <Button label= {<ArrowFromBottom className='share'/>} type= "button" onClick={() => { navigate("/registro") }} variant='share' styles={styles} />
                </div>
            </section>
        </div>
        
         
    )
}

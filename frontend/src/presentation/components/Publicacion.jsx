import './publicacion.css'
import Button from './Button';
import like from "../assets/corazon.png";
import {Heart, CartPlus} from '@boxicons/react';

export default function Publicacion() {
    




    return (
        <div>
            <div>
            <Button label= {<Heart className='like'/>} type= "button" onClick={() => { navigate("/registro") }} variant='like' />
            </div>
            <div>
            <Button label= {<CartPlus className='cart'/>} type= "button" onClick={() => { navigate("/registro") }} variant='comment' />
            </div>
        </div>
        
         
    )
}

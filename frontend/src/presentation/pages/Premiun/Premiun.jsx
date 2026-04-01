
import Styles from '../Premiun/Premiun.module.css'

import Button from '../../components/ui/Button'


import foot from '../../assets/images/footer.jpeg'



import { FaRegCheckCircle } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { TbBubbleText } from "react-icons/tb";
import { GrArticle } from "react-icons/gr";
import { FaMoneyBill } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function
    () {
    const navigate = useNavigate();
    return (
        <>
            <div>
                {/* fondo esstrellas */}
                <div className={Styles.Fondo}>
                    <Button
                        label="X"
                        onClick={() => navigate('/Home')}
                        variant='atras'
                        styles={Styles}
                        type="button"
                        title="atras"

                    />
                    <div className={Styles.texto}>
                        <h1>
                            <strong>
                                Don’t lose your 50% discount on Premium
                            </strong>
                        </h1>
                    </div>
{/* boton mensual */}
                    <div className={Styles.fondobtn}>
                        <Button
                            label="Monthly"
                            onClick={() => navigate('/Home')}
                            variant='mensual'
                            styles={Styles}
                            type="button"
                            title="mes"
                        />
                    </div>

                </div>
                <div className={Styles.contenido}>

                    <div className={Styles.tarjetas}>
{/* tarjeta izquierda */}
                        <div className={Styles.tarjeta} >
                            <div className={Styles.encabezadoTarjeta}>
                                <div className={Styles.textoencabezado}>
                                    <h1>
                                        Basic
                                    </h1>



                                </div>

                                <div className={Styles.precio}>
                                    <h2><strong>COP 8,500</strong> </h2>
                                    <p>/ month </p>
                                </div>



                                <div className={Styles.textocontenido}>

                                    <h1><FaRegCheckCircle /> Verified Checkmarck</h1>
                                    <h1><IoBarChart /> Advance Analytics</h1>
                                    <h1><FaStar /> Less ads in yourfeeds   </h1>
                                    <h1><TbBubbleText /> Boosted replies  </h1>
                                    <h1><GrArticle /> write articles</h1>
                                    <h1><FaMoneyBill /> get paid to post</h1>

                                </div>

                            </div>

                        </div>
                        {/* tarjeta medio */}
                        <div className={Styles.tarjeta} >
                            <div className={Styles.encabezadoTarjeta}>
                                <div className={Styles.textoencabezado}>
                                    <h1>
                                        Premiun
                                    </h1>

                                    <p className={Styles.descuento}><strong>50</strong>% off for 2 months</p>

                                </div>

                                <div className={Styles.precio}>
                                    <h2><strong>COP 10,500</strong></h2>
                                    <p>/ month </p>
                                </div>
                                <p>Everything in a premiun basic,and </p>
                                <div className={Styles.textocontenido}>

                                    <h1><FaRegCheckCircle /> Verified Checkmarck</h1>
                                    <h1><IoBarChart /> Advance Analytics</h1>
                                    <h1><FaStar /> Less ads in yourfeeds   </h1>
                                    <h1><TbBubbleText /> Boosted replies  </h1>
                                    <h1><GrArticle /> write articles</h1>
                                    <h1><FaMoneyBill /> get paid to post</h1>

                                </div>
                            </div>

                        </div>



                        {/* tarjeta derecha */}
                        <div className={Styles.tarjeta} >
                            <div className={Styles.encabezadoTarjeta}>
                                <div className={Styles.textoencabezado} >
                                    <h1>
                                        Premiun
                                    </h1>

                                    <p className={Styles.descuento}><strong>50</strong>% off for 2 months</p>

                                </div>
                                <div className={Styles.precio}>
                                    <h2><strong>COP 82,500</strong></h2>

                                    <p>/ month </p>
                                </div>
                                <p>Everything in a premiun basic,and </p>
                                <div className={Styles.textocontenido}>

                                    <h1><FaRegCheckCircle /> Verified Checkmarck</h1>
                                    <h1><IoBarChart /> Advance Analytics</h1>
                                    <h1><FaStar /> Less ads in yourfeeds   </h1>
                                    <h1><TbBubbleText /> Boosted replies  </h1>
                                    <h1><GrArticle /> write articles</h1>
                                    <h1><FaMoneyBill /> get paid to post</h1>

                                    <img src={foot} alt="" />
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div >
        </>
    )
}

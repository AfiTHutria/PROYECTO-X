
import styles from '../components/VIP.module.css'
import Button from '../components/Button'
import LOGO from '../assets/LOGO_X.jpeg'
import { Navigate, useNavigate } from "react-router-dom";

export default function Vistaperfil() {
    const navigate = useNavigate();
    return (
        <>
            <div
                className
                ={styles.padre} >


                <div
                    className=
                    {styles.encabezado}>

                    <Button

                        label="←"
                        onClick={() => { navigate("/Home") }}
                        variant="atras"
                        type="button"
                        title="atras"
                    />

                    <div
                        className=
                        {styles.usuario}>
                        <h1 className=
                            {styles.nombre_usuario}>
                            <strong>
                                NOT ARDR"USUARIO"
                            </strong>
                        </h1>
                        <p className=
                            {styles.num_post}>
                            0POST "NUMERO DE POST"
                        </p>
                    </div>

                    <Button

                        label="🔍"
                        onClick={() => { navigate("/Home") }}
                        variant="buscar"
                        type="button"
                        title="buscar"
                    />
                </div>


                <div className={styles.rela} >

                    <div className={styles.fondo_perfil}></div>

                    <img className={styles.Foto_perfil} src={LOGO} alt="" />

                </div>
                <div className={styles.datos}>
                    <h1 className=
                        {styles.nombre_usuario}>
                        <strong>
                            NOT ARDR"USUARIO"
                        </strong>
                    </h1>
                    <p className={styles.text}>@usauarrio</p>
                    <p className={styles.text} > 📅 Joined to  00 / 00 / 0000</p>

                    <div className={styles.sequito}>
                        <p>1 Following</p>
                        <p>0 Followers</p>
                    </div>
                </div>

            </div>
        </>
    )
}

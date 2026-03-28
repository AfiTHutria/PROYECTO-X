
import Button from '../components/Button'
import styles from '../components/EstiloPubli.module.css'
import LOGO from '../assets/LOGO_X.jpeg'
export default function Publicaciones() {
    return (
        <>
            <div className={styles.caja_post}>
                {/* botones de follow y for you */}
                <div className={styles.contenedor_bnt}>
                    <Button
                        label="For you"
                        onClick={() => { navigate("/") }}
                        variant="fy"
                        type="button"
                        title="fy"

                    />
                    <Button
                        label="Following"
                        onClick={() => { navigate("/") }}
                        variant={styles.fy}
                        type="button"
                        title="follow"

                    />
                </div>
                {/* form */}

                <div className={styles.contenedor_form}>

                    <div className={styles.formulario}>

                        <img className={styles.foto_perfil} src={LOGO} alt="" />
                        <form action="post">
                            <input className={styles.inp}
                                type="text"
                                placeholder="what's happening?"
                            /*value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}*/

                            />
                        </form>
                    </div>
                </div>
                <div>
                    <Button
                        label="post"
                        onClick={() => { navigate("/") }}
                        variant={styles.fy}
                        type="button"
                        title="follow"

                    />
                </div>
            </div>
        </>
    )
}

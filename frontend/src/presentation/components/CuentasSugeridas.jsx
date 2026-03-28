import React from 'react'
import styles from '../components/VIP.module.css'
import LOGO from '../assets/LOGO_X.jpeg'
import Button from '../components/Button'
export default function CuentasSugeridas() {
    return (
        <>
            <div className={styles.padreC}>
                <input className={styles.inp}
                    type="text"
                    placeholder="🔍 Search"
                /*value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}*/
                />


                <div className={styles.cuentas}>
                    {/* esta es el icono indivudual */}
                    <h1 className={styles.titulo}>
                        <strong>
                            You might like
                        </strong>
                    </h1>
                    <div className={styles.cuenta}>

                        <img className={styles.Perfil_Usuario_Sug} src={LOGO} alt="" />

                        <div className={styles.Datos_Cuenta_Sug}>
                            <h3>Cuenta</h3>
                            <p>@cuenta</p>

                        </div>
                        <Button
                            label="Follow"
                            onClick={() => { navigate("/") }}
                            variant={styles.x}
                            type="button"
                            title="follow"
                        />
                    </div>
                    <div className={styles.cuenta}>

                        <img className={styles.Perfil_Usuario_Sug} src={LOGO} alt="" />

                        <div className={styles.Datos_Cuenta_Sug}>
                            <h3>Cuenta</h3>
                            <p>@cuenta</p>

                        </div>
                        <Button
                            label="Follow"
                            onClick={() => { navigate("/") }}
                            variant={styles.x}
                            type="button"
                            title="follow"
                        />
                    </div>
                    <div className={styles.cuenta}>

                        <img className={styles.Perfil_Usuario_Sug} src={LOGO} alt="" />

                        <div className={styles.Datos_Cuenta_Sug}>
                            <h3>Cuenta</h3>
                            <p>@cuenta</p>

                        </div>
                        <Button
                            label="Follow"
                            onClick={() => { navigate("/") }}
                            variant={styles.x}
                            type="button"
                            title="follow"
                        />
                    </div>
                </div>
                <p className={styles.terminos}>Terms of Service
                    |
                    Privacy Policy
                    |
                    Cookie Policy
                    |
                    Accessibility
                    |
                    Ads info
                    |

                    More
                    © 2026 X Corp.</p>

            </div>
        </>
    )
}

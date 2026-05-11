import React from "react";
import styles from "./CuentasSugeridas.module.css"; // Apuntando al nuevo archivo
import LOGO from '../../../../assets/images/LOGO_X.jpeg'
import Button from '../../../ui/Button'
import { useNavigate } from "react-router-dom";
import { UsuarioRepository } from "../../../../../infrastructure/repositories/UsuarioRepository";
export default function CuentasSugeridas() {
  const navigate = useNavigate();

  return (
    
    <aside className={styles.padreC}>
      <input className={styles.inp} type="text" placeholder="🔍 Search" />

      <div className={styles.cuentas}>
        <h1 className={styles.titulo}>
          <strong>You might like</strong>
        </h1>

        {/* Ejemplo de Cuenta 1 */}
        <div className={styles.cuenta}>
          <img className={styles.Perfil_Usuario_Sug} src={LOGO} alt="User" />
          <div className={styles.Datos_Cuenta_Sug}>
            <h3>Cuenta</h3>
            <p>@cuenta</p>
          </div>
          <Button
            label="Follow"
            onClick={() => navigate("/")}
            variant="x"
            styles={styles}
            type="button"
          />
        </div>

        {/* Repetir para más cuentas... */}
      </div>

      <p className={styles.terminos}>
        Terms of Service | Privacy Policy | Cookie Policy | Accessibility | Ads
        info | More © 2026 X Corp.
      </p>
    </aside>
  );
}

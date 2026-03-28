
import Vistaperfil from '../components/Vistaperfil.jsx'
import CuentasSugeridas from '../components/CuentasSugeridas.jsx'
import Bar from '../components/Bar.jsx';
import "../pages/Fondopaginas.css";
export default function Perfil() {
    return (
        <>
            <div className="fondo flex">
                <Bar></Bar>
                <div >
                    <Vistaperfil></Vistaperfil>

                </div>

                <CuentasSugeridas></CuentasSugeridas>

            </div>

        </>
    )
}

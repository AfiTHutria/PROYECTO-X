import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
/*paginas de registro/login */
import Registro from "../presentation/pages/Auth/Registro";
import Inicio from "../presentation/pages/Auth/Inicio";
import Login from "../presentation/pages/Auth/Login";
import ResetPassword from "../presentation/pages/Auth/ResetPassword";
/*paginas de home y barra*/

import Home from "../presentation/pages/Home";
import Perfil from "../presentation/pages/perfil/Perfil";
import Premiun from "../presentation/pages/Premiun/Premiun";


export default function AppRoutes() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
        <>
            <Routes location={background || location}>

                <Route path="/" element={<Inicio></Inicio>} />
                <Route path="/home" element={<Home></Home>} />
                <Route path="/registro" element={<Registro></Registro>} />
                <Route path="/reset" element={<ResetPassword></ResetPassword>} />

                {/* Separacion inicio sesion / home de pagina */}

                <Route path="/login" element={<Login></Login>} />
                <Route path="/perfil" element={<Perfil> </Perfil>} />
                <Route path="/Premiun" element={<Premiun />} > </Route>

            </Routes>

            {background && (
                <Routes>
                    {/* elementos que se usan en sobreposicion (uselocation (HOOKREACT)) */}
                    <Route path="/reset" element={<ResetPassword></ResetPassword>} />
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/registro" element={<Registro></Registro>} />
                </Routes>
            )}
        </>
    );
}


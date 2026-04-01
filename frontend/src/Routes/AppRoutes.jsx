import { Routes,Route,useNavigate,useLocation } from "react-router-dom";
import Home from "../presentation/pages/Home";
import Registro from "../presentation/pages/Auth/Registro";
import Inicio from "../presentation/pages/Auth/Inicio";
import Login from "../presentation/pages/Auth/Login";
import Perfil from "../presentation/pages/perfil/Perfil";
import ResetPassword from "../presentation/pages/Auth/ResetPassword";

export default function AppRoutes() {
    const location= useLocation();
    const background= location.state && location.state.background;
    return(
        <>
        <Routes location={ background || location}>
            <Route path="/" element= {<Inicio></Inicio>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="/perfil" element= {<Perfil> </Perfil>}/>
            <Route path="/reset"  element={<ResetPassword></ResetPassword>}/>
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/registro" element={<Registro></Registro>}/>
        </Routes>    
        
        {background && (
            <Routes>
                <Route path="/reset"  element={<ResetPassword></ResetPassword>}/>
                <Route path="/login" element={<Login></Login>}/>
                <Route path="/registro" element={<Registro></Registro>}/>
            </Routes>
        )}
        </>
    );
}


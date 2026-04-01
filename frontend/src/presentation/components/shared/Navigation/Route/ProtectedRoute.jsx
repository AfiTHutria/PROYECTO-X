import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../../../contexts/AuthContext.jsx";
import LoadingScreen from "../../../ui/Spinners/LoadingScreen.jsx";

export const ProtectedRoute = () => {
    const { user, isCheckingSession } = useAuth();

    // ESCENARIO A: La app está hablando con el backend (Mostramos el loading o nada)
    if (isCheckingSession) {
      return <LoadingScreen />; // Aquí podrías poner <LoadingScreen /> si no lo pusiste en el Context
    }

    // ESCENARIO B: Ya terminó de cargar y NO hay información de user (EL "VACÍO")
    if (!user) {
        console.log("No hay info de usuario, redirigiendo...");
        return <Navigate to="/" replace />; 
    }

    // ESCENARIO C: Hay información de user
    return <Outlet />;
};
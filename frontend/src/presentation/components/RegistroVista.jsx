import React, {useState} from "react";
import { useAuthModels } from "../ViewModels/useAuthModels";

export default function RegistroVista() {

    const { loading, error, success, handleRegistro } = useAuthModels();
    const [formData, setFormData] = useState({
        Nombre: '',
        Telefono: '',
        FechaNacimiento: '',
        Email: '',
        Contraseña: ''  
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleRegistro(formData);
    } 

    return (
        <div className="registro-container">
            <h2>Registro de Usuario</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Registro exitoso</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.Nombre}
                    onChange={(e) => setFormData({...formData, Nombre: e.target.value})}
                />
                <input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.Telefono}
                    onChange={(e) => setFormData({...formData, Telefono: e.target.value})}
                />
                <input
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    value={formData.FechaNacimiento}
                    onChange={(e) => setFormData({...formData, FechaNacimiento: e.target.value})}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.Email}
                    onChange={(e) => setFormData({...formData, Email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={formData.Contraseña}
                    onChange={(e) => setFormData({...formData, Contraseña: e.target.value})}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </div>
    )
}
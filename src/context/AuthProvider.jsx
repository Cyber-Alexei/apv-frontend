import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios.jsx";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();


const AuthProvider = (props) => {

    const navigate = useNavigate();

    const [cargando, setCargando] = useState(true);
    const [usuariosAuth, setUsuariosAuth] = useState({});

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    //////////// Función al iniciar sesión ///////////////////////////////////////
    const usuarioAutenticado = async () => {
        console.log('se ejecuta usuarioAutenticado')
        const usuarioToken = localStorage.getItem('token-sesion-iniciada');

        if (!usuarioToken) {
            setCargando(false);
            console.log('NO SE ECONTRÓ EL TOKEN');
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${usuarioToken}`
            }
        }

        try {
            const {data} = await clienteAxios('/api/veterinarios/perfil', config)
            setUsuariosAuth(data); // Data de Axios es un objeto
            
            setCargando(false);
            
        } catch (error) {
            console.log(error.response.data.msg);
            setUsuariosAuth({});
        }
        navigate('/admin');
    }
    //////////////////////////////////////////////////////////////

    const cerrarSesion = () => {
        // Remover token de sesión iniciada de localStorage
        localStorage.removeItem('token-sesion-iniciada');
        // Vaciar el objeto con el usuario iniciado 
        setUsuariosAuth({});
    }

    const actualizarPerfil = async (datos) => {
        const usuarioToken = localStorage.getItem('token-sesion-iniciada');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${usuarioToken}`
            }
        }
        
        try {

            const {data} = await clienteAxios.put(`/api/veterinarios/perfil/${datos._id}`, datos, config);

            if (data._id) {
                setUsuariosAuth(data);
                return data; // Veterinario actualizado
                
            } else {
                return data; // Respuesta JSON 'msg'
            }
            
        } catch (error) {
            return error.response.data; // Respuesta ojeto con 'msg'
        }
    }

    const guardarPassword = async (datos) => {
        const usuarioToken = localStorage.getItem('token-sesion-iniciada');
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${usuarioToken}`
            }
        }

        try {
            const {data} = await clienteAxios.put('/api/veterinarios/actualizar-password', datos, config)
            return data;
            
        } catch (error) {
            return error.response.data;
            
        }
    }


    const {children} = props;
    return (
        <AuthContext.Provider
            value={{usuariosAuth, setUsuariosAuth, cargando, setCargando, cerrarSesion, actualizarPerfil, guardarPassword, usuarioAutenticado}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;



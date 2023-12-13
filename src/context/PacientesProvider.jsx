import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const [perfil, setPerfil] = useState(true);

    useEffect(() => {
        obtenerPacientes();
    }, [])

    ///////////////////// Función para obtener los pacientes ////////////////
    const obtenerPacientes = async () => {
        try {
            const usuarioToken = localStorage.getItem('token-sesion-iniciada');
            if (!usuarioToken) return;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usuarioToken}`
                }
            }
            const {data} = await clienteAxios('/pacientes', config);
            setPacientes(data);

        } catch (error) {
            console.log(error);
        }
    }
    ////////////////////////////////////////////////////////////////////////

    const guardarPaciente = async (paciente) => {

        const usuarioToken = localStorage.getItem('token-sesion-iniciada');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${usuarioToken}`
            }
        }

        if (paciente.id) {
            // Actualizar paciente ya registrado
            try {
                const id = paciente.id;
                const {data} = await clienteAxios.put(`/pacientes/${id}`, paciente, config);
                const pacientesActualizados = pacientes.map((pacienteState) => (
                    pacienteState._id === data.pacienteGuardado._id ? data.pacienteGuardado : pacienteState
                ))
                setPacientes(pacientesActualizados);
                
            } catch (error) {
                console.log(error);
            }

        } else {
            // Guardar paciente nuevo
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config);
                const {__v, updatedAt, ...pacienteGuardado} = data;
                setPacientes([pacienteGuardado, ...pacientes]);
    
            } catch (error) {
                console.log(error)
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (paciente) => {
        
        const confirmar = confirm(`¿Deseas eliminar al paciente ${paciente.nombre}?`);

        if (confirmar) {

            const usuarioToken = localStorage.getItem('token-sesion-iniciada');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usuarioToken}`
                }
            }

            try {
                const {data} = await clienteAxios.delete(`/pacientes/${paciente._id}`, config);
                console.log(data)

                const pacientesActualizados = pacientes.filter((pacienteState) => (
                pacienteState._id !== paciente._id
                ))
                setPacientes(pacientesActualizados);

            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <PacientesContext.Provider
        value={{pacientes, guardarPaciente, setEdicion, paciente, eliminarPaciente, perfil, setPerfil, obtenerPacientes}}
    >
        {children}
    </PacientesContext.Provider>
  )
}

export {
    PacientesContext,
    PacientesProvider
}
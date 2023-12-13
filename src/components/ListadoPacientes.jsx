import usePacientes from "../hooks/usePacientes.jsx";
import Paciente from "./Paciente.jsx";

const ListadoPacientes = () => {
    const {pacientes} = usePacientes();
    
  return (
    <>
        {pacientes.length ? 
            <>
                <h2 className="font-black text-md text-center uppercase">Listado de pacientes</h2>
                <p className="text-sm text-center font-bold tracking-wide text-gray-400">Sigue administrando <span className="text-indigo-600 font-bold">a tus pacientes!</span></p>

                {pacientes.map((paciente) => (
                    <Paciente 
                        key={paciente._id}
                        paciente={paciente}
                    />
                ))}

            </> 
            : 
            <>
                <h2 className="font-bold text-md text-center">No hay pacientes</h2>
                <p className="text-sm text-center font-bold tracking-wide text-gray-400">Comienza agregando tus pacientes <span className="text-indigo-600 font-bold">y aparecerán en este lugar...</span></p>
            </>
        }
    </>
  )
}

export default ListadoPacientes
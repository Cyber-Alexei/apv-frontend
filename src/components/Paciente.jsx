import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente;
    const {setEdicion, eliminarPaciente} = usePacientes();

    const formatearFecha = (fecha) => {
        // Convertir formato fecha a formato fecha JS
        const fechaEnJS = new Date(fecha);
        // Utilizar API de JS 'Intl' (internacionalización y localización)
        const nuevaFecha = fechaEnJS.toLocaleDateString('es-MX', {dateStyle: 'long', timeZone: 'UTC'})
        return nuevaFecha;
    }

  return (
    <div className="my-5 mx-5 py-2 px-5 bg-white shadow-sm border rounded-lg">
        <div className="rounded-xl border my-2 bg-gray-50 p-2">
            <p className="font-bold text-sm text-indigo-600">Nombre:</p>
            <p>{nombre}</p>
        </div>
        <div className="rounded-xl border my-2 bg-gray-50 p-2">
            <p className="font-bold text-sm text-indigo-600">Propietario:</p>
            <p>{propietario}</p>
        </div>
        <div className="rounded-xl border my-2 bg-gray-50 p-2">
            <p className="font-bold text-sm text-indigo-600">Fecha:</p>
            <p>{formatearFecha(fecha)}</p>
        </div>
        <div className="rounded-xl border my-2 bg-gray-50 p-2">
            <p className="font-bold text-sm text-indigo-600">Síntomas:</p>
            <p>{sintomas}</p>
        </div>
        <div className="rounded-xl border my-2 bg-gray-50 p-2 break-words">
            <p className="font-bold text-sm text-indigo-600">Email:</p>
            <p>{email}</p>
        </div>
        <div className="rounded-xl border my-2 bg-gray-50 p-2 break-words">
            <p className="font-bold text-sm text-indigo-600">Id:</p>
            <p>{_id}</p>
        </div>
        <div className="flex flex-wrap border border-gray-300 justify-center bg-gray-200 rounded-xl px-5 h-auto py-2 w-auto gap-2">
            <button onClick={() => (setEdicion(paciente))} className="bg-indigo-600 text-white text-sm hover:bg-indigo-500 min-w-[90px] w-[100px] font-bold tracking-wider py-1 rounded-2xl transition duration-500 mx-2">
                Editar
            </button>
            <button onClick={() => (eliminarPaciente(paciente))} className="bg-red-500 text-white text-sm hover:bg-red-400 min-w-[90px] w-[100px] font-bold tracking-wider py-1 rounded-2xl transition duration-500 mx-2">
                Eliminar
            </button>
        </div>
    </div>
  )
}

export default Paciente
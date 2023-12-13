import { useState, useEffect } from "react";
import usePacientes from "../hooks/usePacientes.jsx";

import Alerta from "./Alerta.jsx"

const Formulario = () => {
    // Context hook
    const {guardarPaciente, paciente} = usePacientes();
    
    // States Hooks
    const [mascota, setMascota] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [alert, setAlert] = useState({});

    useEffect(() => {
        if (paciente?.nombre) {
            setMascota(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setSintomas(paciente.sintomas); 
            setId(paciente._id);
            formatearFechaEditar(paciente.fecha);
        }
    }, [paciente])

    const formatearFechaEditar = (fecha) => {
        const fechaJS = new Date(fecha);
        const nuevaFecha = fechaJS.toLocaleDateString('es-MX', 
        {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'});
        const date = nuevaFecha.split('/').reverse().join('-');
        setFecha(date);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([mascota, propietario, email, fecha, sintomas].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            setMostrarAlerta(true)

            setTimeout(() => {
                setMostrarAlerta(false)
            }, 3000)

            return;
        }

        guardarPaciente({nombre: mascota, propietario, email, sintomas, fecha, id})

        setMascota('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');

        setAlert({
            msg: 'Guardado correctamente',
            error: false
        });

        setMostrarAlerta(true)

        setTimeout(() => {
            setMostrarAlerta(false)
        }, 3000)
    }

  return (
    <>
        <p className="mb-5 font-black text-md text-gray-400 text-center tracking-tight uppercase">
            Añade a tus pacientes y<span className="text-indigo-600"> administralos</span>
        </p>
        <form id="form" onSubmit={handleSubmit} className='flex flex-col md:justify-start justify-center mb-10 border p-4 rounded-xl bg-white shadow-sm'>
            <div className="mb-4 flex flex-col w-full">
                <label htmlFor="mascota" className="font-bold pl-2 mb-1">
                    Nombre de la mascota
                </label>
                <input 
                    id="mascota"
                    value={mascota}
                    onChange={(e) => {setMascota(e.target.value)}}
                    type="text"
                    placeholder="Mascota"
                    className="text-[15px] border rounded-lg px-2 bg-white focus:outline-none w-full placeholder:text-sm"
                />
            </div>
            <div className="mb-4 flex flex-col w-full">
                <label htmlFor="propietario" className="font-bold pl-2 mb-1">
                    Propietario
                </label>
                <input 
                    id="propietario"
                    value={propietario}
                    onChange={(e) => {setPropietario(e.target.value)}}
                    type="text"
                    placeholder="Propietario"
                    className="text-[15px] border rounded-lg px-2 bg-white focus:outline-none w-full placeholder:text-sm"
                />
            </div>
            <div className="mb-4 flex flex-col w-full">
                <label htmlFor="email" className="font-bold pl-2 mb-1">
                    E-mail
                </label>
                <input 
                    id="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    type="email"
                    placeholder="E-mail de contacto"
                    className="text-[15px] border rounded-lg px-2 bg-white focus:outline-none w-full placeholder:text-sm"
                />
            </div>
            <div className="mb-4 flex flex-col w-full">
                <label htmlFor="fecha" className="font-bold pl-2 mb-1">
                    Fecha Alta
                </label>
                <input 
                    id="fecha"
                    value={fecha}
                    onChange={(e) => {setFecha(e.target.value)}}
                    type="date"
                    className="text-sm border rounded-lg px-2 bg-white focus:outline-none w-full"
                />
            </div>
            <div className="mb-4 flex flex-col w-full">
                <label htmlFor="sintomas" className="font-bold pl-2 mb-1">
                    Síntomas
                </label>
                <textarea 
                    id="sintomas"
                    value={sintomas}
                    onChange={(e) => {setSintomas(e.target.value)}}
                    placeholder="Describe los síntomas..."
                    className="resize-none h-[100px] text-[15px] border rounded-lg px-2 bg-white focus:outline-none w-full"
                />
            </div>
            <input 
                type='submit'
                value={id ? 'Guardar cambios' : 'Agregar nuevo paciente'}
                className="bg-indigo-600 text-white font-bold mt-[6px] w-full py-1 rounded-xl uppercase text-sm hover:bg-indigo-500 focus:outline-none cursor-pointer transition-colors duration-500 mb-3"
            />
            <div id='divAlert' className={`${mostrarAlerta ? 'visible' : 'hidden'}`}>
                <Alerta alert={alert}/>
            </div>
        </form>
    </>
  )
}

export default Formulario
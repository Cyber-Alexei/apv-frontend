import { useState } from "react";
import Formulario from "../components/Formulario.jsx";
import ListadoPacientes from "../components/ListadoPacientes.jsx";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-wrap justify-evenly w-full">
      <div className="flex flex-col lg:w-1/3 md:w-1/2 w-full">
        <button type='button'
        onClick={() => {setMostrarFormulario(!mostrarFormulario)}}
        className="
          cursor-pointer
          bg-indigo-600
          rounded-xl
          px-5
          text-white
          font-bold
          tracking-wider
          py-1
          mb-5
          focus:outline-none
          button
          hover:bg-indigo-500
          transition
          duration-500
          md:hidden
        ">
          {mostrarFormulario ? 'Ocultar formulario' : 'Mostrar formulario'}
        </button>
        <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block`}>
          <Formulario />
        </div>
      </div>
      <div className="lg:w-2/3 md:w-1/2 sm:w-full w-full px-2">
        <ListadoPacientes />
      </div >
    </div>
  )
}

export default AdministrarPacientes

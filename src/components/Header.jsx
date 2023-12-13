import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const Header = () => {
    const {cerrarSesion} = useAuth();

    return (
        <header className="py-7 bg-indigo-600 flex">
            <div className="container mx-auto flex md:flex-row justify-between px-3 flex-col">
                <h1 className="md:w-[50%] font-bold md:text-2xl text-white items-end text-sm">
                    <span className="font-black tracking-normal text-2xl">APV </span>
                    - Administrador de pacientes de veterinaria
                </h1>
                <nav className="md:text-xs text-xs items-end flex flex-row flex-wrap tracking-wider text-white font-extrabold md:gap-4 gap-3 uppercase md:pt-0 pt-5">
                    <Link className='hover:text-indigo-100 focus:outline-none' to='/admin'>Pacientes</Link>
                    <Link className='hover:text-indigo-100 focus:outline-none' to='/admin/perfil'>Perfil</Link>
                    <button type="button" onClick={cerrarSesion} className="hover:text-indigo-100 focus:outline-none flex tracking-wider"
                    >CERRAR SESIÓN</button>
                </nav>
            </div>
        </header>
    )
}

export default Header
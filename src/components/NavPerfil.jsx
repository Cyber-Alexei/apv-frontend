import { Link } from "react-router-dom";
import usePacientes from "../hooks/usePacientes.jsx";

const NavPerfil = () => {

    const {perfil, setPerfil} = usePacientes();
    
  return (
    <>
        <nav className="gap-4 flex mb-10">
            <Link to="/admin/perfil" 
            className={`${perfil ? 'text-gray-400' : 'text-indigo-600'} font-bold tracking-wide`}
            onClick={() => (setPerfil(true))}
            >Perfil</Link>
            <Link to="/admin/cambiar-password" 
            className={`${perfil ? 'text-indigo-600' : 'text-gray-400'} font-bold tracking-wide`}
            onClick={() => (setPerfil(false))}
            >Cambiar password</Link>
        </nav>
    </>
  )
}

export default NavPerfil;
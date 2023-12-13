import useAuth from "../hooks/useAuth.jsx";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const RutasProtegidas = () => {

  const {usuariosAuth, cargando} = useAuth();

  if (cargando) {
    return 'Cargando...';
  }

  return (
    <>
        <Header />
        <main className="container mx-auto mt-10 lg:px-20 sm:px-15 px-5">
            {usuariosAuth._id ? <Outlet/> : <Navigate to='/'/>}
        </main>
        <Footer />
    </>
  )
}

export default RutasProtegidas;



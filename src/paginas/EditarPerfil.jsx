import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.jsx";
import NavPerfil from "../components/NavPerfil.jsx";
import Alerta from "../components/Alerta.jsx";

const EditarPerfil = () => {

    const {usuariosAuth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alert, setAlert] = useState({});
    
    useEffect(() => {
        setPerfil(usuariosAuth);
    }, [usuariosAuth]);

    function numTel(perfil, e) {
        let value = e.target.value;

        if (['1','2','3','4','5','6','7','8','9','0',]
        .includes(value.split('')[value.length - 1]) 
        && value.length <= 10 
        || value.length === 0) {
            setPerfil({...perfil, [e.target.name] : value})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([perfil.nombre, perfil.email].includes('')) {
            setAlert({
                msg: '"Email" y "Nombre" son campos obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 4000)
            return;
        }

        if (perfil.telefono !== null) {
            if (perfil.telefono.length > 0 && perfil.telefono.length < 10) {
                setAlert({
                    msg: 'Parece que tu teléfono está mal escrito',
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, 4000)
                return;
            }
        }

        try {
            const respuesta = await actualizarPerfil(perfil);

            if (respuesta._id) {

                setAlert({
                    msg: `El registro se ha actualizado correctamente`,
                    error: false
                })
            }
            
            if (respuesta.msg) {

                setAlert({
                    msg: respuesta.msg,
                    error: true
                })
            }

            setTimeout(() => {
                setAlert({})
            }, 4000)
            return;

            
        } catch (error) {
            console.log(error);
        }
        
    }

  return (
    <>
        <NavPerfil/>
        <h1 className="text-center font-bold text-2xl text-indigo-600 mb-5">Edita tu perfil</h1>
        <div className="flex justify-center mb-10">
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
                <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                    <div className="my-3 flex flex-col">
                        <label className="uppercase font-bold text-gray-600 my-2">Nombre</label>
                        <input 
                            type="text"
                            className="border bg-gray-50 rounded-lg h-[30px] focus:outline-none px-3"
                            name="nombre"
                            value={perfil.nombre || ''}
                            onChange={(e) => {
                                setPerfil({...perfil, nombre: e.target.value});
                            }}
                        /> 
                    </div>
                    <div className="my-3 flex flex-col">
                        <label className="uppercase font-bold text-gray-600 my-2">Sitio web</label>
                        <input 
                            type="text"
                            className="border bg-gray-50 rounded-lg h-[30px] focus:outline-none px-3"
                            name="web"
                            value={perfil.web || ''}
                            onChange={(e) => {setPerfil({...perfil, [e.target.name] : e.target.value})}}
                        /> 
                    </div>
                    <div className="my-3 flex flex-col">
                        <label className="uppercase font-bold text-gray-600 my-2">Teléfono</label>
                        <input 
                            type="text"
                            className="border bg-gray-50 rounded-lg h-[30px] focus:outline-none px-3"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={(e) => {numTel(perfil, e)}}
                        /> 
                    </div>
                    <div className="my-3 flex flex-col">
                        <label className="uppercase font-bold text-gray-600 my-2">E-mail</label>
                        <input 
                            type="text"
                            className="border bg-gray-50 rounded-lg h-[30px] focus:outline-none px-3"
                            name="email"
                            value={perfil.email || ''}
                            onChange={(e) => {setPerfil({...perfil, [e.target.name] : e.target.value})}}
                        /> 
                    </div>
                    <div className="my-3 flex flex-col">
                        <input 
                            type="submit"
                            value="Guardar cambios"
                            className="focus:outline-none w-full bg-indigo-600 h-10 text-white font-bold rounded-lg hover:bg-indigo-500"
                        />
                    </div>
                    {alert.msg && 
                    <Alerta
                        alert={alert}
                    />}
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil;
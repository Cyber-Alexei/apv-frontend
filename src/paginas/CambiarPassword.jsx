import { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import Alerta from "../components/Alerta.jsx";
import NavPerfil from "../components/NavPerfil.jsx";


const CambiarPassword = () => {

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const {guardarPassword} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some(campo => campo === '')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }, 3000)

      return;
    }

    if (password.pwd_nuevo.length < 6) {
      setAlert({
        msg: 'Tu nuevo password debe tener minimo 6 caracteres',
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }, 3000)

      return;
    }

    if (password.pwd_nuevo === password.pwd_actual) {
      setAlert({
        msg: 'Tu nuevo password y el anterior no pueden ser el mismo',
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }, 3000)

      return;
    }

    const respuesta = await guardarPassword(password);

    if (respuesta) {
      setAlert({
        msg: respuesta.msg,
        error: respuesta.error
      })
      setTimeout(() => {
        setAlert({})
      }, 3000)

      return;
    }

  }

  return (
    <>
        <NavPerfil/>
        <h1 className="text-center font-bold text-2xl text-indigo-600 mb-5">Cambia tu password</h1>
        <div className="flex justify-center mb-10">
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
                <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                    <div className="my-3 flex flex-col">
                        <label className="uppercase font-bold text-gray-600 my-2">Password actual</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 rounded-lg h-[30px] focus:outline-none px-3"
                            placeholder="Escribe tu password actual"
                            name="pwd_actual"
                            autoComplete="new_password"
                            onChange={(e) => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                              })
                            }
                        /> 
                    </div>
                    <div className="my-3 flex flex-col">
                        <label className="uppercase font-bold text-gray-600 my-2">Nuevo password</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 rounded-lg h-[30px] focus:outline-none px-3"
                            placeholder="Escribe tu nuevo password"
                            name="pwd_nuevo"
                            autoComplete="new_password"
                            onChange={(e) => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })
                          }
                        /> 
                    </div>
                    <div className="my-3 flex flex-col">
                        <input 
                            type="submit"
                            value="Actualizar password"
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

export default CambiarPassword;
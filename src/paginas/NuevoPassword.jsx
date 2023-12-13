import veterinaria5 from '../assets/img/veterinaria5.jpg';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../../config/axios.jsx';
import {Link} from 'react-router-dom';

const NuevoPassword = () => {

  const icono1 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>


  const icono2 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>

  let [viewPassword, setViewPassword] = useState('password');
  let [icono, setIcono] = useState(icono1);
  let [nuevoPassword, setNuevoPassword] = useState('');
  let [alert, setAlert] = useState({});
  let [tokenValido, setTokenValido] = useState(false);
  let [passwordCambiado, setPasswordCambiado] = useState(false);

  const params = useParams();
  const { token } = params;

  function handleViewPassword() {
    if (viewPassword === 'password') {
      setViewPassword('text');
      setIcono(icono2);
    } else {
      setViewPassword('password');
      setIcono(icono1);
    }
  }

  useEffect(() => {

    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/recuperar-contrasena/${token}`);
        setTokenValido(true);
        setAlert({
          msg: 'Coloca tu nuevo password',
          error: false
        })
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if(!nuevoPassword.length) {
        setAlert({
          msg: 'Escribe tu nuevo password',
          error: true
        })
        return;
      }

      if (nuevoPassword.length < 6) {
        setAlert({
          msg: 'Tu password es muy corto',
          error: true
        })
        return;
      }

      const {data} = await clienteAxios
      .post(`/veterinarios/recuperar-contrasena/${token}`, {password: nuevoPassword});
      setAlert({
        msg: data.msg,
        error: false
      })

      setPasswordCambiado(true);

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <div className="justify-start flex mx-5 w-auto flex-col custom-width">
        <h1
        className="text-indigo-600 font-black leading-snug tamaño-letra"
        >Reestablece Tu Password y No Pierdas Acceso <span className="text-black font-black">a Tu Cuenta en APV</span></h1>
        <div>
          <img src={veterinaria5} className='rounded-xl' />
        </div>
      </div>
      <div className="w-96 pt-9 flex flex-col mx-5 min-w-0 shadow-lg p-4 margen-top rounded-xl my-3 bg-white">
        {tokenValido && 
          <form onSubmit={handleSubmit} className='mb-10'>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium tracking-widest text-sm">
                Nuevo Password
              </label>
              <input 
                value={nuevoPassword}
                onChange={e => setNuevoPassword(e.target.value)}
                type={viewPassword}
                autoComplete='current-password'
                placeholder='escribe tu password'
                className='
                password
                mb-2
                border
                border-indigo-400
                text-indigo-800
                bg-gray-100 
                placeholder-indigo-300 
                px-5 
                rounded-full
                focus:outline-none'
              />
              <div className='w-full flex justify-center mb-5'>
                <a onClick={handleViewPassword}
                className='cursor-pointer'
                >{icono}</a>
              </div>
            </div>
            <div>
              <input
                type='submit'
                value='Cambiar password'
                className="
                mt-3
                tracking-wide
                font-bold
                text-indigo-600
                w-full
                justify-center
                bg-indigo-200
                rounded-full
                hover:bg-indigo-600
                hover:text-white
                hover:border-white
                hover:cursor-pointer
                border
                border-indigo-400
                focus:outline-none
                "
              />
            </div>
            <nav id='nav' className='
            mt-12
            flex
            flex-col
            '
            >
              {passwordCambiado && 
                <p className='font-bold text-sm text-gray-400'>¿Cambiaste tu password? <Link to='/' className='text-indigo-600'>Inicia sesión</Link></p>
              }
            </nav>
          </form>
        }

        {alert.msg && <Alerta
              alert={alert}
        />}
      </div>
    </>
  )
}

export default NuevoPassword;
import veterinaria3 from '../assets/img/veterinaria3.jpg';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../../config/axios.jsx';

const OlvidePassword = () => {
  let [email, setEmail] = useState('');
  let [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert({
        msg: 'El email es obligatorio',
        error: true
      })
      return;
    }

    try {
      const {data} = await clienteAxios
        .post('/api/veterinarios/recuperar-contrasena', {email})
      setAlert({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  return (
    <>
      <div className="w-[40rem] flex mx-5 flex-col items-center">
        <h1
          className="text-indigo-600 font-black leading-snug tamaño-letra"
          >¿Olvidaste Tu Contraseña?!! <span className="text-black font-black">Vamos a Recuperarla</span>
        </h1>
        <img src={veterinaria3} className='w-[400px]'/>
      </div>
      <div className='rounded-xl shadow-md m-3 p-3 bg-white '>
        <form onSubmit={handleSubmit} className="w-full mt-5">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium tracking-widest text-sm">
              E-mail
            </label>
            <input 
              type='email'
              placeholder='escribe tu e-mail'
              value={email}
              autoComplete='username'
              onChange={(e) => {setEmail(e.target.value)}}
              className='
              w-96
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
          </div>
          <div>
            <input
              type='submit'
              value='Recibir e-mail'
              className="
              mt-10
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
              "
            />
          </div>
          <nav className='flex flex-col items-center mt-10'>
            <p className='font-bold text-sm text-gray-400'>¿No tienes una cuenta? <Link to='/registrar' className='text-indigo-600'>Regístrate</Link></p>
            <p className='font-bold text-sm text-gray-400 mt-3 mb-10'>¿Ya tienes una cuenta? <Link to='/' className='text-indigo-600'>Iniciar sesión</Link></p>
          </nav>
        </form>
        {alert.msg && <Alerta
          alert={alert}
        />}
      </div>
    </>
  )
}
  
  export default OlvidePassword;
import {Link} from 'react-router-dom';
import veterinaria from '../assets/img/veterinaria.jpg';
import {useState} from 'react';
import useAuth from '../hooks/useAuth.jsx';
import usePacientes from '../hooks/usePacientes.jsx';
import clienteAxios from '../../config/axios.jsx';
import Alerta from '../components/Alerta.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const {usuarioAutenticado} = useAuth();
  const {obtenerPacientes} = usePacientes();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    try {
      const {data} = await clienteAxios
      .post('/api/veterinarios/login', {email, password});
      localStorage.setItem('token-sesion-iniciada', data.token);

      obtenerPacientes();
      usuarioAutenticado();
      
      
    } catch (error) {

      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      return;
    }
  }

  return (
    <>
      <div className="justify-start flex mx-5 w-auto flex-col custom-width">
        <h1
        className="text-indigo-600 font-black leading-snug tamaño-letra"
        >Inicia Sesión y Comienza a Gestionar a Tus <span className="text-black font-black">Pacientes</span></h1>
        <img src={veterinaria} />
      </div>
      <div className="w-96 justify-center flex mx-5 min-w-0 shadow-lg p-4 margen-top rounded-xl my-3 bg-white flex-col">
        <form onSubmit={handleSubmit} className="w-full mt-5">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium tracking-widest text-sm">
              E-mail
            </label>
            <input
              onChange={(e) => {setEmail(e.target.value)}} 
              value={email}
              type='email'
              placeholder='escribe tu e-mail'
              className='
              mb-10
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
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium tracking-widest text-sm">
              Password
            </label>
            <input 
              onChange={(e) => {setPassword(e.target.value)}}
              value={password}
              type='password'
              placeholder='escribe tu password'
              className='
              mb-10
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
              value='Iniciar Sesión'
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
          <nav className='
          mt-12
          flex
          flex-col
          '
          >
            <p className='font-bold text-sm text-gray-400'>¿No tienes una cuenta? <Link to='/registrar' className='text-indigo-600'>Regístrate</Link></p>
            <p className='font-bold text-sm text-gray-400 mt-3 mb-10'>¿Olvidaste tu contraseña? <Link to='/recuperar-password' className='text-indigo-600'>Recuperar password</Link></p>
          </nav>
        </form>
        {alert.msg && 
          <Alerta
            alert={alert}
          />
        }
      </div>
        
    </>
  )
}

export default Login;


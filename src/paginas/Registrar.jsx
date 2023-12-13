import {Link} from 'react-router-dom';
import veterinaria2 from '../assets/img/veterinaria2.jpg';
import React, { useState } from 'react';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../../config/axios.jsx';

const Registrar = () => {
  
  const icono1 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>


  const icono2 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>


  let [viewPassword, setViewPassword] = useState('password');
  let [icono, setIcono] = useState(icono1);
  let [nombre, setNombre] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [alert, setAlert] = useState({});

  function handleViewPassword() {
    if (viewPassword === 'password') {
      setViewPassword('text');
      setIcono(icono2);
    } else {
      setViewPassword('password');
      setIcono(icono1);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const campos = [nombre, email, password];
    const camposVacios = [];
    
    for (const campo of campos) {
      if (campo === '') {
        camposVacios.push(campo);
      }
    }

    if(camposVacios.length) {
      setAlert({
        msg: 'Faltan campos por rellenar',
        error: true
      })
      return;
    }

    if(password.length < 6) {
      setAlert({
        msg: 'El password es muy corto',
        error: true
      })
      return;
    }

    setAlert({});

    // Enviar datos a backend (API) y registrar usuario
    try {
      // Petición
      await clienteAxios.post('/api/veterinarios', {nombre, email, password});
      setAlert({
        msg: 'Cuenta creada correctamente, revisa tu email!',
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
      <div className="justify-start flex mx-5 w-auto flex-col custom-width">
        <h1
        className="text-indigo-600 font-black leading-snug tamaño-letra"
        >Crea tu Nueva Cuenta y <span className="text-black font-black">Administra a Tus Pacientes</span></h1>
        <img src={veterinaria2} />
      </div>
      <div className="w-96 justify-center flex mx-5 min-w-0 shadow-lg p-4 margen-top rounded-xl my-3 bg-white">
        <form className="w-full mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium tracking-widest text-sm">
              Nombre
            </label>
            <input 
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              type='text'
              placeholder='escribe tu nombre completo'
              className='
              nombre
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
              E-mail
            </label>
            <input 
              value={email}
              onChange={e => setEmail(e.target.value)}
              type='email'
              placeholder='escribe tu e-mail'
              autoComplete='username'
              className='
              email
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
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              value='Registrarse'
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
            <p className='font-bold text-sm text-gray-400'>¿Ya tienes una cuenta? <Link to='/' className='text-indigo-600'>Inicia sesión</Link></p>
            <p className='font-bold text-sm text-gray-400 mt-3 mb-5'>¿Olvidaste tu contraseña? <Link to='/recuperar-password' className='text-indigo-600'>Recuperar password</Link></p>
            {alert.msg && <Alerta
              alert={alert}
            />}
          </nav>
        </form>
      </div>
    </>
  )
}

export default Registrar;
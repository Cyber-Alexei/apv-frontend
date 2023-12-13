import veterinaria4 from '../assets/img/veterinaria4.jpg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../../config/axios.jsx';

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alert, setAlert] = useState({});
    const param = useParams();
    const {id} = param;

    useEffect(() => {
      const confirmar = async () => {
        try {
          const url = `/api/veterinarios/confirmar/${id}`;
          const {data} = await clienteAxios(url);
          setCuentaConfirmada(true);
          console.log(data.msg)
          setAlert({
            msg: data.msg,
            error: false,
          });
        } catch (error) {
          console.log(error.response.data.msg)
          setAlert({
            msg: error.response.data.msg,
            error: true,
          })
        }
        setCargando(false);
      }
      confirmar();
    }, []);

    return (
      <>
        <div className="justify-start flex mx-5 w-auto flex-col custom-width">
          <h1
          className="text-indigo-600 font-black leading-snug tamaño-letra"
          >Confirma tu cuenta en <span className="text-black font-black">APV</span>
          </h1>
          <img src={veterinaria4} />
        </div>
        <div className="w-96 justify-center flex flex-col mx-5 min-w-0 shadow-lg p-4 margen-top rounded-xl my-3 bg-white items-center gap-6">
          {!cargando && 
            <Alerta
              alert={alert}
            />
          }
          {cuentaConfirmada &&
            <Link to='/' className='pt-2 pb-2 px-5 bg-indigo-600 rounded-xl text-white font-bold hover:bg-indigo-700'>Iniciar sesión</Link>
          }
        </div>
      </>
    )
  }
  
  export default ConfirmarCuenta;

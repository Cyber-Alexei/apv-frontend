import {BrowserRouter, Routes, Route} from 'react-router-dom';
// Layouts
import Autenticar from './layout/Autenticar.jsx';
import RutasProtegidas from './layout/RutasProtegidas.jsx';
// Rutas públicas
import Login from './paginas/Login.jsx';
import Registrar from './paginas/Registrar.jsx';
import OlvidePassword from './paginas/OlvidePassword.jsx';
import ConfirmarCuenta from './paginas/ConfirmarCuenta.jsx';
import NuevoPassword from '../src/paginas/NuevoPassword.jsx';
// Rutas privadas
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx';
import EditarPerfil from './paginas/EditarPerfil.jsx';
import CambiarPassword from './paginas/CambiarPassword.jsx';
// Context Provider
import { AuthProvider } from './context/AuthProvider.jsx';
import { PacientesProvider } from './context/PacientesProvider.jsx';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
        
            <Route path="/" element={<Autenticar />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="recuperar-password" element={<OlvidePassword />} />
              <Route path="recuperar-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutasProtegidas/>}>
                <Route index element={<AdministrarPacientes/>} />
                <Route path="perfil" element={<EditarPerfil />} />
                <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App


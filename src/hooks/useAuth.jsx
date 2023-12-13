import {useContext} from 'react';
import AuthContext from '../context/AuthProvider.jsx';
// Hook personalizado 'useAuth'
const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth;



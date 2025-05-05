import { Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
// import carregando from '../assets/loading.gif';

export function PrivateRoute({ children }) {
    const { signed, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen w-full" >Carregando</div>;
    }

    if (!signed) {
        return <Navigate to="/login" />;
    }

    return children;
}

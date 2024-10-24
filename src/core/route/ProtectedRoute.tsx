import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../admin/features/auth/presentation';



const ProtectedRoute = ({ redirectPath = '/login' }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../admin/features/auth/presentation';

const PublicRoute = ({ redirectPath = '/dashboard/members' }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />; // Render children (public routes)
};

export default PublicRoute;
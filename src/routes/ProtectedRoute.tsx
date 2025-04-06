import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../stores/store';

interface ProtectedRouteProps {
    allowedRoles: string[];
    redirectPath?: string;
}

const ProtectedRoute = ({
    allowedRoles,
    redirectPath = '/login',
}: ProtectedRouteProps) => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const user = useAppSelector((state) => state.user.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
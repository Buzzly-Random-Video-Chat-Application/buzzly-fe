import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../stores/store';

const RoleBasedRedirect = () => {
    const { user, isAuthenticated } = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user?.role === 'admin') {
            navigate('/dashboard', { replace: true });
        } else if (isAuthenticated && user?.role === 'user') {
            navigate('/', { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    return <Outlet />;
};

export default RoleBasedRedirect;
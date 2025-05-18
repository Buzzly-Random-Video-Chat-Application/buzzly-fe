import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../stores/store';
import PopupModal from '@components/PopupModal'
import React from 'react';
import { Box } from '@mui/material';

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
    const [open, setOpen] = React.useState(false);

    const handleUnAuthenConfirm = () => {
        setOpen(false);
        window.location.href = '/login';
    };
    const handleCancel = () => {
        setOpen(false);
        window.location.href = redirectPath;
    };

    const handleUnmacthRoleConfirm = () => {
        setOpen(false);
        window.location.href = '/';
    }

    React.useEffect(() => {
        if (!isAuthenticated) {
            setOpen(true);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <PopupModal
                    title="Authentication Required"
                    message="You need to be logged in to access this page."
                    open={open}
                    onClose={handleCancel}
                    onConfirm={handleUnAuthenConfirm}
                    stage="warning"
                />
            </Box>
        )
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <PopupModal
                    title="Access Denied"
                    message="You do not have permission to access this page."
                    open={open}
                    onClose={handleCancel}
                    onConfirm={handleUnmacthRoleConfirm}
                    stage="error"
                />
            </Box>
        )
    }

    return <Outlet />;
};

export default ProtectedRoute;
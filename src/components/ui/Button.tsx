import { Button as MUIButton, ButtonProps } from '@mui/material';
import React from 'react';

interface CustomButtonProps extends ButtonProps {
    width?: string;
    category?: 'default' | 'text' | 'outlined' | 'primary' | 'secondary';
    shape?: 'round' | 'square' | 'pill';
    icon?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<CustomButtonProps> = ({
    width,
    category = 'default',
    shape = 'round',
    icon,
    size = 'medium',
    children,
    sx,
    disabled,
    ...props
}) => {
    const getButtonStyles = () => {
        switch (category) {
            case 'text':
                return {
                    backgroundColor: 'transparent',
                    color: 'dark.500',
                    boxShadow: 'none',
                };
            case 'outlined':
                return {
                    backgroundColor: 'transparent',
                    color: 'dark.500',
                    border: '2px solid',
                    borderColor: 'primary.500',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: 'primary.100',
                        boxShadow: 'none',
                    },
                };
            case 'primary':
                return {
                    backgroundColor: 'primary.500',
                    color: 'dark.500',
                    boxShadow: '3px 3px 0px 0px #191A23',
                    '&:hover': {
                        boxShadow: '5px 5px 0px 0px #191A23',
                    },
                };
            case 'secondary':
                return {
                    backgroundColor: 'black.500',
                    color: 'white.50',
                    boxShadow: '3px 3px 0px 0px #FFFFFF',
                    border: '1px solid #191A23',
                    '&:hover': {
                        boxShadow: '5px 5px 0px 0px #FFFFFF',
                    },
                };
            case 'default':
            default:
                return {
                    backgroundColor: 'white.50',
                    color: 'dark.500',
                    boxShadow: '3px 3px 0px 0px #191A23',
                    border: '1px solid #191A23',
                    '&:hover': {
                        boxShadow: '5px 5px 0px 0px #191A23',
                    },
                };
        }
    };

    const getShapeStyles = () => {
        switch (shape) {
            case 'square':
                return { borderRadius: '8px' };
            case 'pill':
                return { borderRadius: '50px' };
            case 'round':
                return { borderRadius: '16px' };
            default:
                return { borderRadius: '16px' };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    padding: category === 'text' ? 0 : '8px 32px',
                    fontSize: '16px',
                };
            case 'medium':
                return {
                    padding: category === 'text' ? 0 : '14px 32px',
                    fontSize: '20px',
                };
            case 'large':
                return {
                    padding: category === 'text' ? 0 : '18px 32px',
                    fontSize: '24px',
                };
            default:
                return {
                    padding: category === 'text' ? 0 : '16px 32px',
                    fontSize: '18px',
                };
        }
    };

    return (
        <MUIButton
            disableTouchRipple
            sx={{
                textTransform: 'none',
                fontWeight: 500,
                width: width || '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s',
                ...getButtonStyles(),
                ...getShapeStyles(),
                ...getSizeStyles(),
                '&:disabled': {
                    backgroundColor: 'black.50',
                    color: 'black.200',
                    borderColor: category === 'outlined' ? 'black.50' : undefined,
                    boxShadow: '2px 2px 0px 0px #191A23',
                    cursor: 'not-allowed',
                    transform: 'none',
                },
                ...sx,
            }}
            disabled={disabled}
            {...props}
        >
            {icon}
            {children}
        </MUIButton>
    );
};

export default Button;
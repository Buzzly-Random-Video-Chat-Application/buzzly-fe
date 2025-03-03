import React from "react";

interface BouncingDotsLoaderProps {
    loading: boolean;
}

const BouncingDotsLoader: React.FC<BouncingDotsLoaderProps> = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default BouncingDotsLoader;

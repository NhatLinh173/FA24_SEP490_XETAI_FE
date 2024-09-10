import React, { useContext } from 'react';
import { LoadingContext } from './LoadingContext'; // Import LoadingContext

const LoadingOverlay = () => {
    const { loading } = useContext(LoadingContext);

    if (!loading) return null; // Chỉ hiển thị khi loading là true

    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingOverlay;

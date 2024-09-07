// src/components/FavoriteDrivers.js
import React, { useState, useEffect } from 'react';
import FavoriteDriver from '../component/Profile/User'; // Import component FavoriteDriver
import LoadingCircle from '../component/LoadingAnimation/LoadingCircle'; // Import component LoadingCircle

const FavoriteDrivers = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Giả lập gọi API
                await new Promise(resolve => setTimeout(resolve, 2000)); // Giả lập thời gian tải
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="container">
            <h2 className="my-4">Tài xế yêu thích của tôi</h2>
            {loading ? <LoadingCircle /> : <FavoriteDriver />}
        </div>
    );
};

export default FavoriteDrivers;

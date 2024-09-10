
import React, { useEffect, useContext } from 'react';
import FavoriteDriver from '../component/Profile/User'; // Import component FavoriteDriver
import { LoadingContext } from '../component/LoadingAnimation/LoadingContext'; // Import LoadingContext

const FavoriteDrivers = () => {
    const { startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading(); // Bắt đầu hiệu ứng loading khi component mount

        // Giả lập quá trình tải dữ liệu
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Giả lập thời gian tải dữ liệu
                stopLoading(); // Tắt hiệu ứng loading sau khi dữ liệu đã tải xong
            } catch (error) {
                console.error('Error fetching data:', error);
                stopLoading(); // Dù có lỗi cũng cần tắt hiệu ứng loading
            }
        };

        fetchData();
    }, [startLoading, stopLoading]);

    return (
        <div className="container">
            <h2 className="my-4">Tài xế yêu thích của tôi</h2>
            <FavoriteDriver />
        </div>
    );
};

export default FavoriteDrivers;

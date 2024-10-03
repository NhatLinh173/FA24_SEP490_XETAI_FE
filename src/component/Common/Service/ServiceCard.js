import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaMapLocation } from "react-icons/fa6";
import { FaBoxArchive } from 'react-icons/fa6';
import { FaWeightHanging } from 'react-icons/fa';

// Hàm để lấy tên thành phố từ địa chỉ
const getCityName = (address) => {
    // Giả định rằng tên thành phố nằm ở cuối địa chỉ, hoặc có thể tách theo dấu phẩy
    // Bạn có thể điều chỉnh cách tách này tùy thuộc vào định dạng địa chỉ của bạn
    const parts = address.split(','); // Tách địa chỉ theo dấu phẩy
    return parts[parts.length - 1].trim(); // Lấy phần cuối cùng và xóa khoảng trắng
};

const ServiceCard = ({ id, img, goodsType, pickupLocation, dropoffLocation, weight, price }) => {
    return (
        <div className="service-card">
            <img src={img} alt={goodsType} className="service-card-image zoom-image" />
            <div className="service-details">
                <p className="font-weight-bold">
                    <FaMapLocation /> Địa điểm lấy hàng: {getCityName(pickupLocation)}
                </p>
                <p className="font-weight-bold">
                    <FaMapLocation /> Địa điểm trả hàng: {getCityName(dropoffLocation)}
                </p>
                <p>
                    <FaBoxArchive /> Loại hàng: {goodsType}
                </p>
                <p>
                    <FaWeightHanging /> Khối lượng: {weight} kg
                </p>
                <p>
                    Tổng tiền: {price}
                </p>
            </div>
            <Link to={`/service/${id}`} className="read_more_btn">Xem chi tiết</Link>
        </div>
    );
};

export default ServiceCard;

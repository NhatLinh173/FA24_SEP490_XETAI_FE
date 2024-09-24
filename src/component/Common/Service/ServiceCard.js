import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaMapLocation } from "react-icons/fa6";
import { FaBoxArchive } from 'react-icons/fa6';
import { FaWeightHanging } from 'react-icons/fa';

// Hàm để cắt bớt chuỗi và thêm dấu "..." nếu chuỗi dài quá mức
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const ServiceCard = ({ id, img, goodsType, pickupLocation, dropoffLocation, weight, price }) => {
    return (
        <div className="service-card">
            <img src={img} alt={goodsType} className="service-card-image zoom-image" />
            <div className="service-details">
                <p className="font-weight-bold">
                    <FaMapLocation /> Địa điểm lấy hàng: {truncateText(pickupLocation, 20)} {/* Giới hạn độ dài */}
                </p>
                <p className="font-weight-bold">
                    <FaMapLocation /> Địa điểm trả hàng: {truncateText(dropoffLocation, 20)} {/* Giới hạn độ dài */}
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

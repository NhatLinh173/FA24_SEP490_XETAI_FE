import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaMapLocation } from "react-icons/fa6";
import { FaBoxArchive } from 'react-icons/fa6';
import { FaWeightHanging } from 'react-icons/fa';

const ServiceCard = ({ id, img, goodsType, pickupLocation, dropoffLocation, weight, price }) => {
    return (
        <div className="service-card">
            <img src={img} alt={goodsType} className="service-card-image" />
            <div className="service-details">
                <p className="font-weight-bold">
                    <FaMapLocation /> Địa điểm lấy hàng: {pickupLocation}
                </p>
                <p className="font-weight-bold">
                    <FaMapLocation /> Địa điểm trả hàng: {dropoffLocation}
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

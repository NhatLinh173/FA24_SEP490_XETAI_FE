import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaMapLocation } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { FaWeightHanging } from "react-icons/fa";

const ServiceCard = ({
  id,
  img,
  title,
  pickupLocation,
  dropoffLocation,
  weight,
  price,
  description,
  carType,
}) => {
  return (
    <div className="service-card">
      <img src={img} alt={title} className="service-card-image zoom-image" />
      <div className="service-details">
        <p className="font-weight-bold">
          <FaMapLocation /> Địa điểm lấy hàng: {pickupLocation}
        </p>
        <p className="font-weight-bold">
          <FaMapLocation /> Địa điểm trả hàng: {dropoffLocation}
        </p>
        <p>
          <FaBoxArchive /> Loại hàng: {title}
        </p>
        <p>
          <FaWeightHanging /> Khối lượng: {weight} kg
        </p>
        <p>Tổng tiền: {price}</p>
        <p>ID: {id}</p>
      </div>
      <Link to={`/service/${id}`} className="btn btn-theme w-100">
        Xem chi tiết
      </Link>
    </div>
  );
};

export default ServiceCard;

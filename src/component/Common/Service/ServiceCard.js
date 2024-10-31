import React from "react";
import { Link } from "react-router-dom";
import { FaMapLocation } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { FaWeightHanging } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const ServiceCard = ({
  id,
  img,
  title,
  pickupLocation,
  dropoffLocation,
  weight,
  price,
}) => {
  return (
    <div className="service-card ">
      <img src={img} alt={title} className="service-card-image zoom-image" />
      <div className="mb-2 text-secondary d-flex align-items-center m-2 ">
        <FaMapLocation className="mr-2" />
        <div className="font-weight-bold text-nowrap">Địa điểm đi:</div>
        <div className="w-75 ml-2 text-truncate">{pickupLocation}</div>
      </div>
      <div className="mb-2 text-secondary d-flex align-items-center m-2 ">
        <FaMapLocation className="mr-2" />
        <div className="font-weight-bold text-nowrap">Địa điểm đến:</div>
        <div className="w-75 ml-2 text-truncate">{dropoffLocation}</div>
      </div>
      <div className="mb-2 text-secondary d-flex align-items-center m-2 ">
        <FaBoxArchive className="mr-2" />
        <div className="font-weight-bold text-nowrap">Loại hàng:</div>
        <div className="w-75 ml-2 text-truncate">{title}</div>
      </div>
      <div className="mb-2 text-secondary d-flex align-items-center m-2 ">
        <FaWeightHanging className="mr-2" />
        <div className="font-weight-bold text-nowrap">Khối lượng:</div>
        <div className="w-75 ml-2 text-truncate">{weight} kg</div>
      </div>
      <div className="mb-2 text-secondary d-flex align-items-center m-2 ">
        <RiMoneyDollarCircleFill className="mr-2" />
        <div className="font-weight-bold text-nowrap">Giá:</div>
        <div className="w-75 ml-2 text-truncate">{price} VND</div>
      </div>
      <Link to={`/order/${id}`} className="btn btn-theme w-100">
        Xem chi tiết
      </Link>
    </div>
  );
};

export default ServiceCard;

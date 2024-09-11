import React from "react";
import { useHistory } from "react-router-dom";

const DriverCard = ({
  driverImage,
  driverName,
  rating,
  tripsCompleted,
  id,
}) => {
  const history = useHistory();

  const handleViewDetails = () => {
    history.push(`/driver/${id}`);
  };

  const getStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating); // Làm tròn rating để tính số lượng ngôi sao
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<i key={i} className="fa fa-star star-filled"></i>);
      } else {
        stars.push(<i key={i} className="fa fa-star star-empty"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="card mb-4 driver-card">
      <div className="row g-0">
        {/* Cột 1: Ảnh tài xế */}
        <div className="col-md-3 d-flex align-items-center">
          <img src={driverImage} className="img-fluid" alt={driverName} />
        </div>
        {/* Cột 2: Tên tài xế, rating, số chuyến hoàn thành */}
        <div className="col-md-5 d-flex flex-column justify-content-center">
          <h5 className="card-title">{driverName}</h5>
          <div className="rating">{getStars(rating)}</div>
          <p className="card-text">Số chuyến hoàn thành: {tripsCompleted}</p>
        </div>
        {/* Cột 3: Nút điều khiển */}
        <div className="col-md-4 d-flex flex-column align-items-end justify-content-center">
          <div className="vertical-line"></div>
          <button className="btn btn-theme mb-2 w-50">Bỏ thích</button>
          <button className="btn btn-link w-50" onClick={handleViewDetails}>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;

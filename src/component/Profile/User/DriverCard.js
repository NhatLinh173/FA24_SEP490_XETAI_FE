import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const DriverCard = () => {
  const history = useHistory();
  const [driver, setDriver] = useState([]);
  const handleViewDetails = () => {
    history.push(`/driver/${driver._id}`);
  };

  const userId = localStorage.getItem("userId");
  const driverId = localStorage.getItem("driverId");

  useEffect(() => {
    const getDriver = async () => {
      try {
        const response = await axiosInstance.get(`/driver/${userId}`);
        if (response.status === 200) {
          console.log("Driver favorite", response.data);
          setDriver(response.data.favorite.driverId);
        } else {
          toast.error("Lấy thông tin tài xế thất bại");
        }
      } catch (error) {
        console.error("Error getting driver:", error);
      }
    };
    if (userId) {
      getDriver();
    }
  }, [userId]);

  const handleRemoveFavorites = async () => {
    try {
      const response = await axiosInstance.post(`/favorites/remove`, {
        driverId,
        userId,
      });
      if (response.status === 200) {
        toast.success("Bỏ yêu thích tài xế thành công");
      } else {
        toast.error("Bỏ yêu thích tài xế thất bại");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // const getStars = (rating) => {
  //   const stars = [];
  //   const roundedRating = Math.round(rating);
  //   for (let i = 1; i <= 5; i++) {
  //     if (i <= roundedRating) {
  //       stars.push(<i key={i} className="fa fa-star star-filled"></i>);
  //     } else {
  //       stars.push(<i key={i} className="fa fa-star star-empty"></i>);
  //     }
  //   }
  //   return stars;
  // };

  return (
    <div className="card mb-4 driver-card">
      <div className="row g-0">
        <div className="col-md-3 d-flex align-items-center">
          <img
            src={driver.avatar}
            className="img-fluid"
            alt={driver.fullName}
          />
        </div>

        <div className="col-md-5 d-flex flex-column justify-content-center">
          <h5 className="card-title">{driver.fullName}</h5>
          {/* <div className="rating">{getStars(rating)}</div> */}
          {/* <p className="card-text">Số chuyến hoàn thành: {tripsCompleted}</p> */}
        </div>

        <div className="col-md-4 d-flex flex-column align-items-end justify-content-center">
          <div className="vertical-line"></div>
          <button
            className="btn btn-theme mb-2 w-50"
            onClick={handleRemoveFavorites}
          >
            Bỏ thích
          </button>
          <button className="btn btn-link w-50" onClick={handleViewDetails}>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;

import React from "react";
import { Link, useHistory } from "react-router-dom"; // Thay useNavigate bằng useHistory
import avatarDefault from "../../assets/img/icon/avatarDefault.jpg";
import { Button } from "react-bootstrap";
import { formatDate } from "../../utils/formatDate";
import { toast } from "react-toastify";

const PostItem = ({
  PostDriver,
  handleThreeDotsClick,
  showReportButtons,
  handleReportClick,
  handleContactClick,
}) => {
  const history = useHistory();
  if (!PostDriver) {
    return null;
  }
  const {
    _id,
    images,
    startCity,
    destinationCity,
    description,
    creatorId,
    createdAt,
  } = PostDriver;

  const userId = creatorId?._id;
  const avatar = creatorId?.userId?.avatar || avatarDefault;
  const fullName = creatorId?.userId?.fullName;
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleDriverClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      history.push(`/signin`);
      toast.error("Bạn cần đăng nhập để xem chi tiết tài xế.");
    } else {
      history.push(`/driver/${userId}`);
    }
  };
  const handleContactClickWithLoginCheck = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      history.push(`/signin`);
      toast.error("Bạn cần đăng nhập để liên hệ.");
    } else {
      handleContactClick(creatorId.userId);
    }
  };
  const handleReportClickWithLoginCheck = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      history.push(`/signin`);
      toast.error("Bạn cần đăng nhập để báo cáo bài viết.");
    } else {
      handleReportClick();
    }
  };
  return (
    <div className="post-item">
      <div
        key={_id}
        className="post-card-driver"
        onMouseEnter={(e) => {
          e.currentTarget.classList.add("hover");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.classList.remove("hover");
        }}
      >
        <div
          className="post-report-icon"
          onClick={() => handleThreeDotsClick(_id)}
          title="Báo cáo bài đăng"
        >
          <span className="report-icon">•••</span>
        </div>

        {showReportButtons[_id] && (
          <div className="report-buttons">
            <button
              className="btn btn-danger btn-sm"
              onClick={handleReportClickWithLoginCheck}
              style={{ width: "100%" }}
            >
              Báo cáo
            </button>
          </div>
        )}

        <div className="post-header">
          <Link to="#" onClick={handleDriverClick}>
            <img src={avatar} alt="Avatar" className="post-avatar mr-2" />
          </Link>
          <div>
            <Link to="#" onClick={handleDriverClick}>
              <h4 className="post-driver-name ml-2">{fullName}</h4>
            </Link>
            <p className="post-created-at ml-2">{formatDate(createdAt)}</p>
          </div>
        </div>

        <p>
          <strong>Điạ điểm lấy hàng:</strong> {startCity}
        </p>
        <p>
          <strong>Địa điểm trả hàng:</strong> {destinationCity}
        </p>
        <p className="post-description">{description}</p>

        <img src={images} alt="Post" className="post-image" />

        <div className="post-footer">
          <Button
            className="btn-theme border-0"
            onClick={handleContactClickWithLoginCheck}
          >
            Liên hệ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

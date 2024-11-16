import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import avatarDefault from "../../assets/img/icon/avatarDefault.jpg";
import { Button } from "react-bootstrap";
import { formatDate } from "../../utils/formatDate";

const PostItem = ({
  PostDriver,
  handleThreeDotsClick,
  handleContactClick,
  handleReportClick,
  showReportButtons,
}) => {
  return (
    <div>
      <div
        key={PostDriver.id}
        style={{
          position: "relative",
          margin: "13px",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f8f9fa",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          display: "flex", // Sử dụng Flexbox
          flexDirection: "column", // Dọc theo trục Y
          justifyContent: "space-between", // Đảm bảo các phần tử đều được căn chỉnh đều
          width: "350px", // Chiều rộng của mỗi card
          height: "550px",
          flexShrink: 0, // Đảm bảo các card không bị co lại
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        }}
      >
        <div
          className="position-absolute"
          style={{
            top: "10px",
            right: "10px",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={() => handleThreeDotsClick(PostDriver._id)}
          title="Báo cáo bài đăng"
        >
          <span
            style={{
              color: "#333",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            •••
          </span>
        </div>

        {showReportButtons[PostDriver._id] && (
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "10px",
              zIndex: 10,
              backgroundColor: "#fff",
              padding: "5px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <button
              className="btn btn-danger btn-sm"
              onClick={handleReportClick}
              style={{ width: "100%" }}
            >
              Báo cáo
            </button>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            flexShrink: 0, // Giúp ngăn avatar và tên bị dồn xuống khi có nội dung dài
          }}
        >
          <Link to={`/driver/${PostDriver.creatorId.userId._id}`}>
            <img
              src={PostDriver.creatorId.userId.avatar || avatarDefault}
              alt="Avatar"
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                marginRight: "15px",
                border: "2px solid #007bff",
              }}
            />
          </Link>
          <div>
            <Link to={`/driver/${PostDriver.creatorId.userId._id}`}>
              <h4 style={{ margin: 0, color: "#007bff", fontSize: "18px" }}>
                {PostDriver.creatorId.userId.fullName}
              </h4>
            </Link>
            <p style={{ fontSize: "0.9em", color: "#888" }}>
              {formatDate(PostDriver.createdAt)}
            </p>
          </div>
        </div>
        <p>
          <strong>Điểm đi:</strong> {PostDriver.startCity}
        </p>
        <p>
          <strong>Điểm đến:</strong> {PostDriver.destinationCity}
        </p>
        <p
          style={{
            marginBottom: "10px",
            color: "#555",
            maxWidth: "100%",
            display: "-webkit-box", // Dùng flexbox cho hỗ trợ đa dòng
            WebkitBoxOrient: "vertical", // Cấu hình chiều dọc
            overflow: "hidden", // Ẩn phần dư thừa
            WebkitLineClamp: 3, // Giới hạn số dòng là 4
            lineHeight: "1.5", // Điều chỉnh khoảng cách dòng nếu cần
          }}
        >
          {PostDriver.description}
        </p>
        <img
          src={PostDriver.images}
          alt="Post"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            className="btn-theme border-0"
            onClick={() => handleContactClick(PostDriver.creatorId.userId)}
          >
            Liên hệ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

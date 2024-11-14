import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import useInstanceData from "../../config/useInstanceData";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axiosInstance from "../../config/axiosConfig";
import avatarDefault from "../../assets/img/icon/avatarDefault.jpg";

import { toast } from "react-toastify";

const PostDriver = () => {
  const [showReportButtons, setShowReportButtons] = useState({});
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const userId = localStorage.getItem("userId");
  const { data: PostDriver } = useInstanceData("/driverpost");

  const postsPerPage = 6;
  const pageCount = Math.ceil(PostDriver.length / postsPerPage);
  const displayedPosts = PostDriver.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleThreeDotsClick = (postId) => {
    setShowReportButtons((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
    setSelectedPostId(postId);
  };

  const handleReportClick = () => setShowReportModal(true);
  const handleCloseModal = () => {
    setShowReportModal(false);
    setShowReportButtons((prevState) => ({
      ...prevState,
      [selectedPostId]: false,
    }));
  };

  const handleConfirmReport = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/report", {
        reporterId: userId,
        postId: selectedPostId,
        description: reportReason,
      });
      if (response.status === 201) {
        toast.success("Báo cáo bài đăng thành công!!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!!!!");
    }
    setShowReportModal(false);
    setShowReportButtons((prevState) => ({
      ...prevState,
      [selectedPostId]: false,
    }));
  };

  const handleContactClick = (driverId) => {
    setSelectedDriver(driverId);
    setShowContactModal(true);
  };
  const handleCloseContactModal = () => setShowContactModal(false);
  const handleConfirmContact = () => {
    setShowContactModal(false);
  };

  // Xử lý việc hiển thị mô tả bài đăng

  return (
    <div className="wrapper">
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <h2 className="text-center mb-4">Danh sách bài đăng </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "15px",
          }}
        >
          {displayedPosts.map((PostDriver) => (
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.1)";
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
                    <h4
                      style={{ margin: 0, color: "#007bff", fontSize: "18px" }}
                    >
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
                  WebkitLineClamp: 4, // Giới hạn số dòng là 4
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
                  onClick={() =>
                    handleContactClick(PostDriver.creatorId.userId)
                  }
                >
                  Liên hệ
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            previousLabel={"<<"}
            nextLabel={">>"}
          />
        </div>
      </div>

      <Modal show={showReportModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo bài đăng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Mô tả lý do báo cáo"
            rows="4"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleConfirmReport}>
            Báo cáo
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showContactModal}
        onHide={handleCloseContactModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Liên hệ với tài xế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn liên hệ với tài xế{" "}
            <strong>{selectedDriver?.fullName}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseContactModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleConfirmContact}>
            Liên hệ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostDriver;

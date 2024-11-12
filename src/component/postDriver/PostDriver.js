import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const PostDriver = () => {
  const driverPosts = [
    {
      id: 1,
      driverName: "Nguyễn Văn A",
      avatar: "https://via.placeholder.com/50",
      startPoint: "Đà Nẵng",
      destination: "Hà Nội",
      postTime: "09:00 AM, 09/11/2024",
      description:
        "Tôi sẽ khởi hành từ TP.HCM vào sáng mai, mong được hợp tác với khách có nhu cầu.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHz8OhCawNyFvEOq5to07DFxdHFR_aKqzg&s",
    },
    {
      id: 2,
      driverName: "Nguyễn Văn A",
      avatar: "https://via.placeholder.com/50",
      startPoint: "Đà Nẵng",
      destination: "Hà Nội",
      postTime: "09:00 AM, 09/11/2024",
      description:
        "Tôi sẽ khởi hành từ TP.HCM vào sáng mai, mong được hợp tác với khách có nhu cầu.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHz8OhCawNyFvEOq5to07DFxdHFR_aKqzg&s",
    },
    {
      id: 3,
      driverName: "Nguyễn Văn A",
      avatar: "https://via.placeholder.com/50",
      startPoint: "Đà Nẵng",
      destination: "Hà Nội",
      postTime: "09:00 AM, 09/11/2024",
      description:
        "Tôi sẽ khởi hành từ TP.HCM vào sáng mai, mong được hợp tác với khách có nhu cầu.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHz8OhCawNyFvEOq5to07DFxdHFR_aKqzg&s",
    },

    // Add more posts as needed
  ];

  const [showReportButton, setShowReportButton] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const postsPerPage = 6;
  const pageCount = Math.ceil(driverPosts.length / postsPerPage);
  const displayedPosts = driverPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleThreeDotsClick = () => setShowReportButton(!showReportButton);
  const handleReportClick = () => setShowReportModal(true);
  const handleCloseModal = () => {
    setShowReportModal(false);
    setShowReportButton(false);
  };
  const handleConfirmReport = () => {
    console.log("Report reason:", reportReason);
    setShowReportModal(false);
    setReportReason("");
  };

  const handleContactClick = (driver) => {
    setSelectedDriver(driver);
    setShowContactModal(true);
  };
  const handleCloseContactModal = () => setShowContactModal(false);
  const handleConfirmContact = () => {
    setShowContactModal(false);
  };

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
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              className="driver-post-card"
              style={{
                position: "relative",
                margin: "13px",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                onClick={handleThreeDotsClick}
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

              {showReportButton && (
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
                }}
              >
                <img
                  src={post.avatar}
                  alt="Avatar"
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    marginRight: "15px",
                    border: "2px solid #007bff",
                  }}
                />
                <div>
                  <h5 style={{ margin: 0, color: "#007bff" }}>
                    {post.driverName}
                  </h5>
                  <p style={{ fontSize: "0.9em", color: "#888" }}>
                    {post.postTime}
                  </p>
                </div>
              </div>
              <p>
                <strong>Điểm đi:</strong> {post.startPoint}
              </p>
              <p>
                <strong>Điểm đến:</strong> {post.destination}
              </p>
              <p style={{ marginBottom: "10px", color: "#555" }}>
                {post.description}
              </p>
              <img
                src={post.image}
                alt="Post"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
              <Button
                className="mt-3 btn-theme border-0"
                onClick={() => handleContactClick(post)}
              >
                Liên hệ
              </Button>
            </div>
          ))}
        </div>

        <div className="pagination-controls text-center mt-4">
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

      <Modal show={showReportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo bài đăng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            id="reportReason"
            className="form-control"
            rows="4"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Nhập lý do của bạn..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleConfirmReport}>
            Báo cáo
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showContactModal} onHide={handleCloseContactModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Liên hệ với tài xế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn liên hệ với tài xế {selectedDriver?.driverName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseContactModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmContact}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostDriver;

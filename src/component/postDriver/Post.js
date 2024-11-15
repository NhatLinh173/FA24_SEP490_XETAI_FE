import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axiosInstance from "../../config/axiosConfig";
import avatarDefault from "../../assets/img/icon/avatarDefault.jpg";
import Fuse from "fuse.js";

import { toast } from "react-toastify";
import SectionHeading from "../Common/SectionHeading";
import PostItem from "./PostItem";

const Post = ({ PostDriver }) => {
  const [showReportButtons, setShowReportButtons] = useState({});
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const userId = localStorage.getItem("userId");
  const sectionHeadingRef = useRef(null);
  const [filteredData, setFilteredData] = useState([]);

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
    setShowReportButtons((prevState) => {
      const newState = {};

      Object.keys(prevState).forEach((id) => {
        newState[id] = false;
      });

      newState[postId] = !prevState[postId];

      return newState;
    });

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
        driverPostId: selectedPostId,
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
  const handleSearch = ({ pickupLocation, dropoffLocation, weight }) => {
    const options = {
      keys: ["startPointCity", "destinationCity", "load"],
      threshold: 0.3,
    };

    const fuse = new Fuse(PostDriver, options);
    const searchResults = fuse.search({
      $and: [
        { startPointCity: pickupLocation },
        { destinationCity: dropoffLocation },
        { load: weight.toString() },
      ],
    });
    const filtered = searchResults.map((result) => result.item);

    setFilteredData(filtered);
    setCurrentPage(0);
  };

  return (
    <div>
      <div>
        <div ref={sectionHeadingRef}>
          <SectionHeading onSearch={handleSearch} />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          {displayedPosts.map((PostDriver) => (
            <PostItem
              PostDriver={PostDriver}
              handleThreeDotsClick={handleThreeDotsClick}
              showReportButtons={showReportButtons}
              handleReportClick={handleReportClick}
              handleContactClick={handleContactClick}
            />
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

export default Post;

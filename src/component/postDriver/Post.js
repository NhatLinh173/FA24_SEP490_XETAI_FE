import React, { useState, useRef, useEffect } from "react";
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
  const pageCount = Math.ceil(filteredData.length / postsPerPage);

  const displayedPosts = filteredData.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    sectionHeadingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleThreeDotsClick = (postId) => {
    setShowReportButtons((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    console.log("Dữ liệu bài đăng:", PostDriver);
    setFilteredData(PostDriver);
  }, [PostDriver]);

  const handleReportClick = () => setShowReportModal(true);
  const handleCloseModal = () => setShowReportModal(false);

  const handleConfirmReport = async (e) => {
    e.preventDefault();
    // Xử lý báo cáo
  };

  const handleContactClick = (driverId) => {
    setSelectedDriver(driverId);
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => setShowContactModal(false);
  const handleConfirmContact = () => {
    // Xử lý liên hệ
  };

  const handleSearch = (query) => {
    console.log("Giá trị query:", query);

    if (Array.isArray(query) && query.length > 0) {
      setFilteredData(query);
      setCurrentPage(0);
    } else {
      console.log("Query không hợp lệ hoặc rỗng");
      setFilteredData(PostDriver);
    }
  };

  return (
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
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <PostItem
              key={post._id}
              PostDriver={post}
              handleThreeDotsClick={handleThreeDotsClick}
              showReportButtons={showReportButtons}
              handleReportClick={handleReportClick}
              handleContactClick={handleContactClick}
            />
          ))
        ) : (
          <p>Không có kết quả tìm kiếm</p>
        )}
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
  );
};

export default Post;

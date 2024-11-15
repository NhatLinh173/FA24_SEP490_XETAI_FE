import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { formatDate } from "../../../utils/formatDate";

const PostReport = () => {
  // Mock data for reports
  const reports = [
    {
      _id: "1",
      postId: {
        _id: "101",
        title: "Post 1",
        description: "Description of Post 1",
        creator: { fullName: "Creator 1" },
        images: ["image1.jpg", "image2.jpg"],
      },
      description: "Report Reason 1",
      reporterId: { fullName: "Reporter 1" },
      createdAt: "2024-11-01T12:00:00Z",
    },
    {
      _id: "2",
      postId: {
        _id: "102",
        title: "Post 2",
        description: "Description of Post 2",
        creator: { fullName: "Creator 2" },
        images: ["image3.jpg", "image4.jpg"],
      },
      description: "Report Reason 2",
      reporterId: { fullName: "Reporter 2" },
      createdAt: "2024-11-02T12:00:00Z",
    },
    // Add more mock reports here
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Logic for pagination
  const displayedReports = reports.slice(
    currentPage * 5,
    (currentPage + 1) * 5
  );

  // Handling previous and next slide for carousel in details modal
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % postId?.images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? postId?.images.length - 1 : prevIndex - 1
    );
  };

  const handleViewDetails = (post) => {
    setPostId(post);
    setShowDetailModal(true);
  };

  const handleDelete = (reportId) => {
    setReportId(reportId);
    setShowDeleteModal(true);
  };

  return (
    <div className="post-report-container mt-5">
      <h2 className="post-report-title mb-4 text-center">
        Quản lý báo cáo bài đăng
      </h2>

      <Table striped bordered hover className="post-report-table mt-3">
        <thead>
          <tr>
            <th>Bài đăng</th>
            <th>Lý do</th>
            <th>Người đăng</th>
            <th>Người báo cáo</th>
            <th>Ngày báo cáo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedReports.map((report) => (
            <tr key={report._id}>
              <td>{report?.postId._id}</td>
              <td>{report?.description}</td>
              <td>{report?.postId?.creator.fullName}</td>
              <td>{report?.reporterId?.fullName}</td>
              <td>{formatDate(report?.createdAt)}</td>
              <td className="d-flex justify-content-center">
                <Button
                  variant="info"
                  onClick={() => handleViewDetails(report.postId)}
                >
                  <IoIosInformationCircleOutline className="icon-large" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(report._id)}
                  className="ms-2"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p>{`Displaying ${reports.length} reports.`}</p>

      <div className="pagination-controls text-center">
        <ReactPaginate
          pageCount={Math.ceil(reports.length / 5)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"pagination justify-content-center"}
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

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this report?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(false)} // Removed toast
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post Report Details Modal */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
        className="bg-dark bg-opacity-75"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết bài đăng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {/* Left Side: Report Information */}
            <div className="col-md-10">
              <div>
                <p>
                  <strong>Người đăng bài:</strong> {postId?.creator?.fullName}
                </p>
                <p>
                  <strong>Người báo cáo:</strong>{" "}
                  {reports?.reporterId?.fullName}
                </p>
                <p>
                  <strong>Ngày báo cáo:</strong>{" "}
                  {formatDate(reports?.createdAt)}
                </p>
                <p>
                  <strong>Lý do:</strong> {reports?.description}
                </p>
                <p>
                  <strong>Nội dung bài đăng:</strong> {postId?.description}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostReport;

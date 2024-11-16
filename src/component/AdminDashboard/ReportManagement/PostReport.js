import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { formatDate } from "../../../utils/formatDate";
import useInstanceData from "../../../config/useInstanceData";
import { toast } from "react-toastify";
import axios from "../../../config/axiosConfig";

const PostReport = () => {
  // Mock data for reports
  const [reportPostDriver, setReportPostDriver] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [reportPostId, setReportPostId] = useState(null);
  const [Post, setPost] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: postReport, refetch } = useInstanceData("/report/driverPost");
  console.log(postReport);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % Post.images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? Post.images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    if (postReport) {
      setReportPostDriver(postReport);
    } else {
      toast.error("Không có báo cáo bài đăng!!");
    }
  }, [postReport]);

  const displayedReports = reportPostDriver.slice(
    currentPage * 5,
    (currentPage + 1) * 5
  );
  const confirmDelete = async () => {
    try {
      await axios.delete(`/report/${reportPostId}`);
      setShowDeleteModal(false);
      toast.success("Xóa báo cáo bài đăng thành công");
      refetch();
    } catch (error) {
      toast.error("có xảy ra lỗi!!");
    }
  };
  const handleDelete = (reportId) => {
    setReportPostId(reportId);
    setShowDeleteModal(true);
    console.log(reportId);
  };
  const handleViewDetails = (postId) => {
    setPost(postId);
    console.log(postId);

    setShowDetailModal(true);
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
          {displayedReports?.map((postReport) => (
            <tr key={postReport?._id}>
              <td>{postReport?.driverPostId._id}</td>
              <td>{postReport?.description}</td>
              <td>{postReport?.postId?.creator.fullName}</td>
              <td>{postReport?.reporterId?.email}</td>
              <td>{formatDate(postReport?.createdAt)}</td>
              <td className="d-flex justify-content-center">
                <Button
                  variant="info"
                  onClick={() => handleViewDetails(postReport?.driverPostId)}
                >
                  <IoIosInformationCircleOutline className="icon-large" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(postReport._id)}
                  className="ms-2"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p>{`Displaying ${postReport.length} reports.`}</p>

      <div className="pagination-controls text-center">
        <ReactPaginate
          pageCount={Math.ceil(postReport.length / 5)}
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
        <Modal.Body>Bạn có muốn xóa bài đăng này không??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post Report Details Modal */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
        className="custom-modal-admin  bg-dark bg-opacity-75 "
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết bài đăng</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scrollable" size="lg">
          <div className="row">
            <div>
              <div className="border rounded p-3 shadow-sm">
                {/* Service Information */}
                <div className="w-100 border-bottom pb-3 mb-3">
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {Post?.images &&
                        Post?.images.map((img, index) => (
                          <div
                            className={`carousel-item text-center ${
                              index === activeIndex ? "active" : ""
                            }`}
                          >
                            <img src={img} className="fix-img" alt="service" />
                          </div>
                        ))}
                    </div>
                    <button
                      className="carousel-control-prev border-0 carousel-bg"
                      type="button"
                      data-target="#carouselExampleControls"
                      data-slide="prev"
                      onClick={prevSlide}
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next border-0  carousel-bg"
                      type="button"
                      data-target="#carouselExampleControls"
                      data-slide="next"
                      onClick={nextSlide}
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </button>
                  </div>
                </div>
                <div>
                  <form>
                    <div className="border rounded p-3 shadow-sm">
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label
                            htmlFor="pickupLocation"
                            className="font-weight-bold"
                          >
                            Điểm đi
                          </label>
                          <div className="d-flex">
                            <div className="flex-1">
                              <input
                                id="pickupLocation"
                                value={Post?.startCity}
                                type="text"
                                className="form-control position-relative"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-12">
                          <label
                            htmlFor="dropoffLocation"
                            className="font-weight-bold"
                          >
                            Điểm đến
                          </label>
                          <div className="d-flex ">
                            <div className="flex-1">
                              <input
                                id="dropoffLocation"
                                value={Post?.destinationCity}
                                type="text"
                                className="form-control position-relative"
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group col-md-12">
                          <label
                            htmlFor="description"
                            className="font-weight-bold"
                          >
                            Nội dung bài đăng
                          </label>
                          <textarea
                            id="description"
                            value={Post?.description}
                            className="form-control position-relative"
                            rows="4"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostReport;

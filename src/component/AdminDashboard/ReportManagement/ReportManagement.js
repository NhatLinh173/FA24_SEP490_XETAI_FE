import React, { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { FaTrash } from "react-icons/fa"; // Import icon trash
import useInstanceData from "../../../config/useInstanceData";
import { formatDate } from "../../../utils/formatDate";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from "../../../config/axiosConfig";

const ReportManagement = () => {
  const { data: report, refetch } = useInstanceData("/report");
  console.log(report);

  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportId, setReportId] = useState(null);
  console.log(reportId);

  useEffect(() => {
    if (report) {
      setReports(report);
    } else {
      toast.error("report not found");
    }
  }, [report]);
  const displayedReports = reports.slice(
    currentPage * 5, // Thay reportsPerPage bằng 10
    (currentPage + 1) * 5 // Thay reportsPerPage bằng 10
  );

  // const handleViewDetails = (order) => {
  //   toast.info(`Xem chi tiết đơn hàng: ${order}`);
  // };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/report/${reportId}`);
      refetch();
      setShowDeleteModal(false);
      toast.success(`Xóa báo cáo thành công`);
    } catch (error) {
      toast.error("có xảy ra lỗi!!");
    }
  };
  const handleDelete = (report) => {
    setReportId(report._id);
    setShowDeleteModal(true);
  };

  return (
    <div className="report-management-container mt-5">
      <h2 className="report-management-title mb-4 text-center">
        Quản Lý Báo Cáo
      </h2>

      <Table striped bordered hover className="report-management-table mt-3">
        <thead>
          <tr>
            <th>Đơn hàng</th>
            <th style={{ width: "20%" }}>Lý do</th>
            <th>Người tạo đơn</th>
            <th>Người báo cáo</th>
            <th>Ngày báo cáo</th>
            <th style={{ width: "20%" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedReports?.map((report) => (
            <tr key={report?._id}>
              <td
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "25px",
                }}
              >
                {report?.postId._id}
              </td>
              <td
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "25px",
                }}
              >
                {report?.description}
              </td>
              <td
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "25px",
                }}
              >
                {report?.postId?.creator.fullName}
              </td>
              <td
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "25px",
                }}
              >
                {report?.reporterId?.fullName}
              </td>
              <td
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "25px",
                }}
              >
                {formatDate(report?.createdAt)}
              </td>
              <td className="d-flex align-items-center">
                <Button
                  variant="info"
                  // onClick={() => handleViewDetails(report.order)}
                >
                  <IoIosInformationCircleOutline className="icon-large" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(report)}
                  className="ms-2"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p>{`Hiển thị ${reports.length} báo cáo.`}</p>

      <div className="report-management-pagination-controls text-center">
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
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa đơn hàng này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ReportManagement;

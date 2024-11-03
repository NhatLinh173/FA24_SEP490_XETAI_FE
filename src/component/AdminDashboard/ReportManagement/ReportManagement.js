import React, { useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { FaTrash } from "react-icons/fa"; // Import icon trash

const ReportManagement = () => {
    const initialReports = [
        { id: 1, order: "671bb5d61f3b938d51e0d0ec", reason: "Lý do 1", createdBy: "Người tạo đơn 1", reportedBy: "Người báo cáo 1", reportDate: "01-11-2024" },
        { id: 2, order: "Đơn hàng 2", reason: "Lý do 2", createdBy: "Người tạo đơn 2", reportedBy: "Người báo cáo 2", reportDate: "02-11-2024" },
        { id: 3, order: "Đơn hàng 3", reason: "Lý do 3", createdBy: "Người tạo đơn 3", reportedBy: "Người báo cáo 3", reportDate: "03-11-2024" },
    ];

    const [reports, setReports] = useState(initialReports);
    const [currentPage, setCurrentPage] = useState(0);
    const [reportsPerPage, setReportsPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);

    const displayedReports = reports.slice(
        currentPage * reportsPerPage,
        (currentPage + 1) * reportsPerPage
    );

    const handleViewDetails = (order) => {
        toast.info(`Xem chi tiết đơn hàng: ${order}`);
    };

    const handleDelete = (report) => {
        setReportToDelete(report);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setReports(reports.filter((r) => r.id !== reportToDelete.id));
        setShowDeleteModal(false);
        toast.info(`Đã xóa báo cáo cho ${reportToDelete.order}`);
    };

    return (
        <div className="report-management-container mt-5">
            <h2 className="report-management-title mb-4 text-center">Quản Lý Báo Cáo</h2>

            <div className="mb-3 d-flex justify-content-end">
                <Form.Select
                    aria-label="Chọn số lượng báo cáo mỗi trang"
                    value={reportsPerPage}
                    onChange={(e) => {
                        setReportsPerPage(parseInt(e.target.value));
                        setCurrentPage(0);
                    }}
                    style={{ width: "200px" }}
                >
                    <option value="5">5 báo cáo</option>
                    <option value="10">10 báo cáo</option>
                    <option value="20">20 báo cáo</option>
                    <option value="50">50 báo cáo</option>
                </Form.Select>
            </div>

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
                    {displayedReports.map((report) => (
                        <tr key={report.id}>
                            <td style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: "25px",
                            }}>{report.order}</td>
                            <td style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: "25px",
                            }}>{report.reason}</td>
                            <td style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: "25px",
                            }}>{report.createdBy}</td>
                            <td style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: "25px",
                            }}>{report.reportedBy}</td>
                            <td style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: "25px",
                            }}>{report.reportDate}</td>
                            <td>
                                <Button variant="info" onClick={() => handleViewDetails(report.order)}>
                                    Xem chi tiết
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
                    pageCount={Math.ceil(reports.length / reportsPerPage)}
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
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa đơn hàng "{reportToDelete?.order}" không?</Modal.Body>
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

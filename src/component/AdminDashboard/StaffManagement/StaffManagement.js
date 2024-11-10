import React, { useState } from "react";
import { Table, Form, Modal, Button } from "react-bootstrap";
import { FaTrashAlt, FaUserPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import avatarDefault from "../../../assets/img/icon/avatarDefault.jpg";

const StaffManagement = () => {
    const sampleStaff = [
        {
            _id: "1",
            fullName: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            phone: "0901234567",
            address: "Hà Nội",
            isBlocked: false,
            avatar: avatarDefault,
        },
        // ... other sample staff
    ];

    const [staff, setStaff] = useState(sampleStaff);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [staffPerPage, setStaffPerPage] = useState(10);

    // New state for form data
    const [newStaff, setNewStaff] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        avatar: avatarDefault,
    });

    // New state for form validation
    const [validated, setValidated] = useState(false);

    const filteredStaff = staff.filter((member) =>
        member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedStaff = filteredStaff.slice(
        currentPage * staffPerPage,
        (currentPage + 1) * staffPerPage
    );

    const deleteStaffAccount = (id) => {
        setStaff(staff.filter((member) => member._id !== id));
        toast.success("Nhân viên đã bị xóa");
    };

    const confirmDelete = (id) => {
        setSelectedStaff(id);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (selectedStaff) {
            deleteStaffAccount(selectedStaff);
            setShowDeleteModal(false);
            setSelectedStaff(null);
        }
    };

    // New function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStaff(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // New function to handle form submission
    const handleAddStaff = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const newStaffMember = {
            _id: (staff.length + 1).toString(),
            ...newStaff,
            isBlocked: false,
        };

        setStaff(prev => [...prev, newStaffMember]);
        setShowAddModal(false);
        setNewStaff({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            avatar: avatarDefault,
        });
        setValidated(false);
        toast.success("Thêm nhân viên mới thành công");
    };

    return (
        <div className="staff-management-container mt-5">
            <h2 className="staff-management-title mb-4 text-center">Quản Lý Nhân Viên</h2>

            <div className="d-flex justify-content-between mb-4">
                <Form className="staff-management-search-form">
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm nhân viên..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(0);
                            }}
                            className="staff-management-search-input"
                        />
                    </Form.Group>
                </Form>

                <Button
                    variant="primary"
                    onClick={() => setShowAddModal(true)}
                    className="d-flex align-items-center"
                >
                    <FaUserPlus className="me-2" />
                    Thêm Nhân Viên
                </Button>
            </div>

            <div className="mb-3 d-flex justify-content-end">
                <Form.Select
                    aria-label="Chọn số lượng nhân viên mỗi trang"
                    value={staffPerPage}
                    onChange={(e) => {
                        setStaffPerPage(parseInt(e.target.value));
                        setCurrentPage(0);
                    }}
                    style={{ width: "200px" }}
                >
                    <option value="5">5 nhân viên</option>
                    <option value="10">10 nhân viên</option>
                    <option value="20">20 nhân viên</option>
                    <option value="50">50 nhân viên</option>
                </Form.Select>
            </div>

            <Table striped bordered hover className="staff-management-table mt-3">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedStaff.map((member) => (
                        <tr key={member._id}>
                            <td style={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src={member.avatar || avatarDefault}
                                    alt={member.fullName}
                                    className="staff-management-staff-image"
                                />
                                {member.fullName}
                            </td>
                            <td>{member.email}</td>
                            <td>{member.phone}</td>
                            <td>{member.address}</td>
                            <td style={{ textAlign: "center" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                    <FaTrashAlt
                                        className="text-danger"
                                        onClick={() => confirmDelete(member._id)}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <p>{`Hiển thị ${filteredStaff.length} trên tổng ${staff.length} nhân viên.`}</p>

            {/* Pagination component */}
            <div className="staff-management-pagination-controls text-center">
                <ReactPaginate
                    pageCount={Math.ceil(filteredStaff.length / staffPerPage)}
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
                className="delete-staff-modal bg-dark bg-opacity-75"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác Nhận Xóa Nhân Viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa nhân viên này không?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Add Staff Modal */}
            <Modal
                show={showAddModal}
                onHide={() => {
                    setShowAddModal(false);
                    setValidated(false);
                    setNewStaff({
                        fullName: "",
                        email: "",
                        phone: "",
                        address: "",
                        avatar: avatarDefault,
                    });
                }}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Nhân Viên Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleAddStaff}>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên"
                                name="fullName"
                                value={newStaff.fullName}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập họ và tên
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                name="email"
                                value={newStaff.email}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập email hợp lệ
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                name="phone"
                                value={newStaff.phone}
                                onChange={handleInputChange}
                                required
                                pattern="[0-9]{10}"
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập số điện thoại hợp lệ (10 số)
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ"
                                name="address"
                                value={newStaff.address}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập địa chỉ
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center mt-4">
                            <Button variant="secondary" className="me-2" onClick={() => setShowAddModal(false)}>
                                Hủy
                            </Button>
                            <Button variant="primary" type="submit">
                                Thêm Nhân Viên
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default StaffManagement;
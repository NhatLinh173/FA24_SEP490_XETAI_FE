import React, { useState } from 'react';
import { Table, Form, Modal, Button } from 'react-bootstrap';
import { FaLock, FaUnlock, FaSortUp, FaSortDown } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const DriverManagement = () => {
    const initialDrivers = [
        { _id: '1', name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789', vehicleCount: 3, status: 'Active', completedTrips: 10, address: 'Hà Nội, Việt Nam', image: "https://www.msig.com.vn/sites/default/files/styles/_800xauto_/public/2021-01/7-meo-de-lai-xe-tu-tin.jpg?itok=imf1uO9Z" },
        { _id: '2', name: 'Trần Thị B', email: 'b@example.com', phone: '0987654321', vehicleCount: 1, status: 'Locked', completedTrips: 5, address: 'Đà Nẵng, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '3', name: 'Lê Văn C', email: 'c@example.com', phone: '0123456780', vehicleCount: 2, status: 'Active', completedTrips: 8, address: 'Hồ Chí Minh, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '4', name: 'Nguyễn Thị D', email: 'd@example.com', phone: '0123456781', vehicleCount: 4, status: 'Active', completedTrips: 12, address: 'Cần Thơ, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '5', name: 'Trần Văn E', email: 'e@example.com', phone: '0123456782', vehicleCount: 2, status: 'Locked', completedTrips: 2, address: 'Nha Trang, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '6', name: 'Lê Thị F', email: 'f@example.com', phone: '0123456783', vehicleCount: 3, status: 'Active', completedTrips: 9, address: 'Hải Phòng, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '7', name: 'Nguyễn Văn G', email: 'g@example.com', phone: '0123456784', vehicleCount: 1, status: 'Active', completedTrips: 6, address: 'Vũng Tàu, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '8', name: 'Trần Thị H', email: 'h@example.com', phone: '0123456785', vehicleCount: 2, status: 'Locked', completedTrips: 3, address: 'Hạ Long, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '9', name: 'Lê Văn I', email: 'i@example.com', phone: '0123456786', vehicleCount: 1, status: 'Active', completedTrips: 7, address: 'Huế, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '10', name: 'Nguyễn Thị J', email: 'j@example.com', phone: '0123456787', vehicleCount: 3, status: 'Locked', completedTrips: 1, address: 'Biên Hòa, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '11', name: 'Trần Văn K', email: 'k@example.com', phone: '0123456788', vehicleCount: 4, status: 'Active', completedTrips: 15, address: 'Đà Lạt, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '12', name: 'Lê Thị L', email: 'l@example.com', phone: '0123456789', vehicleCount: 1, status: 'Locked', completedTrips: 0, address: 'Thành phố Hồ Chí Minh, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '13', name: 'Nguyễn Văn M', email: 'm@example.com', phone: '0123456790', vehicleCount: 2, status: 'Active', completedTrips: 4, address: 'Nam Định, Việt Nam', image: 'https://via.placeholder.com/100' },
        { _id: '14', name: 'Trần Thị N', email: 'n@example.com', phone: '0123456791', vehicleCount: 5, status: 'Active', completedTrips: 20, address: 'Vinh, Việt Nam', image: 'https://via.placeholder.com/100' },
    ];

    const [drivers, setDrivers] = useState(initialDrivers);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [lockDuration, setLockDuration] = useState('');
    const [driversPerPage, setDriversPerPage] = useState(10); // Giá trị mặc định là 10

    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const filteredDrivers = drivers.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedDrivers = [...filteredDrivers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const displayedDrivers = sortedDrivers.slice(currentPage * driversPerPage, (currentPage + 1) * driversPerPage);

    const toggleDriverStatus = (id) => {
        const driver = drivers.find(driver => driver._id === id);
        if (driver.status === 'Active') {
            setSelectedDriver(id);
            setShowModal(true);
        } else {
            setDrivers(drivers.map(driver =>
                driver._id === id ? { ...driver, status: 'Active' } : driver
            ));
        }
    };

    const handleLock = () => {
        if (selectedDriver) {
            setDrivers(drivers.map(driver =>
                driver._id === selectedDriver ? { ...driver, status: `Locked (${lockDuration})` } : driver
            ));
            setShowModal(false);
            setLockDuration('');
            setSelectedDriver(null);
        }
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
        }
        return null;
    };

    return (
        <div className="driver-management-container mt-5">
            <h2 className="driver-management-title mb-4 text-center">Quản Lý Tài Xế</h2>

            <Form className="driver-management-search-form mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm tài xế..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                        }}
                        className="driver-management-search-input"
                    />
                </Form.Group>
            </Form>

            <div className="mb-3 d-flex justify-content-end">
                <Form.Select
                    aria-label="Chọn số lượng tài xế mỗi trang"
                    value={driversPerPage}
                    onChange={(e) => {
                        setDriversPerPage(parseInt(e.target.value));
                        setCurrentPage(0); // Quay lại trang đầu tiên sau khi thay đổi
                    }}
                    style={{ width: '200px' }}
                >
                    <option value="5">5 tài xế</option>
                    <option value="10">10 tài xế</option>
                    <option value="20">20 tài xế</option>
                    <option value="50">50 tài xế</option>
                </Form.Select>
            </div>

            <Table striped bordered hover className="driver-management-table mt-3">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                            Tên {getSortIcon('name')}
                        </th>
                        <th onClick={() => requestSort('email')} style={{ cursor: 'pointer' }}>
                            Email {getSortIcon('email')}
                        </th>
                        <th onClick={() => requestSort('phone')} style={{ cursor: 'pointer' }}>
                            Điện thoại {getSortIcon('phone')}
                        </th>
                        <th>Địa chỉ</th>
                        <th onClick={() => requestSort('vehicleCount')} style={{ cursor: 'pointer' }}>
                            Số lượng xe {getSortIcon('vehicleCount')}
                        </th>
                        <th onClick={() => requestSort('completedTrips')} style={{ cursor: 'pointer' }}>
                            Số chuyến hoàn thành {getSortIcon('completedTrips')}
                        </th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedDrivers.map((driver) => (
                        <tr key={driver._id}>
                            <td style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={driver.image} alt={driver.name} className="driver-management-driver-image" />
                                {driver.name}
                            </td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{driver.email}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{driver.phone}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{driver.address}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{driver.vehicleCount}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{driver.completedTrips}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>
                                {driver.status === 'Active' ? (
                                    <FaUnlock
                                        className="driver-management-status-icon text-success"
                                        onClick={() => toggleDriverStatus(driver._id)}
                                    />
                                ) : (
                                    <FaLock
                                        className="driver-management-status-icon text-danger"
                                        onClick={() => toggleDriverStatus(driver._id)}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <p>{`Hiển thị ${filteredDrivers.length} trên tổng ${drivers.length} tài xế.`}</p>

            <div className="driver-management-pagination-controls text-center">
                <ReactPaginate
                    pageCount={Math.ceil(filteredDrivers.length / driversPerPage)}
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

            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="driver-lock-modal">
                <Modal.Header closeButton className="driver-lock-modal-header">
                    <Modal.Title>Khóa Tài Xế</Modal.Title>
                </Modal.Header>
                <Modal.Body className="driver-lock-modal-body">
                    <h5 className="text-center mb-4">Chọn thời gian khóa:</h5>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="1 Ngày"
                            name="lockDuration"
                            value="1 ngày"
                            checked={lockDuration === '1 ngày'}
                            onChange={(e) => setLockDuration(e.target.value)}
                            className="driver-lock-modal-radio mb-2"
                            custom
                        />
                        <Form.Check
                            type="radio"
                            label="3 Ngày"
                            name="lockDuration"
                            value="3 ngày"
                            checked={lockDuration === '3 ngày'}
                            onChange={(e) => setLockDuration(e.target.value)}
                            className="driver-lock-modal-radio mb-2"
                            custom
                        />
                        <Form.Check
                            type="radio"
                            label="Vĩnh Viễn"
                            name="lockDuration"
                            value="vĩnh viễn"
                            checked={lockDuration === 'vĩnh viễn'}
                            onChange={(e) => setLockDuration(e.target.value)}
                            className="driver-lock-modal-radio mb-2"
                            custom
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="driver-lock-modal-footer">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
                    <Button variant="primary" onClick={handleLock}>Khóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DriverManagement;

import React, { useState } from 'react';
import { Table, Form, Modal, Button } from 'react-bootstrap';
import { FaLock, FaUnlock, FaSortUp, FaSortDown } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const CustomerManagement = () => {
    const initialCustomers = [
        {
            _id: '1',
            image: "https://www.msig.com.vn/sites/default/files/styles/_800xauto_/public/2021-01/7-meo-de-lai-xe-tu-tin.jpg?itok=imf1uO9Z",
            name: 'Nguyễn Văn A',
            email: 'a@example.com',
            phone: '0123456789',
            address: 'Hà Nội, Việt Nam',
            orderCount: 3,
            status: 'Active',
            transactionHistory: [
                { date: '2024-10-01', amount: 100, status: 'Completed' },
                { date: '2024-10-10', amount: 150, status: 'Pending' },
            ],
        },
        {
            _id: '2',
            image: 'https://via.placeholder.com/100',
            name: 'Trần Thị B',
            email: 'b@example.com',
            phone: '0987654321',
            address: 'Đà Nẵng, Việt Nam',
            orderCount: 1,
            status: 'Locked',
            transactionHistory: [
                { date: '2024-09-15', amount: 200, status: 'Completed' },
            ],
        },
        {
            _id: '3',
            image: 'https://via.placeholder.com/100',
            name: 'Lê Văn C',
            email: 'c@example.com',
            phone: '0123456780',
            address: 'Hồ Chí Minh, Việt Nam',
            orderCount: 2,
            status: 'Active',
            transactionHistory: [
                { date: '2024-10-05', amount: 250, status: 'Completed' },
                { date: '2024-10-20', amount: 300, status: 'Failed' },
            ],
        },
        // ... thêm các khách hàng khác ở đây
    ];

    const [customers, setCustomers] = useState(initialCustomers);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [lockDuration, setLockDuration] = useState('');
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [customersPerPage, setCustomersPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const displayedCustomers = sortedCustomers.slice(currentPage * customersPerPage, (currentPage + 1) * customersPerPage);

    const toggleCustomerStatus = (id) => {
        const customer = customers.find(customer => customer._id === id);
        if (customer.status === 'Active') {
            setSelectedCustomer(id);
            setShowModal(true);
        } else {
            setCustomers(customers.map(customer =>
                customer._id === id ? { ...customer, status: 'Active' } : customer
            ));
        }
    };

    const handleLock = () => {
        if (selectedCustomer) {
            setCustomers(customers.map(customer =>
                customer._id === selectedCustomer ? { ...customer, status: `Locked (${lockDuration})` } : customer
            ));
            setShowModal(false);
            setLockDuration('');
            setSelectedCustomer(null);
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

    const openTransactionModal = (customer) => {
        setSelectedCustomer(customer);
        setShowTransactionModal(true);
    };

    const closeTransactionModal = () => {
        setShowTransactionModal(false);
        setSelectedCustomer(null);
    };

    return (
        <div className="customer-management-container mt-5">
            <h2 className="customer-management-title mb-4 text-center">Quản Lý Khách Hàng</h2>

            <Form className="customer-management-search-form mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm khách hàng..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                        }}
                        className="customer-management-search-input"
                    />
                </Form.Group>
            </Form>

            <div className="mb-3 d-flex justify-content-end">
                <Form.Select
                    aria-label="Chọn số lượng khách hàng mỗi trang"
                    value={customersPerPage}
                    onChange={(e) => {
                        setCustomersPerPage(parseInt(e.target.value));
                        setCurrentPage(0);
                    }}
                    style={{ width: '200px' }}
                >
                    <option value="5">5 khách hàng</option>
                    <option value="10">10 khách hàng</option>
                    <option value="20">20 khách hàng</option>
                    <option value="50">50 khách hàng</option>
                </Form.Select>
            </div>

            <Table striped bordered hover className="customer-management-table mt-3">
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
                        <th onClick={() => requestSort('orderCount')} style={{ cursor: 'pointer' }}>
                            Số lượng đơn hàng {getSortIcon('orderCount')}
                        </th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCustomers.map((customer) => (
                        <tr key={customer._id}>
                            <td style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={customer.image} alt={customer.name} className="customer-management-avatar" />
                                {customer.name}
                            </td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{customer.email}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{customer.phone}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{customer.address}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>{customer.orderCount}</td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '38px' }}>
                                {customer.status === 'Active' ? (
                                    <FaUnlock
                                        className="customer-management-status-icon text-success"
                                        onClick={() => toggleCustomerStatus(customer._id)}
                                    />
                                ) : (
                                    <FaLock
                                        className="customer-management-status-icon text-danger"
                                        onClick={() => toggleCustomerStatus(customer._id)}
                                    />
                                )}
                            </td>
                            <td style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '25px' }}>
                                <Button variant="info" onClick={() => openTransactionModal(customer)}>
                                    Xem lịch sử
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="customer-management-pagination-controls text-center">
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    pageCount={Math.ceil(filteredCustomers.length / customersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="customer-lock-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Khóa Khách Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Chọn thời gian khoá:</h5>
                    <Form>
                        <Form.Group>
                            <Form.Check
                                type="radio"
                                label="1 Ngày"
                                name="lockDuration"
                                value="1 Ngày"
                                checked={lockDuration === '1 Ngày'}
                                onChange={() => setLockDuration('1 Ngày')}
                            />
                            <Form.Check
                                type="radio"
                                label="3 Ngày"
                                name="lockDuration"
                                value="3 Ngày"
                                checked={lockDuration === '3 Ngày'}
                                onChange={() => setLockDuration('3 Ngày')}
                            />
                            <Form.Check
                                type="radio"
                                label="Vĩnh viễn"
                                name="lockDuration"
                                value="Vĩnh viễn"
                                checked={lockDuration === '7 Ngày'}
                                onChange={() => setLockDuration('7 Ngày')}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleLock}>
                        Khóa
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTransactionModal} onHide={closeTransactionModal} centered className="customer-transaction-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Lịch Sử Giao Dịch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCustomer && selectedCustomer.transactionHistory && selectedCustomer.transactionHistory.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Số tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedCustomer.transactionHistory.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Không có lịch sử giao dịch.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeTransactionModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CustomerManagement;

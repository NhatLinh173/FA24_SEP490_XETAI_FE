import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaCog, FaUserCircle, FaSignOutAlt, FaKey } from 'react-icons/fa';

function AdminDashboardNavbar() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 admin-dashboard-navbar">
            <Navbar.Brand href="#home" className="admin-dashboard-navbar-brand">
                <span className="brand-icon">&#9733;</span>
                Admin Dashboard
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto admin-dashboard-navbar-nav"></Nav>
                <NavDropdown
                    title={
                        <>
                            <img
                                src="https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg"
                                alt="Admin Avatar"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
                            />
                            Quốc Khánh
                        </>
                    }
                    id="admin-avatar-dropdown"
                    align="end"
                >
                    <NavDropdown.Item disabled>
                        <strong>Quản lý thông tin</strong>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/admin-profile">
                        <FaUserCircle className="icon" /> Thông tin tài khoản
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#change-password">
                        <FaKey className="icon" /> Đổi mật khẩu
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#settings">
                        <FaCog className="icon" /> Cài Đặt
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#logout">
                        <FaSignOutAlt className="icon" /> Đăng xuất
                    </NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AdminDashboardNavbar;

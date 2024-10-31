import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaCar, FaUserTie, FaClipboardList, FaChartLine, FaNewspaper, FaFileSignature } from 'react-icons/fa';

function AdminDashboardSidebar({ setActiveSection }) {
    return (
        <Nav className="flex-column admin-dashboard-sidebar">
            <h2 className="sidebar-title text-uppercase fw-bold">Điều hướng</h2>
            <Nav.Link onClick={() => setActiveSection('dashboard')} className="sidebar-link active">
                <FaTachometerAlt className="icon" />
                <div className="sidebar-title">Trang chủ</div>
            </Nav.Link>

            <h2 className="sidebar-title text-uppercase fw-bold">Quản lý tài khoản</h2>
            <Nav.Link onClick={() => setActiveSection('customers')} className="sidebar-link">
                <FaUsers className="icon" />
                <div className="sidebar-title">Quản lý khách hàng</div>
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection('drivers')} className="sidebar-link">
                <FaCar className="icon" />
                <div className="sidebar-title">Quản lý tài xế</div>
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection('employees')} className="sidebar-link">
                <FaUserTie className="icon" />
                <div className="sidebar-title">Quản lý nhân viên</div>
            </Nav.Link>

            <h2 className="sidebar-title text-uppercase fw-bold">Quản lý hệ thống</h2>
            <Nav.Link onClick={() => setActiveSection('orders')} className="sidebar-link">
                <FaClipboardList className="icon" />
                <div className="sidebar-title">Quản lý đơn hàng</div>
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection('reports')} className="sidebar-link">
                <FaChartLine className="icon" />
                <div className="sidebar-title">Quản lý báo cáo</div>
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection('news')} className="sidebar-link">
                <FaNewspaper className="icon" />
                <div className="sidebar-title">Quản lý tin tức</div>
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection('vehicle-registration')} className="sidebar-link">
                <FaFileSignature className="icon" />
                <div className="sidebar-title">Quản lý đăng ký xe</div>
            </Nav.Link>
        </Nav>
    );
}

export default AdminDashboardSidebar;

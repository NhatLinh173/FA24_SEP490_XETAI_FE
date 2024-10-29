import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaCar, FaUserTie, FaClipboardList, FaChartLine, FaNewspaper, FaFileSignature } from 'react-icons/fa';

function AdminDashboardSidebar() {
    return (
        <Nav className="flex-column admin-dashboard-sidebar">
            <h2 className="sidebar-title text-uppercase fw-bold">Điều hướng</h2>
            <Nav.Link href="#dashboard" className="sidebar-link active">
                <FaTachometerAlt className="icon" /> Trang chủ
            </Nav.Link>

            <h2 className="sidebar-title text-uppercase fw-bold">Quản lý tài khoản</h2>
            <Nav.Link href="#customers" className="sidebar-link">
                <FaUsers className="icon" /> Quản lý khách hàng
            </Nav.Link>
            <Nav.Link href="#drivers" className="sidebar-link">
                <FaCar className="icon" /> Quản lý tài xế
            </Nav.Link>
            <Nav.Link href="#employees" className="sidebar-link">
                <FaUserTie className="icon" /> Quản lý nhân viên
            </Nav.Link>

            <h2 className="sidebar-title text-uppercase fw-bold">Quản lý hệ thống</h2>
            <Nav.Link href="#orders" className="sidebar-link">
                <FaClipboardList className="icon" /> Quản lý đơn hàng
            </Nav.Link>
            <Nav.Link href="#reports" className="sidebar-link">
                <FaChartLine className="icon" /> Quản lý báo cáo
            </Nav.Link>
            <Nav.Link href="#news" className="sidebar-link">
                <FaNewspaper className="icon" /> Quản lý tin tức
            </Nav.Link>
            <Nav.Link href="#vehicle-registration" className="sidebar-link">
                <FaFileSignature className="icon" /> Quản lý đăng ký xe
            </Nav.Link>
        </Nav>
    );
}

export default AdminDashboardSidebar;

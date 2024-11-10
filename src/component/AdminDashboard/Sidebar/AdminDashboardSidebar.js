import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUsers,
  FaCar,
  FaUserTie,
  FaClipboardList,
  FaChartLine,
  FaNewspaper,
  FaFileSignature,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminDashboardSidebar({ setActiveSection, activeSection }) {
  const [isReportsExpanded, setIsReportsExpanded] = useState(false); // Quản lý mở rộng/thu gọn phần báo cáo

  const handleLogout = () => {
    localStorage.removeItem("tabAdmin");
    window.location.href = "/login";
  };

  return (
    <Nav className="flex-column admin-dashboard-sidebar">
      <h2 className="sidebar-title text-uppercase fw-bold">Điều hướng</h2>
      <Nav.Link
        onClick={() => {
          setActiveSection("dashboard");
          localStorage.setItem("tabAdmin", "dashboard");
        }}
        className={`sidebar-link ${activeSection === "dashboard" ? "active" : ""}`}
      >
        <FaTachometerAlt className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Trang chủ</div>
      </Nav.Link>
      <hr className="admin-sidebar-divider" /> {/* Divider */}
      <h2 className="sidebar-title text-uppercase fw-bold">Quản lý tài khoản</h2>
      <Nav.Link
        onClick={() => {
          setActiveSection("customers");
          localStorage.setItem("tabAdmin", "customers");
        }}
        className={`sidebar-link ${activeSection === "customers" ? "active" : ""}`}
      >
        <FaUsers className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Quản lý khách hàng</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("drivers");
          localStorage.setItem("tabAdmin", "drivers");
        }}
        className={`sidebar-link ${activeSection === "drivers" ? "active" : ""}`}
      >
        <FaCar className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Quản lý tài xế</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => setActiveSection("staff")}
        className={`sidebar-link ${activeSection === "staff" ? "active" : ""}`}
      >
        <FaUserTie className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Quản lý nhân viên</div>
      </Nav.Link>
      <hr className="admin-sidebar-divider" /> {/* Divider */}
      <h2 className="sidebar-title text-uppercase fw-bold">Quản lý hệ thống</h2>
      <Nav.Link
        onClick={() => {
          setActiveSection("orders");
          localStorage.setItem("tabAdmin", "orders");
        }}
        className={`sidebar-link ${activeSection === "orders" ? "active" : ""}`}
      >
        <FaClipboardList className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Quản lý đơn hàng</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("reports");
          setIsReportsExpanded(!isReportsExpanded); // Toggle expand/collapse for reports section
          localStorage.setItem("tabAdmin", "reports");
        }}
        className="sidebar-link"  // Removed the active class logic
      >
        <FaChartLine className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Quản lý báo cáo</div>
      </Nav.Link>

      {/* Các mục con trong Quản lý báo cáo */}
      {isReportsExpanded && (
        <div className="sidebar-submenu">
          <Nav.Link
            onClick={() => {
              setActiveSection("posts-report");
              localStorage.setItem("tabAdmin", "posts-report");
            }}
            className={`sidebar-link ${activeSection === "posts-report" ? "active" : ""}`}
            style={{ fontWeight: "bold", paddingLeft: "60px" }}
          >
            Báo cáo bài đăng
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              setActiveSection("orders-report");
              localStorage.setItem("tabAdmin", "orders-report");
            }}
            className={`sidebar-link ${activeSection === "orders-report" ? "active" : ""}`}
            style={{ fontWeight: "bold", paddingLeft: "60px" }}
          >
            Báo cáo đơn hàng
          </Nav.Link>
        </div>
      )}

      <Nav.Link
        onClick={() => {
          setActiveSection("news");
          localStorage.setItem("tabAdmin", "news");
        }}
        className={`sidebar-link ${activeSection === "news" ? "active" : ""}`}
      >
        <FaNewspaper className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Quản lý tin tức</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("vehicles");
          localStorage.setItem("tabAdmin", "vehicles");
        }}
        className={`sidebar-link ${activeSection === "vehicles" ? "active" : ""}`}
      >
        <FaFileSignature className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Quản lý đăng ký xe</div>
      </Nav.Link>
      <hr className="admin-sidebar-divider" /> {/* Divider */}
      <h2 className="sidebar-title text-uppercase fw-bold">Thông tin cá nhân</h2>
      <Nav.Link
        onClick={() => {
          setActiveSection("admin-profile");
          localStorage.setItem("tabAdmin", "AdminProfile");
        }}
        className={`sidebar-link ${activeSection === "admin-profile" ? "active" : ""}`}
      >
        <FaUserCircle className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Thông tin cá nhân</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("admin-changePassword");
          localStorage.setItem("tabAdmin", "AdminChangePassword");
        }}
        className={`sidebar-link ${activeSection === "admin-changePassword" ? "active" : ""}`}
      >
        <FaKey className="admin-dashboard-sidebar-icon" />
        <div className="sidebar-title">Đổi mật khẩu</div>
      </Nav.Link>
      <hr className="admin-sidebar-divider" /> {/* Divider */}
      {/* Logout button */}
      <div className="logout-section mt-1">
        <Nav.Link onClick={handleLogout} className={`sidebar-link`}>
          <FaSignOutAlt className="admin-dashboard-sidebar-icon" />
          <div className="sidebar-title">Đăng xuất</div>
        </Nav.Link>
      </div>
    </Nav>
  );
}

export default AdminDashboardSidebar;

import React, { useEffect, useState } from "react";
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
} from "react-icons/fa";

function AdminDashboardSidebar({ setActiveSection, activeSection }) {
 
  return (
    <Nav className="flex-column admin-dashboard-sidebar">
      <h2 className="sidebar-title text-uppercase fw-bold">Điều hướng</h2>
      <Nav.Link
        onClick={() => {
          setActiveSection("dashboard");
          localStorage.setItem("tabAdmin", "dashboard");
        }}
        className={`sidebar-link ${
          activeSection === "dashboard" ? "active" : ""
        }`}
      >
        <FaTachometerAlt className="icon" />
        <div className="sidebar-title">Trang chủ</div>
      </Nav.Link>

      <h2 className="sidebar-title text-uppercase fw-bold">
        Quản lý tài khoản
      </h2>
      <Nav.Link
        onClick={() => {
          setActiveSection("customers");
          localStorage.setItem("tabAdmin", "customers");
        }}
        className={`sidebar-link ${
          activeSection === "customers" ? "active" : ""
        }`}
      >
        <FaUsers className="icon" />
        <div className="sidebar-title">Quản lý khách hàng</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("drivers");
          localStorage.setItem("tabAdmin", "drivers");
        }}
        className={`sidebar-link ${
          activeSection === "drivers" ? "active" : ""
        }`}
      >
        <FaCar className="icon" />
        <div className="sidebar-title">Quản lý tài xế</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => setActiveSection("staff")}
        className={`sidebar-link ${activeSection === "staff" ? "active" : ""}`}
      >
        <FaUserTie className="icon" />
        <div className="sidebar-title">Quản lý nhân viên</div>
      </Nav.Link>

      <h2 className="sidebar-title text-uppercase fw-bold">Quản lý hệ thống</h2>
      <Nav.Link
        onClick={() => {
          setActiveSection("orders");
          localStorage.setItem("tabAdmin", "orders");
        }}
        className={`sidebar-link ${activeSection === "orders" ? "active" : ""}`}
      >
        <FaClipboardList className="icon" />
        <div className="sidebar-title">Quản lý đơn hàng</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("reports");
          localStorage.setItem("tabAdmin", "reports");
        }}
        className={`sidebar-link ${
          activeSection === "reports" ? "active" : ""
        }`}
      >
        <FaChartLine className="icon" />
        <div className="sidebar-title">Quản lý báo cáo</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("news");
          localStorage.setItem("tabAdmin", "news");
        }}
        className={`sidebar-link ${activeSection === "news" ? "active" : ""}`}
      >
        <FaNewspaper className="icon" />
        <div className="sidebar-title">Quản lý tin tức</div>
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection("vehicle-registration");
          localStorage.setItem("tabAdmin", "news");
        }}
        className={`sidebar-link ${
          activeSection === "vehicle-registration" ? "active" : ""
        }`}
      >
        <FaFileSignature className="icon" />
        <div className="sidebar-title">Quản lý đăng ký xe</div>
      </Nav.Link>
    </Nav>
  );
}

export default AdminDashboardSidebar;

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminDashboardNavbar from "../component/AdminDashboard/Navbar/AdminDashboardNavbar";
import AdminDashboardSidebar from "../component/AdminDashboard/Sidebar/AdminDashboardSidebar";
import DashboardHome from "../component/AdminDashboard/DashboardHome/DashboardHome";
import DriverManagement from "../component/AdminDashboard/DriverManagement/DriverManagement";
import CustomerManagement from "../component/AdminDashboard/CustomerManagement/CustomerManagement";
import StaffManagement from "../component/AdminDashboard/StaffManagement/StaffManagement"; // Quản lý nhân viên
import OrderReport from "../component/AdminDashboard/ReportManagement/OrderReport";
import NewsManagement from "../component/AdminDashboard/NewsManagement/NewManagement";
import AdminProfile from "../component/AdminDashboard/AdminProfile/AdminProfile";
import PostReport from "../component/AdminDashboard/ReportManagement/PostReport";
import VehicleManager from "../component/AdminDashboard/VehicleManagement/vehicleManagement";
import StaffChangePassword from "../component/AdminDashboard/AdminProfile/StaffChangePassword.js";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("tabAdmin") || "dashboard"
  );

  useEffect(() => {
    localStorage.setItem("tabAdmin", activeSection);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "drivers":
        return <DriverManagement />;
      case "customers":
        return <CustomerManagement />;
      case "staff":
        return <StaffManagement />;
      case "orders-report":
        return <OrderReport />
      case "posts-report":
        return <PostReport />
      case "news":
        return <NewsManagement />;
      case "admin-profile":
        return <AdminProfile />;
      case "admin-changePassword":
        return <StaffChangePassword />;
      case "vehicles":
        return <VehicleManager />;
      default:
        return <DashboardHome />;;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminDashboardNavbar />
      <Container fluid>
        <Row>
          <Col md={2}>
            <AdminDashboardSidebar
              setActiveSection={setActiveSection}
              activeSection={activeSection} // Truyền activeSection vào Sidebar
            />
          </Col>
          <Col md={10} className="admin-dashboard-content">
            {renderContent()} {/* Render nội dung dựa trên activeSection */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;

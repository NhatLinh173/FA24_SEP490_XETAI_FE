import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminDashboardNavbar from "../component/AdminDashboard/Navbar/AdminDashboardNavbar";
import AdminDashboardSidebar from "../component/AdminDashboard/Sidebar/AdminDashboardSidebar";
import DashboardHome from "../component/AdminDashboard/DashboardHome/DashboardHome";
import DriverManagement from "../component/AdminDashboard/DriverManagement/DriverManagement";
import CustomerManagement from "../component/AdminDashboard/CustomerManagement/CustomerManagement";
import StaffManagement from "../component/AdminDashboard/StaffManagement/StaffManagement"; // Quản lý nhân viên
import ReportManagement from "../component/AdminDashboard/ReportManagement/ReportManagement";
import NewsManagement from "../component/AdminDashboard/NewsManagement/NewManagement";
import AdminProfile from "../component/AdminDashboard/AdminProfile/AdminProfile";
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
      case "reports":
        return <ReportManagement />;
      case "news":
        return <NewsManagement />;
      case "admin-profile":
        return <AdminProfile />;
      case "admin-changePassword":
        return <StaffChangePassword />;
      case "vehicles":
        return <VehicleManager />;
      default:
        return null;
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

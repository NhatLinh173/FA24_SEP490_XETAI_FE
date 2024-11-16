import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function AdminDashboardNavbar() {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mb-4 admin-dashboard-navbar"
    >
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
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              Quốc Khánh
            </>
          }
          id="admin-avatar-dropdown"
          align="end"
        ></NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminDashboardNavbar;

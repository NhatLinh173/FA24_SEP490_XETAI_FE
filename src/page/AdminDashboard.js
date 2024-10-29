import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminDashboardNavbar from '../component/AdminDashboard/Navbar/AdminDashboardNavbar'; // Thanh điều hướng chính
import AdminDashboardSidebar from '../component/AdminDashboard/Sidebar/AdminDashboardSidebar'; // Thanh menu bên cạnh
import DashboardHome from '../component/AdminDashboard/DashboardHome/DashboardHome'; // Trang chính của dashboard

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <AdminDashboardNavbar />

            <Container fluid>
                <Row>
                    <Col>
                        <AdminDashboardSidebar />
                    </Col>
                    <Col md={10} className="admin-dashboard-content">
                        <DashboardHome />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminDashboard;

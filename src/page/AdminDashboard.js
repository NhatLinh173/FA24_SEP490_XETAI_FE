import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminDashboardNavbar from '../component/AdminDashboard/Navbar/AdminDashboardNavbar'; // Navbar
import AdminDashboardSidebar from '../component/AdminDashboard/Sidebar/AdminDashboardSidebar'; // Sidebar
import DashboardHome from '../component/AdminDashboard/DashboardHome/DashboardHome'; // Dashboard Home
import DriverManagement from '../component/AdminDashboard/DriverManagement/DriverManagement'; // Driver Management
import CustomerManagement from '../component/AdminDashboard/CustomerManagement/CustomerManagement';


function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard'); // State to manage active section

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardHome />;
            case 'drivers':
                return <DriverManagement />;
            case 'customers':
                return <CustomerManagement />;
            default:
                return <DashboardHome />;
        }
    };

    return (
        <div className="admin-dashboard">
            <AdminDashboardNavbar />

            <Container fluid>
                <Row>
                    <Col md={2}>
                        <AdminDashboardSidebar setActiveSection={setActiveSection} /> {/* Pass function to set active section */}
                    </Col>
                    <Col md={10} className="admin-dashboard-content">
                        {renderContent()} {/* Render active content */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminDashboard;

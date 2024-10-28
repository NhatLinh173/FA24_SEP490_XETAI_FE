import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { FaTachometerAlt, FaCog, FaUserCircle, FaSignOutAlt, FaKey, FaUsers, FaCar, FaUserTie, FaClipboardList, FaChartLine, FaNewspaper, FaFileSignature } from 'react-icons/fa';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from 'recharts';

function AdminDashboard() {
  // Dữ liệu mẫu cho biểu đồ
  const dataVisitors = [
    { name: 'Jan', visitors: 4000 },
    { name: 'Feb', visitors: 3000 },
    { name: 'Mar', visitors: 2000 },
    { name: 'Apr', visitors: 2780 },
    { name: 'May', visitors: 1890 },
    { name: 'Jun', visitors: 2390 },
    { name: 'Jul', visitors: 3490 },
  ];

  const dataCustomers = [
    { name: 'New', value: 674 },
    { name: 'Return', value: 182 },
  ];

  return (
    <div className="admin-dashboard-body">
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 admin-dashboard-navbar">
        <Navbar.Brand href="#home" className="admin-dashboard-navbar-brand">
          <span className="brand-icon">&#9733;</span>
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto admin-dashboard-navbar-nav">
          </Nav>
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
            <NavDropdown.Item href="#profile">
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

      <Container fluid>
        <Row>
          <Col md={2} className="admin-dashboard-sidebar">
            <Nav className="flex-column">
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
          </Col>

          <Col md={10}>
            <Row className="mb-4">
              <Col md={3}>
                <Card className="admin-dashboard-card text-center admin-dashboard-bg-info text-white">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Orders Received</Card.Title>
                    <Card.Text className="admin-dashboard-card-text">486</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="admin-dashboard-card text-center admin-dashboard-bg-success text-white">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Total Sales</Card.Title>
                    <Card.Text className="admin-dashboard-card-text">1,641</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="admin-dashboard-card text-center admin-dashboard-bg-warning text-white">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Revenue</Card.Title>
                    <Card.Text className="admin-dashboard-card-text">$42,562</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="admin-dashboard-card text-center admin-dashboard-bg-danger text-white">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Total Profit</Card.Title>
                    <Card.Text className="admin-dashboard-card-text">$9,562</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Card className="admin-dashboard-card">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Unique Visitor</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dataVisitors}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="admin-dashboard-card">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Customers</Card.Title>
                    <div className="d-flex justify-content-between">
                      <div>New: 674</div>
                      <div>Return: 182</div>
                    </div>
                    <div className="admin-dashboard-chart-placeholder" style={{ marginTop: '20px', height: '300x' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dataCustomers}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {dataCustomers.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? "#82ca9d" : "#ff6384"} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Card className="admin-dashboard-card">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Subscribers</Card.Title>
                    <Card.Text className="admin-dashboard-card-text">8.62k Subscribers</Card.Text>
                    <Button className="admin-dashboard-btn-primary">Manage List</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="admin-dashboard-card">
                  <Card.Body>
                    <Card.Title className="admin-dashboard-card-title">Activity Feed</Card.Title>
                    <div>
                      <strong>Eddie uploaded new files</strong>
                      <p>10 min ago</p>
                      <strong>Jhon updated his profile</strong>
                      <p>30 min ago</p>
                      <strong>David commented on your post</strong>
                      <p>1 hour ago</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;

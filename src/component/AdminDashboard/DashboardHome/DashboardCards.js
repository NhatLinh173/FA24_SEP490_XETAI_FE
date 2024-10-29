import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell } from 'recharts';

function DashboardCards() {
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
                            <div className="admin-dashboard-chart-placeholder" style={{ marginTop: '20px', height: '300px' }}>
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
        </div>
    );
}

export default DashboardCards;

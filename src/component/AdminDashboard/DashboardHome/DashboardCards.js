import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboardCards = () => {
    // Data cho thống kê doanh số và đơn hàng
    const adminStatisticsData = [
        {
            title: 'Đơn Hàng Nhận Được',
            value: '486',
            trend: '+12.5%',
            bgClass: 'admin-card-info',
            monthlyTotal: '120', // Tổng trong tháng này
            overallTotal: '1,500' // Tổng toàn bộ
        },
        {
            title: 'Tổng Đơn Hàng',
            value: '1,641',
            trend: '+8.2%',
            bgClass: 'admin-card-success',
            monthlyTotal: '200', // Tổng trong tháng này
            overallTotal: '2,000' // Tổng toàn bộ
        },
        {
            title: 'Doanh Thu',
            value: '$42,562',
            trend: '+15.3%',
            bgClass: 'admin-card-warning',
            monthlyTotal: '$5,000', // Tổng trong tháng này
            overallTotal: '$50,000' // Tổng toàn bộ
        },
        {
            title: 'Tổng Lợi Nhuận',
            value: '$9,562',
            trend: '+6.8%',
            bgClass: 'admin-card-danger',
            monthlyTotal: '$1,200', // Tổng trong tháng này
            overallTotal: '$10,000' // Tổng toàn bộ
        }
    ];


    // Data cho biểu đồ lượt truy cập
    const adminVisitorChartData = [
        { month: 'T1', visitors: 4000 },
        { month: 'T2', visitors: 3000 },
        { month: 'T3', visitors: 2000 },
        { month: 'T4', visitors: 2780 },
        { month: 'T5', visitors: 1890 },
        { month: 'T6', visitors: 2390 },
        { month: 'T7', visitors: 3490 },
    ];

    // Data cho biểu đồ phân tích khách hàng
    const adminCustomerAnalyticsData = [
        { name: 'Khách Hàng Mới', value: 674, color: '#10B981' },
        { name: 'Khách Hàng Quay Lại', value: 182, color: '#6366F1' },
    ];

    return (
        <Container fluid className="admin-dashboard-container p-4">
            {/* Thẻ thống kê */}
            <Row className="admin-statistics-row mb-4">
                {adminStatisticsData.map((stat, index) => (
                    <Col key={index} xs={12} md={6} lg={3} className="mb-4">
                        <Card className={`admin-stat-card ${stat.bgClass}`}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="admin-stat-title mb-2">{stat.title}</h6>
                                        <h3 className="admin-stat-value mb-1">{stat.value}</h3>
                                        <small className="admin-stat-trend">{stat.trend}</small>
                                    </div>
                                </div>
                                {/* Thêm thông tin Tổng trong tháng này và Tổng toàn bộ */}
                                <div className="mt-3">
                                    <div className="admin-stat-subtitle">
                                        <strong>Tổng Trong Tháng Này:</strong> {stat.monthlyTotal}
                                    </div>
                                    <div className="admin-stat-subtitle">
                                        <strong>Tổng Toàn Bộ:</strong> {stat.overallTotal}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>


            {/* Biểu đồ thống kê */}
            <Row className="admin-charts-row">
                {/* Biểu đồ lượt truy cập */}
                <Col xs={12} lg={6} className="mb-4">
                    <Card className="admin-chart-card">
                        <Card.Body>
                            <h5 className="admin-chart-title mb-4">Thống Kê Lượt Truy Cập</h5>
                            <div className="admin-chart-container">
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={adminVisitorChartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#666"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="#666"
                                            fontSize={12}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="visitors"
                                            name="Lượt truy cập"
                                            stroke="#0d6efd"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Biểu đồ phân tích khách hàng */}
                <Col xs={12} lg={6} className="mb-4">
                    <Card className="admin-chart-card">
                        <Card.Body>
                            {/* Tiêu đề */}
                            <h5 className="admin-chart-title mb-4">Phân Tích Khách Hàng</h5>

                            {/* Biểu đồ */}
                            <div className="admin-chart-container mb-4">
                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={adminCustomerAnalyticsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {adminCustomerAnalyticsData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                            }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
};

export default AdminDashboardCards;
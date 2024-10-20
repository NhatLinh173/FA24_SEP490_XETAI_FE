import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bell, Settings, User, LogOut, Menu } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/adminDashboard.css";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-dashboard d-flex h-100">
      {/* Sidebar */}
      <aside className={`admin-sidebar bg-light ${sidebarOpen ? "show" : ""}`}>
        <div className="admin-sidebar-header p-3">
          <h1 className="admin-sidebar-title h4 mb-0">Admin Panel</h1>
        </div>
        <nav className="admin-sidebar-nav mt-3">
          <div className="list-group list-group-flush">
            <a
              href="#"
              className="admin-sidebar-link list-group-item list-group-item-action"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="admin-sidebar-link list-group-item list-group-item-action"
            >
              Users
            </a>
            <a
              href="#"
              className="admin-sidebar-link list-group-item list-group-item-action"
            >
              Staff
            </a>
            <a
              href="#"
              className="admin-sidebar-link list-group-item list-group-item-action"
            >
              Products
            </a>
            <a
              href="#"
              className="admin-sidebar-link list-group-item list-group-item-action"
            >
              Orders
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main flex-grow-1 p-3 overflow-auto">
        <div className="admin-header d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <button
              className="admin-sidebar-toggle btn btn-light d-md-none me-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <h2 className="admin-header-title h3 mb-0">Dashboard</h2>
          </div>
          <div className="admin-header-actions d-flex align-items-center">
            <button className="admin-header-action btn btn-light me-2">
              <Bell size={20} />
            </button>
            <button className="admin-header-action btn btn-light me-2">
              <Settings size={20} />
            </button>
            <div className="admin-user-menu dropdown">
              <button
                className="admin-user-menu-toggle btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <User size={20} />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <h6 className="dropdown-header">My Account</h6>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <LogOut className="me-2" size={16} /> Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats row g-4 mb-4">
          <div className="col-md-6 col-lg-3">
            <div className="admin-stat-card card">
              <div className="card-body">
                <h5 className="admin-stat-title card-title">Total Users</h5>
                <p className="admin-stat-value card-text h3">1,234</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="admin-stat-card card">
              <div className="card-body">
                <h5 className="admin-stat-title card-title">Total Orders</h5>
                <p className="admin-stat-value card-text h3">5,678</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="admin-stat-card card">
              <div className="card-body">
                <h5 className="admin-stat-title card-title">Revenue</h5>
                <p className="admin-stat-value card-text h3">$12,345</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="admin-stat-card card">
              <div className="card-body">
                <h5 className="admin-stat-title card-title">Conversion Rate</h5>
                <p className="admin-stat-value card-text h3">2.34%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="admin-chart card">
          <div className="card-body">
            <h5 className="admin-chart-title card-title">Sales Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#007bff" />
                <Bar dataKey="uv" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

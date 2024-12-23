import React, { useState, useEffect } from "react";
import { Table, Form, Modal, Button } from "react-bootstrap";
import { FaLock, FaUnlock } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import axiosIntance from "../../../config/axiosConfig";
import avatarDefault from "../../../assets/img/icon/avatarDefault.jpg";
import axios from "axios";
import { IoIosInformationCircleOutline } from "react-icons/io";
const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [lockDuration, setLockDuration] = useState("");
  const driversPerPage = 10;

  const filteredDrivers = drivers.filter((driver) =>
    driver.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axiosIntance.get(`/auth/role/driver`);

        if (response.status === 200) {
          const driversData = response.data.drivers.map((driver) => {
            return {
              driverId: driver._id,
              ...driver.userId,
            };
          });

          setDrivers(driversData);
        } else {
          console.error("Error fetching drivers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const displayedDrivers = filteredDrivers.slice(
    currentPage * driversPerPage,
    (currentPage + 1) * driversPerPage
  );

  const toggleDriverStatus = (id) => {
    const driver = drivers.find((driver) => String(driver._id) === String(id));
    if (!driver) {
      console.log("Driver not found for id:", id);
    } else {
      if (driver.isBlocked) {
        unlockDriverAccount(id);
      } else {
        setSelectedDriver(id);
        setShowModal(true);
      }
    }
  };

  const unlockDriverAccount = async (id) => {
    try {
      const response = await axios.put(
        `https://xehang.site/auth/user/${id}/unlock`
      );
      if (response.status === 200) {
        console.log(response);
        setDrivers(
          drivers.map((driver) =>
            driver._id === id ? { ...driver, isBlocked: false } : driver
          )
        );
        toast.success("Tài xế đã được mở khóa");
      } else {
        console.error("Error unlocking driver account:", response.statusText);
      }
    } catch (error) {
      console.error("Error unlocking driver account:", error);
    }
  };

  const lockDriverAccount = async (id, duration) => {
    try {
      const response = await axios.put(
        `https://xehang.site/auth/user/${id}/block`,
        {
          duration: duration,
        }
      );
      if (response.status === 200) {
        console.log(response);
        setDrivers(
          drivers.map((driver) =>
            driver._id === id ? { ...driver, isBlocked: true } : driver
          )
        );
        toast.success("Tài xế đã bị khóa thành công");
        setShowModal(false);
        setLockDuration("");
        setSelectedDriver(null);
      } else {
        console.error("Error locking driver account:", response.statusText);
      }
    } catch (error) {
      console.error("Error locking driver account:", error);
    }
  };

  const handleLock = () => {
    if (selectedDriver) {
      lockDriverAccount(selectedDriver, lockDuration);
    }
  };

  return (
    <div className="driver-management-container mt-5">
      <h2 className="driver-management-title mb-4 text-center">
        Quản Lý Tài Xế
      </h2>

      <Form className="driver-management-search-form mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm tài xế..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
            className="driver-management-search-input"
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover className="driver-management-table mt-3">
        <thead>
          <tr>
            <th>Tên </th>
            <th>Email</th>
            <th>Điện thoại </th>
            <th>Địa chỉ</th>

            <th>Trạng thái</th>

            <th>Thông Tin</th>
          </tr>
        </thead>
        <tbody>
          {displayedDrivers.map((driver) => (
            <tr key={driver.driverId}>
              {" "}
              {/* Sử dụng driverId để làm key */}
              <td style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={driver.avatar || avatarDefault}
                  alt={driver.fullName}
                  className="driver-management-driver-image"
                />
                {driver.fullName}
              </td>
              <td>{driver.email}</td>
              <td>{driver.phone}</td>
              <td>{driver.address}</td>
              <td>
                {driver.isBlocked ? (
                  <FaLock
                    className="driver-management-status-icon text-danger"
                    onClick={() => toggleDriverStatus(driver._id)}
                  />
                ) : (
                  <FaUnlock
                    className="driver-management-status-icon text-success"
                    onClick={() => toggleDriverStatus(driver._id)}
                  />
                )}
              </td>
              <td>
                <a href={`/driverDetailManagement/${driver.driverId}`}>
                  <IoIosInformationCircleOutline
                    style={{ fontSize: "1.5rem" }}
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="driver-management-pagination-controls text-center">
        <ReactPaginate
          pageCount={Math.ceil(filteredDrivers.length / driversPerPage)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          previousLabel={"<<"}
          nextLabel={">>"}
        />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="driver-lock-modal"
      >
        <Modal.Header closeButton className="driver-lock-modal-header">
          <Modal.Title>Khóa Tài Xế</Modal.Title>
        </Modal.Header>
        <Modal.Body className="driver-lock-modal-body">
          <h5 className="text-center mb-4">Chọn thời gian khóa:</h5>
          <Form.Group>
            <Form.Check
              type="radio"
              label="1 Ngày"
              name="lockDuration"
              value="1day"
              checked={lockDuration === "1day"}
              onChange={(e) => setLockDuration(e.target.value)}
              className="driver-lock-modal-radio mb-2"
              custom
            />
            <Form.Check
              type="radio"
              label="3 Ngày"
              name="lockDuration"
              value="3days"
              checked={lockDuration === "3days"}
              onChange={(e) => setLockDuration(e.target.value)}
              className="driver-lock-modal-radio mb-2"
              custom
            />
            <Form.Check
              type="radio"
              label="Vĩnh Viễn"
              name="lockDuration"
              value="forever"
              checked={lockDuration === "forever"}
              onChange={(e) => setLockDuration(e.target.value)}
              className="driver-lock-modal-radio mb-2"
              custom
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="driver-lock-modal-footer">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={handleLock}
            disabled={!lockDuration}
          >
            Khóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DriverManagement;

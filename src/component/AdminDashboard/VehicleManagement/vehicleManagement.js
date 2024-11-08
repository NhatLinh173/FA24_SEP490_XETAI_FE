import React, { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosConfig";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
function VehicleManager() {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration);
    setShowDeleteModal(false);
    setSelectedReason("");
  };

  const handleAccept = async () => {
    if (!selectedRegistration) {
      return;
    }

    const { _id } = selectedRegistration;

    try {
      const response = await axiosInstance.patch(`/car/update/status`, {
        id: _id,
        status: "approve",
      });
      if (response.status === 200) {
        const sendEmail = await axiosInstance.post("/send/email", {
          to: selectedRegistration.driverId.userId.email,
          subject: "Xe của bạn đã được chấp nhận",
          templateName: "carApprovalNotification",
          templateArgs: [selectedRegistration.driverId.userId.fullName, _id],
        });
      }
      toast.success("Đã xác nhận đăng ký xe thành công.");
      setTimeout(() => {
        handleCloseDetailModal();
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const handleDeleteRequest = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedReason && selectedRegistration) {
      const { driverId, _id } = selectedRegistration;
      try {
        const response = await axiosInstance.patch(`/car/update/status`, {
          id: _id,
          status: "cancel",
        });
        if (response.status === 200) {
          if (driverId && driverId.userId) {
            const sendEmail = await axiosInstance.post("/send/email", {
              to: selectedRegistration.driverId.userId.email,
              subject: "Chấp Nhận Đơn Hàng",
              templateName: "invalidCarRegistration",
              templateArgs: [
                selectedRegistration.driverId.userId.fullName,
                _id,
                selectedReason,
              ],
            });
            toast.success("Đã xóa đăng ký xe thành công.");
            setTimeout(() => {
              handleCloseDetailModal();
              handleCloseDeleteModal();
            }, 2000);
          } else {
            toast.error("Thông tin lái xe không hợp lệ.");
          }
        } else {
          toast.warning("Vui lòng chọn một lý do để xóa.");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
      }
    }
  };

  const handleCloseDetailModal = () => {
    setSelectedRegistration(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedReason("");
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get("/car/wait");
        setRegistrations(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đăng ký xe:", error);
      }
    };

    fetchCar();
  }, []);

  return (
    <div className="vehicle-manager container my-5">
      <h1 className="vehicle-manager__title text-center mb-4">
        Quản lý Đăng ký Xe
      </h1>

      <table className="vehicle-manager__table table table-striped table-bordered">
        <thead>
          <tr>
            <th>Tên xe</th>
            <th>Biển số xe</th>
            <th>Tên chủ xe</th>
            <th>Trọng tải</th>
            <th>Ngày hết hạn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration, index) => (
            <tr key={index}>
              <td>{registration.nameCar}</td>
              <td>{registration.licensePlate}</td>
              <td>{registration.driverId.userId.fullName}</td>
              <td>{registration.load} KG</td>
              <td>
                {new Date(registration.registrationDate).toLocaleDateString(
                  "vi-VN"
                )}
              </td>

              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <IoIosInformationCircleOutline
                  onClick={() => handleViewDetails(registration)}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRegistration && (
        <div
          className="modal show fade vehicle-modal"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog vehicle-dialog" role="document">
            <div className="modal-content vehicle-content">
              <div className="modal-header vehicle-header">
                <h5 className="modal-title vehicle-title">
                  Chi tiết Đăng ký Xe
                </h5>
                <button
                  type="button"
                  className="close vehicle-close"
                  onClick={handleCloseDetailModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body vehicle-body">
                <strong>Giấy phép đăng kiểm xe:</strong>
                <div>
                  <img
                    src={selectedRegistration.imageRegistration}
                    alt="Giấy xe đăng kiểm"
                    className="vehicle-image"
                  />
                </div>
                <p>
                  <strong>Ngày hết hạn:</strong>{" "}
                  {new Date(
                    selectedRegistration.registrationDate
                  ).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  <strong>Biển số xe:</strong>{" "}
                  {selectedRegistration.licensePlate}
                </p>
              </div>
              <div className="modal-footer vehicle-footer">
                <button
                  type="button"
                  className="btn btn-success vehicle-btn-accept"
                  onClick={handleAccept}
                >
                  Chấp nhận
                </button>
                <button
                  type="button"
                  className="btn btn-danger vehicle-btn-delete"
                  onClick={handleDeleteRequest}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal show fade"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="vehicle-title">Xác nhận Xóa</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseDeleteModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{ minWidth: "120px", padding: "15px 15px" }}
              >
                <label style={{ marginTop: "10px" }}>Chọn lý do xóa:</label>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="form-control"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    fontSize: "0.875rem",
                    padding: "5px 10px",
                  }}
                >
                  <option value="">-- Chọn lý do --</option>
                  <option value="Sai thông tin">Sai thông tin</option>
                  <option value="Xe không đủ điều kiện">
                    Xe không đủ điều kiện
                  </option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDeleteModal}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Xác nhận xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleManager;
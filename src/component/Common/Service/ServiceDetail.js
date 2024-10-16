import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";

const ServiceDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [negotiatedPrice, setNegotiatedPrice] = useState(""); // Giá thương lượng
  const [deliveryTime, setDeliveryTime] = useState(""); // Thời gian giao hàng
  const [isNegotiating, setIsNegotiating] = useState(false); // Xác định người dùng chọn thương lượng
  const [isConfirming, setIsConfirming] = useState(false); // Xác định người dùng đang xác nhận giá
  const [postData, setPostData] = useState("");
  const [inforPoster, setInforPoster] = useState("");
  const [idPoster, setIdPoster] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded && decoded.role) {
            return decoded.role;
          } else {
            throw new Error("Role not found in token");
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          return null;
        }
      }
      return null;
    };

    const role = decodeToken();
    setUserRole(role);
  }, []);

  console.log(userRole);

  useEffect(() => {
    const getPostById = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${id}`);
        console.log("Dữ liệu bài viết:", response.data);
        setPostData(response.data);
        if (response.data.creator && response.data.creator._id) {
          setIdPoster(response.data.creator._id);
          console.log("ID người đăng:", response.data.creator._id);
        } else {
          console.error("ID người đăng không hợp lệ:", response.data.creator);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài viết:", error);
      }
    };

    if (id) {
      getPostById();
    }
  }, [id]);

  useEffect(() => {
    const getCreatorInfo = async () => {
      try {
        if (!idPoster) {
          console.error("ID người đăng không hợp lệ:", idPoster);
          return;
        }

        const posterId =
          typeof idPoster === "string" ? idPoster : idPoster.toString();
        console.log("Poster ID:", posterId);

        const response = await axiosInstance.get(`/auth/user/${posterId}`);
        console.log("Phản hồi từ API:", response);

        // Kiểm tra dữ liệu trả về từ API
        if (response.data) {
          setInforPoster(response.data);
          console.log("Thông tin người đăng:", response.data);
        } else {
          console.error("Dữ liệu trả về không hợp lệ:", response);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người đăng:", error);
      }
    };

    if (idPoster) {
      getCreatorInfo();
    }
  }, [idPoster]);

  const handleAcceptOrder = () => {
    setShowModal(true); // Hiển thị modal
    setIsConfirming(true); // Bắt đầu xác nhận giá
  };

  const handleConfirmPrice = () => {
    setIsConfirming(false); // Không thương lượng, chấp nhận giá gốc
  };

  const handleNegotiatePrice = () => {
    setIsNegotiating(true); // Thương lượng giá
    setIsConfirming(false); // Đóng xác nhận giá
  };

  const handleSubmitOrder = () => {
    if (!deliveryTime) {
      toast.error("Vui lòng chọn thời gian dự kiến giao hàng");
      return;
    }
    setShowModal(false); // Đóng modal
    toast.success("Chấp nhận đơn hàng thành công", { autoClose: 2000 });
  };

  const handleSubmitNegotiation = () => {
    if (!deliveryTime) {
      toast.error("Vui lòng chọn thời gian dự kiến giao hàng");
      return;
    }
    setShowModal(false); // Đóng modal
    toast.success("Gửi yêu cầu thương lượng thành công", { autoClose: 2000 });
  };

  const handleCloseModal = () => {
    setShowModal(false); // Đóng modal
    setNegotiatedPrice(""); // Đặt lại giá thương lượng
    setDeliveryTime(""); // Đặt lại thời gian giao hàng
    setIsNegotiating(false); // Đặt lại trạng thái thương lượng
    setIsConfirming(false); // Đặt lại trạng thái xác nhận
  };

  const handlePriceChange = (e) => {
    // Lấy giá trị đầu vào và loại bỏ các ký tự không phải số
    const value = e.target.value.replace(/\D/g, "");
    // Định dạng số với dấu phẩy
    const formattedValue = new Intl.NumberFormat().format(value);
    setNegotiatedPrice(formattedValue);
  };

  const handleClose = () => {
    history.goBack(); // Quay lại trang trước
  };

  if (!postData) return <div>Loading...</div>;

  return (
    <div className="wrapper container pb-5">
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
      <div className="row">
        {/* Left Side: Service Details */}
        <div className="col-md-8">
          <div className="border rounded p-3 shadow-sm">
            {/* Service Information */}
            <div className="d-flex border-bottom pb-3 mb-3">
              <img
                src={postData.img}
                alt="service"
                className="img-fluid rounded"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
                Thông tin chi tiết
              </h5>
              <form>
                <div className="border rounded p-3 shadow-sm">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="type">Loại hàng</label>
                      <input
                        id="type"
                        defaultValue={postData.title}
                        type="text"
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="weight">Khối lượng</label>
                      <input
                        id="weight"
                        defaultValue={`${postData.load} kg`}
                        type="text"
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="price">Giá</label>
                      <input
                        id="price"
                        defaultValue={postData.price}
                        type="text"
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="pickupLocation">Địa điểm lấy hàng</label>
                      <input
                        id="pickupLocation"
                        defaultValue={postData.startPoint}
                        type="text"
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="dropoffLocation">Địa điểm trả hàng</label>
                      <input
                        id="dropoffLocation"
                        defaultValue={postData.destination}
                        type="text"
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="description">Mô tả đơn hàng</label>
                      <textarea
                        id="description"
                        defaultValue={postData.detail}
                        className="form-control"
                        readOnly
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Thông tin người đặt */}
            <div className="mt-4">
              <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
                Thông tin người đặt
              </h5>
              <div className="border rounded p-3 shadow-sm">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="posterName">Họ và tên</label>
                    <input
                      id="posterName"
                      defaultValue={postData.fullname}
                      type="text"
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="posterPhone">Số điện thoại</label>
                    <input
                      id="posterPhone"
                      defaultValue={postData.phone}
                      type="text"
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="posterEmail">Email</label>
                    <input
                      id="posterEmail"
                      defaultValue={postData.email}
                      type="text"
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin người nhận */}
            <div className="mt-4">
              <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
                Thông tin người nhận
              </h5>
              <div className="border rounded p-3 shadow-sm">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="receiverName">Họ và tên</label>
                    <input
                      id="receiverName"
                      defaultValue={postData.recipientName}
                      type="text"
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="receiverPhone">Số điện thoại</label>
                    <input
                      id="receiverPhone"
                      defaultValue={postData.recipientPhone}
                      type="text"
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="receiverEmail">Email</label>
                    <input
                      id="receiverEmail"
                      defaultValue={postData.recipientEmail}
                      type="text"
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-end">
              {userRole === "driver" && (
                <button
                  className="btn btn-accept-order"
                  onClick={handleAcceptOrder}
                >
                  Chấp nhận đơn hàng
                </button>
              )}
              <button className="btn btn-close-order" onClick={handleClose}>
                Đóng
              </button>
            </div>
          </div>

          {/* Modal */}
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            className="order-acceptance-modal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Chấp nhận đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isConfirming && !isNegotiating ? (
                <>
                  <p>Bạn có muốn chấp nhận giá này: {postData.price}?</p>
                  <Button
                    className="success text-white"
                    onClick={handleConfirmPrice}
                    style={{ marginBottom: "10px" }}
                  >
                    Đồng ý
                  </Button>
                  <Button
                    className="secondary text-white"
                    onClick={handleNegotiatePrice}
                  >
                    Thương lượng giá
                  </Button>
                </>
              ) : isNegotiating ? (
                <>
                  <p>Nhập giá mong muốn:</p>
                  <div className="input-group mb-3">
                    {" "}
                    {/* Sử dụng input-group */}
                    <input
                      type="text" // Đổi thành text để cho phép định dạng
                      className="form-control"
                      value={negotiatedPrice}
                      onChange={handlePriceChange}
                      placeholder="Nhập giá mong muốn"
                    />
                    <span className="currency-unit">VND</span>
                  </div>
                  <p>Thời gian dự kiến giao hàng:</p>
                  <input
                    type="datetime-local" // Sử dụng datetime-local
                    className="form-control mb-3"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Button
                    className="info text-white"
                    onClick={handleSubmitNegotiation}
                  >
                    Gửi yêu cầu thương lượng
                  </Button>
                </>
              ) : (
                <>
                  <p>Thời gian dự kiến giao hàng:</p>
                  <input
                    type="datetime-local" // Sử dụng datetime-local
                    className="form-control mb-3"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Button
                    className="info text-white"
                    onClick={handleSubmitOrder}
                  >
                    Gửi yêu cầu
                  </Button>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-close-order secondary"
                onClick={handleCloseModal}
              >
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Right Side: Sidebar */}
        <div className="col-md-4">
          <div className="border rounded p-3 shadow-sm">
            <h5
              className="font-weight-bold"
              style={{ textAlign: "center", marginBottom: "15px" }}
            >
              Người đăng bài
            </h5>
            <div className="contact-info">
              <div className="contact-avatar-wrapper">
                <img
                  src="https://via.placeholder.com/120"
                  className="contact-avatar"
                  alt="contact avatar"
                />
              </div>
              <div className="contact-details">
                <h5 className="contact-name">{inforPoster.fullName}</h5>
                <p className="contact-phone">{inforPoster.phone}</p>
                <p className="contact-email">{inforPoster.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;

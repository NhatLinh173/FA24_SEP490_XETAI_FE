import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";
import LoadingAnimation from "../../Animation/loadingAnimation";

const ServiceDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [negotiatedPrice, setNegotiatedPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [postData, setPostData] = useState("");
  const [inforPoster, setInforPoster] = useState("");
  const [idPoster, setIdPoster] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [dealId, setDealId] = useState(null);
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);

  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem("accessToken");
      const driverId = localStorage.getItem("driverId");
      setDriverId(driverId);
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

  useEffect(() => {
    const getPostById = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${id}`);
        setPostData(response.data);
        if (response.data.dealId && response.data.dealId.driverId) {
          setDealId(response.data.dealId.driverId._id);
        } else {
          setDealId(null);
        }

        if (response.data.creator && response.data.creator._id) {
          setIdPoster(response.data.creator._id);
          setPostId(response.data._id);
          setLoading(false);
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
        const response = await axiosInstance.get(`/auth/user/${posterId}`);
        if (response.data) {
          setInforPoster(response.data);
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

  if (loading) {
    return <LoadingAnimation />;
  }

  const handleAcceptOrder = async () => {
    // try {
    //   const response = await axiosInstance.get(`/car/driver/${driverId}`);
    //   if (response.data.length === 0) {
    //     toast.warn(
    //       "Bạn chưa đăng ký xe, vui lòng đăng ký xe để chấp nhận đơn hàng"
    //     );
    //   } else {
    //     setShowModal(true);
    //     setIsConfirming(true);
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 404) {
    //     toast.warn("Bạn cần thêm xe mới để có thể nhận được đơn hàng!");
    //   } else {
    //     console.error("Lỗi khác:", error);
    //   }
    // }
    setShowModal(true);
    setIsConfirming(true);
  };

  const handleConfirmPrice = () => {
    setIsConfirming(false);
  };

  const handleNegotiatePrice = () => {
    setIsNegotiating(true);
    setIsConfirming(false);
  };

  const handleSubmitOrder = async () => {
    if (!deliveryTime) {
      toast.error("Vui lòng chọn thời gian dự kiến giao hàng");
      return;
    }

    const currentTime = new Date();
    if (new Date(deliveryTime) <= currentTime) {
      toast.error(
        "Thời gian giao hàng dự kiến không được ở quá khứ hoặc bằng hiện tại"
      );
      return;
    }

    try {
      const response = await axiosInstance.patch(`/posts/${postId}/deal`, {
        driverId,
        status: "approve",
        deliveryTime,
        dealPrice: postData.price,
      });

      if (response.status === 200) {
        setShowModal(false);
        setIsOrderAccepted(true);
        toast.success("Chấp nhận đơn hàng thành công", { autoClose: 2000 });

        const sendEmail = await axiosInstance.post("/send/email", {
          to: postData.email,
          subject: "Chấp Nhận Đơn Hàng",
          templateName: "orderConfirmation",
          templateArgs: [postData.fullname, postData._id],
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 402) {
        toast.error(
          "Thời gian giao hàng dự kiến không được ở quá khứ và bằng hiện tại!"
        );
      } else {
        console.error(error);
      }
    }
  };

  const handleSubmitNegotiation = async () => {
    if (!deliveryTime) {
      toast.error("Vui lòng chọn thời gian dự kiến giao hàng");
      return;
    }

    const currentTime = new Date();
    if (new Date(deliveryTime) <= currentTime) {
      toast.error(
        "Thời gian giao hàng dự kiến không được ở quá khứ hoặc bằng hiện tại"
      );
      return;
    }
    try {
      const response = await axiosInstance.patch(`/posts/${postId}/deal`, {
        driverId,
        status: "wait",
        deliveryTime,
        dealPrice: negotiatedPrice,
      });
      if (response.status === 200) {
        setShowModal(false);
        setIsOrderAccepted(true);
        toast.success("Thương lượng giá thành công", { autoClose: 2000 });

        const sendEmail = await axiosInstance.post("/send/email", {
          to: postData.email,
          subject: "Thương lượng giá vận chuyển",
          templateName: "orderDealPrice",
          templateArgs: [postData.fullname, postData._id, driverId],
        });
      } else {
        console.error("Lỗi khi thương lượng giá:", response.data);
        toast.error("Thương lượng giá thất bại");
      }
    } catch (error) {
      if (error.response && error.response.status === 402) {
        toast.error(
          "Thời gian giao hàng dự kiến không được ở quá khứ và bằng hiện tại!"
        );
      } else {
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNegotiatedPrice("");
    setDeliveryTime("");
    setIsNegotiating(false);
    setIsConfirming(false);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = new Intl.NumberFormat().format(value);
    setNegotiatedPrice(formattedValue);
  };

  const handleClose = () => {
    history.goBack();
  };

  if (!postData) return <div>Loading...</div>;

  return (
    <div className="wrapper container pb-5">
      <ToastContainer />
      <div className="row">
        {/* Left Side: Service Details */}
        <div className="col-md-8">
          <div className="border rounded p-3 shadow-sm">
            {/* Service Information */}
            <div className="d-flex border-bottom pb-3 mb-3">
              {postData.images && postData.images.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {postData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`service-${index}`}
                      style={{
                        width: "220px",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p>No images available</p>
              )}
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
              {(userRole === "personal" || userRole === "business") &&
                // dealId !== driverId &&
                !isOrderAccepted && (
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
                    <input
                      type="text"
                      className="form-control"
                      value={negotiatedPrice}
                      onChange={handlePriceChange}
                      placeholder="Nhập giá mong muốn"
                    />
                    <span className="currency-unit">VND</span>
                  </div>
                  <p>Thời gian dự kiến giao hàng:</p>
                  <input
                    type="datetime-local"
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
                    type="datetime-local"
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

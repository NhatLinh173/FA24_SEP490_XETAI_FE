import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useInstanceData from "../../../config/useInstanceData";
import axios from "axios";
import axiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";
import { GiCancel } from "react-icons/gi";
import { GrHide } from "react-icons/gr";
import { FaCarSide, FaCheck } from "react-icons/fa6";
const HistoryPostDetail = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [cities, setCities] = useState([]);
  const [cityFrom, setCityFrom] = useState("");
  const [cityTo, setCityTo] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newtitle, setNewTitle] = useState("");
  const [newStartPoint, setNewStartPoint] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [recipientEmail, setRecipentEmail] = useState("");
  const [recipientName, setRecipentName] = useState("");
  const [recipientPhone, setRecipentPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [dealIdUpdate, setDealIdUpdate] = useState(null);
  const getCity = async () => {
    try {
      const res = await axios.get("https://provinces.open-api.vn/api/");
      setCities(res.data);
    } catch (error) {}
  };
  const { data: post } = useInstanceData(`/posts/${id}`);
  const { data: deals } = useInstanceData(`/dealPrice`);
  const handleConfirmDriver = async () => {
    try {
      const res = await axiosInstance.patch(`/dealPrice/status/${id}`, {
        dealId: dealIdUpdate,
        status: "approve",
      });
      console.log(res);
      setIsShowModal(false);
      if (res.status === 200) {
        toast.success("Xác nhận tài xế thành công");
      } else {
        toast.error("Xác nhận tài xế thất bại");
      }
    } catch (error) {}
  };
  useEffect(() => {
    setNewTitle(post.title);
    setNewPrice(post.price);
    setNewFullName(post.fullname);
    setNewPhone(post.phone);
    setNewEmail(post.email);
    setNewStartPoint(post.startPoint);
    setNewDestination(post.destination);
    setNewImage(post.image);
    setNewDetail(post.detail);
    setNewWeight(post.load);
    getCity();
    setCityFrom(post.startPointCity);
    setCityTo(post.destinationCity);
    setRecipentEmail(post.recipientEmail);
    setRecipentName(post.recipientName);
    setRecipentPhone(post.recipientPhone);
    setStatus(post.status);
  }, [post]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch(`/posts/${id}`, {
        title: newtitle,
        detail: newDetail,
        load: newWeight,
        fullname: newFullName,
        email: newEmail,
        phone: newPhone,
        startPoint: newStartPoint,
        destination: newDestination,
        price: newPrice,
        startPointCity: cityFrom,
        destinationCity: cityTo,
        recipientEmail,
        recipientPhone,
        recipientName,
        status,
        creator: userId,
      });
      if (res.status === 200) {
        toast.success("Cập nhật thành công!");
      }
    } catch (error) {
      if (error.res.status === 400) {
        toast.error("Cập nhật không thành công!");
      }
    }
  };
  const handleOpenModal = (dealId) => {
    setIsShowModal(true);
    setDealIdUpdate(dealId);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewFullName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const handleStartPoint = (e) => {
    setNewStartPoint(e.target.value);
  };
  const handleDestination = (e) => {
    setNewDestination(e.target.value);
  };
  const handlePrice = (e) => {
    setNewPrice(e.target.value);
  };
  const handleImage = (e) => {
    setNewImage(e.target.value);
  };
  const handleLoad = (e) => {
    setNewWeight(e.target.value);
  };
  const handleReceptionEmail = (e) => {
    setRecipentEmail(e.target.value);
  };
  const handleReceptionName = (e) => {
    setRecipentName(e.target.value);
  };
  const handleReceptionPhone = (e) => {
    setRecipentPhone(e.target.value);
  };

  const handleCityFrom = (e) => {
    setCityFrom(e.target.value);
  };
  const handleCityTo = (e) => {
    setCityTo(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

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
                src="https://lawnet.vn/uploads/image/2023/06/09/043314645.jpg"
                alt="service"
                className="img-fluid rounded"
                style={{ width: "100%", height: "auto", objectFit: "flex" }}
              />
            </div>
            <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
              Trạng thái đơn hàng
            </h5>
            <div className="form-group col-md-6 ">
              {post.status === "cancel" && (
                <button className="btn-sm btn-danger mt-3 border-0 d-flex align-items-center">
                  <GiCancel className="mr-2" />
                  Đã hủy
                </button>
              )}

              {(post.status === "wait" || post.status === "hide") && (
                <select
                  id="orderAction"
                  className={`form-control w-75 ${
                    status === "cancel"
                      ? "bg-danger text-white "
                      : status === "hide"
                      ? "bg-secondary text-white "
                      : status === "wait"
                      ? "bg-warning text-Black"
                      : ""
                  } `}
                  value={status}
                  onChange={handleStatus}
                >
                  <option value="hide" class="bg-white options-text">
                    Tạm ẩn đơn hàng
                  </option>
                  <option value="cancel" class="bg-white options-text">
                    Hủy đơn hàng
                  </option>
                  <option value="wait" class="bg-white options-text">
                    Đang chờ duyệt
                  </option>
                </select>
              )}
              {post.status === "inprogress" && (
                <button className="btn-sm btn-primary mt-3 border-0 d-flex align-items-center">
                  <FaCarSide className="mr-2" />
                  Đang giao hàng
                </button>
              )}
              {post.status === "approve" && (
                <select
                  id="orderAction"
                  className={`form-control w-75 ${
                    status === "cancel"
                      ? "bg-danger text-white "
                      : status === "approve"
                      ? "bg-info text-white"
                      : ""
                  } `}
                  value={status}
                  onChange={handleStatus}
                >
                  <option value="cancel" class="bg-white options-text">
                    Hủy đơn hàng
                  </option>
                  <option value="approve" class="bg-white options-text">
                    Tài xế đã nhận đơn
                  </option>
                </select>
              )}
              {post.status === "finish" && (
                <button className="btn-sm btn-success mt-3 border-0 d-flex align-items-center">
                  <FaCheck className="mr-2" />
                  Đã giao hàng
                </button>
              )}
            </div>

            <div>
              <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
                Thông tin chi tiết
              </h5>
              <form>
                <div className="border rounded p-3 shadow-sm">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label
                        htmlFor="pickupLocation"
                        className="font-weight-bold"
                      >
                        Địa chỉ nhận hàng
                      </label>
                      <div className="d-flex">
                        <select
                          className="w-25 "
                          onChange={handleCityFrom}
                          value={cityFrom}
                        >
                          {cities.map((city) => (
                            <option value={city.name}>{city.name}</option>
                          ))}
                        </select>
                        <div className="flex-1">
                          <input
                            id="pickupLocation"
                            value={newStartPoint}
                            onChange={handleStartPoint}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <label
                        htmlFor="dropoffLocation"
                        className="font-weight-bold"
                      >
                        Địa chỉ giao hàng
                      </label>
                      <div className="d-flex ">
                        <select
                          className="w-25"
                          onChange={handleCityTo}
                          value={cityTo}
                        >
                          {cities.map((city) => (
                            <option value={city.name}>{city.name}</option>
                          ))}
                        </select>
                        <div className="flex-1">
                          <input
                            id="dropoffLocation"
                            value={newDestination}
                            onChange={handleDestination}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="type" className="font-weight-bold">
                        Loại hàng
                      </label>
                      <input
                        id="type"
                        value={newtitle}
                        type="text"
                        className="form-control"
                        onChange={handleTitle}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="weight" className="font-weight-bold">
                        Tổng Trọng Lượng (KG)
                      </label>
                      <input
                        id="weight"
                        value={newWeight}
                        onChange={handleLoad}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="price" className="font-weight-bold">
                        Giá
                      </label>
                      <input
                        id="price"
                        value={newPrice}
                        onChange={handlePrice}
                        type="text"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <label htmlFor="description" className="font-weight-bold">
                        Mô tả đơn hàng
                      </label>
                      <textarea
                        id="description"
                        value={newDetail}
                        onChange={newDestination}
                        className="form-control"
                        rows="4"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <h5
                        className="font-weight-bold"
                        style={{ marginTop: "20px" }}
                      >
                        Thông tin người nhận
                      </h5>
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="name" className="font-weight-bold">
                        Họ và Tên
                      </label>

                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={recipientName}
                        onChange={handleReceptionName}
                      />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="email" className="font-weight-bold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={recipientEmail}
                        onChange={handleReceptionEmail}
                      />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="phone" className="font-weight-bold">
                        Số điện thoại
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        className="form-control"
                        value={recipientPhone}
                        onChange={handleReceptionPhone}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <h5
                        className="font-weight-bold"
                        style={{ marginTop: "20px" }}
                      >
                        Thông tin người đặt
                      </h5>
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="name" className="font-weight-bold">
                        Họ và Tên
                      </label>

                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={newFullName}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="email" className="font-weight-bold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={newEmail}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="phone" className="font-weight-bold">
                        Số điện thoại
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        className="form-control"
                        value={newPhone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-70 d-flex justify-content-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-25 "
                    onClick={handleSubmitForm}
                  >
                    <span>Cập nhật</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Right Side: Contact Info */}
        {post.status === "wait" && (
          <div className="col-md-4 " style={{ right: "20px", width: "300px" }}>
            <div className="card border ">
              <div className="card-header">
                <h3>Tài xế đang thương lượng</h3>
              </div>
              <ul className="list-group list-group-flush">
                {deals.map(
                  (
                    deal,
                    index // Sử dụng vòng lặp map để tạo danh sách
                  ) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>Tài xế: </strong>
                        <span>{deal.driverId.userId.fullName}</span>
                        <br />
                        <strong>Giá: </strong>
                        <span>{deal.dealPrice}</span>
                      </div>
                      <button
                        className="btn-success btn-sm "
                        style={{ border: "none" }}
                        onClick={() => handleOpenModal(deal._id)}
                      >
                        Xác nhận
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
        {isShowModal && (
          <div
            className="modal fade show"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Xác nhận đơn hàng
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Bạn có chắc chắn muốn xác nhận tài xế này không?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCloseModal}
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleConfirmDriver}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Hiển thị tài xế nếu đơn hàng đã được approve */}
        {post?.dealId && (
          <div className="col-md-4">
            <div className="border rounded p-3 shadow-sm ">
              <h3 className="text-center border-bottom pb-2 mb-3 ">
                Thông tin tài xế
              </h3>
              <div className="contact-info">
                <div className="contact-avatar-wrapper rounded-circle">
                  {post?.dealId.driverId.userId.avatar && (
                    <img
                      src={post.dealId.driverId.userId.avatar}
                      className="contact-avatar rounded-circle"
                      alt="contact avatar"
                    />
                  )}
                </div>
                <div className="contact-details">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Tài xế:</strong>
                      <span className="text-muted">
                        {post?.dealId.driverId.userId.fullName}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light mt-2">
                      <strong>Số điện thoại:</strong>
                      <span className="text-muted">
                        {post?.dealId.driverId.userId.phone}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light mt-2">
                      <strong>Email:</strong>
                      <span className="text-muted">
                        {post?.dealId.driverId.userId.email}
                      </span>
                    </li>
                  </ul>
                  <button
                    className="btn-success rounded border-0 mt-2 text-white"
                    onClick={() => {
                      /* Thêm logic để xem chi tiết tài xế */
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPostDetail;

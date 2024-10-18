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
import { IoCloseCircleOutline } from "react-icons/io5";
import imgUpload from "../../../assets/img/homepage/output-onlinepngtools.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
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
  const [newDetail, setNewDetail] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [recipientEmail, setRecipentEmail] = useState("");
  const [recipientName, setRecipentName] = useState("");
  const [recipientPhone, setRecipentPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [dealIdUpdate, setDealIdUpdate] = useState(null);
  const [isShowModalCancel, setIsShowModalCancel] = useState(false);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // các biến lỗi
  const [titleError, setTitleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [startPointError, setStartPointError] = useState("");
  const [destinationError, setDestinationError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [recipentEmailError, setRecipentEmailError] = useState("");
  const [recipentNameError, setRecipentNameError] = useState("");
  const [recipentPhoneError, setRecipentPhoneError] = useState("");
  const [detailError, setDetailError] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [totalImage, setTotalImage] = useState([]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
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
      setIsShowModal(false);
      if (res.status === 200) {
        toast.success("Xác nhận tài xế thành công");
      } else {
        toast.error("Xác nhận tài xế thất bại");
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (post) {
      if (!Array.isArray(images) || images.length === 0) {
        setImages(post.images || []);
      }

      setNewTitle(post.title);
      setNewPrice(post.price);
      setNewFullName(post.fullname);
      setNewPhone(post.phone);
      setNewEmail(post.email);
      setNewStartPoint(post.startPoint);
      setNewDestination(post.destination);
      setNewDetail(post.detail);
      setNewWeight(post.load);
      getCity();
      setCityFrom(post.startPointCity);
      setCityTo(post.destinationCity);
      setRecipentEmail(post.recipientEmail);
      setRecipentName(post.recipientName);
      setRecipentPhone(post.recipientPhone);
      setStatus(post.status);
    }
  }, [post]);

  // Tách logic cập nhật totalImage ra khỏi useEffect
  useEffect(() => {
    if (Array.isArray(images) && Array.isArray(newImages)) {
      let total = [...images, ...newImages.map((img) => img.url)];
      setTotalImage(total);
      console.log("hiển thị trên UI: ", total);
      console.log("Ảnh cũ:", images);
      console.log("Ảnh mới:", newImages);
    }
  }, [images, newImages]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (status === "cancel") {
      setIsShowModalCancel(true);
    } else {
      const formData = new FormData();
      newImages.forEach((img) => {
        formData.append("newImages", img.file);
      });
      formData.append("creator", userId);
      formData.append("email", newEmail);
      formData.append("phone", newPhone);
      formData.append("fullname", newFullName);
      formData.append("title", newtitle);
      formData.append("startPoint", newStartPoint);
      formData.append("destination", newDestination);
      formData.append("load", newWeight);
      formData.append("price", newPrice);
      formData.append("detail", newDetail);
      formData.append("startPointCity", cityFrom);
      formData.append("destinationCity", cityTo);
      formData.append("recipientEmail", recipientEmail);
      formData.append("recipientName", recipientName);
      formData.append("recipientPhone", recipientPhone);
      formData.append("status", status);
      formData.append("oldImages", images);

      try {
        const res = await axiosInstance.patch(`/posts/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        if (res.status === 200) {
          toast.success("Cập nhật thành công!");
        }
      } catch (error) {
        toast.error("Cập nhật không thành công!");
      }
    }
  };
  const handleCloseModalCancel = () => {
    setIsShowModalCancel(false);
  };
  const handleConfirmModalCancel = () => {
    console.log("da tru tien");
    setIsShowModalCancel(false);
  };
  const handleOpenModal = (dealId) => {
    setIsShowModal(true);
    setDealIdUpdate(dealId);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  const handleTitle = (e) => {
    const value = e.target.value;
    if (value.length > 50) {
      setTitleError("*Trường này giới hạn 50 ký tự");
      setIsDisable(true);
      setTitleError("");
    }
    setNewTitle(value);
    setIsDisable(false);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setNewEmail(emailValue);
    if (!isValidEmail(emailValue)) {
      setEmailError("*Email không hợp lệ");
      setIsDisable(true);
    } else {
      setEmailError("");
      setIsDisable(false);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]+$/;
    if (value.length > 30) {
      setFullNameError("*Trường này giới hạn 30 ký tự");
      setIsDisable(true);
    } else if (!nameRegex.test(value)) {
      setFullNameError("*Trường này không được nhập số");
      setIsDisable(true);
    } else {
      setFullNameError("");
      setIsDisable(false);
    }
    setNewFullName(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setPhoneError("*Trường này chỉ nhập số");
      setIsDisable(true);
    } else if (value.length !== 10) {
      setPhoneError("*Trường này chỉ nhập 10 số");
      setIsDisable(true);
    } else {
      setPhoneError("");
      setIsDisable(false);
    }
    setNewPhone(value);
  };

  const handleStartPoint = (e) => {
    const value = e.target.value;
    if (value.length > 60) {
      setStartPointError("*Trường này giới hạn 60 ký tự");
      setIsDisable(true);
    } else {
      setStartPointError("");
      setIsDisable(false);
    }
    setNewStartPoint(value);
  };

  const handleDestination = (e) => {
    const value = e.target.value;
    if (value.length > 60) {
      setDestinationError("*Trường này giới hạn 60 ký tự");
      setIsDisable(true);
    } else {
      setDestinationError("");
      setIsDisable(false);
    }
    setNewDestination(value);
  };

  const handlePrice = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Chỉ cho phép nhập số
    if (value === "") {
      setNewPrice("");
      setPriceError("*Trường này không được để trống");
      setIsDisable(true);
    } else {
      const formattedValue = new Intl.NumberFormat().format(value);
      setNewPrice(formattedValue);
      setPriceError("");
      setIsDisable(false);
    }
  };

  const handleLoad = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setWeightError("*Trường này chỉ nhập số");
      setIsDisable(true);
    } else {
      setWeightError("");
      setIsDisable(false);
    }
    setNewWeight(value);
  };
  const handleNewDetail = (e) => {
    const value = e.target.value;

    if (value.length > 150) {
      setDetailError("*Trường này giới hạn 150 kí tự");
      setIsDisable(true);
    } else {
      setDetailError(""); // Xóa lỗi khi hợp lệ
      setIsDisable(false);
    }

    setNewDetail(value); // Cập nhật giá trị mới cho detail
  };
  const handleReceptionEmail = (e) => {
    const emailValue = e.target.value;
    setRecipentEmail(emailValue);
    if (!isValidEmail(emailValue)) {
      setRecipentEmailError("*Email không hợp lệ");
      setIsDisable(true);
    } else {
      setRecipentEmailError("");
      setIsDisable(false);
    }
  };

  const handleReceptionName = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]+$/;
    if (value.length > 30) {
      setRecipentNameError("*Trường này giới hạn 30 ký tự");
      setIsDisable(true);
    } else if (!nameRegex.test(value)) {
      setRecipentNameError("*Trường này không được nhập số");
      setIsDisable(true);
    } else {
      setRecipentNameError("");
      setIsDisable(false);
    }
    setRecipentName(value);
  };

  const handleReceptionPhone = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setRecipentPhoneError("*Trường này chỉ nhập số");
      setIsDisable(true);
    } else if (value.length !== 10) {
      setRecipentPhoneError("*Trường này chỉ nhập 10 số");
      setIsDisable(true);
    } else {
      setRecipentPhoneError("");
      setIsDisable(false);
    }
    setRecipentPhone(value);
  };

  // Hàm kiểm tra email
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + totalImage.length > 3) {
      toast.error("You can only upload up to 3 images.");
      return;
    }
    const filePreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setNewImages((prevImgs) => [...prevImgs, ...filePreviews]);
  };
  const handleDeleteImage = (index) => {
    const updatedImgs = images.filter((_, i) => i !== index);
    setImages(updatedImgs);
    setTotalImage(updatedImgs);
  };

  return (
    <div className="wrapper container pb-5">
      <ToastContainer />
      <div className="row">
        {/* Left Side: Service Details */}
        <div className="col-md-8">
          {(post.status === "wait" || post.status === "hide") && (
            <div>
              {totalImage.length > 0 && (
                <div>
                  {/* Hiển thị ảnh đã tải lên */}
                  <div
                    className={`d-flex image-form align-items-center mb-3 ${
                      totalImage.length === 1
                        ? "justify-content-center"
                        : totalImage.length === 2
                        ? "justify-content-center w-100"
                        : "justify-content-between w-100"
                    }`}
                  >
                    {totalImage.map((image, index) => (
                      <div
                        className={`position-relative border rounded-12 p-3 d-inline-block ${
                          totalImage.length === 1 ? "w-75" : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          className={`rounded-12 ${
                            totalImage.length === 1 ? "w-100" : ""
                          }`}
                        />
                        <IoCloseCircleOutline
                          className={`position-absolute ${
                            totalImage.length === 1
                              ? "delete-img"
                              : "delete-imgs"
                          }`}
                          onClick={() => handleDeleteImage(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-center">
                <input
                  className="input-custom"
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label
                  className="border rounded-12 p-3 pointer img-upload width-img"
                  htmlFor="file-upload"
                >
                  <img src={imgUpload} alt="upload" />
                </label>
                <p className="font-weight-bold">Tải ảnh lên</p>
              </div>
            </div>
          )}

          <div className="border rounded p-3 shadow-sm">
            {/* Service Information */}
            {(post.status === "cancel" ||
              post.status === "inprogress" ||
              post.status === "finish" ||
              post.status === "approve") && (
              <div className="d-flex border-bottom pb-3 mb-3">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    {images &&
                      images.map((img, index) => (
                        <div
                          className={`carousel-item ${
                            index === activeIndex ? "active" : ""
                          }`}
                        >
                          <img
                            src={img}
                            alt="service"
                            className="img-fluid rounded"
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "flex",
                            }}
                          />
                        </div>
                      ))}
                  </div>
                  <button
                    className="carousel-control-prev border-0 carousel-bg"
                    type="button"
                    data-target="#carouselExampleControls"
                    data-slide="prev"
                    onClick={prevSlide}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next border-0  carousel-bg"
                    type="button"
                    data-target="#carouselExampleControls"
                    data-slide="next"
                    onClick={nextSlide}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </button>
                </div>
              </div>
            )}
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
                          disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                          style={
                            post.status === "approve"
                              ? { cursor: "not-allowed" }
                              : {}
                          }
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
                            className="form-control position-relative"
                            disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                            style={
                              post.status === "approve"
                                ? { cursor: "not-allowed" }
                                : {}
                            }
                          />
                          {startPointError && (
                            <div className="text-danger position-absolute ">
                              {startPointError}
                            </div>
                          )}
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
                          disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                          style={
                            post.status === "approve"
                              ? { cursor: "not-allowed" }
                              : {}
                          }
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
                            className="form-control position-relative"
                            disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                            style={
                              post.status === "approve"
                                ? { cursor: "not-allowed" }
                                : {}
                            }
                          />
                          {destinationError && (
                            <div className="text-danger position-absolute ">
                              {destinationError}
                            </div>
                          )}
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
                        className="form-control position-relative"
                        onChange={handleTitle}
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {titleError && (
                        <div className="text-danger position-absolute bt-error">
                          {titleError}
                        </div>
                      )}
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
                        className="form-control position-relative"
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {weightError && (
                        <div className="text-danger position-absolute bt-error">
                          {weightError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="price" className="font-weight-bold ">
                        Giá vận chuyển
                      </label>
                      <input
                        id="price"
                        value={newPrice}
                        onChange={handlePrice}
                        type="text"
                        className="form-control position-relative"
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {priceError && (
                        <div className="text-danger position-absolute bt-error ">
                          {priceError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <label htmlFor="description" className="font-weight-bold">
                        Mô tả đơn hàng
                      </label>
                      <textarea
                        id="description"
                        value={newDetail}
                        onChange={handleNewDetail}
                        className="form-control position-relative"
                        rows="4"
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />

                      {detailError && (
                        <div className="text-danger position-absolute bt-error">
                          {detailError}
                        </div>
                      )}
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
                        className="form-control position-relative"
                        value={recipientName}
                        onChange={handleReceptionName}
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {recipentNameError && (
                        <div className="text-danger position-absolute bt-error">
                          {recipentNameError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="email" className="font-weight-bold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control position-relative"
                        value={recipientEmail}
                        onChange={handleReceptionEmail}
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {recipentEmailError && (
                        <div className="text-danger position-absolute bt-error">
                          {recipentEmailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="phone" className="font-weight-bold">
                        Số điện thoại
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        className="form-control position-relative"
                        value={recipientPhone}
                        onChange={handleReceptionPhone}
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />

                      {recipentPhoneError && (
                        <div className="text-danger position-absolute bt-error">
                          {recipentPhoneError}
                        </div>
                      )}
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
                        className="form-control position-relative"
                        value={newFullName}
                        onChange={handleNameChange}
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {fullNameError && (
                        <div className="text-danger position-absolute bt-error">
                          {fullNameError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="email" className="font-weight-bold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control position-relative"
                        value={newEmail}
                        onChange={handleEmailChange}
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {emailError && (
                        <div className="text-danger position-absolute bt-error">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="phone" className="font-weight-bold">
                        Số điện thoại
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        className="form-control position-relative"
                        value={newPhone}
                        onChange={handlePhoneChange}
                        disabled={post.status === "approve"} // Kiểm tra trạng thái đơn
                        style={
                          post.status === "approve"
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      />
                      {phoneError && (
                        <div className="text-danger position-absolute bt-error">
                          {phoneError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-70 d-flex justify-content-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-25  cursor-disable"
                    onClick={handleSubmitForm}
                    disabled={isDisable}
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
          <div className="col-md-4" style={{ right: "20px", width: "300px" }}>
            <div className="card border">
              <div className="card-header">
                <h3>Tài xế đang thương lượng</h3>
              </div>
              <ul className="list-group list-group-flush">
                {deals.map((deal, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>Tài xế: </strong>
                      <span>{deal.driverId.userId.fullName}</span>
                      <br />
                      <strong>Giá: </strong>
                      <span>{deal.dealPrice} VND</span>
                      <br />
                      {/* Hiển thị đánh giá với biểu tượng ngôi sao */}
                      <strong>Đánh giá: </strong>
                      <span style={{ color: "gold" }}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfAlt /> {/* Ngôi sao nửa */}
                      </span>
                    </div>
                    <button
                      className="btn-success btn-sm"
                      style={{ border: "none" }}
                      onClick={() => handleOpenModal(deal._id)}
                    >
                      Xác nhận
                    </button>
                  </li>
                ))}
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
        {isShowModalCancel && (
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
                    Xác nhận huỷ đơn hàng
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCloseModalCancel}
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleConfirmModalCancel}
                  >
                    Xác nhận
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

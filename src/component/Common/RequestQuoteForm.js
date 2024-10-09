import React, { useEffect, useState } from "react";
import FormInput from "../Common/FormInput";
import useInstanceData from "../../config/useInstanceData";
import axiosInstance from "../../config/axiosConfig";
import axios from "axios";
import { toast } from "react-toastify";

const RequestQuoteForm = () => {
  const userId = localStorage.getItem("userId");
  const { data, loading, error, refetch } = useInstanceData(
    `/auth/user/${userId}`
  );
  const { email, phone, fullName } = data;
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newFullName, setNewFullName] = useState("");
  const [orderType, setNewOrderType] = useState("");
  const [addressFrom, setNewAddressFrom] = useState("");

  const [addressTo, setNewAddressTo] = useState("");
  const [totalWeight, setNewTotalWeight] = useState("");
  const [cost, setNewCost] = useState("");
  const [orderDescription, setNewoderDescription] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [cities, setCities] = useState([]);
  const [cityFrom, setCityFrom] = useState("");
  const [cityTo, setCityTo] = useState("");
  const [weightError, setWeightError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [recipientEmailError, setRecipientEmailError] = useState("");
  const getCity = async () => {
    try {
      const res = await axios.get("https://provinces.open-api.vn/api/");
      setCities(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    setNewEmail(email);
    setNewPhone(phone);
    setNewFullName(fullName);
    getCity();
  }, [email, phone, fullName]);

  const handleOrderTypeChange = (e) => {
    setNewOrderType(e.target.value);
  };

  const handleAddressFromChange = (e) => {
    setNewAddressFrom(e.target.value);
  };
  const handleAddressToChange = (e) => {
    setNewAddressTo(e.target.value);
  };
  const handleTotalWeightChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setWeightError("*Trường này chỉ nhập số"); // Cập nhật thông báo lỗi cho trọng lượng
    } else {
      setWeightError(""); // Xóa thông báo lỗi nếu nhập đúng
    }
    setNewTotalWeight(e.target.value);
  };
  const handleCostChange = (e) => {
    // Lấy giá trị đầu vào và loại bỏ các ký tự không phải số
    const value = e.target.value.replace(/\D/g, "");
    // Định dạng số với dấu phẩy
    const formattedValue = new Intl.NumberFormat().format(value);
    setNewCost(formattedValue);
  };
  const handleOrderDescriptionChange = (e) => {
    setNewoderDescription(e.target.value);
  };
  const handleRecipientEmailChange = (e) => {
    const emailValueReception = e.target.value;
    setRecipientEmail(emailValueReception);
    if (!isValidEmail(emailValueReception)) {
      setRecipientEmailError("*Email không hợp lệ"); // Thiết lập thông báo lỗi nếu email không hợp lệ
    } else {
      setRecipientEmailError(""); // Xóa thông báo lỗi nếu email hợp lệ
    }
  };
  const handleRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };
  const handleRecipientPhoneChange = (e) => {
    setRecipientPhone(e.target.value);
  };
  const handleCityFrom = (e) => {
    setCityFrom(e.target.value);
  };
  const handleCityTo = (e) => {
    setCityTo(e.target.value);
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setNewEmail(emailValue);

    // Kiểm tra định dạng email
    if (!isValidEmail(emailValue)) {
      setEmailError("*Email không hợp lệ"); // Thiết lập thông báo lỗi nếu email không hợp lệ
    } else {
      setEmailError(""); // Xóa thông báo lỗi nếu email hợp lệ
    }
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const handleFullNameChange = (e) => {
    setNewFullName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/posts", {
        creator: userId,
        email: newEmail,
        phone: newPhone,
        fullname: newFullName,
        title: orderType,
        startPoint: addressFrom,
        destination: addressTo,
        load: totalWeight,
        price: cost,
        detail: orderDescription,
        startPointCity: cityFrom,
        destinationCity: cityTo,
        recipientEmail,
        recipientName,
        recipientPhone,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Đăng Bài thành công");
      }
      refetch();
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Vui lòng điền đầy đủ thông tin");
      }
    }
  };

  return (
    <>
      <section id="request_quote_form_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12 col-12">
              <form id="request_form">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="heading_quote ">
                      <h2>Đơn Hàng</h2>
                    </div>
                  </div>

                  <div className="w-100 d-flex justify-content-center">
                    <div class="input-group w-50">
                      <input
                        type="file"
                        class="form-control h-custom"
                        id="inputGroupFile02"
                      />
                      <label
                        class="input-group-text bg-dark-subtle "
                        for="inputGroupFile02"
                      >
                        Tải Ảnh
                      </label>
                    </div>
                  </div>
                  <div class="container d-flex justify-content-center mb-3"></div>
                  <div className="col-lg-6 d-flex w-100 addressFrom-input ">
                    <div className="form-group align-self-end">
                      <label className="font-weight-bold">
                        Địa chỉ nhận hàng
                      </label>
                      <select
                        className="form-control first_null"
                        onChange={handleCityFrom}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Chọn Tỉnh/Thành
                        </option>
                        {cities.map((city) => (
                          <option value={city.name}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 custom-input">
                      <FormInput
                        tag={"input"}
                        type={"text"}
                        name={"departure"}
                        id={"departure"}
                        classes={"form-control align-self-end"}
                        placeholder={"Địa Chỉ Nhận Hàng"}
                        label="Địa Chỉ Nhận Hàng"
                        value={addressFrom}
                        onChange={handleAddressFromChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex w-100 addressTo-input">
                    <div className="form-group align-self-end">
                      <label className="font-weight-bold">
                        Địa chỉ giao hàng
                      </label>
                      <select
                        className="form-control first_null"
                        onChange={handleCityTo}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Chọn Tỉnh/Thành
                        </option>
                        {cities.map((city) => (
                          <option value={city.name}>{city.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1 custom-input">
                      <FormInput
                        tag={"input"}
                        type={"text"}
                        name={"city"}
                        id={"city"}
                        classes={"form-control"}
                        placeholder={"Địa Chỉ Giao Hàng"}
                        label="Địa Chỉ Giao Hàng"
                        value={addressTo}
                        onChange={handleAddressToChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"orderType"}
                      id={"orderType"}
                      classes={"form-control"}
                      placeholder={"Loại Hàng"}
                      label="Loại Hàng"
                      value={orderType}
                      onChange={handleOrderTypeChange}
                    />
                  </div>
                  {/* <div className="col-lg-6">
                    <div className="form-group">
                      <label className="font-weight-bold">Thành phố đi</label>
                      <select className="form-control first_null">
                        <option>da nang</option>
                        <option>Hue</option>
                      </select>
                    </div>
                  </div> */}

                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"weight"}
                      id={"weight"}
                      classes={"form-control"}
                      placeholder={"Tổng Trọng Lượng (KG)"}
                      label="Tổng Trọng Lượng (KG)"
                      value={totalWeight}
                      onChange={handleTotalWeightChange}
                    />
                    {weightError && (
                      <div className="text-danger">{weightError}</div>
                    )}{" "}
                    {/* Hiển thị thông báo lỗi cho trọng lượng */}
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"bill"}
                      id={"bill"}
                      classes={"form-control"}
                      placeholder={"Giá Tiền"}
                      label="Giá Tiền (VND)"
                      value={cost}
                      onChange={handleCostChange}
                    />
                  </div>
                  <div className="col-lg-12">
                    <FormInput
                      tag={"textarea"}
                      type={"text"}
                      name={"text"}
                      classes={"form-control"}
                      placeholder={"Mô Tả Đơn Hàng"}
                      label="Mô Tả Đơn Hàng  "
                      value={orderDescription}
                      onChange={handleOrderDescriptionChange}
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="heading_quote arae_top">
                      <h3>Thông Tin Người Nhận</h3>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"lname"}
                      classes={"form-control"}
                      placeholder={"Họ và Tên"}
                      label="Họ và Tên"
                      value={recipientName}
                      onChange={handleRecipientNameChange}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"email"}
                      classes={"form-control"}
                      placeholder={"Email"}
                      label="Email"
                      value={recipientEmail}
                      onChange={handleRecipientEmailChange}
                    />
                    {recipientEmailError && (
                      <div className="text-danger">{recipientEmailError}</div>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"number"}
                      name={"number"}
                      classes={"form-control"}
                      placeholder={"Số Điện Thoại"}
                      label="Số Điện Thoại"
                      value={recipientPhone}
                      onChange={handleRecipientPhoneChange}
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="heading_quote arae_top">
                      <h3>Thông Tin Người Đặt</h3>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"lname"}
                      classes={"form-control"}
                      placeholder={"Họ và Tên"}
                      label="Họ và Tên"
                      value={newFullName}
                      onChange={handleFullNameChange}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"email"}
                      classes={"form-control"}
                      placeholder={"Email"}
                      label="Email"
                      value={newEmail}
                      onChange={handleEmailChange}
                    />
                    {emailError && (
                      <div className="text-danger">{emailError}</div>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"number"}
                      name={"number"}
                      classes={"form-control"}
                      placeholder={"Số Điện Thoại"}
                      label="Số Điện Thoại"
                      value={newPhone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="quote_submit_button d-flex justify-content-center">
                      <button className="btn btn-theme" onClick={handleSubmit}>
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestQuoteForm;

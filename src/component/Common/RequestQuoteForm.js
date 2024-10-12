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
  // các biến lỗi
  const [weightError, setWeightError] = useState("");
  const [newEmailError, setEmailError] = useState("");
  const [recipientEmailError, setRecipientEmailError] = useState("");
  const [AddressToChangeError, setAddressToChangeError] = useState("");
  const [AddressFromChangeError, setAddressFromChangeError] = useState("");
  const [OrderTypeChangeError, setOrderTypeChangeError] = useState("");
  const [recipientNameError, setRecipientNameError] = useState("");
  const [newFullNameError, setNewFullNameError] = useState("");
  const [recipientPhoneError, setRecipientPhoneError] = useState("");
  const [newPhoneError, setNewPhoneError] = useState("");
  const [orderDescriptionError, setOrderDescriptionError] = useState("");
  const [isDisable, setIsDisable] = useState(false);

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
    if (e.target.value.length > 30) {
      setOrderTypeChangeError("*Trường này giới hạn 50 kí tự");
      setIsDisable(true);
    } else {
      setOrderTypeChangeError("");
    }
    setNewOrderType(e.target.value);
  };

  const handleAddressFromChange = (e) => {
    if (e.target.value.length > 60) {
      setAddressFromChangeError("*Trường này giới hạn 60 kí tự");
      setIsDisable(true);
    } else {
      setAddressFromChangeError("");
    }
    setNewAddressFrom(e.target.value);
  };
  const handleAddressToChange = (e) => {
    if (e.target.value.length > 60) {
      setAddressToChangeError("*Trường này giới hạn 60 kí tự");
      setIsDisable(true);
    } else {
      setAddressToChangeError("");
    }
    setNewAddressTo(e.target.value);
  };
  const handleTotalWeightChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setWeightError("*Trường này chỉ nhập số"); // Cập nhật thông báo lỗi cho trọng lượng
      setIsDisable(true);
    } else {
      setWeightError(""); // Xóa thông báo lỗi nếu nhập đúng
    }
    setNewTotalWeight(e.target.value);
  };
  const handleCostChange = (e) => {
    // Lấy giá trị đầu vào và loại bỏ các ký tự không phải số
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setNewCost(""); // Hoặc null, tùy thuộc vào cách bạn muốn xử lý
      setIsDisable(true);
    } else {
      // Định dạng số với dấu phẩy
      const formattedValue = new Intl.NumberFormat().format(value);
      setNewCost(formattedValue);
    }
  };
  const handleOrderDescriptionChange = (e) => {
    if (e.target.value.length > 150) {
      setOrderDescriptionError("*Trường này giới hạn 150 kí tự");
      setIsDisable(true);
    } else {
      setOrderDescriptionError("");
    }
    setNewoderDescription(e.target.value);
  };
  const handleRecipientEmailChange = (e) => {
    const emailValueReception = e.target.value;
    setRecipientEmail(emailValueReception);
    if (!isValidEmail(emailValueReception)) {
      setRecipientEmailError("*Email không hợp lệ"); // Thiết lập thông báo lỗi nếu email không hợp lệ
      setIsDisable(true);
    } else {
      setRecipientEmailError(""); // Xóa thông báo lỗi nếu email hợp lệ
    }
  };
  const handleRecipientNameChange = (e) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (e.target.value.length > 30) {
      setRecipientNameError("*Trường này giới hạn 30 kí tự");
      setIsDisable(true);
    } else if (!nameRegex.test(e.target.value)) {
      setRecipientNameError("*Trường này không được nhập số");
      setIsDisable(true);
    } else {
      setRecipientNameError("");
    }
    setRecipientName(e.target.value);
  };
  const handleRecipientPhoneChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setRecipientPhoneError("*Trường này chỉ nhập số"); // Cập nhật thông báo lỗi cho trọng lượng
      setIsDisable(true);
    } else if (value.length > 10) {
      setRecipientPhoneError("*Trường này chỉ nhập 10 số");
      setIsDisable(true);
    } else {
      setRecipientPhoneError(""); // Xóa thông báo lỗi nếu nhập đúng
    }
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
      setIsDisable(true);
    } else {
      setEmailError(""); // Xóa thông báo lỗi nếu email hợp lệ
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value.trim() === "") {
      setNewPhoneError("*Trường này chỉ nhập số"); // Cập nhật thông báo lỗi cho trọng lượng
      setIsDisable(true);
    } else if (value.length > 10) {
      setNewPhoneError("*Trường này chỉ nhập 10 số");
      setIsDisable(true);
    } else {
      setNewPhone(e.target.value);
    }
  };
  const handleFullNameChange = (e) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (e.target.value.length > 30) {
      setNewFullNameError("*Trường này giới hạn 30 kí tự");
      setIsDisable(true);
    } else if (!nameRegex.test(e.target.value)) {
      setNewFullNameError("Trường này không được nhập số");
      setIsDisable(true);
    } else {
      setNewFullNameError("");
    }
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
        setNewOrderType("");
        setNewAddressFrom("");
        setNewAddressTo("");
        setNewTotalWeight("");
        setNewoderDescription("");
        setRecipientEmail("");
        setRecipientName("");
        setRecipientPhone("");
        setCityFrom("");
        setCityTo("");
        setWeightError("");
        setEmailError("");
        setRecipientEmailError("");
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
                        classes={
                          "form-control align-self-end position-relative"
                        }
                        placeholder={"Địa Chỉ Nhận Hàng"}
                        label="Địa Chỉ Nhận Hàng"
                        value={addressFrom}
                        onChange={handleAddressFromChange}
                      />
                      {AddressFromChangeError && (
                        <div className="text-danger position-absolute bottom-error">
                          {AddressFromChangeError}
                        </div>
                      )}
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
                        classes={"form-control position-relative"}
                        placeholder={"Địa Chỉ Giao Hàng"}
                        label="Địa Chỉ Giao Hàng"
                        value={addressTo}
                        onChange={handleAddressToChange}
                      />
                      {AddressToChangeError && (
                        <div className="text-danger position-absolute bottom-error">
                          {AddressToChangeError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"orderType"}
                      id={"orderType"}
                      classes={"form-control "}
                      placeholder={"Loại Hàng"}
                      label="Loại Hàng"
                      value={orderType}
                      onChange={handleOrderTypeChange}
                    />
                    {OrderTypeChangeError && (
                      <div className="text-danger   position-absolute marginBottom-error">
                        {OrderTypeChangeError}
                      </div>
                    )}{" "}
                  </div>

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
                      <div className="text-danger position-absolute marginBottom-error">
                        {weightError}
                      </div>
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
                    {orderDescriptionError && (
                      <div className="text-danger position-absolute marginBottom-error">
                        {orderDescriptionError}
                      </div>
                    )}{" "}
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
                      name={"receptionName"}
                      classes={"form-control"}
                      placeholder={"Họ và Tên"}
                      label="Họ và Tên"
                      value={recipientName}
                      onChange={handleRecipientNameChange}
                    />
                    {recipientNameError && (
                      <div className="text-danger position-absolute marginBottom-error">
                        {recipientNameError}
                      </div>
                    )}{" "}
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
                      <div className="text-danger position-absolute marginBottom-error">
                        {recipientEmailError}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"number"}
                      classes={"form-control"}
                      placeholder={"Số Điện Thoại"}
                      label="Số Điện Thoại"
                      value={recipientPhone}
                      onChange={handleRecipientPhoneChange}
                    />
                    {recipientPhoneError && (
                      <div className="text-danger position-absolute marginBottom-error">
                        {recipientPhoneError}
                      </div>
                    )}
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
                    {newFullNameError && (
                      <div className="text-danger position-absolute marginBottom-error">
                        {newFullNameError}
                      </div>
                    )}
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
                    {newEmailError && (
                      <div className="text-danger position-absolute marginBottom-error">
                        {newEmailError}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"number"}
                      classes={"form-control"}
                      placeholder={"Số Điện Thoại"}
                      label="Số Điện Thoại"
                      value={newPhone}
                      onChange={handlePhoneChange}
                    />
                    {newPhoneError && (
                      <div className="text-danger position-absolute marginBottom-error">
                        {newPhoneError}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <div className="quote_submit_button d-flex justify-content-center">
                      <button
                        className={`btn ${
                          isDisable
                            ? "btn-secondary cursor-disable"
                            : "btn-theme"
                        }`}
                        onClick={handleSubmit}
                        disabled={isDisable}
                      >
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

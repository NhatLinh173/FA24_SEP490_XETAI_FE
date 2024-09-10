import React, { useEffect, useState } from "react";
import FormInput from "../Common/FormInput";
import useInstanceData from "../../config/useInstanceData";

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
  const [vehicle, setNewVehicle] = useState("");
  const [addressFrom, setNewAddressFrom] = useState("");

  const [addressTo, setNewAddressTo] = useState("");
  const [totalWeight, setNewTotalWeight] = useState("");
  const [cost, setNewCost] = useState("");
  const [oderDescription, setNewoderDescription] = useState("");

  useEffect(() => {
    setNewEmail(email);
    setNewPhone(phone);
    setNewFullName(fullName);
  }, [email, phone, fullName]);
  console.log(email);

  const handleOrderTypeChange = (e) => {
    setNewOrderType(e.target.value);
  };
  const handleVehicleChange = (e) => {
    setNewVehicle(e.target.value);
  };
  const handleAddressFromChange = (e) => {
    setNewAddressFrom(e.target.value);
  };
  const handleAddressToChange = (e) => {
    setNewAddressTo(e.target.value);
  };
  const handleTotalWeightChange = (e) => {
    setNewTotalWeight(e.target.value);
  };
  const handleCostChange = (e) => {
    setNewCost(e.target.value);
  };
  const handleOrderDescriptionChange = (e) => {
    setNewoderDescription(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const handleFullNameChange = (e) => {
    setNewFullName(e.target.value);
  };

  let options2 = [
    {
      text: "Loại xe",
      value: "",
    },
    {
      text: "Van 750kg",
      value: "",
    },
    {
      text: "Van 1000kg",
      value: "",
    },
    {
      text: "Truck 500kg",
      value: "",
    },
    {
      text: "Truck 1000kg",
      value: "",
    },
  ];
  return (
    <>
      <section id="request_quote_form_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12 col-12">
              <form id="request_form">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="heading_quote">
                      <h3>Đơn Hàng</h3>
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
                        class="input-group-text bg-dark-subtle"
                        for="inputGroupFile02"
                      >
                        Tải Ảnh
                      </label>
                    </div>
                  </div>
                  <div class="container d-flex justify-content-center mb-3"></div>
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
                  <div className="col-lg-6">
                    <FormInput
                      tag="select"
                      id="car"
                      name="car"
                      classes="form-control"
                      options={options2}
                      label="Loại Xe"
                      value={vehicle}
                      onChange={handleVehicleChange}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"departure"}
                      id={"departure"}
                      classes={"form-control"}
                      placeholder={"Địa Chỉ Nhận Hàng"}
                      label="Địa Chỉ Nhận Hàng"
                      value={addressFrom}
                      onChange={handleAddressFromChange}
                    />
                  </div>
                  <div className="col-lg-6">
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
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"number"}
                      name={"weight"}
                      id={"weight"}
                      classes={"form-control"}
                      placeholder={"Tổng Trọng Lượng (KG)"}
                      label="Tổng Trọng Lượng (KG)"
                      value={totalWeight}
                      onChange={handleTotalWeightChange}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      tag={"input"}
                      type={"text"}
                      name={"bill"}
                      id={"bill"}
                      classes={"form-control"}
                      placeholder={"Giá Tiền"}
                      label="Giá Tiền"
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
                      label="Mô Tả Đơn Hàng  Chọn)"
                      value={oderDescription}
                      onChange={handleOrderDescriptionChange}
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
                      <button className="btn btn-theme">Send Messages</button>
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

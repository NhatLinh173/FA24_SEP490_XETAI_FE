import React from "react";
import FormInput from "../Common/FormInput";

const RequestQuoteForm = () => {
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

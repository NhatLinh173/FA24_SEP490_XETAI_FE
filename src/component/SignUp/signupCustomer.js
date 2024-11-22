import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../Common/FormInput";
import { toast } from "react-toastify";
import axios from "axios";
import regexPattern from "../../config/regexConfig";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const SignUpCustomer = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
    confirmPassword: "",
  });

  const fieldLabels = {
    fullName: "Họ và Tên",
    email: "Email",
    password: "Mật khẩu",
    phone: "Số điện thoại",
    nameCompany: "Tên công ty",
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateFieldWithError(name, value);
  };

  const validateFieldWithError = (field, value) => {
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${fieldLabels[field]} không được để trống`,
      }));
      return false;
    }

    if (!regexPattern[field].test(value)) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${fieldLabels[field]} sai định dạng`,
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [field]: "" }));
    return true;
  };

  const handleRegister = async () => {
    const { email, password, fullName, phone, confirmPassword } = formData;

    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Mật Khẩu Không Khớp!!!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3005/auth/register", {
        email,
        password,
        fullName,
        phone,
        role: "customer",
      });

      if (response.status === 201) {
        toast.success("Đăng Ký Thành Công");
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        toast.error("Đăng Ký Thất Bại");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Đăng Ký Thất Bại: ${error.response.data.message}`);
      } else {
        console.error("Register error: ", error);
        toast.error("Có lỗi xảy ra trong quá trình đăng ký.");
      }
    }
  };

  const handleGoogleLogin = () => {
    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }
    const role = "customer";
    const url = `http://localhost:3005/auth/google?state=${role}`;
    console.log("Redirecting to:", url);
    window.open(url, "_self");
  };

  const handleFacebookLogin = () => {
    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }
    const role = "customer";
    const url = `http://localhost:3005/auth/facebook?state=${role}`;
    window.open(url, "_self");
  };

  return (
    <section id="signIn_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
            <div className="user_area_wrapper">
              <div className="user_area_form">
                <h2>Đăng Ký</h2>
                <form
                  // action="#!"
                  id="form_signIn"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                  }}
                >
                  <div className="row">
                    <div className="col-lg-12 full-name-group">
                      <FormInput
                        tag={"input"}
                        type={"text"}
                        name={"fullName"}
                        classes={"form-control full-name-input"}
                        placeholder={"Họ và Tên"}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.fullName && (
                        <p className="error-text full-name-error">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="col-lg-12 email-group">
                      <FormInput
                        tag={"input"}
                        type={"email"}
                        name={"email"}
                        classes={"form-control email-input"}
                        placeholder={"Địa Chỉ Email"}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && (
                        <p className="error-text email-error">{errors.email}</p>
                      )}
                    </div>

                    <div className="col-lg-12 phone-group">
                      <FormInput
                        tag={"input"}
                        type={"tel"}
                        name={"phone"}
                        classes={"form-control phone-input"}
                        placeholder={"Số Điện Thoại"}
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.phone && (
                        <p className="error-text phone-error">{errors.phone}</p>
                      )}
                    </div>

                    <div className="col-lg-12 .password-group">
                      <div className="password-field-wrapper">
                        <FormInput
                          tag={"input"}
                          type={isPasswordVisible ? "text" : "password"}
                          name={"password"}
                          classes={"form-control"}
                          placeholder={"Mật Khẩu"}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <span
                          className="toggle-password"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </span>
                        {errors.password && (
                          <p className="error-text password-error">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 .confirm-password-group">
                      <div className="password-field-wrapper">
                        <FormInput
                          tag={"input"}
                          type={isConfirmPasswordVisible ? "text" : "password"}
                          name={"confirmPassword"}
                          classes={"form-control"}
                          placeholder={"Xác Nhận Mật Khẩu"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <span
                          className="toggle-password"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {isConfirmPasswordVisible ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Tôi đồng ý với Điều khoản & Điều kiện
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="submit_button">
                        <FormInput
                          tag={"button"}
                          val={"Đăng Ký"}
                          className="btn btn-primary btn-block"
                          style={{
                            height: "50px",
                            fontWeight: "600",
                            marginBottom: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                          }}
                          disabled={!isChecked}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ marginBottom: "15px" }}>
                      <div>HOẶC</div>
                    </div>
                    <div className="col-lg-12">
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        style={{
                          height: "50px",
                          backgroundColor: "#3b5898",
                          fontWeight: "600",
                          color: "#fff",
                          marginBottom: "10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={handleGoogleLogin}
                        disabled={!isChecked}
                      >
                        <FcGoogle
                          style={{
                            marginRight: "10px",
                            fontSize: "20px",
                          }}
                        />{" "}
                        Đăng nhập với Google
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        style={{
                          height: "50px",
                          backgroundColor: "#4285f4",
                          fontWeight: "600",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={handleFacebookLogin}
                        disabled={!isChecked}
                      >
                        <FaFacebookF
                          style={{ marginRight: "10px", fontSize: "18px" }}
                        />{" "}
                        Đăng nhập với Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <div className="not_remember_area">
                        <p>
                          Bạn đã có tài khoản?{" "}
                          <Link to="/signIn"> Đăng Nhập</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpCustomer;

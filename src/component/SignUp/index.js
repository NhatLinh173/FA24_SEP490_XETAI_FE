import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import FormInput from "../Common/FormInput";
import axios from "axios";
import { toast } from "react-toastify";
import regexPattern from "../../config/regexConfig";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const SignUpForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    nameCompany: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
    confirmPassword: "",
    nameCompany: "",
  });

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3005/",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type") || "personal";
    setActiveTab(type);
  }, [location]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    history.push(`/signup?type=${tab}`);
  };

  const fieldLabels = {
    fullName: "Họ và Tên",
    email: "Email",
    password: "Mật khẩu",
    phone: "Số điện thoại",
    nameCompany: "Tên công ty",
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

  const handleRegisterDriver = async () => {
    const role = activeTab === "personal" ? "personal" : "business";
    const { email, password, fullName, phone, confirmPassword, nameCompany } =
      formData;
    const payloadPersonnal = {
      email,
      password,
      phone,
      fullName,
      role: role,
    };

    const payloadBusiness = {
      password,
      phone,
      fullName,
      companyName: nameCompany,
      email,
      role: role,
    };

    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Mật Khẩu Không Khớp!!!");
      return;
    }

    if (role === "personal") {
      try {
        const response = await axiosInstance.post(
          "/auth/register",
          payloadPersonnal
        );
        if (response.status === 201) {
          toast.success("Đăng ký thành công");
          history.push("/");
        } else {
          toast.error("Đăng ký thất bại");
          return;
        }
      } catch (error) {
        console.error("Register error:", error);
      }
    } else {
      try {
        const response = await axiosInstance.post(
          "/auth/register",
          payloadBusiness
        );
        if (response.status === 201) {
          toast.success("Đăng ký thành công");
          history.push("/");
        } else {
          toast.error("Đăng ký thất bại");
          return;
        }
      } catch (error) {
        console.error("Register error:", error);
      }
    }
  };

  const handleGoogleLogin = () => {
    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }
    const role = activeTab === "personal" ? "personal" : "business";
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
              <h2>
                {activeTab === "personal"
                  ? "Đăng Ký Cá Nhân"
                  : "Đăng Ký Doanh Nghiệp"}
              </h2>
              <div className="form-tabs">
                <a
                  type="button"
                  className={`btn ${activeTab === "personal" ? "active" : ""}`}
                  onClick={() => handleTabSwitch("personal")}
                >
                  Cá Nhân
                </a>
                <a
                  type="button"
                  className={`btn ${activeTab === "business" ? "active" : ""}`}
                  onClick={() => handleTabSwitch("business")}
                >
                  Doanh Nghiệp
                </a>
              </div>
              <div className="user_area_form">
                <form
                  id="form_signIn"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegisterDriver();
                  }}
                >
                  <div className="row">
                    {activeTab === "personal" ? (
                      <>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"lastName"}
                            classes={"form-control"}
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
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"email"}
                            name={"email"}
                            classes={"form-control"}
                            placeholder={"Địa Chỉ Email"}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email && (
                            <p className="error-text email-error">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"tel"}
                            name={"phone"}
                            classes={"form-control"}
                            placeholder={"Số Điện Thoại"}
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.phone && (
                            <p className="error-text phone-error">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-12">
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
                        <div className="col-lg-12">
                          <div className="password-field-wrapper">
                            <FormInput
                              tag={"input"}
                              type={
                                isConfirmPasswordVisible ? "text" : "password"
                              }
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
                      </>
                    ) : (
                      <>
                        {/* Các trường thông tin doanh nghiệp */}
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"nameCompany"}
                            classes={"form-control"}
                            placeholder={"Tên Công Ty"}
                            value={formData.nameCompany}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.nameCompany && (
                            <p className="error-text email-error">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"fullName"}
                            classes={"form-control"}
                            placeholder={"Tên Chủ Doanh Nghiệp"}
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
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"email"}
                            classes={"form-control"}
                            placeholder={"Email Công Việc"}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email && (
                            <p className="error-text email-error">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"tel"}
                            name={"phone"}
                            classes={"form-control"}
                            placeholder={"Số Điện Thoại"}
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.phone && (
                            <p className="error-text phone-error">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-12">
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
                        <div className="col-lg-12">
                          <div className="password-field-wrapper">
                            <FormInput
                              tag={"input"}
                              type={
                                isConfirmPasswordVisible ? "text" : "password"
                              }
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
                      </>
                    )}
                    <div className="col-lg-12">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Tôi đồng ý với các Điều Khoản & Điều Kiện
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
                          Đã có tài khoản? <Link to="/signIn"> Đăng Nhập</Link>
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

export default SignUpForm;

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../Common/FormInput";
import axios from "axios";
import { toast } from "react-toastify";
import regexPattern from "../../config/regexConfig";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../config/firebaseConfig";
import TermsModal from "./TermsModal";

const SignUpForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const [otpSent, setOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    password: "",
    phone: "",
    fullName: "",
    confirmPassword: "",
    otp: "",
  });

  const axiosInstance = axios.create({
    baseURL: "https://xehang.site/",
  });

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha solved", response);
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        }
      );
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
      console.log(window.recaptchaVerifier);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const fieldLabels = {
    fullName: "Họ và Tên",
    password: "Mật khẩu",
    phone: "Số điện thoại",
    confirmPassword: "Xác nhận mật khẩu",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateField = (field, value) => {
    if (!value.trim()) {
      return `${fieldLabels[field]} không được để trống`;
    }
    if (!regexPattern[field]?.test(value)) {
      return `${fieldLabels[field]} sai định dạng`;
    }
    return "";
  };

  const handleSendOTP = async () => {
    const phone = `+84${formData.phone.slice(1)}`;

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      toast.success("Mã OTP đã được gửi!");
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        toast.error("Quá nhiều yêu cầu, vui lòng thử lại sau.");
      } else if (error.code === "auth/invalid-app-credential") {
        toast.error("Lỗi xác thực ứng dụng, vui lòng thử lại.");
      } else {
        console.error("Error sending OTP:", error.code, error.message);
        toast.error("Gửi OTP thất bại, vui lòng thử lại.");
      }
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (!window.confirmationResult) {
        toast.error("Vui lòng gửi lại mã OTP");
        return;
      }

      const result = await window.confirmationResult.confirm(formData.otp);
      if (result.user) {
        const registerStatus = await handleRegisterDriver();
        if (registerStatus === 201) {
          toast.success("Đăng ký thành công");
          history.push("/signIn");
        } else {
          toast.error("Đăng ký thất bại");
        }
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Mã OTP không đúng!");
    }
  };

  const handleRegisterDriver = async () => {
    const { password, fullName, phone, confirmPassword } = formData;
    const payload = {
      password,
      phone,
      fullName,
      role: "personal",
    };

    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Mật Khẩu Không Khớp!!!");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", payload);
      return response.status;
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  const handleGoogleLogin = () => {
    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }
    const role = "customer";
    const url = `https://xehang.site/auth/google?state=${role}`;
    console.log("Redirecting to:", url);
    window.open(url, "_self");
  };

  const handleFacebookLogin = () => {
    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }
    const role = "customer";
    const url = `https://xehang.site/auth/facebook?state=${role}`;
    window.open(url, "_self");
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setIsModalOpen(true);
    }
  };

  return (
    <section id="signIn_area">
      <div className="container">
        <div className="row">
          <div id="recaptcha-container"></div>
          <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
            <div className="user_area_wrapper">
              <h2>Đăng Ký Tài Xế</h2>
              <div className="user_area_form">
                <form
                  id="form_signIn"
                  onSubmit={(e) => {
                    e.preventDefault();
                    otpSent ? handleVerifyOTP() : handleSendOTP();
                  }}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <div style={{ marginBottom: "20px" }}>
                        <FormInput
                          tag={"input"}
                          type={"text"}
                          name={"fullName"}
                          classes={"form-control"}
                          placeholder={"Họ và Tên"}
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.fullName && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginRight: "15px",
                              width: "250px",
                              textAlign: "left",
                            }}
                          >
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div style={{ marginBottom: "20px" }}>
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
                          <p
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginRight: "15px",
                              width: "250px",
                              textAlign: "left",
                            }}
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ position: "relative" }}>
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
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                            onClick={togglePasswordVisibility}
                          >
                            {isPasswordVisible ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </span>
                        </div>
                        {errors.password && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginRight: "15px",
                              width: "250px",
                              textAlign: "left",
                            }}
                          >
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ position: "relative" }}>
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
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {isConfirmPasswordVisible ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </span>
                        </div>
                        {errors.confirmPassword && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginRight: "15px",
                              width: "350px",
                              textAlign: "left",
                            }}
                          >
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                      {otpSent && (
                        <div className="row">
                          <div className="col-lg-12">
                            <FormInput
                              tag={"input"}
                              type={"text"}
                              name={"otp"}
                              classes={"form-control"}
                              placeholder={"Nhập Mã OTP"}
                              value={formData.otp}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
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
                        {!otpSent ? (
                          // Button để gửi OTP
                          <button
                            type="button"
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
                            onClick={handleSendOTP}
                            disabled={!isChecked || isOtpSending}
                          >
                            {isOtpSending ? "Đang gửi..." : "Gửi mã OTP"}
                          </button>
                        ) : (
                          // Button để xác minh OTP
                          <button
                            type="button"
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
                            onClick={handleVerifyOTP}
                            disabled={!isChecked || !formData.otp}
                          >
                            Xác Minh OTP
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="not_remember_area">
                        <p>
                          Đã có tài khoản? <Link to="/signIn"> Đăng Nhập</Link>
                        </p>
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TermsModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default SignUpForm;

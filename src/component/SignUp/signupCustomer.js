import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../Common/FormInput";
import { toast } from "react-toastify";
import axios from "axios";
import regexPattern from "../../config/regexConfig";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth, signInWithPhoneNumber } from "../../config/firebaseConfig";
import TermsModal from "./TermsModal";

const SignUpCustomer = () => {
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const fieldLabels = {
    fullName: "Họ và Tên",
    password: "Mật khẩu",
    phone: "Số điện thoại",
    confirmPassword: "Xác nhận mật khẩu",
  };

 useEffect(() => {
    const initializeRecaptcha = () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "normal",
            callback: () => console.log("Recaptcha đã được giải!"),
          },
          auth
        );
        window.recaptchaVerifier.render();
      } catch (error) {
        console.error("Không khởi tạo được reCAPTCHA", error);
      }
    };

    if (document.getElementById("recaptcha-container")) {
      initializeRecaptcha();
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
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
    if (isOtpSending) return;

    setIsOtpSending(true);
    const phone = `+84${formData.phone.slice(1)}`;

    try {
      const appVerifier = window.recaptchaVerifier;
      console.log(appVerifier);
      if (!appVerifier) {
        toast.error("Recaptcha chưa được khởi tạo. Vui lòng thử lại.");
        return;
      }
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      toast.success("Mã OTP đã được gửi!");
    } catch (error) {
      console.error("Error sending OTP:", error.code, error.message);
      toast.error("Gửi OTP thất bại, vui lòng thử lại.");
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    const { otp } = formData;

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      const registerStatus = await handleRegister();
      if (registerStatus === 201) {
        toast.success("Đăng ký thành công");
        history.push("/signIn");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Xác minh OTP thất bại!");
    }
  };

  const handleRegister = async () => {
    const { password, fullName, phone, confirmPassword } = formData;

    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Mật Khẩu Không Khớp!!!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        password,
        fullName,
        phone,
        role: "customer",
      });

      return response.status;
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
    const url = `http://localhost:3000/auth/google?state=${role}`;
    console.log("Redirecting to:", url);
    window.open(url, "_self");
  };

  const handleFacebookLogin = () => {
    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }
    const role = "customer";
    const url = `http://localhost:3000/auth/facebook?state=${role}`;
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
          <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
            <div className="user_area_wrapper">
              <div className="user_area_form">
                <div id="recaptcha-container"></div>
                <h2>Đăng Ký</h2>
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
                          Tôi đồng ý với Điều khoản & Điều kiện
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="submit_button">
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
                          disabled={!isChecked}
                        >
                          {otpSent ? "Xác Minh OTP" : "Đăng Ký"}
                        </button>
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
      <TermsModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default SignUpCustomer;

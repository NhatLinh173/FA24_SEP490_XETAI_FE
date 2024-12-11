import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../config/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ForgotPassword = () => {
  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!phone.startsWith("+")) {
      return "+84" + phone.slice(1);
    }
    return phone;
  };

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
    }
  }, []);

  const checkPhoneExists = async (phone) => {
    try {
      const response = await axios.get(
        `https://xehang.site/auth/search?phone=${phone}`
      );
      return response.data && response.data.length > 0;
    } catch (error) {
      console.error("Error checking phone:", error);
      return false;
    }
  };

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      // Check if phone exists in DB first
      const phoneExists = await checkPhoneExists(phoneNumber);
      if (!phoneExists) {
        toast.error("Số điện thoại không tồn tại trong hệ thống!");
        return;
      }

      const phone = formatPhoneNumber(phoneNumber);
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      setShowOtpInput(true);
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
      setLoading(false);
      setIsOtpSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (!window.confirmationResult) {
        toast.error("Vui lòng gửi lại mã OTP");
        return;
      }

      const result = await window.confirmationResult.confirm(otpCode);
      if (result.user) {
        toast.success("Xác thực thành công");
        history.push({
          pathname: "/reset-password",
          state: { phone: phoneNumber },
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Mã OTP không đúng!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendOTP();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    handleVerifyOTP();
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="phoneNumber">Số điện thoại:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Nhập số điện thoại của bạn"
            required
          />
        </div>
        {!showOtpInput && (
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Đang kiểm tra..." : "Gửi yêu cầu OTP"}
          </button>
        )}
      </form>

      {showOtpInput && (
        <form onSubmit={handleVerifyOtp} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="otpCode">Mã OTP:</label>
            <input
              type="text"
              id="otpCode"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Nhập mã OTP của bạn"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Đang xác thực..." : "Xác thực mã OTP"}
          </button>
        </form>
      )}

      <div id="recaptcha-container"></div>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

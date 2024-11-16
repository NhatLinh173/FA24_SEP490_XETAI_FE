import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập email của bạn!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3005/verify/send-otp",
        { email }
      );
      if (response.status === 200) {
        toast.success("Mã xác nhận đã được gửi đến email của bạn!");
        setShowOtpInput(true);
      } else {
        toast.error("Email không tồn tại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otpCode) {
      toast.error("Vui lòng nhập mã xác thực!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3005/verify/verify-otp",
        { email, otpCode }
      );
      if (response.status === 200) {
        toast.success("Xác thực mã OTP thành công!");
        history.push({
          pathname: "/reset-password",
          state: { email },
        });
      } else {
        toast.error("Mã OTP không chính xác hoặc đã hết hạn!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Mã OTP không chính xác hoặc đã hết hạn!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
          />
        </div>
        {/* Ẩn nút khi mã OTP đã được gửi thành công */}
        {!showOtpInput && (
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        )}
      </form>

      {/* Hiển thị ô nhập mã OTP nếu cần */}
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

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

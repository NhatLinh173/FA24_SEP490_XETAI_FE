import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation } from "react-router-dom";
import regexPattern from "../../config/regexConfig";
const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state?.phone) {
      history.push("/forgot-password");
      toast.error("Vui lòng thực hiện quy trình quên mật khẩu!");
    }
  }, [location.state, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phone = location.state?.phone;
    if (!newPassword || !confirmPassword) {
      toast.error("Vui lòng nhập mật khẩu mới và xác nhận!");
      return;
    }
    if (!regexPattern.password.test(newPassword)) {
      toast.error(
        "Mật khẩu không hợp lệ! Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://xehang.site/auth/resetPassword",
        { phone, newPassword }
      );
      toast.success("Mật khẩu đã được thay đổi thành công!");
      history.push("/signIn");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-wrapper">
      <h2 className="reset-password-title">Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="reset-password-form-group">
          <input
            type="password"
            id="newPassword"
            className="reset-password-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>
        <div className="reset-password-form-group">
          <input
            type="password"
            id="confirmPassword"
            className="reset-password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu mới"
            required
          />
        </div>
        <button
          type="submit"
          className="reset-password-button"
          disabled={loading}
        >
          {loading ? "Đang thay đổi..." : "Thay đổi mật khẩu"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

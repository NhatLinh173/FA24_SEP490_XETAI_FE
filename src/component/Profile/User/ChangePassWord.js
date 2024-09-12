import axiosInstance from "../../../config/axiosConfig";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassWord = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //// lấy giá trị từ ô input
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  // xử lý khi người dùng click vào nút thay đoi mật khẩu

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        const res = await axiosInstance.put(
          "/auth/change-password",
          {
            oldPassword: currentPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 200) {
          toast.success("Đổi mật khẩu thành công !");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        console.error(error);
        toast.error("Mật khẩu cũ không đúng");
      }
    } else {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
    }
  };

  return (
    <div>
      <div>
        <h2 className="mb-4">Thay đổi mật khẩu</h2>
      </div>
      <div>
        <form>
          <div className=" row align-items-center">
            <div className="col-3">
              <label for="current_password">Mật khẩu hiện tại:</label>
            </div>
            <div className="col-9">
              <input
                className="form-control w-75 border"
                type="password"
                id="current_password"
                name="current_password"
                placeholder="Mật khẩu hiện tại"
                onChange={handleCurrentPasswordChange}
                value={currentPassword}
                required
              />
            </div>
          </div>
          <br />
          <div className="row align-items-center">
            <div className="col-3">
              <label for="new_password">Mật khẩu mới</label>
            </div>
            <div className="col-9">
              <input
                className="form-control w-75 border"
                placeholder="Nhập mật khẩu mới"
                type="password"
                id="new_password"
                name="new_password"
                onChange={handleNewPasswordChange}
                value={newPassword}
                required
              />
            </div>
          </div>
          <br />
          <div className="row align-items-center">
            <div className="col-3">
              <label for="confirm_password">Xác nhận mật khẩu:</label>
            </div>
            <div className="col-9">
              <input
                className="form-control w-75 border"
                placeholder="Nhập xác nhận mật khẩu"
                type="password"
                id="confirm_password"
                name="confirm_password"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                required
              />
            </div>
          </div>
          <br />
          <div className="row justify-content-center pb-3 ">
            <button className="btn btn-primary btn-lg  " onClick={handleSubmit}>
              <span>Cập Nhập</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassWord;

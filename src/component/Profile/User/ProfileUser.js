import React, { useState, useEffect } from "react";
import { CiCamera } from "react-icons/ci";
import axios from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const ProfileUser = ({ data, refetch }) => {
  const { email, fullName, phone, address, _id } = data;
  const [isName, setIsName] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isAddress, setIsAddress] = useState(true);
  //////
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  // set lại ô input
  const inputName = (e) => {
    e.preventDefault();
    setIsName(false);
  };
  const inputPhone = (e) => {
    e.preventDefault();
    setIsPhone(false);
  };
  const inputEmail = (e) => {
    e.preventDefault();
    setIsEmail(false);
  };
  const inputAddress = (e) => {
    e.preventDefault();
    setIsAddress(false);
  };
  // dùng để giữ lại giá trị của ô input
  useEffect(() => {
    setNewName(fullName);
    setNewPhone(phone);
    setNewEmail(email);
    setNewAddress(address);
  }, [fullName, phone, email, address]);
  // dùng để sửa lại giá trị trong ô input
  const handlenewAddress = (e) => {
    setNewAddress(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  /////////////////////
  const cancelChangeName = (e) => {
    e.preventDefault();
    setIsName(true);
  };
  const cancelChangePhone = (e) => {
    e.preventDefault();
    setIsPhone(true);
  };
  const cancelChangeEmail = (e) => {
    e.preventDefault();
    setIsEmail(true);
  };
  const cancelChangeAddress = (e) => {
    e.preventDefault();
    setIsAddress(true);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      newName == fullName &&
      email == newEmail &&
      address == newAddress &&
      phone == newPhone
    ) {
      toast.error("Không có thay đổi nào để cập nhật");
      return;
    } else {
      try {
        const res = await axios.put(`/auth/update-user/${_id}`, {
          fullName: newName,
          phone: newPhone,
          email: newEmail,
          address: newAddress,
        });
        console.log(res);
        if (res.status === 200) {
          toast.success("Cập nhập thông tin thành công!");
        }
        setIsName(true);
        setIsPhone(true);
        setIsEmail(true);
        setIsAddress(true);
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div>
        <h2>Thông Tin</h2>
      </div>
      <div>
        <form className="mt-4">
          <div className="avatar ">
            <div className="avt-img">
              <img
                className="rounded-circle "
                src="https://mcdn.coolmate.me/image/August2023/luu-ngay-20-meme-tinh-tam-moi-nhat-2023-2383_391.jpg"
                alt="avatar"
              />

              <CiCamera className="icon-avt rounded-circle p-1" />
            </div>
          </div>

          <div className="row g-3 align-item-center">
            <div className="col-3">
              <label for="name" className="col-form-label">
                Họ và Tên:
              </label>
            </div>
            <div className="col-9">
              {fullName && isName ? (
                <div className="d-flex align-items-center justify-content-between  ">
                  <p className="text-input">{fullName}</p>
                  <button className="btn-change " onClick={inputName}>
                    <i className="fas fa-pencil-alt"></i> Thay đổi
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between ">
                  <input
                    type="text"
                    id="name"
                    value={newName}
                    onChange={handleNameChange}
                    className="form-control w-50 border"
                    placeholder="Nhập Họ và Tên"
                  />
                  <button className="btn-cancel " onClick={cancelChangeName}>
                    <i className="fas fa-times p-1"></i>Hủy
                  </button>
                </div>
              )}
            </div>
          </div>
          <br />
          <div className="row g-3 align-items-center ">
            <div className="col-3">
              <label for="phone" className="col-form-label">
                Số Điện Thoại:
              </label>
            </div>
            <div className="col-9">
              {phone && isPhone ? (
                <div className="d-flex align-items-center justify-content-between ">
                  <p className="text-input">{phone}</p>
                  <button className="btn-change" onClick={inputPhone}>
                    <i className="fas fa-pencil-alt"></i> Thay đổi
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between ">
                  <input
                    type="text"
                    id="phone"
                    placeholder="Nhập Số Điện Thoại"
                    name="phone"
                    value={newPhone}
                    onChange={handlePhoneChange}
                    className="form-control w-50 border"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                  <button className="btn-cancel" onClick={cancelChangePhone}>
                    <i className="fas fa-times p-1"></i>Hủy
                  </button>
                </div>
              )}
            </div>
          </div>
          <br />
          <div className="row g-3 align-items-center">
            <div className="col-3">
              <label for="email" className="col-form-label">
                Email:
              </label>
            </div>
            <div className="col-9">
              {email && isEmail ? (
                <div className="d-flex align-items-center justify-content-between ">
                  <p className="text-input">{email}</p>
                  <button className="btn-change" onClick={inputEmail}>
                    <i className="fas fa-pencil-alt"></i> Thay đổi
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between ">
                  <input
                    type="email"
                    placeholder="Nhập Email"
                    id="email"
                    value={newEmail}
                    onChange={handleEmailChange}
                    name="email"
                    className="form-control w-50 border "
                  />
                  <button className="btn-cancel " onClick={cancelChangeEmail}>
                    <i className="fas fa-times p-1"></i>Hủy
                  </button>
                </div>
              )}
            </div>
          </div>
          <br />
          <div className="row g-3 align-items-center">
            <div className="col-3">
              <label for="pwd">Địa chỉ:</label>
            </div>
            <div className="col-9">
              {address && isAddress ? (
                <div className="d-flex align-items-center justify-content-between ">
                  <p className="text-input">{address}</p>
                  <button className="btn-change" onClick={inputAddress}>
                    <i className="fas fa-pencil-alt"></i> Thay đổi
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between">
                  <input
                    type="adress"
                    placeholder="Nhập Địa Chỉ"
                    id="pwd"
                    value={newAddress}
                    onChange={handlenewAddress}
                    name="pwd"
                    className="form-control w-50 border "
                  />
                  <button className="btn-cancel " onClick={cancelChangeAddress}>
                    <i className="fas fa-times p-1"></i>Hủy
                  </button>
                </div>
              )}

              <br />
            </div>
          </div>

          <div className="w-70 d-flex justify-content-center mb-3">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-25 "
              onClick={handleSubmitForm}
            >
              <span>Cập nhật</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUser;

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { LuWallet } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDirectionsCar } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import useAuth from "../../../hooks/useAuth";

const Tab = ({ tab1, setTab1 }) => {
  const [role, setRole] = useState("");
  const { handleLogout } = useAuth();
  const handleLogoutClick = async () => {
    await handleLogout();
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      setRole(userRole);
    }
  }, []);

  const handleClickProfile = () => {
    setTab1("profile");
    localStorage.setItem("tabHistory", "profile");
  };
  const handleClickPost = () => {
    setTab1("historyPost");
    localStorage.setItem("tabHistory", "historyPost");
  };

  return (
    <div className="d-flex flex-column h-100">
      <h2>Tài Khoản</h2>
      <div className="mt-3">
        <ul>
          <li className="tab-item">
            <button
              className={`btn-tab d-flex align-items-center ${
                tab1 === "profile" ? "active" : ""
              }`}
              onClick={handleClickProfile}
            >
              <CgProfile />
              <span className="px-2 ">Tài khoản</span>
            </button>
          </li>
          <li className="my-3 ">
            <button
              className={`btn-tab d-flex align-items-center ${
                tab1 === "historyPost" ? "active" : ""
              }`}
              onClick={handleClickPost}
            >
              <PiPackage />
              <span className="px-1">Đơn hàng</span>
            </button>
          </li>
          {role === "customer" && (
            <li className="tab-item">
              <button
                className={`btn-tab d-flex align-items-center ${
                  tab1 === "favoriteDriver" ? "active" : ""
                }`}
                onClick={() => setTab1("favoriteDriver")}
              >
                <FaRegHeart />
                <span className="px-2 ">Tài xế yêu thích</span>
              </button>
            </li>
          )}
          <li className="my-3">
            <button
              className={`btn-tab ${tab1 === "changePassword" ? "active" : ""}`}
              onClick={() => setTab1("changePassword")}
            >
              <RiLockPasswordLine />
              <span className="px-2">Mật khẩu</span>
            </button>
          </li>
          <li className="my-3">
            <button
              className={`btn-tab d-flex align-items-center ${
                tab1 === "tripHistory" ? "active" : ""
              }`}
              onClick={() => setTab1("tripHistory")}
            >
              <MdAccessTime />
              <span className="px-2">Lịch sử chuyến</span>
            </button>
          </li>
          <li className="my-3">
            <button
              className={`btn-tab ${tab1 === "wallet" ? "active" : ""}`}
              onClick={() => setTab1("wallet")}
            >
              <LuWallet />
              <span className="px-2">Ví của bạn</span>
            </button>
          </li>
          {role === "driver" && (
            <li>
              <button
                className={`btn-tab ${tab1 === "vehicals" ? "active" : ""}`}
                onClick={() => setTab1("vehicals")}
              >
                <MdDirectionsCar />
                <span className="px-2">Xe của tôi</span>
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="my-4">
        <button
          className="btn btn-theme btn-lg d-flex align-items-center"
          onClick={handleLogoutClick}
        >
          <FaArrowRightFromBracket />
          <span className="px-1">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Tab;

import React from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineSignpost } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { LuWallet } from "react-icons/lu";
import { BsSignpost } from "react-icons/bs";

import useAuth from "../../../hooks/useAuth";

const Tab = ({ tab1, setTab1 }) => {
  const { handleLogout } = useAuth();
  const handleLogoutClick = async () => {
    await handleLogout();
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
              onClick={() => setTab1("profile")}
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
              onClick={() => setTab1("historyPost")}
            >
              <BsSignpost />
              <span className="px-1">Bài đăng</span>
            </button>
          </li>

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
              <AiOutlineFieldTime />
              <span className="px-2">Lịch sử chuyến</span>
            </button>
          </li>
          <li>
            <button
              className={`btn-tab ${tab1 === "wallet" ? "active" : ""}`}
              onClick={() => setTab1("wallet")}
            >
              <LuWallet />
              <span className="px-2">Ví của bạn</span>
            </button>
          </li>
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

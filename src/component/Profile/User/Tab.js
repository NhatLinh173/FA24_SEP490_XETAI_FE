import React from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { LuPackage } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";


const Tab = ({ tab1, setTab1 }) => {
  return (
    <div className="d-flex flex-column h-100">
      <h2>Tài Khoản</h2>
      <div className="mt-3">
        <ul>
          <li className="tab-item">
            <button
              className={`btn-tab d-flex align-items-center ${tab1 === "profile" ? "active" : ""
                }`}
              onClick={() => setTab1("profile")}
            >
              <CgProfile />
              <span className="px-2 ">Tài khoản</span>
            </button>
          </li>
          <li className="my-3">
            <a className="d-flex align-items-center" href="#order">
              <LuPackage />
              <span className="px-2">Đơn hàng</span>
            </a>
          </li>

          <li className="tab-item">
            <button
              className={`btn-tab d-flex align-items-center ${tab1 === "favoriteDriver" ? "active" : ""
                }`}
              onClick={() => setTab1("favoriteDriver")}
            >
              <FaRegHeart />
              <span className="px-2 ">Tài xế yêu thích</span>
            </button>
          </li>

          <li className="my-3">
            <a className="d-flex align-items-center" href="#settings">
              <MdOutlineSettings />
              <span className="px-2">Cài đặt</span>
            </a>
          </li>
          <li>
            <button
              className={`btn-tab ${tab1 === "changePassword" ? "active" : ""}`}
              onClick={() => setTab1("changePassword")}
            >
              <RiLockPasswordLine />
              <span className="px-2">Mật khẩu</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="w-75 d-flex mt-auto pb-3">
        <a
          href="#fff"
          className="btn btn-theme btn-lg d-flex align-items-center "
        >
          <FaArrowRightFromBracket />
          <span className="px-1">Đăng xuất</span>
        </a>
      </div>
    </div>
  );
};

export default Tab;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/RFTMS_logo_12.png";
import TopHeader from "../TopHeader";
import { getMenuData } from "./MenuData";
import MenuItems from "./MenuItems";
import SearchForm from "../SearchForm";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaArrowRightFromBracket, FaBell } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useUserData from "../../../hooks/useUserData";
import avatarDefault from "../../../assets/img/icon/avatarDefault.jpg";
const Navbar = ({ openModal }) => {
  const { handleLogout, isAuthenticated } = useAuth();
  const { userData, loading } = useUserData();
  const [click, setClick] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (userData && userData.avatar) {
      localStorage.setItem("avatar", userData.avatar);
      setAvatar(userData.avatar);
    } else {
      setAvatar(avatarDefault);
    }
  }, [userData]);

  useEffect(() => {
    const checkToken = localStorage.getItem("accessToken");
    if (checkToken) {
      setIsLoggedIn(true);
      const avatarFromLocalStorage = localStorage.getItem("avatar");
      if (avatarFromLocalStorage) {
        setAvatar(avatarFromLocalStorage);
      } else {
        setAvatar(avatarDefault);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  useEffect(() => {
    const handleAvatarUpdate = () => {
      const avatarFromLocalStorage = localStorage.getItem("avatar");
      setAvatar(avatarFromLocalStorage);
    };
    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
    };
  }, []);

  const isSticky = () => {
    const header = document.querySelector(".navbar-area");
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  const handleClick = () => {
    if (click) {
      document
        .querySelector("#navbarSupportedContent")
        .classList.remove("navber-colpes");
    } else {
      document
        .querySelector("#navbarSupportedContent")
        .classList.add("navber-colpes");
    }
    setClick(!click);
  };

  const handleLogoutClick = async () => {
    await handleLogout();
  };

  const handleNotificationClick = async () => {
    setShowDropdown(!showDropdown);
  };

  const menuData = getMenuData();

  return (
    <>
      <header className="header-area">
        <TopHeader />
        <div className="navbar-area">
          <div className="transTics-nav">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="logo" />
                </Link>

                <div className="mean-menu" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    {menuData.map((item, index) => (
                      <MenuItems
                        item={item}
                        key={index}
                        openModal={openModal}
                      />
                    ))}

                    {isAuthenticated && userData && (
                      <div className="nav-avatar rounded-circle ml-4">
                        <a href="/profile">
                          <img
                            className="rounded-circle"
                            src={avatar || avatarDefault}
                            alt="avatar"
                            onError={(e) => {
                              e.target.src = avatarDefault;
                            }}
                          />
                        </a>
                        <div
                          className="nav-avatar-item"
                          style={{ width: "220px" }}
                        >
                          <div className="p-3 ">
                            <div>
                              <Link
                                to="/profile"
                                className="d-flex align-items-center nav-text"
                              >
                                <CgProfile />
                                <span
                                  className="pl-2"
                                  style={{ cursor: "pointer" }}
                                >
                                  Xem Thông Tin
                                </span>
                              </Link>
                            </div>
                            <div className="py-2">
                              <a
                                onClick={handleLogoutClick}
                                className="d-flex align-items-center nav-text"
                              >
                                <FaArrowRightFromBracket />
                                <span
                                  className="pl-2"
                                  style={{ cursor: "pointer" }}
                                >
                                  Đăng xuất
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="transtics-responsive-nav">
            <div className="container">
              <div className="responsive-button" onClick={handleClick}>
                {click ? <AiOutlineClose /> : <HiMenuAlt3 />}
              </div>
            </div>
          </div>
        </div>
      </header>
      <SearchForm />
    </>
  );
};

export default Navbar;

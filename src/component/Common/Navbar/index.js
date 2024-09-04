import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import TopHeader from "../TopHeader";
import { getMenuData } from "./MenuData";
import MenuItems from "./MenuItems";
import SearchForm from "../SearchForm";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
const Navbar = ({ openModal }) => {
  const { handleLogout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (checkToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogoutClick = async () => {
    await handleLogout();
  };

  const menuData = getMenuData();

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector(".navbar-area");
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  // Responsive Menu Area
  const [click, setClick] = useState(false);

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

  const handleSearchOpen = () => {
    document
      .querySelector(".search-overlay")
      .classList.toggle("search-overlay-active");
  };

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
                    <li className="nav-item">
                      <a
                        href="#!"
                        onClick={handleSearchOpen}
                        className="nav-link search-box"
                      >
                        <i className="fas fa-search" id="search-btn"></i>
                      </a>
                    </li>
                    {isLoggedIn && (
                      <div className="nav-avatar rounded-circle ml-4">
                        <a href="#ff">
                          <img
                            className="rounded-circle"
                            src="https://mcdn.coolmate.me/image/August2023/luu-ngay-20-meme-tinh-tam-moi-nhat-2023-2383_391.jpg"
                            alt="avatar"
                          />
                        </a>
                        <div className="nav-avatar-item">
                          <div className="p-3 ">
                            <div>
                              <Link
                                to="/profile"
                                className="d-flex align-items-center nav-text"
                              >
                                <CgProfile />
                                <span className="pl-2">View Profile</span>
                              </Link>
                            </div>
                            <div className="py-2">
                              <a
                                href="#"
                                className="d-flex align-items-center nav-text"
                                onClick={handleLogoutClick}
                              >
                                <FaArrowRightFromBracket />
                                <span className="pl-2">Log out</span>
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

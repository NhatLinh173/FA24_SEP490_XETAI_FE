import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
//  OwlCarousel Slider Import
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HomeBanner = () => {
  const [roleUser, setRoleUser] = useState(null);
  const [buttonLink, setButtonLink] = useState("");
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded && decoded.role) {
            localStorage.setItem("userRole", decoded.role); // Lưu vào localStorage
            return decoded.role;
          } else {
            throw new Error("Role not found in token");
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          return null;
        }
      }
      return null;
    };

    const role = decodeToken();
    setRoleUser(role);
  }, []);

  useEffect(() => {
    if (roleUser === "personal" || roleUser === "business") {
      setButtonLink("/order");
      setButtonText("Tìm Đơn Hàng");
    } else {
      setButtonLink("/request_quote");
      setButtonText("Tạo Đơn Hàng");
    }
  }, [roleUser]);

  let responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    960: {
      items: 1,
    },
    1200: {
      items: 1,
    },
  };

  return (
    <>
      <section id="homeOne_banner">
        <div className="banner-slider">
          <OwlCarousel
            className="owl-theme"
            responsive={responsive}
            autoplay={true}
            autoplayHoverPause={true}
            autoplayTimeout={2500}
            loop={true}
            nav={false}
            dots={true}
          >
            <div className="banner-item banner-img-one">
              <div className="container">
                <div className="banner_one_inner">
                  <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                      <div className="banner-text">
                        <h1>Hệ thống quản lý vận tải hàng hóa đường bộ</h1>
                        <p>
                          "Vận tải Bắc Nam – Kết nối mọi nhà, phục vụ tận tâm,
                          mang đến sự gắn kết, tin tưởng và thuận tiện trong mỗi
                          chuyến hàng khắp mọi miền tổ quốc."
                        </p>
                        <Link className="btn btn-theme" to={buttonLink}>
                          {buttonText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-item banner-img-two">
              <div className="container">
                <div className="banner_one_inner">
                  <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                      <div className="banner-text">
                        <h1>Hệ thống quản lý vận tải hàng hóa đường bộ</h1>
                        <p>
                          "Vận tải Bắc Nam – Kết nối mọi nhà, phục vụ tận tâm,
                          mang đến sự gắn kết, tin tưởng và thuận tiện trong mỗi
                          chuyến hàng khắp mọi miền tổ quốc."
                        </p>
                        <Link className="btn btn-theme" to={buttonLink}>
                          {buttonText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-item banner-img-three">
              <div className="container">
                <div className="banner_one_inner">
                  <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                      <div className="banner-text">
                        <h1>Hệ thống quản lý vận tải hàng hóa đường bộ</h1>
                        <p>
                          "Vận tải Bắc Nam – Kết nối mọi nhà, phục vụ tận tâm,
                          mang đến sự gắn kết, tin tưởng và thuận tiện trong mỗi
                          chuyến hàng khắp mọi miền tổ quốc."
                        </p>
                        <Link className="btn btn-theme" to={buttonLink}>
                          {buttonText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
        <div className="banner_social_icon">
          <ul>
            <li>
              <a href="#!">
                <i className="fab facebook fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab twitter fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab instagram fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab linkedin fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;

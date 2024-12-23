import React from "react";
import { Link } from "react-router-dom";

// TopHeader Area
const TopHeader = () => {
  return (
    <>
      <div className="top-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <ul className="left-info">
                <li>
                  <a href="mailto:RFTMS@gmail.com">
                    <i className="far fa-envelope"></i>
                    RFTMS@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+12345678">
                    <i className="fas fa-phone-volume"></i>
                    +0123 456 789
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <ul className="right-info">
                <li className="mr-20">
                  <Link to="/contact">Hỗ trợ</Link>
                </li>
                <li className="mr-20">
                  <Link to="/track_ship">Theo dõi đơn hàng</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;

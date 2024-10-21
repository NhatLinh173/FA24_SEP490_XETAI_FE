import React, { useState } from "react";
import ServiceCard from "../../Common/Service/ServiceCard";
import OwlCarousel from "react-owl-carousel";
//  OwlCarousel Slider Import
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import useInstanceData from "../../../config/useInstanceData";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LogisticsService = () => {
  const { data: post } = useInstanceData(`/posts`);

  return (
    <>
      <section id="logistics_area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="logistics_wrappers">
                <div className="logistic_tabs_button">
                  <ul>
                    <li>
                      <button className="active mb-4 ">Đơn Hàng</button>
                    </li>
                  </ul>
                </div>
                <div className="service_slider_home_two">
                  <OwlCarousel
                    className="owl-theme"
                    autoplay={true}
                    autoplayHoverPause={true}
                    autoplayTimeout={2500}
                    loop={true}
                    margin={20}
                    nav={false}
                    dots={true}
                  >
                    {post &&
                      post?.salePosts?.map((data) => (
                        <ServiceCard
                          key={data._id}
                          id={data._id}
                          img={
                            data.images && data.images.length > 0
                              ? data.images[0]
                              : "default-image.jpg"
                          }
                          goodsType={data.title}
                          pickupLocation={data.startPointCity}
                          dropoffLocation={data.destinationCity}
                          weight={data.load}
                          price={data.price}
                        />
                      ))}
                  </OwlCarousel>
                </div>
                <div className="review_button">
                  <Link to="/service" className="btn btn-theme mb-2">
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogisticsService;

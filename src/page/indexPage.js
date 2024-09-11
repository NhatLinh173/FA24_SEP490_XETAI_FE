import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import HomeBanner from "../component/Home_One/Banner";
import GetSchedule from "../component/Home_One/Get _Schedule";
import LogisticsService from "../component/Home_One/Logistics_Services";
import HomeAbout from "../component/Home_One/About";
import OurAdvantage from "../component/Home_One/Our_Advantages";
import MapArea from "../component/Home_One/Map";
import Testimonials from "../component/Home_One/Testimonial";
import PricingTable from "../component/Common/PricingTable";
import Subscribe from "../component/Common/Subscribe";
import BlogHome from "../component/Common/Blog";
import axios from "axios";

const IndexPage = () => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const status = queryParams.get("status");
    const orderCode = queryParams.get("orderCode");
    if (orderCode) {
      sessionStorage.setItem("orderCode", orderCode);
    }
    const token = localStorage.getItem("accessToken");
    const fetchPaymentCallback = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/payment/callback",
          {
            params: {
              status,
              orderCode,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Response Data:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentCallback();
  }, [location.search]);

  return (
    <>
      <HomeBanner />
      <GetSchedule />
      <LogisticsService />
      <HomeAbout />
      <OurAdvantage />
      <MapArea />
      <Testimonials />
      <PricingTable />
      <Subscribe />
      <BlogHome />
    </>
  );
};

export default IndexPage;

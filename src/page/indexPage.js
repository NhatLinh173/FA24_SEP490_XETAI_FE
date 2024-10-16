import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import HomeBanner from "../component/Home_One/Banner";
import GetSchedule from "../component/Home_One/Get _Schedule";
import LogisticsService from "../component/Home_One/Logistics_Services";
import HomeAbout from "../component/Home_One/About";
import OurAdvantage from "../component/Home_One/Our_Advantages";
import Testimonials from "../component/Home_One/Testimonial";
import BlogHome from "../component/Common/Blog";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const IndexPage = () => {
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", decodedToken.id);
        history.push("/");
        window.location.reload();
      } catch (error) {
        console.error("Invalid token");
        history.push("/signIn");
        window.location.reload();
      }
    }
  }, [history]);

  return (
    <>
      <HomeBanner />
      <GetSchedule />
      <LogisticsService />
      <HomeAbout />
      <OurAdvantage />
      <BlogHome />
      <Testimonials />
    </>
  );
};

export default IndexPage;

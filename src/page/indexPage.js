import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomeBanner from "../component/Home_One/Banner";
import LogisticsService from "../component/Home_One/Logistics_Services";
import HomeAbout from "../component/Home_One/About";
import OurAdvantage from "../component/Home_One/Our_Advantages";
import Testimonials from "../component/Home_One/Testimonial";
import BlogHome from "../component/Common/Blog";
import ChatIcon from "../component/Chat/chatIcon";
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
        localStorage.setItem("userRole", decodedToken.role);
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
      <LogisticsService />
      <HomeAbout />
      <OurAdvantage />
      <BlogHome />
      <Testimonials />
      <ChatIcon />
    </>
  );
};

export default IndexPage;

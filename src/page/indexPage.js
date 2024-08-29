import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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

const IndexPage = () => {
  const history = useHistory();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      history.push("/");
    }
  }, [history]);

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

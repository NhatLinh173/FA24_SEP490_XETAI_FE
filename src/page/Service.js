import React from "react";
import CommonBanner from "../component/Common/Banner";
import ServicesCard from "../component/Common/Service/ServicesCard";

const Service = () => {
  return (
    <>
      <CommonBanner heading="Services" page="Services" />
      <ServicesCard />
    </>
  );
};

export default Service;

import React from "react";
import CommonBanner from "../component/Common/Banner";
import SignUpForm from "../component/SignUp";
import OurPartner from "../component/Common/OurPartner";

const SignUp = () => {
  return (
    <>
      <CommonBanner />  
      <SignUpForm heading="Create an Account!" />
    </>
  );
};

export default SignUp;

import React from "react";
import CommonBanner from "../component/Common/Banner";
import SignUpCustomer from "../component/SignUp/signupCustomer";

const SignUpCustomerPage = () => {
  return (
    <>
      <CommonBanner heading="SignUpCustomer" page="SignUpCustomer" />
      <SignUpCustomer heading="Create an Account!" />
    </>
  );
};

export default SignUpCustomerPage;

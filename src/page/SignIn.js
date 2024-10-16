import React from "react";
import CommonBanner from "../component/Common/Banner";
import SignInForm from "../component/SignIn";

const SignIn = () => {
  return (
    <>
      <CommonBanner heading="SignIn" page="SignIn" />
      <SignInForm heading="Đăng nhập" />
    </>
  );
};

export default SignIn;

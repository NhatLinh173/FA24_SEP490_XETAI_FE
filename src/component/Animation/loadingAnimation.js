import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/Animation - 1729237324850.json";

const LoadingAnimation = () => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default LoadingAnimation;

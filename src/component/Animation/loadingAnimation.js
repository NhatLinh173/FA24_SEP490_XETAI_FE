import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/Animation - 1729237324850.json";

const LoadingAnimation = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: 100, height: 100 }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default LoadingAnimation;

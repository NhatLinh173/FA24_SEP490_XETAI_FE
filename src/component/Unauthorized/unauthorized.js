import React from "react";
import { useHistory } from "react-router-dom";

const Unauthorized = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="unauthorized-container">
      <h1>401 - Unauthorized</h1>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <button onClick={handleGoBack} className="back-button">
        Quay lại
      </button>
    </div>
  );
};

export default Unauthorized;

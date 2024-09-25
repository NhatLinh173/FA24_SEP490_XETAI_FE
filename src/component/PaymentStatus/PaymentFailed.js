import React from "react";
import "../../assets/css/paymentStatus.css";
import { useHistory } from "react-router-dom";

const PaymentFailed = () => {
  const history = useHistory();

  const handleGoToWallet = () => {
    history.push("/profile?tab=wallet");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _failed">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
            <h2>Thanh toán của bạn không thành công</h2>
            <p>Hãy thử lại sau.</p>
            <button className="btn btn-primary mt-4" onClick={handleGoToWallet}>
              Đi đến Ví
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;

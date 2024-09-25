import React from "react";
import "../../assets/css/paymentStatus.css";
import { useHistory } from "react-router-dom";

const PaymentSuccess = () => {
  const history = useHistory();

  const handleBackToHome = () => {
    history("/");
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h2>Thanh toán của bạn đã thành công</h2>
            <p>Cảm ơn bạn đã thanh toán.</p>
            <button className="btn btn-primary mt-4" onClick={handleBackToHome}>
              Trở về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

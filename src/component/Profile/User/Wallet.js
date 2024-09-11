import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../assets/css/wallet.css";
import { jwtDecode } from "jwt-decode";
const Wallet = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [error, setError] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [paymentInfor, setPaymentInfor] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const { fullName } = data || {};
  const location = useLocation();

  const handleDepositClick = async () => {
    setShowModal(true);
  };

  const handleDepositSubmit = async () => {
    const amount = parseInt(depositAmount, 10);
    if (amount < 5000 || amount > 1000000) {
      setError("Số tiền phải nằm trong khoảng 50,000 VND và 1,000,000 VND");
    } else {
      setError("");
      try {
        const response = await axios.post(
          "http://localhost:3005/payment/create",
          {
            description: "Payment for order",
            returnUrl: "http://localhost:3006/",
            cancelUrl: "http://localhost:3006/error",
            totalPrice: amount,
            orderCodeStatus: "Pending",
          }
        );

        if (response.status === 200) {
          setCheckoutUrl(response.data.data.checkoutUrl);
          setShowModal(true);
          console.log(response.data.data.checkoutUrl);
        }
      } catch (error) {
        console.error("API call failed: ", error);
        setError("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
        console.log(decodedToken);

        const responseUserId = await axios.get(
          `http://localhost:3005/payment/get-userId/${decodedToken.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseUserId.status === 200) {
          const fetchedOrderCode = sessionStorage.getItem("orderCode");
          setOrderCode(fetchedOrderCode);

          if (responseUserId.data && responseUserId.data.data) {
            const transactionsData = responseUserId.data.data;

            if (
              Array.isArray(transactionsData) &&
              transactionsData.length > 0
            ) {
              const innerArray = Array.isArray(transactionsData[0])
                ? transactionsData[0]
                : transactionsData;

              setTransactions(innerArray);

              const totalAmount = innerArray.reduce(
                (sum, transaction) => sum + (transaction.amount || 0),
                0
              );
              setBalance(totalAmount);
            } else {
              console.log("No valid transactions data found.");
            }
          }

          if (fetchedOrderCode) {
            await axios.get(
              `http://localhost:3005/payment/payment-info/${fetchedOrderCode}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        }
      } catch (error) {
        console.error("API call failed: ", error);
      }
    };

    fetchPaymentInfo();
  }, [userId]);

  return (
    <div>
      <h2>Ví của Bạn </h2>
      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex flex-column  ">
          <h4>
            Tài khoản:{" "}
            {paymentInfor
              ? paymentInfor.fullName
              : fullName || "Chưa có thông tin"}
          </h4>
          <span>Số dư: {(balance || 0).toLocaleString()} VNĐ</span>
        </div>
        <div className="">
          <button className="btn btn-primary" onClick={handleDepositClick}>
            Nạp tiền
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-2">
          <h4>Lịch sử giao dịch</h4>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại giao dịch</th>
              <th>Số tiền</th>
              <th>Ngày tháng</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.status === "PAID" ? "Nạp Tiền" : "Khác"}</td>
                  <td
                    style={{
                      color:
                        transaction.status === "PAID" ? "#00FF00" : "inherit",
                    }}
                  >
                    {transaction.status === "PAID"
                      ? `+${(transaction.amount || 0).toLocaleString()} đ`
                      : `${(transaction.amount || 0).toLocaleString()} đ`}
                  </td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination mb-2">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nạp tiền</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {checkoutUrl ? (
                  <div>
                    <h5>Link thanh toán:</h5>
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Thanh toán tại đây
                    </a>
                  </div>
                ) : (
                  <div>
                    <div className="form-group">
                      <label htmlFor="depositAmount">
                        Nhập số tiền muốn nạp:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="depositAmount"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Số tiền (VND)"
                      />
                      {error && <div className="text-danger mt-2">{error}</div>}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Đóng
                </button>
                {!checkoutUrl && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDepositSubmit}
                  >
                    Xác nhận nạp
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;

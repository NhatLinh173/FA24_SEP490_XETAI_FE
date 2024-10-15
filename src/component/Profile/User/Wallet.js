import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../assets/css/wallet.css";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../../config/axiosConfig";
import ReactPaginate from "react-paginate";

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
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 4;
  const offset = currentPage * transactionsPerPage;
  const currentTransactions = transactions.slice(
    offset,
    offset + transactionsPerPage
  );

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  const handleDepositClick = async () => {
    setShowModal(true);
  };

  const handleDepositSubmit = async () => {
    const amount = parseInt(depositAmount, 10);
    if (amount < 50000 || amount > 1000000) {
      setError("Số tiền phải nằm trong khoảng 50,000 VND và 1,000,000 VND");
    } else {
      setError("");
      try {
        const response = await axiosInstance.post(
          "http://localhost:3005/payment/create",
          {
            description: "Payment for order",
            returnUrl: "http://localhost:3006/payment/success",
            cancelUrl: "http://localhost:3006/payment/failed",
            totalPrice: amount,
            orderCodeStatus: "Pending",
          }
        );

        if (response.status === 200) {
          setCheckoutUrl(response.data.data.checkoutUrl);
          window.location.href = response.data.data.checkoutUrl;
          setShowModal(true);
        }
      } catch (error) {
        console.error("API call failed: ", error);
        setError("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true;
    }
  };

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      if (isTokenExpired(token)) {
        console.error("Token has expired");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
        console.log("Decoded token:", decodedToken);

        const responseUserId = await axiosInstance.get(
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
            await axiosInstance.get(
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
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{offset + index + 1}</td>
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
      <ReactPaginate
        pageCount={Math.ceil(transactions?.length / 3)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        previousLabel={"<<"}
        nextLabel={">>"}
      />
    </div>
  );
};

export default Wallet;

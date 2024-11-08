import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../assets/css/wallet.css";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../../config/axiosConfig";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Wallet = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [error, setError] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(data.balance || 0);
  const [transactions, setTransactions] = useState([]);
  const { fullName } = data || {};
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 4;
  const offset = currentPage * transactionsPerPage;
  const currentTransactions = Array.isArray(transactions)
    ? transactions.slice(offset, offset + transactionsPerPage)
    : [];

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  const handleDepositClick = () => {
    setShowModal(true);
  };

  const formatNumberWithCommas = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleDepositAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = formatNumberWithCommas(rawValue);
    setDepositAmount(formattedValue);
  };

  const handleDepositSubmit = async () => {
    const amount = parseInt(depositAmount.replace(/,/g, ""), 10);
    if (amount < 5000 || amount > 1000000) {
      setError("Số tiền phải nằm trong khoảng 5,000 VND và 1,000,000 VND");
      return;
    }

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
          userId: userId,
        }
      );

      if (response.status === 200) {
        setCheckoutUrl(response.data.data.checkoutUrl);
        window.location.href = response.data.data.checkoutUrl;
        try {
          const balanceResponse = await axios.put(
            "http://localhost:3005/auth/balance",
            {
              userId,
              amount,
            }
          );

          if (balanceResponse.status === 200) {
            setBalance((prevBalance) => prevBalance + amount);
          } else {
            setError("Không thể cập nhật số dư, vui lòng thử lại.");
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error("API call failed: ", error);
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(
            `/auth/transaction/${userId}`
          );

          if (response.status === 200) {
            setTransactions(response.data.transactions);
            console.log(response.data.transactions);
          }
        } catch (error) {
          console.error("Lỗi khi lấy giao dịch:", error);
        }
      }
    };

    fetchTransaction();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);

        try {
          const userResponse = await axiosInstance.get(
            `/auth/user/${decodedToken.id}`
          );
          if (userResponse.status === 200) {
            setBalance(userResponse.data.balance);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [location]);

  return (
    <div>
      <h2>Ví của Bạn</h2>
      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex flex-column">
          <h4>Tài khoản: {fullName || "Chưa có thông tin"}</h4>
          <span>Số dư: {(balance || 0).toLocaleString()} VNĐ</span>
        </div>
        <div>
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
              <th>Trạng thái giao dịch</th>
              <th>Số tiền</th>
              <th>Ngày tháng</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{offset + index + 1}</td>
                  <td>
                    {transaction.type === "POST_PAYMENT"
                      ? "Trừ phí đăng bài"
                      : transaction.type === "CANCEL_ORDER"
                      ? "Trừ phí hủy đơn hàng"
                      : transaction.type === "BANK_TRANSFER_PAYMENT"
                      ? "Thanh toán qua chuyển khoản"
                      : transaction.type === "DRIVER_PAYMENT"
                      ? "Thanh toán tiền hàng cho tài xế"
                      : "Nạp Tiền"}
                  </td>
                  <td>
                    {transaction.status === "PAID"
                      ? "Thành Công"
                      : transaction.status === "PENDING"
                      ? "Đang Chờ"
                      : "Thất Bại"}
                  </td>
                  <td
                    style={{
                      color:
                        transaction.type === "POST_PAYMENT" ||
                        transaction.type === "CANCEL_ORDER" ||
                        transaction.type === "BANK_TRANSFER_PAYMENT"
                          ? "red"
                          : transaction.type === "DEPOSIT"
                          ? "#00FF00"
                          : transaction.type === "DRIVER_PAYMENT"
                          ? "#00FF00"
                          : "inherit",
                    }}
                  >
                    {transaction.type === "POST_PAYMENT" ||
                    transaction.type === "CANCEL_ORDER" ||
                    transaction.type === "BANK_TRANSFER_PAYMENT"
                      ? `-${(transaction.amount || 0).toLocaleString()} đ`
                      : transaction.status === "PAID"
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
        <div
          className="modal show bg-dark bg-opacity-75"
          tabIndex="-1"
          role="dialog"
        >
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
                <div className="form-group">
                  <label htmlFor="depositAmount">Nhập số tiền muốn nạp:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="depositAmount"
                    value={depositAmount}
                    onChange={handleDepositAmountChange}
                    placeholder="Số tiền (VND)"
                  />
                  {error && <div className="text-danger mt-2">{error}</div>}
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
        pageCount={Math.ceil(transactions.length / transactionsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
        previousLabel={"<<"}
        nextLabel={">>"}
      />
    </div>
  );
};

export default Wallet;

import React from "react";

const Wallet = () => {
  return (
    <div>
      <h2>Ví của Bạn </h2>
      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex flex-column  ">
          <h4>Tài khoản: Nguyen Bao Phong</h4>
          <span>Số dư: 100,000 đ</span>
        </div>
        <div className="">
          <button className="btn btn-primary">Nạp tiền</button>
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
            <tr>
              <td>1</td>
              <td>Nạp tiền</td>
              <td>50,000 đ</td>
              <td>20/03/2021</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mua sản phẩm</td>
              <td>10,000 đ</td>
              <td>21/03/2021</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mua sản phẩm</td>
              <td>10,000 đ</td>
              <td>21/03/2021</td>
            </tr>
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
    </div>
  );
};

export default Wallet;

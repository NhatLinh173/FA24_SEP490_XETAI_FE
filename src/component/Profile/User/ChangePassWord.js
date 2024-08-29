import React from "react";


const ChangePassWord = () => {
  return (
    <div>
      <div>
        <h2 className="mb-4">Thay đổi mật khẩu</h2>
      </div>
      <div>
        <form>
          <div className=" row align-items-center">
            <div className="col-3">
              <label for="current_password">Mật khẩu hiện tại:</label>
            </div>
            <div className="col-9">
              <input
                className="form-control w-75 border"
                type="password"
                id="current_password"
                name="current_password"
                placeholder="Mật khẩu hiện tại"
                required
              />
            </div>
          </div>
          <br />
          <div className="row align-items-center">
            <div className="col-3">
              <label for="new_password">Mật khẩu mới</label>
            </div>
            <div className="col-9">
              <input
                className="form-control w-75 border"
                placeholder="Nhập mật khẩu mới"
                type="password"
                id="new_password"
                name="new_password"
                required
              />
            </div>
          </div>
          <br />
          <div className="row align-items-center">
            <div className="col-3">
              <label for="confirm_password">Xác nhận mật khẩu:</label>
            </div>
            <div className="col-9">
              <input
                className="form-control w-75 border"
                placeholder="Nhập xác nhận mật khẩu"
                type="password"
                id="confirm_password"
                name="confirm_password"
                required
              />
            </div>
          </div>
          <br />
          <div className="row justify-content-center pb-3 ">
            <a href="#fff" className="btn btn-primary btn-lg  ">
              <span>Cập Nhập</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassWord;

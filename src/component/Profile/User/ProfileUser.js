import React from "react"
// import { CiCamera } from "react-icons/ci";

const ProfileUser = () => {
  return (
    <div>
      <div>
        <h2>Thông Tin</h2>
      </div>
      <div>
        <form className="mt-4">
          <div className="avatar ">
            <div className="avt-img">
              <img
                className="rounded-circle "
                src="https://mcdn.coolmate.me/image/August2023/luu-ngay-20-meme-tinh-tam-moi-nhat-2023-2383_391.jpg"
                alt="avatar"
              />

              {/* <CiCamera className="icon-avt rounded-circle p-1" /> */}
            </div>
          </div>
          <div className="row g-3 align-item-center">
            <div className="col-3">
              <label for="name" className="col-form-label">
                Họ và Tên:
              </label>
            </div>
            <div className="col-9">
              {/* <input
                type="text"
                id="name"
                className="form-control w-75 border"
                placeholder="Nhập Họ và Tên"
              /> */}
              <div className="d-flex align-items-center justify-content-between ">
                <p className="text-input">Nguyen Bao Phong</p>
                <button className="btn-change">
                  <i className="fas fa-pencil-alt"></i> Thay đổi
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="row g-3 align-items-center ">
            <div className="col-3">
              <label for="phone" className="col-form-label">
                Số Điện Thoại:
              </label>
            </div>
            <div className="col-9">
              {/* <input
                type="text"
                id="phone"
                placeholder="Nhập Số Điện Thoại"
                name="phone"
                className="form-control w-50 border"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              /> */}
              <div className="d-flex align-items-center justify-content-between ">
                <p className="text-input">0914822620</p>
                <button className="btn-change">
                  <i className="fas fa-pencil-alt"></i> Thay đổi
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="row g-3 align-items-center">
            <div className="col-3">
              <label for="email" className="col-form-label">
                Email:
              </label>
            </div>
            <div className="col-9">
              <input
                type="email"
                placeholder="Nhập Email"
                id="email"
                name="email"
                className="form-control w-50 border "
              />
            </div>
          </div>
          <br />
          <div className="row g-3 align-items-center">
            <div className="col-3">
              <label for="pwd">Địa chỉ:</label>
            </div>
            <div className="col-9">
              <input
                type="adress"
                placeholder="Nhập Địa Chỉ"
                id="pwd"
                name="pwd"
                className="form-control w-50 border "
              />
              <br />
            </div>
          </div>
          {/* <div className="d-flex justify-content-center mb-3 ">
            <button class="btn btn-primary w-25" type="submit">
              Update
            </button>
          </div> */}

          <div className="w-70 d-flex justify-content-center mb-3">
            <a href="#fff" className="btn btn-primary btn-lg w-25 ">
              <span>Cập nhật</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileUser

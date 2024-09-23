import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useInstanceData from "../../../config/useInstanceData";
const HistoryPostDetail = () => {
  const { id } = useParams();
  const {
    data: post,
    loading,
    error,
    refetch,
  } = useInstanceData(`/posts/${id}`);
  const { data: category } = useInstanceData(`/categories/${post?.category}`);
  const { data: driver } = useInstanceData(`/auth/user/${post?.driver}`);
  console.log(driver);
  return (
    <div className="wrapper container pb-5">
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
      <div className="row">
        {/* Left Side: Service Details */}
        <div className="col-md-8">
          <div className="border rounded p-3 shadow-sm">
            {/* Service Information */}
            <div className="d-flex border-bottom pb-3 mb-3">
              <img
                src="https://lawnet.vn/uploads/image/2023/06/09/043314645.jpg"
                alt="service"
                className="img-fluid rounded"
                style={{ width: "100%", height: "auto", objectFit: "flex" }}
              />
            </div>
            <div>
              <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
                Thông tin chi tiết
              </h5>
              <form>
                <div className="border rounded p-3 shadow-sm">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="type" className="font-weight-bold">
                        Loại hàng
                      </label>
                      <input
                        id="type"
                        defaultValue={post?.title}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="type" className="font-weight-bold">
                        Loại xe
                      </label>
                      <input
                        id="carType"
                        defaultValue={category[0]?.description}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="weight" className="font-weight-bold">
                        Khối lượng
                      </label>
                      <input
                        id="weight"
                        defaultValue={post?.load}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="price" className="font-weight-bold">
                        Giá
                      </label>
                      <input
                        id="price"
                        defaultValue={post?.price}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        htmlFor="pickupLocation"
                        className="font-weight-bold"
                      >
                        Địa điểm lấy hàng
                      </label>
                      <input
                        id="pickupLocation"
                        defaultValue={post?.startPoint}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        htmlFor="dropoffLocation"
                        className="font-weight-bold"
                      >
                        Địa điểm trả hàng
                      </label>
                      <input
                        id="dropoffLocation"
                        defaultValue={post?.destination}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="description" className="font-weight-bold">
                        Mô tả đơn hàng
                      </label>
                      <textarea
                        id="description"
                        defaultValue={post?.detail}
                        className="form-control"
                        rows="4"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <h5
                        className="font-weight-bold"
                        style={{ marginTop: "20px" }}
                      >
                        Thông tin người đặt
                      </h5>
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="name" className="font-weight-bold">
                        Họ và Tên
                      </label>

                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        defaultValue={post?.fullname}
                      />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="email" className="font-weight-bold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        defaultValue={post?.email}
                      />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                      <label htmlFor="phone" className="font-weight-bold">
                        Số điện thoại
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        className="form-control"
                        defaultValue={post?.phone}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Info */}
        {post?.driver && (
          <div className="col-md-4">
            <div className="border rounded p-3 shadow-sm">
              <div className="contact-info">
                <div className="contact-avatar-wrapper rounded-circle">
                  {driver?.avatar && (
                    <img
                      src={driver?.avatar}
                      className="contact-avatar rounded-circle"
                      alt="contact avatar"
                    />
                  )}
                </div>
                <div className="contact-details">
                  <h5 className="contact-name">{driver?.fullName}</h5>
                  <p className="contact-phone">{driver?.phone}</p>
                  <p className="contact-email">{driver?.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPostDetail;

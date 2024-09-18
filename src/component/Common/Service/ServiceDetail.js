import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ServiceData } from './ServiceData';
import { ToastContainer, toast } from 'react-toastify';

const ServiceDetail = () => {
    const { id } = useParams();
    const history = useHistory(); // Sử dụng useHistory thay vì useNavigate
    const service = ServiceData.find((item) => item.id === parseInt(id));

    const handleAcceptOrder = () => {
        toast.success("Chấp nhận đơn hàng thành công", {
            autoClose: 2000, // Thời gian hiển thị toast (ms)
            onClose: () => {
                history.goBack(); // Quay lại trang trước
            }
        });
    };

    const handleClose = () => {
        history.goBack(); // Quay lại trang trước
    };

    if (!service) return <div>Loading...</div>;

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
                                src={service.img}
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
                                            <label htmlFor="type">Loại hàng</label>
                                            <input
                                                id="type"
                                                defaultValue={service.goodsType}
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="type">Loại xe</label>
                                            <input
                                                id="carType"
                                                defaultValue={service.carType}
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="weight">Khối lượng</label>
                                            <input
                                                id="weight"
                                                defaultValue={`${service.weight} kg`}
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="price">Giá</label>
                                            <input
                                                id="price"
                                                defaultValue={service.price}
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="pickupLocation">Địa điểm lấy hàng</label>
                                            <input
                                                id="pickupLocation"
                                                defaultValue={service.pickupLocation}
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="dropoffLocation">Địa điểm trả hàng</label>
                                            <input
                                                id="dropoffLocation"
                                                defaultValue={service.dropoffLocation}
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="description">Mô tả đơn hàng</label>
                                            <textarea
                                                id="description"
                                                defaultValue={service.description}
                                                className="form-control"
                                                readOnly
                                                rows="4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="mt-3 d-flex justify-content-end">
                            <button
                                className="btn btn-accept-order mr-2"
                                onClick={handleAcceptOrder}
                            >
                                Chấp nhận đơn hàng
                            </button>
                            <button
                                className="btn btn-close-order"
                                onClick={handleClose}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Info */}
                <div className="col-md-4">
                    <div className="border rounded p-3 shadow-sm">
                        <div className="contact-info">
                            <div className="contact-avatar-wrapper">
                                <img
                                    src="https://via.placeholder.com/120"
                                    className="contact-avatar"
                                    alt="contact avatar"
                                />
                            </div>
                            <div className="contact-details">
                                <h5 className="contact-name">{service.posterName}</h5>
                                <p className="contact-phone">{service.phoneNumber}</p>
                                <p className="contact-email">{service.contactEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;

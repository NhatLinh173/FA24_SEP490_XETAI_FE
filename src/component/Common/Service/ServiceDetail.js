import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ServiceData } from './ServiceData';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ServiceDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const service = ServiceData.find((item) => item.id === parseInt(id));

    const [showModal, setShowModal] = useState(false);
    const [negotiatedPrice, setNegotiatedPrice] = useState(''); // Giá thương lượng
    const [deliveryTime, setDeliveryTime] = useState(''); // Thời gian giao hàng
    const [isNegotiating, setIsNegotiating] = useState(false); // Xác định người dùng chọn thương lượng
    const [isConfirming, setIsConfirming] = useState(false); // Xác định người dùng đang xác nhận giá

    const handleAcceptOrder = () => {
        setShowModal(true); // Hiển thị modal
        setIsConfirming(true); // Bắt đầu xác nhận giá
    };

    const handleConfirmPrice = () => {
        setIsConfirming(false); // Không thương lượng, chấp nhận giá gốc
    };

    const handleNegotiatePrice = () => {
        setIsNegotiating(true); // Thương lượng giá
        setIsConfirming(false); // Đóng xác nhận giá
    };

    const handleSubmitOrder = () => {
        if (!deliveryTime) {
            toast.error("Vui lòng chọn thời gian dự kiến giao hàng");
            return;
        }
        setShowModal(false); // Đóng modal
        toast.success("Chấp nhận đơn hàng thành công", { autoClose: 2000 });
    };

    const handleSubmitNegotiation = () => {
        if (!deliveryTime) {
            toast.error("Vui lòng chọn thời gian dự kiến giao hàng");
            return;
        }
        setShowModal(false); // Đóng modal
        toast.success("Gửi yêu cầu thương lượng thành công", { autoClose: 2000 });
    };

    const handleCloseModal = () => {
        setShowModal(false); // Đóng modal
        setNegotiatedPrice(''); // Đặt lại giá thương lượng
        setDeliveryTime(''); // Đặt lại thời gian giao hàng
        setIsNegotiating(false); // Đặt lại trạng thái thương lượng
        setIsConfirming(false); // Đặt lại trạng thái xác nhận
    };

    const handlePriceChange = (e) => {
        // Lấy giá trị đầu vào và loại bỏ các ký tự không phải số
        const value = e.target.value.replace(/\D/g, "");
        // Định dạng số với dấu phẩy
        const formattedValue = new Intl.NumberFormat().format(value);
        setNegotiatedPrice(formattedValue);
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
                                style={{ width: "100%", height: "auto", objectFit: "cover" }}
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

                        {/* Thông tin người đặt */}
                        <div className="mt-4">
                            <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
                                Thông tin người đặt
                            </h5>
                            <div className="border rounded p-3 shadow-sm">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="posterName">Họ và tên</label>
                                        <input
                                            id="posterName"
                                            defaultValue={service.posterName}
                                            type="text"
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="posterPhone">Số điện thoại</label>
                                        <input
                                            id="posterPhone"
                                            defaultValue={service.phoneNumber}
                                            type="text"
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="posterEmail">Email</label>
                                        <input
                                            id="posterEmail"
                                            defaultValue={service.contactEmail}
                                            type="text"
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin người nhận */}
                        <div className="mt-4">
                            <h5 className="font-weight-bold" style={{ marginBottom: "15px" }}>
                                Thông tin người nhận
                            </h5>
                            <div className="border rounded p-3 shadow-sm">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="receiverName">Họ và tên</label>
                                        <input
                                            id="receiverName"
                                            defaultValue={service.receiverName}
                                            type="text"
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="receiverPhone">Số điện thoại</label>
                                        <input
                                            id="receiverPhone"
                                            defaultValue={service.receiverPhone}
                                            type="text"
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="receiverEmail">Email</label>
                                        <input
                                            id="receiverEmail"
                                            defaultValue={service.receiverEmail}
                                            type="text"
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 d-flex justify-content-end">
                            <button
                                className="btn btn-accept-order"
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

                    {/* Modal */}
                    <Modal show={showModal} onHide={handleCloseModal} className="order-acceptance-modal" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Chấp nhận đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {isConfirming && !isNegotiating ? (
                                <>
                                    <p>Bạn có muốn chấp nhận giá này: {service.price}?</p>
                                    <Button className="success text-white" onClick={handleConfirmPrice} style={{ marginBottom: '10px' }}>
                                        Đồng ý
                                    </Button>
                                    <Button className="secondary text-white" onClick={handleNegotiatePrice}>
                                        Thương lượng giá
                                    </Button>
                                </>
                            ) : isNegotiating ? (
                                <>
                                    <p>Nhập giá mong muốn:</p>
                                    <div className="input-group mb-3"> {/* Sử dụng input-group */}
                                        <input
                                            type="text" // Đổi thành text để cho phép định dạng
                                            className="form-control"
                                            value={negotiatedPrice}
                                            onChange={handlePriceChange}
                                            placeholder="Nhập giá mong muốn"
                                        />
                                        <span className="currency-unit">VND</span>
                                    </div>
                                    <p>Thời gian dự kiến giao hàng:</p>
                                    <input
                                        type="datetime-local" // Sử dụng datetime-local
                                        className="form-control mb-3"
                                        value={deliveryTime}
                                        onChange={(e) => setDeliveryTime(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                    <Button className="info text-white" onClick={handleSubmitNegotiation}>
                                        Gửi yêu cầu thương lượng
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p>Thời gian dự kiến giao hàng:</p>
                                    <input
                                        type="datetime-local" // Sử dụng datetime-local
                                        className="form-control mb-3"
                                        value={deliveryTime}
                                        onChange={(e) => setDeliveryTime(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                    <Button className="info text-white" onClick={handleSubmitOrder}>
                                        Gửi yêu cầu
                                    </Button>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-close-order secondary" onClick={handleCloseModal}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>

                {/* Right Side: Sidebar */}
                <div className="col-md-4">
                    <div className="border rounded p-3 shadow-sm">
                        <h5 className="font-weight-bold" style={{ textAlign: 'center', marginBottom: "15px" }}>
                            Người đăng bài
                        </h5>
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

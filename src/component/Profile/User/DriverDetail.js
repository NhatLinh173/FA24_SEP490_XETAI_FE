import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";



const DriverDetail = () => {
    const { id } = useParams();


    const drivers = [
        {
            id: 1,
            driverImage: 'https://studiochupanhdep.com/Upload/Images/Album/anh-cv-02.jpg',
            driverName: 'Nguyễn Văn A',
            rating: 5,
            tripsCompleted: 50,
            address: "123 Đường ABC, Quận XYZ, TP. HCM", // Thêm trường địa chỉ
            vehicles: [
                {
                    vehicleType: "SUV",
                    vehicleName: "Mitsubishi Outlander", // Thêm tên xe
                    vehicleImage: "https://www.mitsubishi-motors.com.vn/w/wp-content/uploads/2023/07/All-New-Compact-SUV_Exterior_01.jpg",
                    vehicleRegistration: "43A-678.90",
                    payload: "500 kg",
                    registerVehicleImg: "https://storage.googleapis.com/f1-cms/2019/10/c27b6560-20191015_092859-800x533.jpg"
                },
                {
                    vehicleType: "Sedan",
                    vehicleName: "Toyota Camry", // Thêm tên xe
                    vehicleImage: "https://thanhnien.mediacdn.vn/Uploaded/chicuong/2022_01_13/toyota-camry-2-1639733236-1639-9625-3741-1639734273-1919.jpeg",
                    vehicleRegistration: "44B-123.45",
                    payload: "500 kg",
                    registerVehicleImg: "https://img.otofun.net/upload/v4/113724/704_image.jpeg"
                }
            ],
            email: "nguyen.vanA@example.com",
            phoneNumber: "0987654320",
        },
        {
            id: 2,
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Trần Thị B',
            rating: 3,
            tripsCompleted: 30,
            vehicles: [
                {
                    vehicleType: "Hatchback",
                    vehicleImage: "https://via.placeholder.com/300",
                    vehicleRegistration: "29B-123.45",
                    payload: "400 kg"
                }
            ],
            email: "tran.thiB@example.com",
            phoneNumber: "0987654321",
        },
        {
            id: 3,
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Lê Văn C',
            rating: 2,
            tripsCompleted: 25,
            vehicles: [
                {
                    vehicleType: "Truck",
                    vehicleImage: "https://via.placeholder.com/300",
                    vehicleRegistration: "56C-234.56",
                    payload: "1000 kg"
                }
            ],
            email: "le.vanC@example.com",
            phoneNumber: "0987654322",
        },
        {
            id: 4,
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Nguyễn Thị D',
            rating: 4.9,
            tripsCompleted: 60,
            vehicles: [
                {
                    vehicleType: "Sedan",
                    vehicleImage: "https://via.placeholder.com/300",
                    vehicleRegistration: "78D-345.67",
                    payload: "500 kg"
                }
            ],
            email: "nguyen.thiD@example.com",
            phoneNumber: "0987654323",
        },
        {
            id: 5,
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Phạm Văn E',
            rating: 4.6,
            tripsCompleted: 45,
            vehicles: [
                {
                    vehicleType: "Van",
                    vehicleImage: "https://via.placeholder.com/300",
                    vehicleRegistration: "91E-456.78",
                    payload: "700 kg",
                }
            ],
            email: "pham.vanE@example.com",
            phoneNumber: "0987654324",
        },
        {
            id: 6,
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Trương Thị F',
            rating: 4.5,
            tripsCompleted: 35,
            vehicles: [
                {
                    vehicleType: "Minivan",
                    vehicleImage: "https://via.placeholder.com/300",
                    vehicleRegistration: "10F-567.89",
                    payload: "800 kg"
                }
            ],
            email: "truong.thiF@example.com",
            phoneNumber: "0987654325",
        },
        {
            id: 7,
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Bùi Văn G',
            rating: 4.8,
            tripsCompleted: 40,
            vehicles: [
                {
                    vehicleType: "SUV",
                    vehicleImage: "https://via.placeholder.com/300",
                    vehicleRegistration: "11G-678.90",
                    payload: "600 kg"
                }
            ],
            email: "bui.vanG@example.com",
            phoneNumber: "0987654326",
        },
    ];


    const driver = drivers.find(driver => driver.id === parseInt(id));

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowDetails = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedVehicle(null);
    };


    const getStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating);
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars.push(<i key={i} className="fa fa-star star-filled"></i>);
            } else {
                stars.push(<i key={i} className="fa fa-star star-empty"></i>);
            }
        }
        return stars;
    };

    if (!driver) {
        return <div>Driver not found</div>; // Handle the case where no driver is found
    }

    return (
        <div className="wrapper container pb-5">
            <div className="row">
                {/* Left Side: Driver and Vehicle Info */}
                <div className="col-md-8">
                    <div className="border rounded p-3 shadow-sm">
                        {/* Driver Information */}
                        <div className="d-flex border-bottom pb-3 mb-3">
                            <img
                                src={driver.driverImage}
                                alt="vehicle"
                                className="img-fluid rounded"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                            <div className="ml-3 d-flex flex-column justify-content-center">
                                <h4 className="mb-2">{driver.driverName}</h4>
                                <div className="mb-2">
                                    {getStars(driver.rating)}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-weight-bold" style={{ marginBottom: '15px' }}>Thông tin liên hệ</h5>
                            <form>
                                <div className="border rounded p-3 shadow-sm">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                defaultValue={driver.email}
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="phone-number">Số điện thoại</label>
                                            <input
                                                id="phone-number"
                                                defaultValue={driver.phoneNumber}
                                                type="tel"
                                                className="form-control"
                                                placeholder="Số điện thoại"
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input
                                                id="address"
                                                defaultValue={driver.address}
                                                type="add"
                                                className="form-control"
                                                placeholder="Địa chỉ"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>


                        <div className="mb-4">
                            <h4 className="font-weight-bold" style={{ marginBottom: '20px', marginTop: '20px' }}>Thông tin xe</h4>
                            {driver.vehicles.map((vehicle, index) => (
                                <div key={index} className="border rounded p-2 mb-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <p><strong>Tên xe:</strong> {vehicle.vehicleName}</p> {/* Hiển thị tên xe */}
                                        <p><strong>Biển số:</strong> {vehicle.vehicleRegistration}</p>
                                    </div>
                                    <Button variant="primary" onClick={() => handleShowDetails(vehicle)}>
                                        Xem thêm
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal for Vehicle Details */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết xe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-custom">
                        {selectedVehicle && (
                            <div>
                                <img
                                    src={selectedVehicle.vehicleImage}
                                    alt="vehicle"
                                    className="img-fluid rounded mb-3"
                                    style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }} />
                                <p><strong>Loại xe:</strong> {selectedVehicle.vehicleType}</p>
                                <p><strong>Tên xe:</strong> {selectedVehicle.vehicleName}</p>
                                <p><strong>Biển số:</strong> {selectedVehicle.vehicleRegistration}</p>
                                <p><strong>Trọng tải:</strong> {selectedVehicle.payload}</p>
                                <p><strong>Đăng kiểm xe:</strong></p>
                                {selectedVehicle.registerVehicleImg && (
                                    <div className="mt-3">
                                        <img
                                            src={selectedVehicle.registerVehicleImg}
                                            alt="Vehicle Registration"
                                            className="img-fluid rounded"
                                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>





                {/* Right Side: Driver Avatar and Additional Info */}
                <div className="col-md-4">
                    <div className="border rounded p-3 shadow-sm">
                        <div className="d-flex align-items-center border-bottom pb-3">
                            <img
                                src={driver.driverImage}
                                className="border rounded mr-3"
                                style={{ width: "120px", height: "120px", objectFit: "cover", }}
                                alt="driver avatar"
                            />
                            <div>
                                <h6 className="text-muted">Tài xế</h6>
                                <h5>{driver.driverName}</h5>
                                <p className="text-muted">{driver.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="pt-3 statistics-section">
                            <h6>Thống kê hoạt động</h6>
                            <div className="statistics-item">
                                <p className="stat-label">Chuyến đi tuần này:</p>
                                <p className="stat-value">10</p>
                            </div>
                            <div className="statistics-item">
                                <p className="stat-label">Chuyến đi tháng này:</p>
                                <p className="stat-value">40</p>
                            </div>
                            <div className="statistics-item">
                                <p className="stat-label">Đánh giá trung bình:</p>
                                <p className="stat-value">{driver.rating}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default DriverDetail;
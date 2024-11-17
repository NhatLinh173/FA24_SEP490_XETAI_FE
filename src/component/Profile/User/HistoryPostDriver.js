import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { FaMapLocation } from "react-icons/fa6";
import { BsFillFilePostFill } from "react-icons/bs";

const HistoryPostDriver = ({ posts, onDelete }) => {
    const history = useHistory();

    // Dữ liệu giả cho các bài đăng
    const postsData = [
        { _id: '1', image: 'https://product.hstatic.net/200000411383/product/xe-tai-veam-3t5_a454cb1ce8bd47a68b56370772e5eaf5_master.jpg', startPointCity: 'Hà Nội', destinationCity: 'TP.HCM', content: 'Vận chuyển hàng điện tử, bảo đảm an toàn và nhanh chóng.' },
        { _id: '2', image: 'https://via.placeholder.com/360x200?text=Image+2', startPointCity: 'Đà Nẵng', destinationCity: 'Hải Phòng', content: 'Hàng thực phẩm, yêu cầu vận chuyển nhiệt độ thấp.' },
        { _id: '3', image: 'https://via.placeholder.com/360x200?text=Image+3', startPointCity: 'Nha Trang', destinationCity: 'Cần Thơ', content: 'Giao hàng gia dụng, yêu cầu đóng gói cẩn thận.' },
    ];

    // State cho modal
    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    // Điều hướng đến trang chi tiết bài đăng
    const handlePostClick = (postId) => {
        history.push(`/history-post-driver/detail/${postId}`);
    };

    // Hiển thị modal xác nhận xoá
    const handleShowModal = (postId) => {
        setPostToDelete(postId);
        setShowModal(true);
    };

    // Ẩn modal
    const handleCloseModal = () => {
        setShowModal(false);
        setPostToDelete(null);
    };

    // Xoá bài đăng
    const handleDeletePost = () => {
        onDelete(postToDelete);
        handleCloseModal();
    };

    return (
        <div>
            <h2>Bài đăng</h2>
            {postsData.map((post) => (
                <div
                    key={post._id}
                    className="my-4 border rounded-12 card-hover position-relative"
                    onClick={() => handlePostClick(post._id)} // Điều hướng khi nhấp vào bài đăng
                    style={{ cursor: 'pointer' }} // Thêm con trỏ chuột dạng tay để chỉ ra đây là một mục có thể nhấp
                >
                    <div className="p-3 d-flex">
                        {/* Ảnh */}
                        <div className="image-container">
                            <img
                                src={post.image}
                                alt="Hàng hóa"
                                className="rounded-12 cursor-pointer"
                                style={{ width: '360px', height: '200px', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Thông tin bài đăng */}
                        <div className="ml-3">
                            <div className="mb-2 text-secondary d-flex align-items-center">
                                <FaMapLocation className="mr-2" /> {/* Icon điểm đi */}
                                <div className="font-weight-bold">Điểm đi:</div>
                                <div className="ml-2 flex-grow-1 text-truncate">{post.startPointCity}</div>
                            </div>
                            <div className="mb-2 text-secondary d-flex align-items-center">
                                <FaMapLocation className="mr-2" /> {/* Icon điểm đến */}
                                <div className="font-weight-bold">Điểm đến:</div>
                                <div className=" ml-2 flex-grow-1 text-truncate">{post.destinationCity}</div>
                            </div>
                            <div className="mb-2 text-secondary d-flex align-items-center">
                                <BsFillFilePostFill className="mr-2" />
                                <div className="font-weight-bold" style={{ whiteSpace: 'nowrap' }}>Nội dung:</div>

                            </div>
                            <div className="flex-grow-1 ">{post.content}</div>
                            {/* Nút xoá */}
                            <div
                                className="position-absolute"
                                style={{ right: "10px", top: "10px" }}
                            >
                                <button
                                    className="btn-danger btn-sm align-self-start border-0"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Ngăn sự kiện nổi bọt
                                        handleShowModal(post._id); // Hiển thị modal xóa
                                    }}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal Xoá */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá bài đăng này không?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>Huỷ</button>
                    <button className="btn btn-danger" onClick={handleDeletePost}>Xoá</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HistoryPostDriver;

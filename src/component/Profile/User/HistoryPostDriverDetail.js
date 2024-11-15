import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';

const HistoryPostDriverDetail = () => {
    const { postId } = useParams(); // Lấy postId từ URL

    // Dữ liệu giả cho bài đăng
    const postsData = [
        { _id: '1', image: 'https://product.hstatic.net/200000411383/product/xe-tai-veam-3t5_a454cb1ce8bd47a68b56370772e5eaf5_master.jpg', startPointCity: 'Hà Nội', destinationCity: 'TP.HCM', content: 'Vận chuyển hàng điện tử, bảo đảm an toàn và nhanh chóng.' },
        { _id: '2', image: 'https://via.placeholder.com/360x200?text=Image+2', startPointCity: 'Đà Nẵng', destinationCity: 'Hải Phòng', content: 'Hàng thực phẩm, yêu cầu vận chuyển nhiệt độ thấp.' },
        { _id: '3', image: 'https://via.placeholder.com/360x200?text=Image+3', startPointCity: 'Nha Trang', destinationCity: 'Cần Thơ', content: 'Giao hàng gia dụng, yêu cầu đóng gói cẩn thận.' },
    ];

    // Tìm bài đăng từ mảng dữ liệu
    const post = postsData.find(p => p._id === postId);

    // State để quản lý giá trị các trường
    const [formData, setFormData] = useState({
        startPointCity: '',
        destinationCity: '',
        content: '',
    });

    const [imgUpload, setImgUpload] = useState(post?.image || ''); // Trạng thái ảnh tải lên

    // Chạy khi component mount hoặc postId thay đổi
    useEffect(() => {
        if (post) {
            setFormData({
                startPointCity: post.startPointCity,
                destinationCity: post.destinationCity,
                content: post.content,
            });
            setImgUpload(post.image); // Cập nhật ảnh của bài đăng
        }
    }, [postId, post]);

    // Hàm xử lý thay đổi các trường
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Hàm xử lý khi người dùng tải ảnh lên
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUpload(reader.result); // Lưu ảnh đã tải lên
            };
            reader.readAsDataURL(file); // Đọc ảnh dưới dạng base64
        }
    };

    // Hàm xử lý xóa ảnh
    const handleRemoveImage = () => {
        setImgUpload(''); // Xóa ảnh
    };

    // Hàm lưu dữ liệu
    const handleSubmit = (e) => {
        e.preventDefault();
        // Cập nhật thông tin bài đăng (có thể gọi API nếu cần)
        console.log('Dữ liệu đã thay đổi:', formData);
        console.log('Ảnh đã thay đổi:', imgUpload);
    };

    // Nếu không tìm thấy bài đăng
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Chỉnh sửa bài đăng</h2>
            <div className="row">
                <div className="col-12">
                    {/* Hiển thị ảnh bài đăng */}
                    <div>
                        {/* Hiển thị ảnh đã tải lên */}
                        <div
                            className={`d-flex image-form align-items-center mb-3 ${post.image ? "justify-content-center" : "justify-content-between w-100"
                                }`}
                        >
                            <div className="position-relative border rounded-12 p-3 d-inline-block">
                                <img
                                    src={imgUpload || post.image}  // Sử dụng ảnh tải lên nếu có, nếu không thì sử dụng ảnh mặc định
                                    alt="Post"
                                    className="img-fluid rounded-12"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                                <IoCloseCircleOutline
                                    className="position-absolute delete-img"
                                    onClick={handleRemoveImage}  // Xóa ảnh
                                />
                            </div>
                        </div>

                        {/* Phần tải ảnh lên */}
                        <div className="text-center">
                            <input
                                className="input-custom"
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label
                                className="border rounded-12 p-3 pointer img-upload width-img"
                                htmlFor="file-upload"
                            >
                                <img src={imgUpload} alt="upload" />
                            </label>
                            <p className="font-weight-bold">Tải ảnh lên</p>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label" style={{ fontWeight: 'bold' }}>Điểm đi</label>
                                <select
                                    name="startPointCity"
                                    value={formData.startPointCity}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Chọn điểm đi</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="TP.HCM">TP.HCM</option>
                                    {/* Thêm các thành phố khác nếu cần */}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label" style={{ fontWeight: 'bold' }}>Điểm đến</label>
                                <select
                                    name="destinationCity"
                                    value={formData.destinationCity}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Chọn điểm đến</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="TP.HCM">TP.HCM</option>
                                    {/* Thêm các thành phố khác nếu cần */}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 'bold' }}>Nội dung</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="6"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-center mt-3 mb-2">
                            <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default HistoryPostDriverDetail;

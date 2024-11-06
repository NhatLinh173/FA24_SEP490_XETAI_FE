import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        avatar: "https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg",
        name: 'Nguyễn Văn A',
        email: 'admin@example.com',
        role: 'Quản trị viên',
        phone: '0123456789',
        address: '123 Đường ABC, Quận 1, TP. HCM',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        setAdminData((prevData) => ({
            ...prevData,
            avatar: URL.createObjectURL(file),
        }));
    };

    const handleSave = () => {
        console.log('Admin profile updated:', adminData);
        setSuccessMessage('Cập nhật thông tin thành công');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    };

    return (
        <div className="admin-profile-container">
            <h2 className="admin-profile-title">Thông tin cá nhân</h2>
            <div className="admin-profile-avatar-section">
                <img src={adminData.avatar} alt="Admin Avatar" className="admin-profile-avatar" />
                <label htmlFor="avatar" className="admin-profile-avatar-upload">
                    <Upload className="admin-profile-upload-icon" />
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="admin-profile-avatar-input"
                        onChange={handleAvatarUpload}
                    />
                </label>
            </div>

            <div className="admin-profile-details-section">
                <div className="admin-profile-detail-field">
                    <label htmlFor="name" className="admin-profile-label">Họ và tên</label>
                    <input
                        type="text"
                        name="name"
                        value={adminData.name}
                        onChange={handleInputChange}
                        className="admin-profile-input"
                    />
                </div>

                <div className="admin-profile-detail-field">
                    <label htmlFor="email" className="admin-profile-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={adminData.email}
                        onChange={handleInputChange}
                        className="admin-profile-input"
                    />
                </div>

                <div className="admin-profile-detail-field">
                    <label htmlFor="role" className="admin-profile-label">Chức vụ</label>
                    <input
                        type="text"
                        name="role"
                        value={adminData.role}
                        disabled
                        className="admin-profile-input admin-profile-disabled-input"
                    />
                </div>

                <div className="admin-profile-detail-field">
                    <label htmlFor="phone" className="admin-profile-label">Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={adminData.phone}
                        onChange={handleInputChange}
                        className="admin-profile-input"
                    />
                </div>

                <div className="admin-profile-detail-field">
                    <label htmlFor="address" className="admin-profile-label">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={adminData.address}
                        onChange={handleInputChange}
                        className="admin-profile-input"
                    />
                </div>
            </div>

            <div className="admin-profile-save-section">
                <button className="admin-profile-save-button" onClick={handleSave}>
                    Lưu thay đổi
                </button>
            </div>

            {successMessage && <p className="admin-profile-success-message">{successMessage}</p>}
        </div>
    );
};

export default AdminProfile;

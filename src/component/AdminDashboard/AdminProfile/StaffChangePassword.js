import React from 'react';

const AdminChangePassword = () => {
    return (
        <div className="admin-profile-container" style={{ marginTop: "100px" }}>
            <h3 className="admin-profile-title">Đổi mật khẩu</h3>

            <div className="admin-profile-detail-field">
                <label htmlFor="currentPassword" className="admin-profile-label">Mật khẩu hiện tại</label>
                <input
                    type="password"
                    name="currentPassword"
                    className="admin-profile-input"
                />
                <p className="admin-profile-error-message"></p>
            </div>

            <div className="admin-profile-detail-field">
                <label htmlFor="newPassword" className="admin-profile-label">Mật khẩu mới</label>
                <input
                    type="password"
                    name="newPassword"
                    className="admin-profile-input"
                />
                <p className="admin-profile-error-message"></p>
            </div>

            <div className="admin-profile-detail-field">
                <label htmlFor="confirmNewPassword" className="admin-profile-label">Xác nhận mật khẩu mới</label>
                <input
                    type="password"
                    name="confirmNewPassword"
                    className="admin-profile-input"
                />
                <p className="admin-profile-error-message"></p>
            </div>

            <div className="admin-profile-save-section">
                <button className="admin-profile-save-button">
                    Cập nhật mật khẩu
                </button>
            </div>

            <p className="admin-profile-success-message"></p>
        </div>
    );
};

export default AdminChangePassword;

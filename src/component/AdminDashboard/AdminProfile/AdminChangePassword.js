import React, { useState } from 'react';

const AdminChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [errorMessages, setErrorMessages] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Reset specific field error message when user types
        }));
        setSuccessMessage(''); // Clear success message on change
    };

    const handlePasswordUpdate = () => {
        const { currentPassword, newPassword, confirmNewPassword } = passwordData;

        // Reset messages
        setErrorMessages({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
        setSuccessMessage('');

        // Validation for current password
        if (currentPassword === '') {
            setErrorMessages((prev) => ({
                ...prev,
                currentPassword: 'Mật khẩu hiện tại không được để trống',
            }));
        }

        // Validation for new password
        if (newPassword === '') {
            setErrorMessages((prev) => ({
                ...prev,
                newPassword: 'Mật khẩu mới không được để trống',
            }));
        } else if (newPassword.length < 6) {
            setErrorMessages((prev) => ({
                ...prev,
                newPassword: 'Mật khẩu mới phải có ít nhất 6 ký tự',
            }));
        } else if (newPassword === currentPassword) {
            setErrorMessages((prev) => ({
                ...prev,
                newPassword: 'Mật khẩu mới không được trùng với mật khẩu hiện tại',
            }));
        }

        // Validation for confirm new password
        if (confirmNewPassword === '') {
            setErrorMessages((prev) => ({
                ...prev,
                confirmNewPassword: 'Xác nhận mật khẩu không được để trống',
            }));
        } else if (newPassword !== confirmNewPassword) {
            setErrorMessages((prev) => ({
                ...prev,
                confirmNewPassword: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
            }));
        }

        // If no errors, proceed with password update
        if (currentPassword && newPassword && confirmNewPassword &&
            newPassword.length >= 6 &&
            newPassword !== currentPassword &&
            newPassword === confirmNewPassword) {
            console.log('Password updated successfully');
            setSuccessMessage('Mật khẩu đã được cập nhật thành công');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    return (
        <div className="admin-profile-container" style={{ marginTop: "100px" }}>
            <h3 className="admin-profile-title">Đổi mật khẩu</h3>
            <div className="admin-profile-detail-field">
                <label htmlFor="currentPassword" className="admin-profile-label">Mật khẩu hiện tại</label>
                <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="admin-profile-input"
                />
                {errorMessages.currentPassword && <p className="admin-profile-error-message">{errorMessages.currentPassword}</p>}
            </div>

            <div className="admin-profile-detail-field">
                <label htmlFor="newPassword" className="admin-profile-label">Mật khẩu mới</label>
                <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="admin-profile-input"
                />
                {errorMessages.newPassword && <p className="admin-profile-error-message">{errorMessages.newPassword}</p>}
            </div>

            <div className="admin-profile-detail-field">
                <label htmlFor="confirmNewPassword" className="admin-profile-label">Xác nhận mật khẩu mới</label>
                <input
                    type="password"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    className="admin-profile-input"
                />
                {errorMessages.confirmNewPassword && <p className="admin-profile-error-message">{errorMessages.confirmNewPassword}</p>}
            </div>

            <div className="admin-profile-save-section">
                <button className="admin-profile-save-button" onClick={handlePasswordUpdate}>
                    Cập nhật mật khẩu
                </button>
            </div>

            {successMessage && <p className="admin-profile-success-message">{successMessage}</p>}
        </div>
    );
};

export default AdminChangePassword;

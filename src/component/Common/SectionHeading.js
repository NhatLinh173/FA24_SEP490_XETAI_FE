import React, { useState } from 'react';
import { provinces } from './Service/provinces'; // Import danh sách tỉnh thành
import { toast } from 'react-toastify'; // Import toast từ react-toastify

const SectionHeading = ({ onSearch }) => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [weight, setWeight] = useState('');
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

    const handleSearch = () => {
        // Kiểm tra nếu weight là một số hợp lệ
        const weightValue = parseInt(weight, 10);
        if (isNaN(weightValue) || weightValue <= 0) {
            toast.error('Vui lòng nhập khối lượng hợp lệ.'); // Hiện thông báo lỗi với toast
            return;
        }
        onSearch({ pickupLocation, dropoffLocation, weight: weightValue });
    };

    const handlePickupChange = (e) => {
        const value = e.target.value;
        setPickupLocation(value);
        if (value) {
            setPickupSuggestions(
                provinces.filter(province => province.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            setPickupSuggestions([]);
        }
    };

    const handleDropoffChange = (e) => {
        const value = e.target.value;
        setDropoffLocation(value);
        if (value) {
            setDropoffSuggestions(
                provinces.filter(province => province.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            setDropoffSuggestions([]);
        }
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleSuggestionClick = (value, type) => {
        if (type === 'pickup') {
            setPickupLocation(value);
            setPickupSuggestions([]);
        } else {
            setDropoffLocation(value);
            setDropoffSuggestions([]);
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="search_bar">
                    <h2>Tìm kiếm dịch vụ vận tải</h2>
                    <div className="search_inputs">
                        <div className="search_input_container">
                            <input
                                type="text"
                                value={pickupLocation}
                                onChange={handlePickupChange}
                                placeholder="Địa điểm lấy hàng"
                                className="search_input"
                            />
                            {pickupSuggestions.length > 0 && (
                                <ul className="suggestions_list">
                                    {pickupSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion, 'pickup')}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="search_input_container">
                            <input
                                type="text"
                                value={dropoffLocation}
                                onChange={handleDropoffChange}
                                placeholder="Địa điểm trả hàng"
                                className="search_input"
                            />
                            {dropoffSuggestions.length > 0 && (
                                <ul className="suggestions_list">
                                    {dropoffSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion, 'dropoff')}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="search_input_container">
                            <input
                                type="number"
                                value={weight}
                                onChange={handleWeightChange}
                                placeholder="Khối lượng (kg)"
                                className="search_input"
                            />
                        </div>
                        <button className='btn-theme' onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionHeading;

// FavoriteDriver.js
import React, { useState } from 'react';
import DriverCard from './DriverCard';
import ReactPaginate from 'react-paginate';

const FavoriteDrivers = () => {
    const drivers = [
        { id: 1, driverImage: 'https://studiochupanhdep.com/Upload/Images/Album/anh-cv-02.jpg', driverName: 'Nguyễn Văn A', rating: 5, tripsCompleted: 50 },
        { id: 2, driverImage: 'https://via.placeholder.com/150', driverName: 'Trần Thị B', rating: 3, tripsCompleted: 30 },
        { id: 3, driverImage: 'https://via.placeholder.com/150', driverName: 'Lê Văn C', rating: 2, tripsCompleted: 25 },
        { id: 4, driverImage: 'https://via.placeholder.com/150', driverName: 'Nguyễn Thị D', rating: 4.9, tripsCompleted: 60 },
        { id: 5, driverImage: 'https://via.placeholder.com/150', driverName: 'Phạm Văn E', rating: 4.6, tripsCompleted: 45 },
        { id: 6, driverImage: 'https://via.placeholder.com/150', driverName: 'Trương Thị F', rating: 4.5, tripsCompleted: 35 },
        { id: 7, driverImage: 'https://via.placeholder.com/150', driverName: 'Bùi Văn G', rating: 4.8, tripsCompleted: 40 },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const driversPerPage = 3;
    const offset = currentPage * driversPerPage;
    const currentDrivers = drivers.slice(offset, offset + driversPerPage);

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <div className="container">
            <h2>Tài xế yêu thích</h2>
            {currentDrivers.map((driver) => (
                <DriverCard
                    key={driver.id}
                    id={driver.id} // Thêm id vào đây
                    driverImage={driver.driverImage}
                    driverName={driver.driverName}
                    rating={driver.rating}
                    tripsCompleted={driver.tripsCompleted}
                />
            ))}
            <ReactPaginate
                pageCount={Math.ceil(drivers.length / driversPerPage)}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                previousLabel={'<<'}
                nextLabel={'>>'}
            />
        </div>
    );
};

export default FavoriteDrivers;

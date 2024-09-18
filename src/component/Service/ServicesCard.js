import React, { useState, useRef } from 'react';
import SectionHeading from '../Common/SectionHeading';
import ServiceCard from '../Common/Service/ServiceCard';
import { ServiceData } from '../Common/Service/ServiceData';
import ReactPaginate from 'react-paginate';

const ServicesCard = () => {
    const itemsPerPage = 9; // Số lượng bài viết mỗi trang
    const [filteredData, setFilteredData] = useState(ServiceData);
    const [currentPage, setCurrentPage] = useState(0);
    const sectionHeadingRef = useRef(null); // Ref để tham chiếu đến SectionHeading

    const handleSearch = ({ pickupLocation, dropoffLocation, weight }) => {
        const filtered = ServiceData.filter(service =>
            service.pickupLocation.toLowerCase().includes(pickupLocation.toLowerCase()) &&
            service.dropoffLocation.toLowerCase().includes(dropoffLocation.toLowerCase()) &&
            (weight === '' || service.weight === weight) // Lọc theo khối lượng nếu có
        );
        setFilteredData(filtered);
        setCurrentPage(0); // Reset trang khi tìm kiếm
    };

    // Tính toán số lượng trang
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    // Tính toán dữ liệu cần hiển thị trên trang hiện tại
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Xử lý sự kiện khi chuyển trang
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        sectionHeadingRef.current.scrollIntoView({ behavior: 'smooth' }); // Cuộn đến SectionHeading
    };

    return (
        <section id="services_page">
            <div className="container">
                <div ref={sectionHeadingRef}>
                    <SectionHeading onSearch={handleSearch} />
                </div>
                <div className="service_wrapper_top">
                    <div className="row">
                        {currentItems.map((data) => (
                            <div className="col-lg-4" key={data.id}>
                                <ServiceCard
                                    id={data.id} // Truyền id vào ServiceCard
                                    img={data.img}
                                    goodsType={data.goodsType}
                                    pickupLocation={data.pickupLocation}
                                    dropoffLocation={data.dropoffLocation}
                                    weight={data.weight}
                                    price={data.price}
                                    description={data.description}
                                    carType={data.carType}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    <div className="pagination-controls-services text-center">
                        <ReactPaginate
                            pageCount={pageCount}
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
                </div>
            </div>
        </section>
    );
};

export default ServicesCard;

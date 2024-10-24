import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogData } from '../Common/Blog/BlogData'
import ReactPaginate from 'react-paginate';

const BlogDetailsArea = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    // Tính toán tổng số trang
    const pageCount = Math.ceil(BlogData.length / itemsPerPage);

    // Lấy các bài viết hiện tại dựa trên trang hiện tại
    const currentBlogs = BlogData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Xử lý sự kiện khi người dùng chuyển trang
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="container mt-5 blog-details-section">
            {/* Main Blog Content Area */}
            <div className="row">
                {/* Main Blog Card */}
                <div className="col-md-7">
                    <div className="card mb-4 blog-main-card shadow-effect">
                        <img
                            src="https://interlogistics.com.vn/static/2722/2024/10/15/d%E1%BB%B1%20b%C3%A1o%20c%C6%B0%E1%BB%9Bc%20q4.2024.png"
                            className="card-img-top"
                            alt="Main blog content"
                            style={{ height: '412px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                            <h5 className="card-title blog-card-title text-truncate">
                                Giá cước vận chuyển quý 4/2024 có xu hướng giảm nhiệt
                            </h5>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to="/blog/1" className="text-primary font-weight-bold">Xem thêm</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Content (Related Topics) */}
                <div className="col-md-5">
                    <div className="list-group blog-sidebar">
                        <h5 className="sidebar-title">Bài Đăng Nổi Bật</h5>
                        {[
                            {
                                img: "https://interlogistics.com.vn/static/2687/2024/09/26/z5865029091724_878c227b8ca172f908c6113ced9da1251.jpg",
                                title: "Fiata World Congress 2024 – Cơ hội cho Việt Nam mở rộng giao thương với Panama và Trung Mỹ.",
                            },
                            {
                                img: "https://interlogistics.com.vn/static/2614/2024/09/24/Thumbnail%201.png",
                                title: "Tập đoàn hàng đầu thế giới có kế hoạch xây dựng cảng thông minh tại Việt Nam",
                            },
                            {
                                img: "https://interlogistics.com.vn/static/2606/2024/09/24/Thumbnail.png",
                                title: "Ngành logistics bị ảnh hưởng nặng nề nhất với hơn 80% doanh nghiệp gặp gián đoạn sau bão Yagi",
                            },
                            {
                                img: "https://interlogistics.com.vn/static/2596/2024/09/18/1.jpg",
                                title: "Chính sách hoàn thuế hàng hóa nhập khẩu cho sản xuất xuất khẩu",
                            },
                        ].map((item, idx) => (
                            <a href="/" className="list-group-item list-group-item-action d-flex align-items-center" key={idx}>
                                <div className="col-4 pr-0">
                                    <img src={item.img} alt={item.title} className="img-fluid blog-sidebar-img rounded" />
                                </div>
                                <div className="col-9 pl-2">
                                    <h6 className="blog-title">{item.title}</h6>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Blog Posts Section */}
            <div className="blog-container">
                <div className="row">
                    {currentBlogs.map((data, index) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-4" key={index}>
                            <div className="blog-card zoom-effect">
                                <div className="blog-image-wrapper">
                                    <Link to="/blog_details">
                                        <img src={data.img} alt="blog" className="blog-image" />
                                    </Link>
                                    <div className="blog-date">
                                        <small className="blog-month">{data.month}</small>
                                        <span className="blog-day">{data.day}</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h6 className="blog-time"><i className="far fa-clock"></i> {data.date}</h6>
                                    <h5 className="blog-heading">
                                        <Link to="/blog_details">{data.heading}</Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Phân trang */}
                <div className="pagination-controls-services text-center">
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                        previousLabel={"<<"}
                        nextLabel={">>"}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsArea;

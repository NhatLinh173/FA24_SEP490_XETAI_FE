import React from 'react';
import { Link } from 'react-router-dom';
// Import Blog Sidebar if needed (commented for now)
// import BlogSidebar from '../Common/BlogSidebar';

const BlogDetailsArea = () => {

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
                            style={{ height: '400px', objectFit: 'cover' }}
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
            <div className="row mt-5 related-blogs-section">
                {[
                    {
                        img: "https://interlogistics.com.vn/static/2591/2024/09/16/%C4%91i%E1%BB%87n.jpg",
                        title: "Bão Yagi đã gây thiệt hại khoảng 40,000 tỷ đồng...",
                    },
                    {
                        img: "https://interlogistics.com.vn/static/2586/2024/09/14/ldp-1c.jpg",
                        title: "Giải pháp vận chuyển hàng LTL Bắc Nam...",
                    },
                    {
                        img: "https://interlogistics.com.vn/static/2586/2024/09/14/ldp-1c.jpg",
                        title: "Vận chuyển hàng vào kho Amazon...",
                    },
                    {
                        img: "https://interlogistics.com.vn/static/2586/2024/09/14/ldp-1c.jpg",
                        title: "Vận chuyển hàng vào kho Amazon...",
                    }, {
                        img: "https://interlogistics.com.vn/static/2586/2024/09/14/ldp-1c.jpg",
                        title: "Vận chuyển hàng vào kho Amazon...",
                    }, {
                        img: "https://interlogistics.com.vn/static/2586/2024/09/14/ldp-1c.jpg",
                        title: "Vận chuyển hàng vào kho Amazon...",
                    },
                ].map((post, idx) => (
                    <div className="col-md-4" key={idx}>
                        <div className="card mb-4 blog-related-card shadow-effect">
                            <img
                                src={post.img}
                                className="card-img-top card-img"
                                alt={`Related post ${idx + 1}`}
                            />
                            <div className="card-body">
                                <h6 className="card-title text-truncate blog-card-title">
                                    {post.title}
                                </h6>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-primary font-weight-bold">Xem thêm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogDetailsArea;

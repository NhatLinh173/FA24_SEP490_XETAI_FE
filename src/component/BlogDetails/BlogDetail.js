import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL

    const blogPosts = [
        {
            id: 1,
            title: "Giá cước vận chuyển quý 4/2024 có xu hướng giảm nhiệt",
            content: `
                Sự gián đoạn chuỗi cung ứng toàn cầu do ảnh hưởng chiến tranh, nhiễu loạn địa chính trị gây ra đã gây ra tình trạng khó khăn lan rộng trên thị trường vận tải đường biển, ảnh hưởng của dịch COVID, tình hình hạn hán các kênh đào ảnh hưởng tới lịch trình tàu không còn đúng, thời gian vận tải kéo dài, khủng hoảng chỗ, mất cân đối vỏ rỗng. Các nhà vận chuyển nhận định để hạn chế ảnh hưởng của tình trạng trên, xu hướng các nhà máy sẽ đẩy kế hoạch sản xuất sớm, các đơn hàng được đặt, sản xuất và tiến hành giao sớm hơn các năm trước đó.\n\n
    
                Trong năm 2024, mùa cao điểm đã rơi vào quý 3 thay vì quý 4 cuối năm như những năm trước. Mùa cao điểm vừa qua đã ghi nhận sự biến động lớn với giá cả tăng mạnh trong quý 3. Dự báo trong quý 4 sẽ không có mùa cao điểm, giá có thể sẽ giảm so với quý trước.\n\n
    
                Dự đoán tình hình thị trường quý 4/2024:\n\n
    
                Giá cước vận chuyển nhìn chung xu hướng giảm nhiệt lại, thị trường cân bằng và giá sẽ quay về gần bằng với giá quý 2. Thái Lan, Nhật Bản và Trung Quốc quay về mức giá ổn định trước mùa cao điểm, qua mùa sầu riêng nên tình hình chỗ trống cũng ổn định hơn.\n\n
    
                Malaysia, Indonesia: Nhu cầu xuất khẩu từ TP.HCM đến các cảng này đang gia tăng. Tuy nhiên, nhiều hãng tàu đã tạm ngưng dịch vụ do tình trạng container không được xếp lên tàu đúng như dự kiến, buộc phải chờ tàu khác tại các cảng trung chuyển do chỗ hạn chế và giá cước cao.\n\n
    
                Singapore: Hiện tại cảng trung chuyển hàng hóa này vẫn đang bị tắc nghẽn, phụ phí kẹt cảng vẫn được áp dụng, giá cước chưa giảm và chỗ cũng nhanh chóng hết. Các hãng tàu lớn không ưu tiên cung cấp container cho tuyến này.\n\n
    
                Hàn Quốc: Giá trên đà hạ nhiều so với giữa quý 2 và quý 3, LSS giảm từ 120/240 còn 110/220 vào đầu quý 4, giá cước cũng trên đà giảm trong quý 4.\n\n
    
                Ấn Độ, Trung Đông và Biển Đỏ: Thị trường đã giảm giá mạnh so với mùa cao điểm của quý 3 vừa qua. Tuy nhiên, từ giữa tháng 10 giá đã bắt đầu tăng và dự kiến sẽ tiếp tục xu hướng tăng.\n\n
    
                Châu Âu, Nam Mỹ và Châu Phi: Thị trường giá giảm mạnh so với mùa cao điểm quý 3 vừa rồi. Tuy nhiên, tuyến Châu Âu và Hoa Kỳ có dấu hiệu tăng giá trở lại do ảnh hưởng của đợt đình công ở bờ Đông nước Mỹ.\n\n
    
                Úc: Tuyến Úc vẫn cao so với các tuyến khác nhưng có dấu hiệu giảm giá từ giữa tháng 10.\n\n
    
                Thị trường vận tải biển quý 4/2024 đang mang đến cả cơ hội và thách thức cho các doanh nghiệp. Mặc dù giá cước có xu hướng giảm trên nhiều tuyến, nhưng sự không ổn định vẫn còn hiện hữu. Các doanh nghiệp cần linh hoạt trong chiến lược vận tải và xuất nhập khẩu của mình, theo dõi sát sao diễn biến thị trường, tận dụng các cơ hội giảm giá, và chuẩn bị cho những biến động có thể xảy ra sẽ là chìa khóa để doanh nghiệp vượt qua giai đoạn cuối năm 2024 đầy thách thức này.\n\n
            `,
            img: "https://interlogistics.com.vn/static/2722/2024/10/15/d%E1%BB%B1%20b%C3%A1o%20c%C6%B0%E1%BB%9Bc%20q4.2024.png",
        },
    ];
    const relatedBlogs = [
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
    ];
    // Tìm bài viết theo ID
    const blogPost = blogPosts.find(post => post.id === parseInt(id));

    if (!blogPost) {
        return <h2>Không tìm thấy bài viết</h2>;
    }

    // Chia nội dung thành các đoạn văn dựa trên dấu xuống dòng "\n\n"
    const paragraphs = blogPost.content.trim().split('\n\n');

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Phần nội dung blog */}
                <div className="col-md-8">
                    <div className="breadcrumb mb-3">
                        <a href="/">Trang chủ</a> / <a href="/blog">Blog</a> / {blogPost.title}
                    </div>
                    <div className="card blog-detail-card shadow-effect mb-4">
                        <img
                            src={blogPost.img}
                            className="card-img-top"
                            alt={blogPost.title}
                            style={{ height: '400px', objectFit: 'cover', marginBottom: '20px' }}
                        />
                        <div className="card-body" style={{ padding: '30px', lineHeight: '1.8' }}>
                            <h5 className="card-title mb-4" style={{ fontWeight: 'bold' }}>{blogPost.title}</h5>
                            {paragraphs.map((paragraph, index) => (
                                <p key={index} style={{ marginBottom: '15px', textAlign: 'justify' }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Phần các bài blog liên quan */}
                <div className="col-md-4">
                    <div className="card-header related-blogs-header">
                        <h5>Các bài blog liên quan</h5>
                    </div>
                    <div className="card related-blogs-card shadow-effect mb-4">
                        <div className="card-body">
                            {/* Danh sách bài blog liên quan */}
                            <li className="list-group related-blogs-list">
                                {relatedBlogs.map((relatedPost, index) => (
                                    <li key={index} className="list-group-item related-blogs-item d-flex align-items-start">
                                        <img src={relatedPost.img} alt={relatedPost.title} className="related-blog-image" />
                                        <div>
                                            <a href="/" className="related-blog-title">{relatedPost.title}</a>
                                        </div>
                                    </li>
                                ))}
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;

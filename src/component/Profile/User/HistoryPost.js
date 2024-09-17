import React from "react";
import { MdFmdGood } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { FaWeightHanging } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";

const HistoryPost = () => {
  const Data = [
    {
      id: 251,
      address: "Đà Nẵng - Hải Phòng",
      orderType: "Điện tử",
      total_weight: "1000kg",
      total_money: 755700,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9z-qJ-FVhXjO-l_6t7xTqbnkfF8g27-kh8No9VD1xc1SXaoj7jxlQsk97IIOiZdcccq8&usqp=CAU",
    },
    {
      id: 261,
      address: "Hà Nội - Huế",
      orderType: "Điện tử",
      total_weight: "1000kg",
      total_money: 755700,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVh7U9OjBSzqif-Q7wRhrUyP-1-KEknCfsx7DQcR6dM596sB3w0_wLbcaSr3SaQvzqYU&usqp=CAU",
    },
    {
      id: 241,
      address: "Sài Gòn - Cần Thơ",
      orderType: "Điện tử",
      total_weight: "1000kg",
      total_money: 755700,
      image:
        "https://thutucxuatnhapkhau.com/wp-content/uploads/2023/06/untitled-design-13-1200x720.png",
    },
    {
      id: 51,
      address: "Bình Dương - Phú Yên",
      orderType: "Điện tử",
      total_weight: "1000kg",
      total_money: 755700,
      image:
        "https://batdongsanban24h.com.vn/upload/sanpham/hinhanhdep52359146461.jpg",
    },
  ];
  return (
    <div>
      <h2>Bài đăng</h2>
      {Data.map((item) => (
        <a
          href={`${item.id}`}
          rel="noreferrer"
          className="text-decoration-none"
        >
          <div key={item.id} className="my-4 border rounded-12 card-hover">
            <div className="p-3 d-flex">
              <div className="image-container">
                <img
                  src={item.image}
                  alt={item.address}
                  className="rounded-12 cursor-pointer zoom-image"
                  style={{
                    width: "360px",
                    height: "195px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="ml-3">
                <div className="mb-4 fs-18 font-weight-bold ">
                  {item.address}
                </div>
                <div className="mb-2 text-secondary">
                  <FaBoxArchive className="mr-2" />
                  {item.orderType}
                </div>

                <div className="mb-4 text-secondary">
                  <FaWeightHanging className="mr-2" />
                  {item.total_weight}
                </div>
                <div className="fs-18 font-weight-bold">
                  Tổng tiền: {item.total_money.toLocaleString()} vnd
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default HistoryPost;

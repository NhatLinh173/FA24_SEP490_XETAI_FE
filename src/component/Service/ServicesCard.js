import React, { useState, useRef, useEffect } from "react";
import SectionHeading from "../Common/SectionHeading";
import ServiceCard from "../Common/Service/ServiceCard";
import ReactPaginate from "react-paginate";
import axiosInstance from "../../config/axiosConfig";

const ServicesCard = () => {
  const itemsPerPage = 9; // Số lượng bài viết mỗi trang
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const sectionHeadingRef = useRef(null);
  const [dataPost, setDataPost] = useState([]);

  // Gọi API để lấy dữ liệu post khi component mount
  useEffect(() => {
    const getDataPost = async () => {
      try {
        const response = await axiosInstance.get("/posts/");
        console.log("Response từ API:", response.data.salePosts);
        setDataPost(response.data.salePosts || []);
        setFilteredData(response.data.salePosts || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài viết:", error);
      }
    };
    getDataPost();
  }, []);

  // Theo dõi sự thay đổi của filteredData
  useEffect(() => {
    console.log("Dữ liệu filteredData sau khi set:", filteredData);
  }, [filteredData]);

  const handleSearch = ({ pickupLocation, dropoffLocation, weight }) => {
    console.log("Tham số tìm kiếm:", {
      pickupLocation,
      dropoffLocation,
      weight,
    });

    const filtered = dataPost.filter((service) => {
      const startCity = service.startPointCity || "";
      const destinationCityValue = service.destinationCity || "";
      const serviceWeight = parseInt(service.load, 10) || 0;

      return (
        startCity.toLowerCase().includes(pickupLocation.trim().toLowerCase()) &&
        destinationCityValue
          .toLowerCase()
          .includes(dropoffLocation.trim().toLowerCase()) &&
        (weight === "" || serviceWeight === weight)
      );
    });

    // Log ra dữ liệu sau khi lọc
    console.log("Dữ liệu đã lọc:", filtered);

    // Cập nhật filteredData
    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm xử lý khi chọn trang khác
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    sectionHeadingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services_page">
      <div className="container">
        {/* Phần tiêu đề và tìm kiếm */}
        <div ref={sectionHeadingRef}>
          <SectionHeading onSearch={handleSearch} />
        </div>
        <div className="service_wrapper_top">
          {/* Hiển thị danh sách bài viết */}
          <div className="row">
            {currentItems.map((data) => (
              <div className="col-lg-4" key={data._id}>
                <ServiceCard
                  id={data._id}
                  img={
                    data.images && data.images.length > 0
                      ? data.images[0]
                      : "default-image.jpg"
                  }
                  goodsType={data.title}
                  pickupLocation={data.startPointCity}
                  dropoffLocation={data.destinationCity}
                  weight={data.load}
                  price={data.price}
                />
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
    </section>
  );
};

export default ServicesCard;

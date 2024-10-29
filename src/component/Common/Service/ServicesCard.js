import React, { useState, useRef, useEffect } from "react";
import SectionHeading from "../SectionHeading";
import ServiceCard from "./ServiceCard";
import ReactPaginate from "react-paginate";
import axiosInstance from "../../../config/axiosConfig";
import Fuse from "fuse.js";

const ServicesCard = () => {
  const itemsPerPage = 9;
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const sectionHeadingRef = useRef(null);
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    const getDataPost = async () => {
      try {
        const response = await axiosInstance.get("/posts/");
        setDataPost(response.data.salePosts || []);
        setFilteredData(response.data.salePosts || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài viết:", error);
      }
    };
    getDataPost();
  }, []);

  const handleSearch = ({ pickupLocation, dropoffLocation, weight }) => {
    const options = {
      keys: ["startPointCity", "destinationCity", "load"],
      threshold: 0.3,
    };

    const fuse = new Fuse(dataPost, options);
    const searchResults = fuse.search({
      $and: [
        { startPointCity: pickupLocation },
        { destinationCity: dropoffLocation },
        { load: weight.toString() },
      ],
    });
    const filtered = searchResults.map((result) => result.item);

    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    sectionHeadingRef.current.scrollIntoView({ behavior: "smooth" });
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
              <div className="col-lg-4" key={data._id}>
                <ServiceCard
                  id={data._id}
                  img={
                    data.images && data.images.length > 0
                      ? data.images[0]
                      : "default-image.jpg"
                  }
                  title={data.title}
                  pickupLocation={data.startPointCity}
                  dropoffLocation={data.destinationCity}
                  weight={data.load}
                  price={data.price}
                />
              </div>
            ))}
          </div>
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

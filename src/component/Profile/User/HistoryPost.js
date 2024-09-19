import React, { useState } from "react";
import { FaBoxArchive, FaCheck, FaHourglassHalf } from "react-icons/fa6";
import { FaWeightHanging } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import useInstanceData from "../../../config/useInstanceData";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
const HistoryPost = () => {
  const userId = localStorage.getItem("userId");
  const { data, loading, error, refetch } = useInstanceData(
    `/posts/${userId}/users`
  );
  console.log("data:", data);

  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;
  const offset = currentPage * postsPerPage;
  console.log(offset);
  const currentPosts = data?.salePosts?.slice(offset, offset + postsPerPage);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    console.log(event);
  };
  return (
    <div>
      <h2>Bài đăng</h2>
      {currentPosts?.map((item) => (
        <Link
          to={`/history-post/${item._id}`}
          rel="noreferrer"
          className="text-decoration-none"
        >
          <div key={item.id} className="my-4 border rounded-12 card-hover">
            <div className="p-3 d-flex">
              <div className="image-container">
                <img
                  src="https://lawnet.vn/uploads/image/2023/06/09/043314645.jpg"
                  alt="anh hang hoa"
                  className="rounded-12 cursor-pointer zoom-image"
                  style={{
                    width: "360px",
                    height: "195px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="ml-3">
                <div className="mb-2 text-secondary  d-flex align-items-center">
                  <FaMapLocation className="mr-2" />
                  <div className="font-weight-bold text-nowrap">Điểm đi:</div>
                  <div className="w-75 ml-2 text-truncate">
                    {item.startPoint}
                  </div>
                </div>
                <div className="mb-2 text-secondary  d-flex align-items-center">
                  <FaMapLocation className="mr-2" />
                  <div className="font-weight-bold text-nowrap">Điểm đến:</div>
                  <div className="w-75 ml-2 text-truncate">
                    {item.destination}
                  </div>
                </div>
                <div className="mb-2 text-secondary  d-flex align-items-center">
                  <FaBoxArchive className="mr-2 " />
                  <div className="font-weight-bold mr-2">Loại hàng:</div>
                  {item.title}
                </div>

                <div className="mb-4 text-secondary  d-flex align-items-center">
                  <FaWeightHanging className="mr-2" />
                  <div className="font-weight-bold mr-2">Khối lượng:</div>
                  {item.load}
                </div>
                <div className="fs-18 font-weight-bold">
                  Tổng tiền: {item.price.toLocaleString()} vnd
                </div>
                <button className="btn-sm  btn-success mt-3  border-0    ">
                  <FaCheck className="mr-2" />
                  Tài xế đã nhận đơn
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <ReactPaginate
        pageCount={Math.ceil(data?.salePosts?.length / 3)}
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
  );
};

export default HistoryPost;

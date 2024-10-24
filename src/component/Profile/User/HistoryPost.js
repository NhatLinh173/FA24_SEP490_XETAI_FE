import React, { useEffect, useState } from "react";
import { FaBoxArchive, FaCheck, FaHourglassHalf } from "react-icons/fa6";
import { FaWeightHanging } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa6";
import { MdOutlinePersonAdd } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { CiNoWaitingSign } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GrHide } from "react-icons/gr";
import axios from "../../../config/axiosConfig";
import useInstanceData from "../../../config/useInstanceData";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HistoryPost = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [postID, setPostID] = useState(null);
  const [isDriverExist, setIsDriverExist] = useState(null);
  const [currentPosts, setCurrentPost] = useState([]);

  const userId = localStorage.getItem("userId");
  const driverId = localStorage.getItem("driverId");

  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useInstanceData(`/posts/${userId}/users`);
  const { data: postdriver } = useInstanceData(`/posts/${driverId}/driver`);
  const { data: dealPriceDriver } = useInstanceData(
    `/dealPrice/driver/${driverId}`
  );

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postID}`);
      refetch(); // Gọi lại API để cập nhật danh sách bài đăng
      setIsShowModal(false);
      toast.success("Đơn hàng đã được xóa thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa đơn hàng!");
    }
  };

  const handleOpenModal = (postId) => {
    setPostID(postId);
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setPostID(null);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;

  const offset = currentPage * postsPerPage;
  useEffect(() => {
    if (driverId !== "undefined") {
      setIsDriverExist(true);
      setCurrentPost(postdriver?.data?.slice(offset, offset + postsPerPage));
    } else {
      setIsDriverExist(false);
      setCurrentPost(posts?.salePosts?.slice(offset, offset + postsPerPage));
    }
  }, [driverId, offset, posts, postdriver]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };
  const handleFilterWaitPosts = () => {
    setCurrentPage(0); // Đặt lại trang hiện tại về 0
    if (driverId !== "undefined") {
      const filter = dealPriceDriver.filter((dealPriceDriver) => {
        return dealPriceDriver.status === "wait";
      });
      const mapWait = filter.map((deal) => {
        return deal.postId;
      });
      console.log(mapWait);
      setCurrentPost(mapWait);
    } else {
      setCurrentPost(
        posts?.salePosts?.filter((post) => post.status === "wait")
      );
    }
  };

  const handleFilterApprovePosts = () => {
    setCurrentPage(0); // Đặt lại trang hiện tại về 0
    if (driverId !== "undefined") {
      const filter = dealPriceDriver.filter((dealPriceDriver) => {
        return (
          dealPriceDriver.status === "approve" &&
          dealPriceDriver.postId.status === "approve"
        );
      });
      const mapWait = filter.map((deal) => deal.postId);
      setCurrentPost(mapWait);
    } else {
      setCurrentPost(
        posts?.salePosts?.filter((post) => post.status === "approve")
      );
    }
  };

  const handleFilterInprogressPosts = () => {
    setCurrentPage(0); // Đặt lại trang hiện tại về 0
    if (driverId !== "undefined") {
      const filter = dealPriceDriver.filter((dealPriceDriver) => {
        return (
          dealPriceDriver.status === "approve" &&
          dealPriceDriver.postId.status === "inprogress"
        );
      });
      const mapWait = filter.map((deal) => deal.postId);
      setCurrentPost(mapWait);
    } else {
      setCurrentPost(
        posts?.salePosts?.filter((post) => post.status === "inprogress")
      );
    }
  };
  const handleFilterCancelPosts = () => {
    setCurrentPage(0); // Đặt lại trang hiện tại về 0
    if (driverId !== "undefined") {
      const filter = dealPriceDriver.filter((dealPriceDriver) => {
        return dealPriceDriver.status === "cancel";
      });
      const mapWait = filter.map((deal) => {
        return deal.postId;
      });
      setCurrentPost(mapWait);
    } else {
      setCurrentPost(
        posts?.salePosts?.filter((post) => post.status === "cancel")
      );
    }
  };
  return (
    <div>
      <h2>Đơn Hàng</h2>
      <div className="mb-3 mt-2 d-flex justify-content-center gap-2">
        <button
          className="btn btn-warning btn-custom mx-1 d-flex align-items-center"
          onClick={handleFilterWaitPosts}
        >
          <CiNoWaitingSign className="mr-1" /> Đang chờ
        </button>
        <button
          className="btn btn-secondary btn-custom mx-1 d-flex align-items-center"
          onClick={handleFilterApprovePosts}
        >
          <FaCheck className="mr-1" /> Đã nhận đơn
        </button>
        <button
          className="btn btn-primary  btn-custom mx-1 d-flex align-items-center"
          onClick={handleFilterInprogressPosts}
        >
          <FaCarSide className="mr-1" /> Đang giao
        </button>
        <button
          className="btn btn-danger btn-custom mx-1 d-flex align-items-center"
          onClick={handleFilterCancelPosts}
        >
          <MdOutlinePersonAdd className="mr-1" /> Đã hủy
        </button>
        {!isDriverExist && (
          <button className="btn btn-dark btn-custom mx-1 d-flex align-items-center">
            <GrHide className="mr-1" /> Tạm ẩn
          </button>
        )}
      </div>
      {currentPosts &&
        currentPosts?.map((post) => (
          <Link
            to={`/history-post/${post._id}`}
            rel="noreferrer"
            className="text-decoration-none"
            key={post._id}
          >
            <div className="my-4 border rounded-12 card-hover position-relative">
              <div className="p-3 d-flex">
                <div className="image-container">
                  <img
                    src={post.images[0]}
                    alt="anh hang hoa"
                    className="rounded-12 cursor-pointer zoom-image"
                    style={{
                      width: "360px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="ml-3">
                  <div className="mb-2 text-secondary d-flex align-items-center">
                    <FaMapLocation className="mr-2" />
                    <div className="font-weight-bold text-nowrap">
                      Địa điểm đi:
                    </div>
                    <div className="w-75 ml-2 text-truncate">
                      {post.startPointCity}
                    </div>
                  </div>
                  <div className="mb-2 text-secondary d-flex align-items-center">
                    <FaMapLocation className="mr-2" />
                    <div className="font-weight-bold text-nowrap">
                      Địa điểm đến:
                    </div>
                    <div className="w-75 ml-2 text-truncate">
                      {post.destinationCity}
                    </div>
                  </div>
                  <div className="mb-2 text-secondary d-flex align-items-center">
                    <FaBoxArchive className="mr-2" />
                    <div className="font-weight-bold mr-2">Loại hàng:</div>
                    {post.title}
                  </div>

                  <div className="mb-4 text-secondary d-flex align-items-center">
                    <FaWeightHanging className="mr-2" />
                    <div className="font-weight-bold mr-2">Khối lượng:</div>
                    {post.load}
                  </div>
                  <div className="fs-18 font-weight-bold">
                    Giá vận chuyển: {post.price.toLocaleString()} vnd
                  </div>
                  {post.status === "approve" && isDriverExist && (
                    <button className="btn-sm btn-secondary mt-3 border-0">
                      <MdOutlinePersonAdd className="mr-2" />
                      Đã nhận đơn
                    </button>
                  )}
                  {post.status === "approve" && !isDriverExist && (
                    <button className="btn-sm btn-secondary mt-3 border-0">
                      <MdOutlinePersonAdd className="mr-2" />
                      Tài xế đã nhận đơn
                    </button>
                  )}

                  {post.status === "finish" && (
                    <button className="btn-sm btn-success mt-3 border-0 d-flex align-items-center">
                      <FaCheck className="mr-2" />
                      Đã giao hàng
                    </button>
                  )}
                  {post.status === "inprogress" && (
                    <button className="btn-sm btn-primary mt-3 border-0 d-flex align-items-center">
                      <FaCarSide className="mr-2" />
                      Đang giao hàng
                    </button>
                  )}
                  {post.status === "cancel" && (
                    <button className="btn-sm btn-danger mt-3 border-0 d-flex align-items-center">
                      <GiCancel className="mr-2" />
                      Đã hủy
                    </button>
                  )}
                  {post.status === "wait" && (
                    <button className="btn-sm btn-warning mt-3 border-0 d-flex align-items-center">
                      <CiNoWaitingSign className="mr-2" />
                      Đang chờ duyệt
                    </button>
                  )}
                  {post.status === "hide" && (
                    <button className="btn-sm btn-bg-secondary mt-3 border-0 d-flex align-items-center">
                      <GrHide className="mr-2" />
                      Tạm ẩn
                    </button>
                  )}
                </div>
                <div
                  className="position-absolute"
                  style={{ right: "10px", top: "10px" }}
                >
                  <button
                    className="btn-danger btn-sm align-self-start border-0"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenModal(post._id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}

      <ReactPaginate
        pageCount={Math.ceil(posts?.salePosts?.length / 3)}
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
      {isShowModal && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Xác nhận xóa
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa đơn hàng này không?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPost;

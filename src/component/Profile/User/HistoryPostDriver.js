import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FaMapLocation } from "react-icons/fa6";
import { BsFillFilePostFill } from "react-icons/bs";
import axiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const HistoryPostDriver = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const driverId = localStorage.getItem("driverId");
  const postsPerPage = 5; // Số bài đăng trên mỗi trang

  const getPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `/driverpost/creator/${driverId}`
      );
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy bài đăng:", error);
    }
  };

  const handlePostClick = (postId) => {
    history.push(`/history-post-driver/detail/${postId}`);
  };

  const handleShowModal = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    try {
      const response = await axiosInstance.delete(
        `/driverpost/${postToDelete}`
      );
      if (response.status === 200) {
        toast.success("Xoá bài đăng thành công");
        getPosts();
      }
    } catch (error) {
      toast.error("Lỗi khi xoá bài đăng");
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  
  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);

  if (!posts || posts.length === 0) {
    return <div>Không có bài đăng nào</div>;
  }

  return (
    <>
      <h2 className="mb-4">Bài đăng</h2>

      {currentPosts.map((post) => (
        <div
          key={post._id}
          className="my-4 border rounded-12 card-hover position-relative"
          onClick={() => handlePostClick(post._id)}
          style={{ cursor: "pointer" }}
        >
          <div className="p-3 d-flex">
            <div className="image-container">
              <img
                src={
                  post.images && post.images.length > 0
                    ? post.images[0]
                    : "fallback-image.jpg"
                }
                alt="Hàng hóa"
                className="rounded-12 cursor-pointer"
                style={{ width: "360px", height: "200px", objectFit: "cover" }}
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="mb-2 text-secondary d-flex align-items-center">
                <FaMapLocation className="mr-2" />
                <div className="font-weight-bold">Điểm đi:</div>
                <div className="ml-2 flex-grow-1 text-truncate">
                  {post.startCity}
                </div>
              </div>
              <div className="mb-2 text-secondary d-flex align-items-center">
                <FaMapLocation className="mr-2" />
                <div className="font-weight-bold">Điểm đến:</div>
                <div className=" ml-2 flex-grow-1 text-truncate">
                  {post.destinationCity}
                </div>
              </div>
              <div className="mb-2 text-secondary d-flex align-items-baseline">
                <BsFillFilePostFill className="mr-2" />
                <div
                  className="font-weight-bold"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Nội dung:
                </div>
                <div
                  className="flex-grow-1 ml-2"
                  style={{
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                  }}
                >
                  {post.description}
                </div>
              </div>
              <div
                className="position-absolute"
                style={{ right: "10px", top: "10px" }}
              >
                <button
                  className="btn-danger btn-sm align-self-start border-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowModal(post._id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageCount={Math.ceil(posts.length / postsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xoá bài đăng này không?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Huỷ
          </button>
          <button className="btn btn-danger" onClick={handleDeletePost}>
            Xoá
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryPostDriver;

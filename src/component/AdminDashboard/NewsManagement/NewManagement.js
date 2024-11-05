import React, { useState } from "react";
import { Table, Form, Modal, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit, FaPlus, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { Row, Col } from "react-bootstrap";

const NewManagement = () => {
  const [news, setNews] = useState([
    {
      id: "1",
      title: "Giá cước vận chuyển quý 4/2024 có xu hướng giảm nhiệt",
      content: `Trong bối cảnh kinh tế toàn cầu đang có nhiều biến động, giá cước vận chuyển trong quý 4 năm 2024 đã cho thấy những dấu hiệu giảm nhiệt. Sự giảm giá này được dự báo sẽ tiếp tục trong những tháng tới, tạo điều kiện thuận lợi cho các doanh nghiệp và người tiêu dùng. 
        
            Các yếu tố dẫn đến xu hướng giảm giá cước vận chuyển bao gồm sự gia tăng nguồn cung từ các nhà cung cấp dịch vụ logistics, cùng với việc giảm thiểu chi phí vận hành do ứng dụng công nghệ trong quản lý vận tải. Hơn nữa, nhu cầu tiêu thụ hàng hóa trong nước cũng đang có xu hướng ổn định, góp phần vào việc cân bằng giá cả thị trường.
        
            Chuyên gia trong ngành cho rằng, đây là thời điểm lý tưởng để các doanh nghiệp tiến hành điều chỉnh chiến lược kinh doanh của mình, từ việc tối ưu hóa chi phí cho đến mở rộng thị trường mới. Nếu các doanh nghiệp nhanh chóng nắm bắt được xu hướng này, họ có thể tận dụng lợi thế cạnh tranh và phát triển bền vững hơn trong tương lai.
        
            Tuy nhiên, các doanh nghiệp cũng cần lưu ý rằng giá cước vận chuyển có thể thay đổi theo tình hình thị trường. Do đó, việc theo dõi các chỉ số kinh tế và các chính sách của chính phủ liên quan đến lĩnh vực logistics là rất quan trọng.
        
            Tóm lại, quý 4 năm 2024 hứa hẹn sẽ mang đến nhiều cơ hội và thách thức cho ngành vận tải. Các doanh nghiệp cần chuẩn bị sẵn sàng để đón nhận những thay đổi này và điều chỉnh kế hoạch kinh doanh phù hợp nhằm đạt được kết quả tốt nhất.`,
      date: "01-11-2024",
      author: "Người đăng 1",
      image:
        "https://interlogistics.com.vn/static/2722/2024/10/15/d%E1%BB%B1%20b%C3%A1o%20c%C6%B0%E1%BB%9Bc%20q4.2024.png",
    },
    {
      id: "2",
      title: "Tiêu đề tin tức 2",
      content: "Nội dung tin tức 2...",
      date: "02-11-2024",
      author: "Người đăng 2",
      image: "",
    },
    // ... other news
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalAction, setModalAction] = useState("add");
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsPerPage, setNewsPerPage] = useState(10);
  const [newItem, setNewItem] = useState({
    title: "",
    content: "",
    date: "",
    author: "",
    image: "",
  });

  const filteredNews = news.filter((newItem) =>
    newItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedNews = filteredNews.slice(
    currentPage * newsPerPage,
    (currentPage + 1) * newsPerPage
  );

  const handleAddNews = () => {
    if (newItem.title && newItem.author) {
      const newNewsData = {
        id: Math.random().toString(36).substr(2, 9),
        ...newItem,
        date: new Date().toISOString().split("T")[0],
      };
      setNews([...news, newNewsData]);
      toast.success("Tin tức đã được thêm");
      resetForm();
      setShowAddEditModal(false);
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
  };

  const handleUpdateNews = () => {
    if (selectedNews) {
      const updatedNews = news.map((newItem) =>
        newItem.id === selectedNews.id
          ? { ...newItem, ...selectedNews }
          : newItem
      );
      setNews(updatedNews);
      toast.success("Tin tức đã được cập nhật");
      resetForm();
      setShowAddEditModal(false);
    }
  };

  const deleteNews = (id) => {
    setNews(news.filter((newItem) => newItem.id !== id));
    toast.success("Tin tức đã bị xóa");
  };

  const confirmDelete = (id) => {
    setSelectedNews(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedNews) {
      deleteNews(selectedNews);
      setShowDeleteModal(false);
      setSelectedNews(null);
    }
  };

  const resetForm = () => {
    setNewItem({ title: "", content: "", date: "", author: "", image: "" });
    setSelectedNews(null);
    setModalAction("add");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const viewNewsDetails = (newsItem) => {
    setSelectedNews(newsItem);
    setShowDetailModal(true);
  };

  return (
    <div className="new-management-container mt-5">
      <h2 className="new-management-title mb-4 text-center">Quản Lý Tin Tức</h2>

      <Button
        onClick={() => {
          setShowAddEditModal(true);
          resetForm();
        }}
        className="mb-3"
      >
        <FaPlus /> Thêm Tin Tức
      </Button>

      <Form className="new-management-search-form mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm tin tức..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </Form.Group>
      </Form>

      <div className="mb-3 d-flex justify-content-end">
        <Form.Select
          aria-label="Chọn số lượng tin tức mỗi trang"
          value={newsPerPage}
          onChange={(e) => {
            setNewsPerPage(parseInt(e.target.value));
            setCurrentPage(0);
          }}
          style={{ width: "200px" }}
        >
          <option value="5">5 tin tức</option>
          <option value="10">10 tin tức</option>
          <option value="20">20 tin tức</option>
          <option value="50">50 tin tức</option>
        </Form.Select>
      </div>

      <Table striped bordered hover className="new-management-table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Ngày đăng</th>
            <th>Người đăng</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedNews.map((newItem) => (
            <tr key={newItem.id}>
              <td>{newItem.id}</td>
              <td>{newItem.title}</td>
              <td>{newItem.date}</td>
              <td>{newItem.author}</td>
              <td style={{ textAlign: "center" }}>
                {newItem.image && (
                  <img
                    src={newItem.image}
                    alt="new"
                    style={{ width: "300px", height: "150px" }}
                  />
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                <span style={{ display: "inline-block", marginRight: "8px" }}>
                  <FaEye
                    className="new-management-status-icon text-primary"
                    onClick={() => viewNewsDetails(newItem)}
                    style={{ cursor: "pointer" }}
                  />
                </span>
                <span style={{ display: "inline-block", marginRight: "8px" }}>
                  <FaEdit
                    className="new-management-status-icon text-warning"
                    onClick={() => {
                      setNewItem({
                        title: newItem.title,
                        content: newItem.content,
                        date: newItem.date,
                        author: newItem.author,
                        image: newItem.image,
                      });
                      setSelectedNews(newItem.id);
                      setModalAction("edit");
                      setShowAddEditModal(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </span>
                <span style={{ display: "inline-block" }}>
                  <FaTrashAlt
                    className="new-management-status-icon text-danger"
                    onClick={() => confirmDelete(newItem.id)}
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p>{`Hiển thị ${filteredNews.length} trên tổng ${news.length} tin tức.`}</p>

      <div className="new-management-pagination-controls text-center">
        <ReactPaginate
          pageCount={Math.ceil(filteredNews.length / newsPerPage)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"pagination justify-content-center"}
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

      {/* Modal Thêm/Cập Nhật Tin Tức */}
      <Modal
        show={showAddEditModal}
        onHide={() => setShowAddEditModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-dark bg-opacity-75">
          <Modal.Title>
            {modalAction === "add" ? "Thêm Tin Tức" : "Cập Nhật Tin Tức"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="news-form">
            <Row>
              <Col md={12}>
                <Form.Group controlId="title" className="news-form__group">
                  <Form.Label className="news-form__label">Tiêu đề</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tiêu đề tin tức"
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem({ ...newItem, title: e.target.value })
                    }
                    className="news-form__input"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="content" className="news-form__group">
                  <Form.Label className="news-form__label">Nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={15}
                    placeholder="Nhập nội dung tin tức"
                    value={newItem.content}
                    onChange={(e) =>
                      setNewItem({ ...newItem, content: e.target.value })
                    }
                    className="news-form__textarea"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="date" className="news-form__group">
                  <Form.Label className="news-form__label">
                    Ngày đăng
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={newItem.date}
                    onChange={(e) =>
                      setNewItem({ ...newItem, date: e.target.value })
                    }
                    className="news-form__input"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="author" className="news-form__group">
                  <Form.Label className="news-form__label">
                    Người đăng
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên người đăng"
                    value={newItem.author}
                    onChange={(e) =>
                      setNewItem({ ...newItem, author: e.target.value })
                    }
                    className="news-form__input"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="image" className="news-form__group">
                  <Form.Label className="news-form__label">Hình ảnh</Form.Label>
                  <div className="news-form__upload-container">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="news-form__file-input"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="news-modal__footer">
          <Button
            variant="secondary"
            onClick={() => setShowAddEditModal(false)}
            className="news-modal__btn news-modal__btn--cancel"
          >
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={modalAction === "add" ? handleAddNews : handleUpdateNews}
            className="news-modal__btn news-modal__btn--submit"
          >
            {modalAction === "add" ? "Thêm" : "Cập Nhật"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Xóa Tin Tức */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="bg-dark bg-opacity-75"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa tin tức này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Chi Tiết Tin Tức */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
        size="lg"
        className="custom-modal-news bg-dark bg-opacity-75 "
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Chi Tiết Tin Tức</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-news">
          {selectedNews && (
            <div className="news-detail">
              {selectedNews.image && (
                <div className="news-detail-image-container">
                  <img
                    src={selectedNews.image}
                    alt="news"
                    className="news-detail-image"
                  />
                </div>
              )}
              <h5 className="news-detail-title">{selectedNews.title}</h5>
              <div className="news-detail-metadata">
                <p className="news-detail-metadata-item">
                  <span className="news-detail-metadata-label">Ngày đăng:</span>
                  {selectedNews.date}
                </p>
                <p className="news-detail-metadata-item">
                  <span className="news-detail-metadata-label">
                    Người đăng:
                  </span>
                  {selectedNews.author}
                </p>
              </div>
              <div className="news-detail-content">
                <p className="news-detail-content-label">Nội dung:</p>
                {selectedNews.content ? (
                  selectedNews.content.split("\n").map((line, index) => (
                    <p key={index} className="news-detail-content-paragraph">
                      {line.trim()}
                    </p>
                  ))
                ) : (
                  <p className="news-detail-empty">Chưa có nội dung.</p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default NewManagement;

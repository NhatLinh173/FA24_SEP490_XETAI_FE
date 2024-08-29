import React from "react";
import Modal from "react-modal";
import "../../assets/css/modalPopup.css";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="User selection Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
      style={{ zIndex: "1001" }}
    >
      <div className="modal-header">
        <button onClick={closeModal} className="close-btn">
          X
        </button>
      </div>
      <div className="modal-body">
        <div className="option">
          <a href="/accountType">
            <span className="text">Đối tác tài xế</span>
          </a>
        </div>
        <div className="option">
          <a href="/signUp-customer">
            <span className="text">Khách hàng</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;

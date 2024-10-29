import React from "react";
import Modal from "react-modal";
import "../../assets/css/modalPopup.css";
import { IoMdClose, IoMdPeople } from "react-icons/io";
import { MdDriveEta } from "react-icons/md";
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
          <IoMdClose />
        </button>
      </div>
      <div className="modal-body">
        <a href="/accountType">
          <div className="option">
            <MdDriveEta className="icon" />
            <span className="text">Đối tác tài xế</span>
          </div>
        </a>
        <a href="/signUp-customer">
          <div className="option">
            <IoMdPeople className="icon" />
            <span className="text">Khách hàng</span>
          </div>
        </a>
      </div>
    </Modal>
  );
};

export default CustomModal;

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
      className="modal-content custom-modal"
      overlayClassName="modal-overlay custom-modal-overlay"
      style={{ zIndex: "1001" }}
    >
      <div className="modal-header custom-modal-header">
        <button onClick={closeModal} className="close-btn custom-close-btn">
          <IoMdClose />
        </button>
      </div>
      <div className="modal-body custom-modal-body">
        <a href="/accountType">
          <div className="option custom-option">
            <MdDriveEta className="icon custom-icon" />
            <span className="text custom-text">Đối tác tài xế</span>
          </div>
        </a>
        <a href="/signUp-customer">
          <div className="option custom-option">
            <IoMdPeople className="icon custom-icon" />
            <span className="text custom-text">Khách hàng</span>
          </div>
        </a>
      </div>
    </Modal>
  );
};

export default CustomModal;

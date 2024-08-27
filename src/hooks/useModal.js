import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => {
    console.log("openModal called");
    setIsOpen(true);
  };
  return { isOpen, openModal, closeModal };
};

export default useModal;

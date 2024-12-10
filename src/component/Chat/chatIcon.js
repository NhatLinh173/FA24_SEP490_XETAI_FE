import React from "react";
import { useHistory } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";

const ChatIcon = () => {
  const history = useHistory();

  const handleNavigateToChat = () => {
    history.push("/chat");
  };

  return (
    <div
      onClick={handleNavigateToChat}
      className="message-icon"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <FaFacebookMessenger size={30} />
    </div>
  );
};

export default ChatIcon;

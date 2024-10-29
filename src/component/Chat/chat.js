import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useWebSocket } from "../../hooks/WebSocketContext";
import axios from "axios";
import { IoSend } from "react-icons/io5";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // New state for user email
  const senderId = localStorage.getItem("userId");
  const messageContainerRef = useRef(null);
  const socket = useWebSocket();
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    if (id) {
      const fetchUserEmail = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3005/auth/user/${id}`
          );
          const user = response.data;
          console.log("User data:", user);
          setUserEmail(user.email);
          setReceiverId(user._id);
          setReceiver(user);

          const conversationResponse = await axios.post(
            `http://localhost:3005/conversation`,
            {
              senderId,
              receiverId: user._id,
            }
          );
          const newConversationId = conversationResponse.data.conversationId;
          setConversationId(newConversationId);
          socket.emit("joinConversation", newConversationId);
          loadMessages(newConversationId);
        } catch (error) {
          console.error("Error fetching user email:", error);
        }
      };

      fetchUserEmail();
    }
  }, [id, senderId, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("conversationIdCreated", ({ conversationId }) => {
        setConversationId(conversationId);
        loadMessages(conversationId);
      });

      socket.on("loadMessages", (loadedMessages) => {
        if (Array.isArray(loadedMessages)) {
          const sortedMessages = loadedMessages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setMessages(sortedMessages);
        } else {
          setMessages([]);
          console.log("No messages loaded");
        }
      });

      if (senderId) {
        socket.emit("joinRoom", senderId);
        socket.on("joinedRoom", (roomId) => {
          console.log(`Joined room: ${roomId}`);
        });

        socket.on("receiveMessage", (newMessage) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          updateChatUserWithLatestMessage(newMessage);
        });
      }

      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });

      socket.on("disconnect", (reason) => {
        console.log("Disconnected from socket server:", reason);
      });

      socket.on("newMessageNotification", (data) => {
        const {
          senderId,
          senderName,
          senderAvatar,
          senderEmail,
          conversationId,
          text,
          createdAt,
        } = data;

        updateChatUserWithLatestMessage({
          senderId,
          senderName,
          senderAvatar,
          senderEmail,
          conversationId,
          text,
          createdAt,
        });
      });

      return () => {
        socket.off("conversationIdCreated");
        socket.off("loadMessages");
        socket.off("receiveMessage");
        socket.off("newMessageNotification");
        socket.off("error");
        socket.off("disconnect");
      };
    }
  }, [senderId, socket]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/conversation?userId=${senderId}`
        );
        setChatUsers(response.data);
      } catch (error) {
        console.error("Error fetching chat users:", error);
      }
    };

    fetchChatUsers();
  }, [senderId]);

  useEffect(() => {
    if (chatUsers.length > 0) {
      handleUserClick(chatUsers[0].participant);
    }
  }, [chatUsers]);

  // New useEffect to select the user based on email
  useEffect(() => {
    if (userEmail && chatUsers.length > 0) {
      const user = chatUsers.find(
        (user) => user.participant.email === userEmail
      );
      if (user) {
        handleUserClick(user.participant);
      }
    }
  }, [userEmail, chatUsers]);

  const loadMessages = (conversationId) => {
    socket.emit("getMessages", { conversationId });
  };

  const sendMessage = () => {
    if (message.trim() && receiverId) {
      const messageData = {
        conversationId: conversationId || null,
        senderId,
        receiverId,
        text: message,
      };

      socket.emit("sendMessage", messageData, (acknowledgement) => {
        if (acknowledgement.success) {
          console.log("Message sent successfully");
        } else {
          console.error("Failed to send message:", acknowledgement.error);
        }
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message,
          msgByUserId: { _id: senderId },
          seen: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setMessage("");
    }
  };

  const searchUser = async (term) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/auth/search?email=${term}`
      );
      const users = Array.isArray(response.data) ? response.data : [];
      setSearchResults(users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleUserClick = async (user) => {
    if (user && user._id) {
      setReceiverId(user._id.toString());
      setReceiver(user);
    } else {
      setReceiverId(id);
    }

    try {
      const response = await axios.post(`http://localhost:3005/conversation`, {
        senderId,
        receiverId: user._id.toString(),
      });
      const newConversationId = response.data.conversationId;
      setConversationId(newConversationId);

      socket.emit("joinConversation", newConversationId);
      loadMessages(newConversationId);
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  };

  const updateChatUserWithLatestMessage = (newMessage) => {
    setChatUsers((prevChatUsers) =>
      prevChatUsers.map((user) =>
        user.participant._id === newMessage.senderId
          ? { ...user, latestMessage: newMessage.text }
          : user
      )
    );
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          width: "30%",
          backgroundColor: "white",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <div style={{ padding: "16px" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm người dùng..."
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={() => searchUser(searchTerm)}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#0084ff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Tìm Kiếm
          </button>
        </div>
        <div style={{ padding: "16px", borderBottom: "1px solid #e0e0e0" }}>
          <h4>Đoạn Chat</h4>
          {chatUsers.map((conv) => (
            <div
              key={conv.conversationId}
              onClick={() => handleUserClick(conv.participant)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                cursor: "pointer",
                backgroundColor:
                  receiverId === conv.participant._id.toString()
                    ? "#e6f2ff"
                    : "transparent",
                transition: "background-color 0.3s",
                marginBottom: "8px",
                borderRadius: "4px",
              }}
            >
              <img
                src={conv.participant.avatar}
                alt={`${conv.participant.name}'s avatar`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "12px",
                }}
              />
              <div>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  {conv.participant.name}
                </p>
                <p style={{ fontSize: "14px", color: "#65676b", margin: 0 }}>
                  {conv.participant.email}
                </p>
                {conv.latestMessage && (
                  <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
                    {conv.latestMessage}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: "calc(100vh - 120px)", overflowY: "auto" }}>
          {searchResults.map((user) => (
            <div
              key={user._id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                cursor: "pointer",
                backgroundColor:
                  receiverId === user._id.toString()
                    ? "#e6f2ff"
                    : "transparent",
                ":hover": { backgroundColor: "#f0f2f5" },
              }}
              onClick={() => handleUserClick(user)}
            >
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "12px",
                }}
              />
              <div>
                <p style={{ fontWeight: "bold", margin: 0 }}>{user.name}</p>
                <p style={{ fontSize: "14px", color: "#65676b", margin: 0 }}>
                  {user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "16px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {receiver && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={receiver.avatar}
                alt={`${receiver.name}'s avatar`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "12px",
                }}
              />
              <div>
                <p style={{ fontWeight: "bold", margin: 0 }}>{receiver.name}</p>
                <p style={{ fontSize: "14px", color: "#65676b", margin: 0 }}>
                  {receiver.email}
                </p>
              </div>
            </div>
          )}
        </div>
        <div
          ref={messageContainerRef}
          style={{ flex: 1, padding: "16px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.msgByUserId._id === senderId ? "flex-end" : "flex-start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection:
                    msg.msgByUserId._id === senderId ? "row-reverse" : "row",
                  alignItems: "center",
                  maxWidth: "70%",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor:
                      msg.msgByUserId._id === senderId ? "#0084ff" : "#e0e0e0",
                    color: msg.msgByUserId._id === senderId ? "white" : "black",
                    maxWidth: "70%",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    marginTop: "4px",
                    textAlign:
                      msg.msgByUserId._id === senderId ? "right" : "left",
                  }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "16px", borderTop: "1px solid #e0e0e0" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Aa"
            style={{
              width: "calc(100% - 50px)",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "8px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "8px",
              backgroundColor: "#0084ff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "40px",
            }}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

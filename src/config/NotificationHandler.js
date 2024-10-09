import { useEffect } from "react";
import { useWebSocket } from "../hooks/WebSocketContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const NotificationHandler = () => {
  const socket = useWebSocket();
  const history = useHistory();

  useEffect(() => {
    if (socket) {
      socket.on("newMessageNotification", (data) => {
        toast.info(`New message from ${data.senderName}: ${data.text}`, {
          onClick: () => {
            history.push("/chat");
          },
        });
      });

      return () => {
        socket.off("newMessageNotification");
      };
    }
  }, [socket, history]);

  return null;
};

export default NotificationHandler;

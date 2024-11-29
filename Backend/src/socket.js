import { Server as SocketIOserver } from "socket.io";
import MessageModel from "./models/messageModel.js";
import { appconfig } from "./config/appconfig.js";
import UserModel from "./models/usermodel.js";

const SocketIoServerConnection = (serverInstance) => {
  const Io = new SocketIOserver(serverInstance, {
    cors: {
      origin: `${appconfig.REACT_APP_BASE_URL}`,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const SocketUsers = new Map();


  Io.on("connection", (socket) => {
    const UserId = socket.handshake.query.UserId;
    const roomName = "Kissan-Mitra-Community";

    if (UserId) {
      SocketUsers.set(UserId, socket.id);
      socket.join(roomName);
      console.log(
        `User connected: ID ${UserId}, Socket ID ${socket.id} joined room: ${roomName}`
      );
    } else {
      console.log("User ID not provided during connection");
    }
    // HANDLE DISCONNECTION

    socket.on("disconnect", () => {
      console.log(`Client disconnected: Socket ID ${socket.id}`);
      for (const [userID, socketId] of SocketUsers.entries()) {
        if (socketId === socket.id) {
          SocketUsers.delete(userID);
          console.log(`Removed user: ID ${userID}`);
          break;
        }
      }
    });

    // SENDING MESSAGES

    socket.on("sendMessage", async (message) => {
      try {
        const senderData = await UserModel.findById(message.sender).select(
          "_id fullname email profilePhoto"
        );

        if (!senderData) {
          throw new Error("Sender not found");
        }

        const messageWithSenderData = {
          ...message,
          sender: {
            _id: senderData._id,
            fullname: senderData.fullname,
            email: senderData.email,
            profilePhoto: senderData.profilePhoto,
          },
        };

        const MessagesCreated = await MessageModel.create(
          messageWithSenderData
        );

        Io.to(message.room).emit("receiveMessage", MessagesCreated);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });

  // ERROR

  Io.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });
};

export default SocketIoServerConnection;

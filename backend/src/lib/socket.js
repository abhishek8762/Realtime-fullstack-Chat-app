import Message from "../models/message.model.js";

export const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async ({ senderId, text }) => {
      const message = new Message({ senderId, text });
      await message.save();
      const fullMessage = await message.populate("senderId", "username");

      io.emit("newMessage", fullMessage); // broadcast to all
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

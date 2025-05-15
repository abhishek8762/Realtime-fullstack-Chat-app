import Message from "../models/message.model.js";

export const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async ({ senderId, text, replyTo }) => {
      try {
        const message = new Message({ senderId, text, replyTo });
        await message.save();
        await message.populate("senderId", "fullName profilePic");
        await message.populate({
          path: "replyTo",
          populate: { path: "senderId", select: "fullName" },
        });
        //why two times? because the first one is for the senderId and the second one is for the replyTo
        //we cant chain populate on document.save() because it returns a promise
        //and we need to wait for the message to be saved before populating

        io.emit("newMessage", message);
      } catch (error) {
        console.error(
          "Error in sendMessage Socket event in backend",
          error.meessage
        );
        return;
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

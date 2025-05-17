import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  const messages = await Message.find()
    .populate("senderId", "fullName profilePic")
    .populate({
      path: "replyTo",
      populate: { path: "senderId", select: "fullName" },
    }) // nested populate inside of replyTo resides refrence senderId, and for senderId its direct reference to fullName
    .sort({ createdAt: 1 });
  res.json(messages);
};

export const leaderboard = async (req, res) => {
  try {
    const leaderboard = await Message.aggregate([
      {
        $group: {
          _id: "$senderId",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $lookup: {
          from: "users", // ⚠️ collection name should match exactly what's in MongoDB (usually lowercase plural)
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          count: 1,
          user: {
            _id: "$user._id",
            fullName: "$user.fullName",
            profilePic: "$user.profilePic",
          },
        },
      },
    ]);

    res.json(leaderboard);
  } catch (error) {
    console.error("Error in leaderboard route:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

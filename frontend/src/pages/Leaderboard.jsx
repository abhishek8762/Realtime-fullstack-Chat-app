import { useEffect } from "react";
import { useMessageStore } from "../store/messageStore";

const Leaderboard = () => {
  const { leaderboard, fetchLeaderboard } = useMessageStore();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className=" h-screen p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-15">🏆 Leaderboard</h1>
      {leaderboard.map((entry, index) => (
        <div
          key={entry.user._id}
          className="flex items-center p-3 shadow mt-8 mb-2 rounded-xl hover:bg-red-500 transition-all duration-200"
        >
          <span className="text-xl font-bold w-6">{index + 1}</span>
          <img
            src={entry.user.profilePic}
            className="w-10 h-10 rounded-full mx-3"
          />
          <div className="flex-1">
            <div className="font-medium text-black">{entry.user.fullName}</div>
          </div>
          <div className="text-gray-600 text-sm">{entry.count} messages</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;

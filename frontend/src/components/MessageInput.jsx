import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/messageStore";

export const MessageInput = () => {
  const [text, setText] = useState("");
  const { authUser } = useAuthStore();
  const { sendMessage } = useMessageStore();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({ senderId: authUser._id, text });
    setText("");
  };

  return (
    <div className="flex p-4 border-t gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded border"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
};

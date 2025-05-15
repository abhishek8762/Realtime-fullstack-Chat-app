import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/messageStore";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export const MessageInput = () => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { authUser } = useAuthStore();
  const { sendMessage } = useMessageStore();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({ senderId: authUser._id, text });
    setText("");
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-col border-t p-2 gap-2 relative">
      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded border"
        />
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-gray-200 p-2 rounded"
        >
          <Smile className="w-4 h-4" />
        </button>
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

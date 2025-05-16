import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/messageStore";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { TiDelete } from "react-icons/ti";

export const MessageInput = () => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { authUser } = useAuthStore();
  const { sendMessage, replyingTo, clearReplyingTo } = useMessageStore();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({
      senderId: authUser._id,
      text,
      replyTo: replyingTo?._id || null,
    });
    setText("");
    clearReplyingTo();
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-col border-t p-2 gap-2 relative">
      {replyingTo && (
        <div className="bg-gray-100 p-2 rounded border text-sm flex justify-between items-center">
          <div className="truncate max-w-[80%]">
            Replying to <strong>{replyingTo.senderId.fullName}</strong>: "
            {replyingTo.text}"
          </div>
          <button
            onClick={clearReplyingTo}
            className="ml-2 text-red-500 text-xs"
          >
            <TiDelete className="w-7 h-9" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded border"
        />
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-gray-200 p-2 rounded text-black"
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

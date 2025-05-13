import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/messageStore";
import { MessageThread } from "./MessageThread";
import { MessageInput } from "./MessageInput";

const ChatPage = () => {
  const { authUser } = useAuthStore();
  const { connectSocket } = useMessageStore();

  useEffect(() => {
    if (authUser?._id) {
      connectSocket(authUser._id);
    }
  }, [authUser]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-4 text-xl font-semibold">Unity Chat</div>

      {/* Message Thread grows to fill available space */}
      <div className="flex-1 overflow-y-auto">
        <MessageThread />
      </div>

      {/* Message input stays at bottom */}
      <MessageInput />
    </div>
  );
};

export default ChatPage;

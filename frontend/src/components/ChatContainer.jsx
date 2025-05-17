import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/messageStore";
import { MessageThread } from "./MessageThread";
import { MessageInput } from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const { connectSocket, isMessagesLoading, fetchMessages } = useMessageStore();

  useEffect(() => {
    if (!authUser?._id) return;

    console.log(authUser._id);

    fetchMessages();
    connectSocket(authUser._id);
  }, [authUser, fetchMessages, connectSocket]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>

        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageThread />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

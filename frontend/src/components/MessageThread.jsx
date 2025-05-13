import { useMessageStore } from "../store/messageStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import clsx from "clsx";
import moment from "moment";

export const MessageThread = () => {
  const { authUser } = useAuthStore();
  const { messages, fetchMessages } = useMessageStore();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col space-y-2 h-full overflow-y-auto p-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={clsx("p-2 rounded-lg w-fit max-w-md", {
            "bg-blue-200 self-end": msg.senderId._id === authUser._id,
            "bg-gray-200 self-start": msg.senderId._id !== authUser._id,
          })}
        >
          <div className="text-xs text-gray-600">{msg.senderId.username}</div>
          <div>{msg.text}</div>
          <div className="text-xs text-right">
            {moment(msg.createdAt).fromNow()}
          </div>
        </div>
      ))}
    </div>
  );
};

import { useMessageStore } from "../store/messageStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import clsx from "clsx";
import moment from "moment";
import { FaReply } from "react-icons/fa6";
import { toUpperCase } from "../lib/utils";

export const MessageThread = () => {
  const { authUser, onlineUsers } = useAuthStore();
  const { messages } = useMessageStore();
  const lastDate = useRef("");
  const bottomRef = useRef(null);

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto p-4">
      {messages?.map((msg, idx) => {
        const isAuthUser = msg.senderId._id === authUser._id;
        const msgDate = moment(msg.createdAt).format("YYYY-MM-DD");
        const showDateSeparator = msgDate !== lastDate.current;
        if (showDateSeparator) lastDate.current = msgDate;

        return (
          <div key={msg._id}>
            {showDateSeparator && (
              <div className="text-center text-sm text-gray-500 mb-2">
                {moment(msg.createdAt).calendar(null, {
                  sameDay: "[Today]",
                  lastDay: "[Yesterday]",
                  lastWeek: "dddd",
                  sameElse: "MMMM D, YYYY",
                })}
              </div>
            )}

            <div
              className={clsx("flex items-end py-2", {
                "justify-end": isAuthUser,
                "justify-start": !isAuthUser,
              })}
            >
              {!isAuthUser && (
                <div className="relative w-8 h-8 mr-2 self-end">
                  <img
                    src={msg.senderId.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  {isUserOnline(msg.senderId._id) && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full ring-1 ring-green-500 transition-all duration-200"></span>
                  )}
                </div>
              )}

              <div
                className={clsx(
                  "group p-2 rounded-lg max-w-xs relative",
                  isAuthUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                )}
              >
                <button
                  className="absolute -top-4 right-0 text-xs hidden group-hover:block"
                  onClick={() => useMessageStore.getState().setReplyingTo(msg)}
                >
                  <FaReply className="w-5 h-5 text-gray-500" />
                </button>

                {msg.replyTo && (
                  <div className="text-xs italic opacity-80 mb-1 border-l-2 pl-2 border-gray-400">
                    <div className="font-semibold text-[14px] ">
                      {toUpperCase(msg.senderId.fullName)}
                    </div>
                    <div className="break-words text-[12px]">
                      {msg.replyTo.text}
                    </div>
                  </div>
                )}

                <div
                  className={clsx(
                    "flex justify-between items-center mb-1 text-xs font-semibold",
                    {
                      "text-gray-100": isAuthUser,
                      "text-gray-700": !isAuthUser,
                    }
                  )}
                >
                  <span>{toUpperCase(msg.senderId.fullName)}</span>
                  <span className="text-[10px] opacity-80 ml-2">
                    {moment(msg.createdAt).format("h:mm A")}
                  </span>
                </div>

                <div className="break-words">{msg.text}</div>
              </div>

              {isAuthUser && (
                <div className="relative w-8 h-8 ml-2 self-end">
                  <img
                    src={msg.senderId.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  {isUserOnline(msg.senderId._id) && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full ring-1 ring-green-500 transition-all duration-200"></span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
};

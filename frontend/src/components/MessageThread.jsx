import { useMessageStore } from "../store/messageStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import clsx from "clsx";
import moment from "moment";

export const MessageThread = () => {
  const { authUser } = useAuthStore();
  const { messages, fetchMessages } = useMessageStore();
  const lastDate = useRef("");

  useEffect(() => {
    fetchMessages();
  }, []);

  // Utility to convert name to Title Case
  const toTitleCase = (str) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt[0].toUpperCase() + txt.substr(1).toLowerCase()
    );

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
                <img
                  src={msg.senderId.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
              )}

              <div
                className={clsx(
                  "p-2 rounded-lg max-w-xs relative",
                  isAuthUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                )}
              >
                <div
                  className={clsx(
                    "flex justify-between items-center mb-1 text-xs font-semibold",
                    {
                      "text-gray-100": isAuthUser,
                      "text-gray-700": !isAuthUser,
                    }
                  )}
                >
                  <span>{toTitleCase(msg.senderId.fullName)}</span>
                  <span className="text-[10px] opacity-80 ml-2">
                    {moment(msg.createdAt).format("h:mm A")}
                  </span>
                </div>

                <div className="break-words">{msg.text}</div>
              </div>

              {isAuthUser && (
                <img
                  src={msg.senderId.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full ml-2 self-end"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

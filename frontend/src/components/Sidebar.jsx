import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { onlineUsers } = useAuthStore();

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 " />
        </div>

        <div className="mt-1 mb-0 hidden lg:flex items-center gap-2">
          <p className="text-sm mt-2 text-zinc-500">
            Total online: {onlineUsers.length}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

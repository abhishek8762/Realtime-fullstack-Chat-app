import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircleMore, User } from "lucide-react";
import { MdLeaderboard } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className=" border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircleMore className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Unity Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {authUser && (
              <>
                <Link
                  to="/leaderboard"
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <MdLeaderboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Leaderboard</span>
                </Link>

                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

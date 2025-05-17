import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost rounded-full p-2 text-xl"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;

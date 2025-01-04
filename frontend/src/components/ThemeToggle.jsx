import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
      <Button onClick={toggleTheme} variant="ghost" size="icon">
        {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
  );
};

export default ThemeToggle;

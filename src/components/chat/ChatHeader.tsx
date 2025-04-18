
import { Settings, History, LogOut } from "lucide-react";
import { Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ChatHeaderProps {
  onClearHistory: () => void;
}

export function ChatHeader({ onClearHistory }: ChatHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/50 bg-background px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tweet">
          <Twitter className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-primary">Tweet Summarizer</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onClearHistory}>
            <History className="mr-2 h-4 w-4" />
            Clear History
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

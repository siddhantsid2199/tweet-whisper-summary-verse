
import { useState } from "react";
import { MessageSquare, PlusCircle, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
  active?: boolean;
};

type SidebarProps = {
  chatHistory: ChatHistoryItem[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat?: (id: string) => void;
};

export function Sidebar({ chatHistory, onSelectChat, onNewChat, onDeleteChat }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  const filteredHistory = searchQuery
    ? chatHistory.filter((chat) => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatHistory;

  const handleDeleteChat = (chatId: string) => {
    setChatToDelete(chatId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (chatToDelete && onDeleteChat) {
      onDeleteChat(chatToDelete);
    }
    setDeleteDialogOpen(false);
    setChatToDelete(null);
  };

  return (
    <div className="flex h-full w-[260px] flex-col border-r border-border/50 bg-sidebar">
      <div className="flex items-center p-4">
        <Button 
          onClick={onNewChat}
          variant="outline" 
          className="flex w-full items-center justify-start gap-2 border-border/50 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>
      
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search chats..."
            className="w-full rounded-md border border-border/50 bg-sidebar-accent py-2 pl-8 pr-3 text-sm text-sidebar-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="mt-2 space-y-1">
          {filteredHistory.map((chat) => (
            <ContextMenu key={chat.id}>
              <ContextMenuTrigger>
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    chat.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <div className="flex-1 truncate text-left">
                    {chat.title}
                  </div>
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={() => handleDeleteChat(chat.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Chat
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </ScrollArea>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

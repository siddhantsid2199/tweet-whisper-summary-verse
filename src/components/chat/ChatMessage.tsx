
import { Avatar } from "@/components/ui/avatar";
import { Twitter, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

interface ChatMessageProps {
  message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 px-4 py-6",
        isUser ? "bg-background/50" : "bg-background"
      )}
    >
      <Avatar className={cn("h-8 w-8", !isUser && "bg-tweet")}>
        {isUser ? (
          <User className="h-5 w-5" />
        ) : (
          <Twitter className="h-5 w-5 text-white" />
        )}
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="font-medium">
          {isUser ? "You" : "Tweet Summarizer"}
        </div>
        <div className="prose prose-invert max-w-none">
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
}

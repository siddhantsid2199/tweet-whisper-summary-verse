
import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSubmit, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    onSubmit(message);
    setMessage("");
  };

  return (
    <div className="border-t border-border/50 bg-background p-4">
      <form 
        onSubmit={handleSubmit}
        className="flex w-full items-end gap-2 max-w-4xl mx-auto"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Search for tweets to summarize..."
            className="min-h-[60px] w-full resize-none border-border/50 bg-background pr-12 text-primary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !message.trim()}
            className="absolute bottom-2 right-2 h-8 w-8 bg-tweet hover:bg-tweet-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Search for keywords, hashtags, or accounts to summarize recent tweets
      </p>
    </div>
  );
}

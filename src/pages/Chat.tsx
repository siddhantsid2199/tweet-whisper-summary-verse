
import { useState, useEffect } from "react";
import { Twitter, Settings, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatMessage, MessageType } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
  active?: boolean;
  messages: MessageType[];
};

// Mock initial data
const initialChatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "AI Conference Updates",
    date: "April 15, 2025",
    active: true,
    messages: [
      {
        id: "msg1",
        role: "user",
        content: "#AIConference trending tweets",
        timestamp: "2:30 PM"
      },
      {
        id: "msg2",
        role: "assistant",
        content: "The AI Conference is generating significant buzz with several key themes emerging: 1) Advances in large language models showcased by leading research teams, 2) Ethical AI frameworks becoming a central focus with new guidelines proposed, 3) Industry applications highlighting healthcare and climate tech innovations, 4) Concerns about AI regulation with calls for international standards, 5) Accessibility improvements making AI tools more widely available to smaller organizations.",
        timestamp: "2:31 PM"
      }
    ]
  },
  {
    id: "2",
    title: "SpaceX Launch Coverage",
    date: "April 14, 2025",
    messages: [
      {
        id: "msg3",
        role: "user",
        content: "Latest SpaceX launch tweets",
        timestamp: "5:15 PM"
      },
      {
        id: "msg4",
        role: "assistant",
        content: "SpaceX's latest launch has generated extensive Twitter coverage: 1) Successful deployment of 60 Starlink satellites confirmed, 2) First stage booster landed on drone ship with precision, 3) Live streaming reached record viewership of over 2 million concurrent users, 4) Elon Musk highlighted improved satellite internet speeds coming next month, 5) Next launch already scheduled for May 3rd carrying international scientific payloads.",
        timestamp: "5:16 PM"
      }
    ]
  }
];

export default function Chat() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(initialChatHistory);
  const [activeChat, setActiveChat] = useState<ChatHistoryItem>(initialChatHistory[0]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectChat = (id: string) => {
    const updatedHistory = chatHistory.map(chat => ({
      ...chat,
      active: chat.id === id
    }));
    
    setChatHistory(updatedHistory);
    setActiveChat(chatHistory.find(chat => chat.id === id) || activeChat);
  };

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: "New Conversation",
      date: new Date().toLocaleDateString(),
      active: true,
      messages: []
    };

    const updatedHistory = chatHistory.map(chat => ({
      ...chat,
      active: false
    }));
    
    setChatHistory([newChat, ...updatedHistory]);
    setActiveChat(newChat);
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    setActiveChat({
      id: Date.now().toString(),
      title: "New Conversation",
      date: new Date().toLocaleDateString(),
      active: true,
      messages: []
    });
    toast.success("Chat history cleared");
  };

  const handleLogout = () => {
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleSubmit = async (message: string) => {
    if (isLoading) return;
    
    // Create new message from user
    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Update active chat with new message
    const updatedActiveChat = {
      ...activeChat,
      title: message.length > 20 ? message.substring(0, 20) + "..." : message,
      messages: [...activeChat.messages, newUserMessage]
    };
    
    setActiveChat(updatedActiveChat);
    
    // Update chat history
    const updatedHistory = chatHistory.map(chat => 
      chat.id === activeChat.id ? updatedActiveChat : chat
    );
    
    setChatHistory(updatedHistory);
    
    // Simulate response (in a real app, this would be an API call)
    setIsLoading(true);
    
    setTimeout(() => {
      const mockResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on analyzing the top tweets about \"" + message + "\", here's a summary:\n\n1) Most discussed topic is the impact on technology sector with 45% of tweets highlighting positive innovations\n2) Critical perspectives focused on ethical considerations (23% of trending tweets)\n3) Several verified accounts reported upcoming developments expected next quarter\n4) Community response shows strong engagement with 38% increase in conversation volume\n5) Regional differences noted with European users emphasizing regulatory aspects while North American users focus on practical applications",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const finalActiveChat = {
        ...updatedActiveChat,
        messages: [...updatedActiveChat.messages, mockResponse]
      };
      
      setActiveChat(finalActiveChat);
      
      const finalHistory = updatedHistory.map(chat => 
        chat.id === activeChat.id ? finalActiveChat : chat
      );
      
      setChatHistory(finalHistory);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row bg-background">
      <Sidebar 
        chatHistory={chatHistory} 
        onSelectChat={handleSelectChat} 
        onNewChat={handleNewChat} 
      />
      
      <div className="flex flex-1 flex-col">
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
              <DropdownMenuItem onClick={handleClearHistory}>
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
        
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {activeChat.messages.length === 0 ? (
              <div className="flex h-[calc(100vh-180px)] flex-col items-center justify-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tweet">
                  <Twitter className="h-7 w-7 text-white" />
                </div>
                <h2 className="mb-2 text-xl font-bold">Welcome to Tweet Summarizer</h2>
                <p className="text-center text-muted-foreground max-w-md">
                  Search for topics, hashtags, or accounts to get summaries of the most relevant tweets.
                </p>
              </div>
            ) : (
              activeChat.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
          </div>
        </ScrollArea>
        
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

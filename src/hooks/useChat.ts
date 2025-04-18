
import { useState } from "react";
import { toast } from "sonner";

export type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
  active?: boolean;
  messages: MessageType[];
};

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
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

export function useChat() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(initialChatHistory);
  const [activeChat, setActiveChat] = useState<ChatHistoryItem>(initialChatHistory[0]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (message: string) => {
    if (isLoading) return;
    
    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedActiveChat = {
      ...activeChat,
      title: message.length > 20 ? message.substring(0, 20) + "..." : message,
      messages: [...activeChat.messages, newUserMessage]
    };
    
    setActiveChat(updatedActiveChat);
    
    const updatedHistory = chatHistory.map(chat => 
      chat.id === activeChat.id ? updatedActiveChat : chat
    );
    
    setChatHistory(updatedHistory);
    
    setIsLoading(true);
    
    // Simulate response (in a real app, this would be an API call)
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

  return {
    chatHistory,
    activeChat,
    isLoading,
    handleSelectChat,
    handleNewChat,
    handleClearHistory,
    handleSubmit
  };
}

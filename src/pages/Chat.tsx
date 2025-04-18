
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { WelcomeScreen } from "@/components/chat/WelcomeScreen";
import { useChat } from "@/hooks/useChat";

export default function Chat() {
  const {
    chatHistory,
    activeChat,
    isLoading,
    handleSelectChat,
    handleNewChat,
    handleClearHistory,
    handleSubmit
  } = useChat();

  return (
    <div className="flex h-screen flex-col md:flex-row bg-background">
      <Sidebar 
        chatHistory={chatHistory} 
        onSelectChat={handleSelectChat} 
        onNewChat={handleNewChat} 
      />
      
      <div className="flex flex-1 flex-col">
        <ChatHeader onClearHistory={handleClearHistory} />
        
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {activeChat.messages.length === 0 ? (
              <WelcomeScreen />
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

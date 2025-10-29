import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you 24/7. Ask me about our services, pricing, or book an appointment!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAutoResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("price") || message.includes("cost") || message.includes("rate")) {
      return "Our services start from ₹199 for beard styling, ₹299 for men's haircuts, ₹499 for women's haircuts. Hair spa is ₹599, facials from ₹799. Would you like detailed pricing for specific services?";
    }
    
    if (message.includes("timing") || message.includes("open") || message.includes("close")) {
      return "We're open daily from 8:00 AM to 10:00 PM. You can book appointments for any 30-minute slot during these hours. Would you like to book an appointment?";
    }
    
    if (message.includes("book") || message.includes("appointment")) {
      return "I can help you book an appointment! You can use our booking page or call us at +91 6263587072. What service are you interested in?";
    }
    
    if (message.includes("location") || message.includes("address")) {
      return "We're located at Bharhut Nagar, Satna, Madhya Pradesh. You can call us at +91 6263587072 for directions or any queries.";
    }
    
    if (message.includes("service") || message.includes("hair") || message.includes("facial")) {
      return "We offer hair services (cut, spa, coloring), beauty services (facials, makeup), and grooming services (massage, nail care). We also have special packages for brides and grooms. What service interests you?";
    }
    
    if (message.includes("package")) {
      return "We have exclusive packages: Groom Package (₹9,999), Bride Package (₹14,999), and Monthly Care Package (₹9,999). Each includes multiple premium services. Would you like details about any specific package?";
    }
    
    return "Thank you for your message! For detailed information about our services, pricing, or to book an appointment, please call us at +91 6263587072 or visit our booking page. Our expert stylists are ready to help you!";
  };

  const sendMessage = async (text: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    // TODO: Save to MongoDB database when backend is ready
    console.log("Message saved:", { sessionId, text, sender });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText("");

    // Send user message
    await sendMessage(userMessage, "user");

    // Generate and send bot response after a short delay
    setTimeout(async () => {
      const botResponse = getAutoResponse(userMessage);
      await sendMessage(botResponse, "bot");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-background border border-border rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">He & She Salon</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
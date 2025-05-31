
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "👋 Hi there! I'm your personal Dandeli adventure guide. How can I help you plan your perfect nature getaway?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Enhanced bot responses based on keywords
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = "";
      const userInput = input.toLowerCase();
      
      if (userInput.includes("price") || userInput.includes("cost") || userInput.includes("rate")) {
        botResponse = "💰 Our adventure packages start from ₹1,999 per person. Currently, we're running a special monsoon discount of 25% off! Would you like to know more about our packages?";
      } 
      else if (userInput.includes("booking") || userInput.includes("reserve")) {
        botResponse = "📅 Great choice! You can book easily through our online system or WhatsApp. We have some exciting weekend packages available. Would you like me to show you our most popular options?";
      }
      else if (userInput.includes("activity") || userInput.includes("adventure") || userInput.includes("rafting")) {
        botResponse = "🛶 We offer thrilling adventures including Grade 2-3 white water rafting, jungle safaris, and kayaking! Our newest addition is night camping under the stars. Which activity interests you the most?";
      }
      else if (userInput.includes("location") || userInput.includes("reach") || userInput.includes("direction")) {
        botResponse = "📍 We're located in the beautiful Dandeli Wildlife Sanctuary. The nearest airport is Goa (160km), and we provide pickup services. Would you like me to send you detailed directions?";
      }
      else if (userInput.includes("food") || userInput.includes("cuisine") || userInput.includes("meal")) {
        botResponse = "🍽️ Our in-house chef specializes in local Malnad cuisine using fresh, organic ingredients. We also cater to various dietary preferences. Would you like to see our menu?";
      }
      else if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        botResponse = "👋 Hello! I'm excited to help you plan your Dandeli adventure! Are you interested in our activities, accommodations, or special offers?";
      }
      else if (userInput.includes("thank")) {
        botResponse = "😊 You're welcome! Don't hesitate to ask if you need anything else. Have a great day!";
      }
      else {
        botResponse = "I'd love to help you plan your perfect Dandeli adventure! Are you interested in our activities, accommodations, or special offers? You can also ask me about prices, locations, or current deals! 🌿";
      }
      
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-6 z-40">
      <Button
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
          "bg-green-600 hover:bg-green-700 transition-all duration-300", 
          !isOpen && "animate-bounce"
        )}
        aria-label="Chat with us"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      <div 
        className={cn(
          "absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform",
          "flex flex-col border border-border",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
        style={{ height: isOpen ? '400px' : '0' }}
      >
        {/* Header */}
        <div className="bg-green-600 p-4 text-white">
          <h3 className="font-bold">Adventure Support</h3>
          <p className="text-xs opacity-80">Always here to help!</p>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "max-w-[80%] p-3 rounded-lg animate-slide-up",
                message.isUser 
                  ? "bg-green-600 text-white self-end rounded-br-none"
                  : "bg-gray-100 self-start rounded-bl-none"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="flex space-x-2 p-3 bg-gray-100 self-start rounded-lg max-w-[80%]">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-3 border-t border-border flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <Button 
            onClick={handleSend}
            className="rounded-l-none bg-green-600 hover:bg-green-700"
            disabled={input.trim() === ''}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

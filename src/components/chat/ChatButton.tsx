
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'ai', timestamp: Date}[]>([
    {
      text: "Hi there! I'm Saurabh's virtual assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = {
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage = {
        text: "Thanks for reaching out! Saurabh will get back to you soon. Feel free to leave your contact details.",
        sender: 'ai' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg p-0 z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-card rounded-lg shadow-lg overflow-hidden z-50 border"
          >
            <div className="bg-primary p-4 text-primary-foreground flex items-center">
              <Avatar className="mr-3 h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces" alt="Saurabh Alhat" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Chat with Saurabh</h3>
                <p className="text-xs opacity-80">Usually replies within a day</p>
              </div>
            </div>
            
            <div className="flex flex-col h-full">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSubmit} className="p-3 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 rounded-l-md border border-r-0 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button 
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 rounded-r-md hover:bg-primary/90 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;

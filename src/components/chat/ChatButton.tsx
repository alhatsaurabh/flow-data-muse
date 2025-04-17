import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); 
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const userMessage = {
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
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
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg p-0 z-50 flex items-center justify-center"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'message'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // Adjusted width and height, added max-h
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[60vh] max-h-[500px] bg-card rounded-lg shadow-xl overflow-hidden z-40 border flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-3 text-primary-foreground flex items-center flex-shrink-0 shadow-sm">
              <Avatar className="mr-3 h-9 w-9 border-2 border-primary-foreground/50"> {/* Added subtle border */}
                {/* Updated Avatar Image */}
                <AvatarImage src="/lovable-uploads/3ab82acf-8799-4d78-a428-1a9e58625ab3.jpg" alt="Saurabh Alhat" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">Chat with Saurabh</h3>
                <p className="text-xs opacity-80">AI Assistant</p> {/* Updated text */}
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div // Added animation to messages
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={cn(
                      "max-w-[85%] p-2.5 rounded-xl shadow-sm", // Slightly larger rounding
                      message.sender === 'user' 
                        ? "bg-primary text-primary-foreground rounded-br-none" // Style user messages
                        : "bg-muted rounded-bl-none" // Style AI messages
                    )}
                  >
                    <p className="text-sm break-words">{message.text}</p> {/* Ensure words break */}
                    {/* Timestamp can be added back if needed */}
                    {/* <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p> */}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 border-t bg-background flex-shrink-0">
              <div className="flex items-center bg-muted rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..." // Slightly friendlier placeholder
                  className="flex-1 p-2 h-10 bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()} // Disable if input is empty
                  className="text-primary p-2 rounded-md hover:bg-primary/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors mr-1"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;

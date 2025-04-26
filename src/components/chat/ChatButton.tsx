import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { answerQuestion, ChatbotResponse, ContentResponse } from '@/lib/chatbot'; // Import answerQuestion and types
import { Link } from 'react-router-dom'; // Import Link for navigation

// Define the type for a message in the chat
interface ChatMessage {
  content: string | ContentResponse | { type: 'suggested-questions', questions: string[] }; // Content can be a string, structured response, or suggested questions
  sender: 'user' | 'ai' | 'system'; // Add 'system' sender for suggested questions
  timestamp: Date;
}

const allSuggestedQuestions = [
  "Tell me about Saurabh's experience",
  "What are Saurabh's skills?",
  "Tell me about Saurabh's education",
  "What are the latest blog posts?",
  "Tell me about a case study",
];

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestedQuestionsIndex, setSuggestedQuestionsIndex] = useState(0); // State to track the starting index for suggested questions

  const [messages, setMessages] = useState<ChatMessage[]>([ // Use ChatMessage type
    {
      content: "Hi there! I'm Saurabh's virtual assistant. Here are some questions I can answer:",
      sender: 'ai',
      timestamp: new Date()
    },
    {
      content: { type: 'suggested-questions', questions: allSuggestedQuestions.slice(0, 3) }, // Show the first 3 questions initially
      sender: 'system',
      timestamp: new Date()
    }
  ]);

  // Function to handle clicking a suggested question
  const handleSuggestedQuestionClick = (question: string) => {
    setInputText(question);
    // Optionally, automatically submit the question
    // handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  // Function to render text with clickable links (for string messages)
  const renderStringMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{part}</a>;
      }
      return part;
    });
  };

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

  const handleSubmit = async (e: React.FormEvent) => { // Make handleSubmit async
    e.preventDefault();
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return;

    const userMessage: ChatMessage = { // Use ChatMessage type
      content: trimmedInput, // Use trimmed input
      sender: 'user' as const,
      timestamp: new Date()
    };

    setInputText(''); // Clear input immediately after sending

    // Call the answerQuestion function and get the AI response
    console.log('Calling answerQuestion with query:', trimmedInput); // Log the query
    const aiResponseContent = await answerQuestion(trimmedInput); // Use trimmed input for the API call
    console.log('Received AI response content:', aiResponseContent); // Log the raw response content

    const aiMessage: ChatMessage = { // Use ChatMessage type
      content: aiResponseContent, // Use content instead of text
      sender: 'ai' as const,
      timestamp: new Date()
    };
    console.log('Created AI message object:', aiMessage); // Log the created message object

    // Calculate the next set of suggested questions and the next index
    const currentSuggestedQuestionsIndex = suggestedQuestionsIndex; // Capture current state value
    const nextIndex = (currentSuggestedQuestionsIndex + 3) % allSuggestedQuestions.length;
    const nextSuggestedQuestions = allSuggestedQuestions.slice(nextIndex, nextIndex + 3);
    // Handle wrapping around the end of the array
    if (nextIndex + 3 > allSuggestedQuestions.length) {
      const remaining = (nextIndex + 3) % allSuggestedQuestions.length;
      nextSuggestedQuestions.push(...allSuggestedQuestions.slice(0, remaining));
    }

    const nextSuggestedQuestionsMessage: ChatMessage = {
      content: { type: 'suggested-questions', questions: nextSuggestedQuestions },
      sender: 'system',
      timestamp: new Date()
    };

    // Update messages state
    setMessages(prevMessages => {
      // Filter out any previous suggested questions messages, safely checking content type
      const messagesWithoutSuggestions = prevMessages.filter(msg => !(typeof msg.content === 'object' && msg.content !== null && 'type' in msg.content && msg.content.type === 'suggested-questions'));
      // Add user message, AI message, and the new set of suggested questions
      const nextMessages = [...messagesWithoutSuggestions, userMessage, aiMessage, nextSuggestedQuestionsMessage];
      console.log('Next messages state:', nextMessages); // Log the next state
      return nextMessages;
    });

    // Update the suggested questions index state separately
    setSuggestedQuestionsIndex(nextIndex);
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
                  className={`flex ${message.sender === 'user' || message.sender === 'system' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={cn(
                      "max-w-[85%] p-2.5 rounded-xl shadow-sm", // Slightly larger rounding
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground rounded-br-none" // Style user messages
                        : message.sender === 'system'
                          ? "bg-muted rounded-bl-none" // Style system messages (like AI)
                          : "bg-muted rounded-bl-none" // Default style for AI messages
                    )}
                    >
                    {/* Render message content based on its type */}
                    {typeof message.content === 'string' ? (
                      // If content is a string, render it with link detection
                      <p className="text-sm break-words">{renderStringMessageText(message.content)}</p>
                    ) : 'type' in message.content && message.content.type === 'suggested-questions' ? (
                      // If content is suggested questions
                      <div className="flex flex-col items-end space-y-1"> {/* Align suggested questions to the right */}
                         <p className="text-xs text-muted-foreground text-right w-full">Suggested:</p> {/* Align heading text right */}
                        {message.content.questions.map((question, index) => (
                          <button
                            key={index}
                            className="text-xs text-muted-foreground hover:text-blue-500 text-right" // Default muted, blue on hover, right aligned, no underline
                            onClick={() => handleSuggestedQuestionClick(question)}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    ) : (
                      // If content is a structured response, render the intro and items with links
                      <div>
                        <p className="text-sm mb-2">{message.content.intro}</p>
                        <div className="space-y-2">
                          {message.content.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="border-t border-muted-foreground/20 pt-2 first:border-t-0 first:pt-0"> {/* Add a subtle separator */}
                              {/* Display title as a clickable link */}
                              {item.type === 'blog' && (
                                <Link to={`/blog/${item.slug}`} className="text-blue-500 underline text-sm block hover:no-underline">
                                  - {item.title} (Blog Post)
                                </Link>
                              )}
                              {item.type === 'case-study' && (
                                <Link to={`/projects/${item.slug}`} className="text-blue-500 underline text-sm block hover:no-underline">
                                  - {item.title} (Case Study)
                                </Link>
                              )}
                               {item.type === 'about' && (
                                <Link to={`/about`} className="text-blue-500 underline text-sm block hover:no-underline">
                                  - {item.title}
                                </Link>
                              )}
                               {/* Display snippet separately */}
                               {item.snippet && (
                                 <p className="text-xs text-muted-foreground mt-1 ml-3">{item.snippet}</p>
                               )}
                              </div>
                           ))}
                         </div>
                       </div>
                     )}
                     {/* Timestamp can be added back if needed */}
                     {/* <p className="text-xs opacity-70 mt-1 text-right">
                       {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                     </p> */}
                   </div> {/* Closing tag for the message bubble div */}
                 </motion.div>
               ))}
               <div ref={messagesEndRef} />

               {/* Suggested questions are now part of the messages array */}
               {/* {showSuggestedQuestions && (
                 <div className="absolute bottom-2 right-2 flex flex-col items-end space-y-1">
                    <p className="text-xs text-muted-foreground">Suggested:</p>
                   {suggestedQuestions.map((question, index) => (
                     <button
                       key={index}
                       className="text-xs text-blue-500 underline hover:no-underline"
                       onClick={() => handleSuggestedQuestionClick(question)}
                     >
                       {question}
                     </button>
                   ))}
                 </div>
               )} */}
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

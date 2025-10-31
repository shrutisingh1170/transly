import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { SplineErrorBoundary } from './SplineErrorBoundary';
import { 
  Bot, 
  X,
  Send,
  Mic,
  Volume2,
  MessageSquare,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Floating3DChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your AI translation assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [botRotation, setBotRotation] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Calculate bot rotation based on mouse position
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateX = ((e.clientY - centerY) / centerY) * 10;
      const rotateY = ((e.clientX - centerX) / centerX) * 10;
      
      setBotRotation({ x: rotateX, y: rotateY });
    };

    if (!isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      setIsSpeaking(true);
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      setTimeout(() => setIsSpeaking(false), 2000);
    }, 500);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('translate') || lowerInput.includes('translation')) {
      return 'I can help you translate text between Nepali, Sinhalese, and English! Just paste your text and I\'ll translate it for you.';
    } else if (lowerInput.includes('voice') || lowerInput.includes('speak')) {
      return 'Yes! I support voice input and can speak translations back to you. Click the microphone icon to use voice features.';
    } else if (lowerInput.includes('help') || lowerInput.includes('how')) {
      return 'I can assist with translations, explain features, provide language learning tips, and answer questions about Transly. What would you like to know?';
    } else if (lowerInput.includes('learn') || lowerInput.includes('quiz')) {
      return 'Transly offers interactive quizzes, flashcards, and gamified learning experiences. Check out the Learning section to get started!';
    } else {
      return 'That\'s a great question! I\'m here to help with translations, language learning, and using Transly features. Feel free to ask me anything!';
    }
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Request microphone permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      
      // Simulate voice input
      setTimeout(() => {
        setIsListening(false);
        setInputValue('How do I translate a document?');
      }, 2000);
    } catch (error) {
      console.error('Microphone permission error:', error);
      const errorMessage: Message = {
        id: messages.length + 1,
        text: '⚠️ Microphone access denied. Please allow microphone permissions in your browser settings to use voice input.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleTextToSpeech = () => {
    setIsSpeaking(!isSpeaking);
    setTimeout(() => setIsSpeaking(false), 2000);
  };

  return (
    <>
      {/* Floating Robot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              animate={{
                rotateX: botRotation.x,
                rotateY: botRotation.y,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              style={{ perspective: 1000 }}
            >
              <motion.button
                onClick={() => setIsOpen(true)}
                className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                <Bot className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
            >
              <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
                Chat with AI Assistant
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0.3 : 1, 
              y: isMinimized ? 400 : 0,
              x: isMinimized ? 200 : 0
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
            style={{ width: isMinimized ? '80px' : '400px' }}
          >
            <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: isSpeaking ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isSpeaking ? Infinity : 0,
                      }}
                      className="relative"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6" />
                      </div>
                      {isSpeaking && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-white/30"
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.div>
                    {!isMinimized && (
                      <div>
                        <h3 className="text-white">AI Assistant</h3>
                        <p className="text-xs text-white/80">
                          {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Online'}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {!isMinimized && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMinimized(!isMinimized)}
                          className="text-white hover:bg-white/20"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsOpen(false)}
                          className="text-white hover:bg-white/20"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {isMinimized && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMinimized(false)}
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0">
                  {/* 3D Spline Viewer for Listening State */}
                  {isListening && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
                    >
                      <SplineErrorBoundary>
                        <spline-viewer 
                          url="https://prod.spline.design/tJLHJxSWQcTxJo-n/scene.splinecode"
                          loading="eager"
                          events-target="global"
                          className="w-full h-full"
                        />
                      </SplineErrorBoundary>
                    </motion.div>
                  )}
                  
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2 mb-3">
                      <Badge className="cursor-pointer hover:bg-blue-600" variant="outline">
                        Quick translate
                      </Badge>
                      <Badge className="cursor-pointer hover:bg-blue-600" variant="outline">
                        Help
                      </Badge>
                      <Badge className="cursor-pointer hover:bg-blue-600" variant="outline">
                        Features
                      </Badge>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleVoiceInput}
                        className={isListening ? 'bg-red-100 dark:bg-red-900' : ''}
                      >
                        <Mic className={`w-4 h-4 ${isListening ? 'text-red-600' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleTextToSpeech}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

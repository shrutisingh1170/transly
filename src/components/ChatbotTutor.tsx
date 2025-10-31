import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Send, Bot, User, Volume2 } from 'lucide-react';
import { mockTranslate } from '../lib/mockData';
import { ScrollArea } from './ui/scroll-area';
import { SplineErrorBoundary } from './SplineErrorBoundary';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  translation?: string;
  timestamp: Date;
}

export const ChatbotTutor = () => {
  const [language, setLanguage] = useState<'nepali' | 'sinhalese'>('nepali');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: language === 'nepali' ? 'नमस्ते! म तपाईंको भाषा ट्यूटर हुँ।' : 'ආයුබෝවන්! මම ඔබේ භාෂා උපදේශකයා.',
      translation: 'Hello! I am your language tutor.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset conversation when language changes
    setMessages([
      {
        id: Date.now().toString(),
        role: 'bot',
        content: language === 'nepali' ? 'नमस्ते! म तपाईंको भाषा ट्यूटर हुँ।' : 'ආයුබෝවන්! මම ඔබේ භාෂා උපදේශකයා.',
        translation: 'Hello! I am your language tutor.',
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const botResponses = {
    nepali: [
      { content: 'तपाईंको नाम के हो?', translation: 'What is your name?' },
      { content: 'तपाईं कहाँ बस्नुहुन्छ?', translation: 'Where do you live?' },
      { content: 'तपाईंको शौक के हो?', translation: 'What is your hobby?' },
      { content: 'राम्रो! अब अर्को प्रश्न प्रयास गर्नुहोस्।', translation: 'Good! Now try another question.' },
    ],
    sinhalese: [
      { content: 'ඔබේ නම කුමක්ද?', translation: 'What is your name?' },
      { content: 'ඔබ කොහේද ජීවත් වන්නේ?', translation: 'Where do you live?' },
      { content: 'ඔබේ විනෝදාංශය කුමක්ද?', translation: 'What is your hobby?' },
      { content: 'හොඳයි! දැන් තවත් ප්‍රශ්නයක් උත්සාහ කරන්න.', translation: 'Good! Now try another question.' },
    ],
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      translation: mockTranslate(inputValue, language),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const responses = botResponses[language];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: randomResponse.content,
        translation: randomResponse.translation,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const quickResponses = {
    nepali: ['नमस्ते', 'म ठीक छु', 'धन्यवाद', 'हजुर'],
    sinhalese: ['ආයුබෝවන්', 'මම හොඳින් ඉන්නවා', 'ස්තූතියි', 'ඔව්'],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">AI Chatbot Tutor</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Practice conversations and improve your language skills
        </p>
      </div>

      {/* 3D Chatbot Assistant */}
      <div className="w-full h-[400px] bg-black rounded-2xl overflow-hidden shadow-2xl">
        <SplineErrorBoundary>
          <spline-viewer 
            url="https://prod.spline.design/TQFF1fBwsgLiql4V/scene.splinecode"
            loading="eager"
            events-target="global"
            className="w-full h-full"
          />
        </SplineErrorBoundary>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Conversation Practice</CardTitle>
              <CardDescription>Chat with AI tutor in your target language</CardDescription>
            </div>
            <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nepali">Nepali</SelectItem>
                <SelectItem value="sinhalese">Sinhalese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Area */}
          <div
            ref={scrollRef}
            className="h-[400px] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'bot'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                      : 'bg-gradient-to-br from-orange-500 to-red-500'
                  }`}
                >
                  {message.role === 'bot' ? (
                    <Bot className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-[70%] space-y-1 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === 'bot'
                        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  {message.translation && (
                    <div
                      className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded ${
                        message.role === 'bot'
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      <span>💡 {message.translation}</span>
                      <button className="hover:opacity-70">
                        <Volume2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Responses */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 self-center">Quick:</span>
            {quickResponses[language].map((response, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(response)}
              >
                {response}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder={`Type in ${language}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              💬
            </div>
            <h4 className="mb-2">Real-time Translation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See English translations instantly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              🎯
            </div>
            <h4 className="mb-2">Grammar Hints</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get corrections and suggestions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
              🗣️
            </div>
            <h4 className="mb-2">Voice Support</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Listen to pronunciations
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

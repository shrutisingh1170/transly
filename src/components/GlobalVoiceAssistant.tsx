import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SplineErrorBoundary } from './SplineErrorBoundary';
import { 
  Mic, 
  X, 
  Volume2, 
  Sparkles,
  Languages,
  Camera,
  MessageSquare,
  Home,
  Settings,
  Download
} from 'lucide-react';

interface VoiceCommand {
  id: number;
  command: string;
  response: string;
  timestamp: Date;
}

export const GlobalVoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [supported, setSupported] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
      setErrorMessage('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    // Check if we're in a secure context (HTTPS or localhost)
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setSupported(false);
      setErrorMessage('Speech recognition requires a secure connection (HTTPS).');
      return;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setTranscript(transcript);
      
      if (event.results[0].isFinal) {
        processCommand(transcript);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      switch (event.error) {
        case 'not-allowed':
          setPermissionDenied(true);
          setErrorMessage('Microphone access denied. Please allow microphone access in your browser settings.');
          setResponse('⚠️ Microphone access denied. Please enable microphone permissions to use voice commands.');
          break;
        case 'no-speech':
          setErrorMessage('No speech detected. Please try again.');
          setResponse('No speech detected. Please speak clearly and try again.');
          break;
        case 'audio-capture':
          setErrorMessage('No microphone found. Please connect a microphone and try again.');
          setResponse('⚠️ No microphone detected. Please connect a microphone.');
          break;
        case 'network':
          setErrorMessage('Network error. Please check your connection.');
          setResponse('Network error occurred. Please check your internet connection.');
          break;
        default:
          setErrorMessage(`Error: ${event.error}`);
          setResponse(`An error occurred: ${event.error}. Please try again.`);
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  const startListening = async () => {
    if (!recognitionRef.current) {
      setResponse('⚠️ Speech recognition is not available.');
      return;
    }
    
    // Request microphone permission first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionDenied(false);
      setErrorMessage('');
    } catch (error) {
      // Silently handle - user will see friendly error message in UI
      setPermissionDenied(true);
      setErrorMessage('Please allow microphone access to use voice commands.');
      setResponse('⚠️ Microphone access is required. Please click "Allow" when prompted.');
      return;
    }
    
    setIsListening(true);
    setTranscript('');
    setResponse('');
    setErrorMessage('');
    
    try {
      recognitionRef.current.start();
    } catch (error: any) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
      if (error.message?.includes('already started')) {
        // Recognition is already running, just update state
        setIsListening(true);
      } else {
        setErrorMessage('Failed to start speech recognition. Please try again.');
        setResponse('⚠️ Failed to start listening. Please try again.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
    setIsListening(false);
  };

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';
    let action = null;

    // Process voice commands
    if (lowerCommand.includes('open chatbot') || lowerCommand.includes('start chat')) {
      responseText = 'Opening chatbot...';
      action = 'chatbot';
    } else if (lowerCommand.includes('open ocr') || lowerCommand.includes('text extraction')) {
      responseText = 'Opening OCR tool...';
      action = 'ocr';
    } else if (lowerCommand.includes('translate') && lowerCommand.includes('text')) {
      responseText = 'Opening translator...';
      action = 'translate';
    } else if (lowerCommand.includes('go to features')) {
      responseText = 'Navigating to features...';
      action = 'features';
    } else if (lowerCommand.includes('download') || lowerCommand.includes('export')) {
      responseText = 'Initiating download...';
      action = 'download';
    } else if (lowerCommand.includes('go to home') || lowerCommand.includes('homepage')) {
      responseText = 'Navigating to home...';
      action = 'home';
    } else if (lowerCommand.includes('open settings')) {
      responseText = 'Opening settings...';
      action = 'settings';
    } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      responseText = 'I can help you navigate Transly, open tools, translate text, and more. Try saying "Open translator" or "Start chat".';
    } else {
      responseText = `I heard: "${command}". Try commands like "Open chatbot", "Translate text", or "Go to features".`;
    }

    setResponse(responseText);
    speak(responseText);

    // Save command to history
    const newCommand: VoiceCommand = {
      id: Date.now(),
      command,
      response: responseText,
      timestamp: new Date(),
    };
    setCommands(prev => [newCommand, ...prev].slice(0, 10));

    // Execute action if needed
    if (action) {
      executeAction(action);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const executeAction = (action: string) => {
    setTimeout(() => {
      const element = document.getElementById(action);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  if (!supported) {
    return null;
  }

  return (
    <>
      {/* Floating Voice Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                  '0 0 40px rgba(236, 72, 153, 0.6)',
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
            >
              <Mic className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400"
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </motion.button>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
            >
              <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
                Voice Assistant
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96"
          >
            <Card className="shadow-2xl border-2 border-purple-200 dark:border-purple-800">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: isListening ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isListening ? Infinity : 0,
                      }}
                      className="relative"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Mic className="w-6 h-6" />
                      </div>
                      {isListening && (
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
                    <div>
                      <h3 className="text-white">Voice Assistant</h3>
                      <p className="text-xs text-white/80">
                        {isListening ? 'Listening...' : 'Ready to help'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4 space-y-4">
                {/* 3D Spline Viewer for Listening State */}
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg overflow-hidden"
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

                {/* Transcript */}
                {transcript && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">You said:</p>
                    <p className="text-sm">{transcript}</p>
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 text-sm">⚠️</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Error:</p>
                        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Response */}
                {response && !errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Assistant:</p>
                        <p className="text-sm">{response}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Control Button */}
                <div className="flex gap-2">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    className={`flex-1 ${
                      isListening
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600'
                    }`}
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    {isListening ? 'Stop Listening' : 'Start Listening'}
                  </Button>
                </div>

                {/* Quick Commands */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Quick Commands:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900"
                      onClick={() => processCommand('Open chatbot')}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Open Chatbot
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900"
                      onClick={() => processCommand('Open OCR')}
                    >
                      <Camera className="w-3 h-3 mr-1" />
                      Open OCR
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900"
                      onClick={() => processCommand('Translate text')}
                    >
                      <Languages className="w-3 h-3 mr-1" />
                      Translate
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900"
                      onClick={() => processCommand('Go to home')}
                    >
                      <Home className="w-3 h-3 mr-1" />
                      Go Home
                    </Badge>
                  </div>
                </div>

                {/* Recent Commands */}
                {commands.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Recent Commands:</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {commands.slice(0, 3).map((cmd) => (
                        <div
                          key={cmd.id}
                          className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <p className="text-gray-900 dark:text-gray-100">"{cmd.command}"</p>
                          <p className="text-gray-500 dark:text-gray-400 text-[10px]">
                            {cmd.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Permission Help */}
                {permissionDenied && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-xs mb-2">🎤 <strong>How to enable microphone:</strong></p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                      <li>Click the lock/info icon in your browser's address bar</li>
                      <li>Find "Microphone" permissions</li>
                      <li>Select "Allow"</li>
                      <li>Refresh the page</li>
                    </ul>
                  </div>
                )}

                {/* Info */}
                {!permissionDenied && (
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      💡 Try saying: "Open chatbot", "Translate text", "Go to features", or "Download extracted text"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

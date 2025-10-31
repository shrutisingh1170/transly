import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Mic, Volume2, StopCircle, Play } from 'lucide-react';
import { mockTranslate } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';
import { SplineErrorBoundary } from './SplineErrorBoundary';

export const VoiceAssistant = () => {
  const [sourceLanguage, setSourceLanguage] = useState<'nepali' | 'sinhalese'>('nepali');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [speed, setSpeed] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);

  const handleStartListening = async () => {
    // Request microphone permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      toast.success('Listening... Speak now!');

      // Simulate voice recognition
      setTimeout(() => {
        const mockTranscripts = {
          nepali: 'नमस्ते, तपाईंलाई कस्तो छ?',
          sinhalese: 'ආයුබෝවන්, ඔබට කෙසේද?',
        };
        const mockText = mockTranscripts[sourceLanguage];
        setTranscript(mockText);
        setTranslation(mockTranslate(mockText, sourceLanguage));
        setIsListening(false);
        toast.success('Voice captured!');
      }, 2000);
    } catch (error) {
      console.error('Microphone permission error:', error);
      toast.error('⚠️ Microphone access denied. Please allow microphone permissions in your browser settings.');
    }
  };

  const handleStopListening = () => {
    setIsListening(false);
    toast.info('Stopped listening');
  };

  const handleSpeak = () => {
    if (!translation) {
      toast.error('No translation to speak');
      return;
    }

    setIsSpeaking(true);
    toast.info(`Speaking at ${speed[0]}x speed, ${pitch[0]}x pitch (mock)`);

    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };

  const conversations = [
    { source: 'नमस्ते', translation: 'Hello', time: '10:30 AM' },
    { source: 'म ठीक छु', translation: 'I am fine', time: '10:31 AM' },
    { source: 'धन्यवाद', translation: 'Thank you', time: '10:32 AM' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">Voice Translation Assistant</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Speak naturally and get real-time voice translations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Voice Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Voice Input</span>
              <Select value={sourceLanguage} onValueChange={(val) => setSourceLanguage(val as any)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nepali">Nepali</SelectItem>
                  <SelectItem value="sinhalese">Sinhalese</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
            <CardDescription>Tap the microphone and start speaking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 3D Spline Viewer for Listening State */}
            {isListening && (
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg overflow-hidden mb-4">
                <SplineErrorBoundary>
                  <spline-viewer 
                    url="https://prod.spline.design/tJLHJxSWQcTxJo-n/scene.splinecode"
                    loading="eager"
                    events-target="global"
                    className="w-full h-full"
                  />
                </SplineErrorBoundary>
              </div>
            )}
            
            <div className="flex flex-col items-center justify-center py-12">
              <button
                onClick={isListening ? handleStopListening : handleStartListening}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse'
                    : 'bg-gradient-to-br from-blue-500 to-purple-500 hover:scale-110'
                }`}
              >
                {isListening ? (
                  <StopCircle className="h-16 w-16 text-white" />
                ) : (
                  <Mic className="h-16 w-16 text-white" />
                )}
              </button>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {isListening ? 'Listening...' : 'Tap to start'}
              </p>
            </div>

            {transcript && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Detected:</p>
                <p className="text-lg">{transcript}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voice Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Voice Output</span>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                English
              </div>
            </CardTitle>
            <CardDescription>AI-powered voice translation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {translation ? (
              <>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Translation:</p>
                  <p className="text-lg">{translation}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm">Speed: {speed[0]}x</label>
                    </div>
                    <Slider
                      value={speed}
                      onValueChange={setSpeed}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm">Pitch: {pitch[0]}x</label>
                    </div>
                    <Slider
                      value={pitch}
                      onValueChange={setPitch}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSpeak}
                  disabled={isSpeaking}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600"
                >
                  {isSpeaking ? (
                    <>
                      <Play className="mr-2 h-5 w-5 animate-pulse" />
                      Speaking...
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-5 w-5" />
                      Speak Translation
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Volume2 className="h-16 w-16 mb-4" />
                <p>Translation will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conversation Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Conversation Mode</CardTitle>
          <CardDescription>Bi-directional translation for natural conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            {conversations.map((conv, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                      {sourceLanguage}
                    </div>
                    <span className="text-sm text-gray-500">{conv.time}</span>
                  </div>
                  <p className="mb-2">{conv.source}</p>
                  <p className="text-green-700 dark:text-green-300">→ {conv.translation}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            Start New Conversation
          </Button>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              🎤
            </div>
            <h4 className="mb-2">STT</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Speech-to-Text</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              🔊
            </div>
            <h4 className="mb-2">TTS</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Text-to-Speech</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
              ⚙️
            </div>
            <h4 className="mb-2">Customizable</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Speed & Pitch</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              💬
            </div>
            <h4 className="mb-2">Real-time</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Instant Translation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { 
  Play, 
  Pause,
  RotateCcw,
  Download,
  Volume2,
  Languages,
  Activity
} from 'lucide-react';

export const VoiceIntegration = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState('original');
  const [highlightedWord, setHighlightedWord] = useState(0);
  const animationRef = useRef<number>();

  const nepaliText = 'नमस्ते, म नेपालबाट हुँ। यो AI प्रविधि प्रयोग गरेर पाठ निकाल्न सकिन्छ।';
  const englishText = 'Hello, I am from Nepal. This text can be extracted using AI technology.';
  const words = activeTab === 'original' 
    ? nepaliText.split(' ')
    : englishText.split(' ');

  useEffect(() => {
    if (isPlaying) {
      const startTime = Date.now() - currentTime * 1000;
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= duration) {
          setCurrentTime(duration);
          setIsPlaying(false);
          setHighlightedWord(0);
        } else {
          setCurrentTime(elapsed);
          const wordIndex = Math.floor((elapsed / duration) * words.length);
          setHighlightedWord(wordIndex);
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentTime, duration, words.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setHighlightedWord(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate waveform bars
  const waveformBars = Array.from({ length: 60 }, (_, i) => {
    const height = Math.random() * 60 + 20;
    const isPassed = (i / 60) <= (currentTime / duration);
    return { height, isPassed };
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl">
            <Volume2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Voice & Audio Integration</h2>
            <p className="text-gray-600 dark:text-gray-400">
              AI-powered text-to-speech with native pronunciation
            </p>
          </div>
        </div>
      </motion.div>

      {/* Waveform Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-32 gap-1">
              {waveformBars.map((bar, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ 
                    height: isPlaying && bar.isPassed ? bar.height : bar.height * 0.3,
                  }}
                  transition={{ duration: 0.1 }}
                  className={`w-1 rounded-full transition-colors ${
                    bar.isPassed 
                      ? 'bg-gradient-to-t from-green-600 to-teal-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  style={{ height: `${bar.height}px` }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={(value) => setCurrentTime(value[0])}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Language Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <h3>Audio Playback</h3>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="original" className="gap-2">
                  <Languages className="h-4 w-4" />
                  Listen in Original
                </TabsTrigger>
                <TabsTrigger value="english" className="gap-2">
                  <Volume2 className="h-4 w-4" />
                  Listen in English
                </TabsTrigger>
              </TabsList>

              <TabsContent value="original" className="space-y-4">
                <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">Nepali (नेपाली)</Badge>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      Native Voice
                    </Badge>
                  </div>
                  <p className="font-['Noto_Sans_Devanagari'] text-xl leading-relaxed">
                    {words.map((word, index) => (
                      <motion.span
                        key={index}
                        className={`transition-all ${
                          index === highlightedWord && isPlaying
                            ? 'bg-green-300 dark:bg-green-700 px-1 rounded'
                            : ''
                        }`}
                        animate={{
                          scale: index === highlightedWord && isPlaying ? 1.05 : 1,
                        }}
                      >
                        {word}{' '}
                      </motion.span>
                    ))}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="english" className="space-y-4">
                <div className="p-6 bg-teal-50 dark:bg-teal-950/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">English</Badge>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      AI Voice
                    </Badge>
                  </div>
                  <p className="text-xl leading-relaxed">
                    {words.map((word, index) => (
                      <motion.span
                        key={index}
                        className={`transition-all ${
                          index === highlightedWord && isPlaying
                            ? 'bg-teal-300 dark:bg-teal-700 px-1 rounded'
                            : ''
                        }`}
                        animate={{
                          scale: index === highlightedWord && isPlaying ? 1.05 : 1,
                        }}
                      >
                        {word}{' '}
                      </motion.span>
                    ))}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Playback Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-full w-14 h-14"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="rounded-full w-14 h-14"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
                  <div className="flex gap-1">
                    {[0.75, 1, 1.25, 1.5].map((speed) => (
                      <Button
                        key={speed}
                        variant={playbackSpeed === speed ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPlaybackSpeed(speed)}
                        className="w-14"
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium mb-1">Real-time Sync</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Text highlighting syncs with audio playback
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <Languages className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="font-medium mb-1">Native Voices</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Authentic pronunciation in both languages
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium mb-1">Offline Available</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download audio for offline learning
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

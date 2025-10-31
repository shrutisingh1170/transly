import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  BookOpen, 
  Info,
  Volume2,
  Lightbulb,
  Eye,
  EyeOff
} from 'lucide-react';

interface BilingualSentence {
  id: number;
  nepali: string;
  english: string;
  culturalNote?: string;
}

export const SmartBilingualView = () => {
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  const [showCulturalNotes, setShowCulturalNotes] = useState(true);
  const [syncScroll, setSyncScroll] = useState(true);
  const [hoveredSentence, setHoveredSentence] = useState<number | null>(null);

  const sentences: BilingualSentence[] = [
    {
      id: 1,
      nepali: 'नमस्ते, म नेपालबाट हुँ।',
      english: 'Hello, I am from Nepal.',
      culturalNote: '"Namaste" is a traditional greeting meaning "I bow to the divine in you"'
    },
    {
      id: 2,
      nepali: 'यो AI प्रविधि प्रयोग गरेर पाठ निकाल्न सकिन्छ।',
      english: 'This text can be extracted using AI technology.',
    },
    {
      id: 3,
      nepali: 'हामी धेरै भाषाहरू सिक्न सक्छौं।',
      english: 'We can learn many languages.',
    },
    {
      id: 4,
      nepali: 'शिक्षा सबैका लागि महत्त्वपूर्ण छ।',
      english: 'Education is important for everyone.',
      culturalNote: 'Education holds high cultural value in Nepali society'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-600 rounded-xl">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Smart Bilingual Parallel View</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sentence-aligned reading with cultural insights
            </p>
          </div>
        </div>
      </motion.div>

      {/* Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 border-none">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Eye className={`h-5 w-5 ${highlightDifferences ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className="flex items-center gap-2">
                  <Switch
                    checked={highlightDifferences}
                    onCheckedChange={setHighlightDifferences}
                  />
                  <span className="text-sm font-medium">Highlight Differences</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Lightbulb className={`h-5 w-5 ${showCulturalNotes ? 'text-orange-600' : 'text-gray-400'}`} />
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showCulturalNotes}
                    onCheckedChange={setShowCulturalNotes}
                  />
                  <span className="text-sm font-medium">Show Cultural Notes</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookOpen className={`h-5 w-5 ${syncScroll ? 'text-teal-600' : 'text-gray-400'}`} />
                <div className="flex items-center gap-2">
                  <Switch
                    checked={syncScroll}
                    onCheckedChange={setSyncScroll}
                  />
                  <span className="text-sm font-medium">Toggle Sync Scroll</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bilingual Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Aligned Translation</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Nepali</Badge>
                <span>↔</span>
                <Badge variant="outline">English</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Nepali */}
              <div className="space-y-4">
                <div className="sticky top-0 bg-background pb-2 border-b">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                    <BookOpen className="h-4 w-4" />
                    Original (नेपाली)
                  </div>
                </div>
                <div className="space-y-3">
                  {sentences.map((sentence, index) => (
                    <TooltipProvider key={sentence.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            onMouseEnter={() => setHoveredSentence(sentence.id)}
                            onMouseLeave={() => setHoveredSentence(null)}
                            className={`p-4 rounded-lg transition-all cursor-pointer ${
                              hoveredSentence === sentence.id
                                ? 'bg-blue-100 dark:bg-blue-950/50 shadow-md'
                                : 'bg-gray-50 dark:bg-gray-800/30 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                            }`}
                          >
                            <p className="font-['Noto_Sans_Devanagari'] text-lg leading-relaxed">
                              {sentence.nepali}
                            </p>
                            {sentence.culturalNote && showCulturalNotes && (
                              <div className="mt-2 flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm">
                                <Lightbulb className="h-3 w-3" />
                                <span className="text-xs">Cultural note available</span>
                              </div>
                            )}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p className="text-sm">Click to hear pronunciation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              {/* Right Column - English */}
              <div className="space-y-4">
                <div className="sticky top-0 bg-background pb-2 border-b">
                  <div className="flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400">
                    <BookOpen className="h-4 w-4" />
                    Translation (English)
                  </div>
                </div>
                <div className="space-y-3">
                  {sentences.map((sentence, index) => (
                    <motion.div
                      key={sentence.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onMouseEnter={() => setHoveredSentence(sentence.id)}
                      onMouseLeave={() => setHoveredSentence(null)}
                      className={`p-4 rounded-lg transition-all ${
                        hoveredSentence === sentence.id
                          ? 'bg-teal-100 dark:bg-teal-950/50 shadow-md'
                          : 'bg-gray-50 dark:bg-gray-800/30 hover:bg-teal-50 dark:hover:bg-teal-950/30'
                      }`}
                    >
                      <p className="text-lg leading-relaxed">
                        {sentence.english}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-7 gap-1">
                          <Volume2 className="h-3 w-3" />
                          <span className="text-xs">Listen</span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cultural Notes Panel */}
      {showCulturalNotes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-orange-600" />
                <h3>Cultural Context Notes</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sentences
                  .filter(s => s.culturalNote)
                  .map((sentence, index) => (
                    <motion.div
                      key={sentence.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg"
                    >
                      <p className="font-['Noto_Sans_Devanagari'] text-sm text-orange-900 dark:text-orange-300 mb-2">
                        "{sentence.nepali}"
                      </p>
                      <div className="flex gap-2">
                        <Info className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {sentence.culturalNote}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Reading Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Reading Tip</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hover over any sentence to highlight its translation and see word-level meanings.
                  Click to hear native pronunciation and explore cultural context.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

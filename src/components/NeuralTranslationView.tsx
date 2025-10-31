import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { 
  Languages, 
  Brain, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Download
} from 'lucide-react';

export const NeuralTranslationView = () => {
  const [sourceText, setSourceText] = useState('नमस्ते, म नेपालबाट हुँ। यो AI प्रविधि प्रयोग गरेर पाठ निकाल्न सकिन्छ।');
  const [translatedText, setTranslatedText] = useState('Hello, I am from Nepal. This text can be extracted using AI technology.');
  const [translationMode, setTranslationMode] = useState('contextual');
  const [toneTag, setToneTag] = useState('Formal');
  const [progress, setProgress] = useState(100);

  const translationModes = [
    { value: 'literal', label: 'Literal', description: 'Word-for-word translation' },
    { value: 'contextual', label: 'Contextual', description: 'Natural, context-aware' },
    { value: 'poetic', label: 'Poetic', description: 'Preserves style & rhythm' },
  ];

  const toneTags = ['Formal', 'Casual', 'Emotional', 'Technical', 'Satirical', 'Poetic'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Cultural-Aware Neural Translation</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Context-preserving AI translation with cultural intelligence
            </p>
          </div>
        </div>
      </motion.div>

      {/* Translation Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">Translation Mode</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {translationModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setTranslationMode(mode.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        translationMode === mode.value
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/50'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                      }`}
                    >
                      <p className="font-medium mb-1">{mode.label}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{mode.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Split View - Original & Translation */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Original Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-blue-600" />
                  <h3>Original Text</h3>
                </div>
                <Badge variant="outline">Nepali</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="min-h-[400px] font-['Noto_Sans_Devanagari'] text-lg resize-none"
                placeholder="Enter text to translate..."
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: English Translation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h3>English Translation</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    {toneTag}
                  </Badge>
                  <Select value={toneTag} onValueChange={setToneTag}>
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneTags.map((tone) => (
                        <SelectItem key={tone} value={tone}>
                          {tone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg">
                <p className="text-lg leading-relaxed">
                  {translatedText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dual-Pass Translation Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <p className="font-medium">Dual-Pass Translation Process</p>
                </div>
                <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  Complete
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Pass 1: Literal Translation</p>
                    <p className="text-gray-600 dark:text-gray-400">Word-level accuracy check</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Pass 2: Cultural Context</p>
                    <p className="text-gray-600 dark:text-gray-400">Tone & style preservation</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cultural Notes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <h3>Cultural Context Notes</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex gap-3">
                  <div className="p-2 bg-blue-500 rounded text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Greeting Context</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      "नमस्ते" (Namaste) carries deeper cultural significance than just "Hello" - 
                      it represents respect and recognition of the divine in others.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

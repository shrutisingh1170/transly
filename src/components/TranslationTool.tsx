import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight, Copy, Star, Volume2, Upload } from 'lucide-react';
import { mockTranslate } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

export const TranslationTool = () => {
  const [sourceLanguage, setSourceLanguage] = useState<'nepali' | 'sinhalese'>('nepali');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      toast.error('Please enter text to translate');
      return;
    }

    setIsTranslating(true);
    // Simulate AI processing delay
    setTimeout(() => {
      const translated = mockTranslate(sourceText, sourceLanguage);
      setTranslatedText(translated);
      setIsTranslating(false);
      toast.success('Translation completed!');
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSpeak = (text: string) => {
    // Mock TTS
    toast.info('Text-to-speech feature (mock)');
  };

  const handleFileUpload = () => {
    toast.info('File upload feature - redirects to Document Upload page');
  };

  const exampleTexts: Record<'nepali' | 'sinhalese', string[]> = {
    nepali: [
      'म स्कूल जान्छु',
      'तपाईंलाई कस्तो छ?',
      'नमस्ते',
      'धन्यवाद',
    ],
    sinhalese: [
      'මම පාසලට යනවා',
      'ඔබට කෙසේද?',
      'ආයුබෝවන්',
      'ස්තූතියි',
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">Text Translation</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Translate Nepali and Sinhalese to English with AI-powered accuracy
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Source Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Source Text</span>
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
            <CardDescription>Type, paste, or upload text to translate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={`Enter ${sourceLanguage} text here...`}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            
            <div className="flex gap-2">
              <Button onClick={handleFileUpload} variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
              <Button onClick={() => handleSpeak(sourceText)} variant="outline" size="sm" disabled={!sourceText}>
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </Button>
            </div>

            {/* Example texts */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Quick examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleTexts[sourceLanguage].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSourceText(example)}
                    className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Translated Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Translation</span>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                English
              </div>
            </CardTitle>
            <CardDescription>AI-powered translation output</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Translation will appear here..."
              value={translatedText}
              readOnly
              className="min-h-[200px] resize-none bg-gray-50 dark:bg-gray-900"
            />
            
            <div className="flex gap-2">
              <Button onClick={() => handleCopy(translatedText)} variant="outline" size="sm" disabled={!translatedText}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button onClick={() => handleSpeak(translatedText)} variant="outline" size="sm" disabled={!translatedText}>
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </Button>
              <Button variant="outline" size="sm" disabled={!translatedText}>
                <Star className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>

            {translatedText && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 <strong>Translation Suggestion:</strong> This translation is accurate. Consider practicing the pronunciation!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Translate Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleTranslate}
          disabled={isTranslating || !sourceText.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[200px]"
        >
          {isTranslating ? 'Translating...' : 'Translate'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Features Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h4 className="mb-1">Offline Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Works with preloaded AI models
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                🎯
              </div>
              <div>
                <h4 className="mb-1">Context-Aware</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Understands cultural nuances
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="mb-1">Instant Results</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time AI processing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

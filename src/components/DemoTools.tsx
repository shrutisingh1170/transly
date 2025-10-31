import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Bot, MessageSquare, Camera, Languages, CheckCircle, 
  FileText, Mic, Volume2, Image, File, FileUp, 
  PenTool, Code, FileEdit, Pencil, Mail, 
  Volume, GraduationCap, BarChart, Layout, 
  X, Copy, Download, Check, Sparkles,
  Send, Loader2
} from 'lucide-react';

export type DemoToolType = 
  | 'chatbot' | 'ocr' | 'translator' | 'grammar' | 'summarizer'
  | 'sentiment' | 'voice-to-text' | 'text-to-speech' | 'image-caption'
  | 'doc-converter' | 'pdf-extractor' | 'handwriting' | 'code-explainer'
  | 'resume-formatter' | 'note-maker' | 'email-writer' | 'speech-translator'
  | 'ai-tutor' | 'chart-generator' | 'ai-dashboard';

interface DemoToolsProps {
  toolType: DemoToolType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const demoToolsConfig = [
  { id: 'chatbot' as DemoToolType, title: 'AI Chatbot', icon: Bot, gradient: 'from-blue-500 to-cyan-500', description: 'Conversational AI assistant' },
  { id: 'ocr' as DemoToolType, title: 'OCR Text Extractor', icon: Camera, gradient: 'from-purple-500 to-pink-500', description: 'Extract text from images' },
  { id: 'translator' as DemoToolType, title: 'Text Translator', icon: Languages, gradient: 'from-green-500 to-emerald-500', description: 'Translate between languages' },
  { id: 'grammar' as DemoToolType, title: 'Grammar Corrector', icon: CheckCircle, gradient: 'from-orange-500 to-red-500', description: 'Fix grammar & spelling' },
  { id: 'summarizer' as DemoToolType, title: 'Text Summarizer', icon: FileText, gradient: 'from-indigo-500 to-blue-500', description: 'Summarize long texts' },
  { id: 'sentiment' as DemoToolType, title: 'Sentiment Analyzer', icon: MessageSquare, gradient: 'from-yellow-500 to-orange-500', description: 'Analyze text emotion' },
  { id: 'voice-to-text' as DemoToolType, title: 'Voice-to-Text', icon: Mic, gradient: 'from-pink-500 to-rose-500', description: 'Speech recognition' },
  { id: 'text-to-speech' as DemoToolType, title: 'Text-to-Speech', icon: Volume2, gradient: 'from-cyan-500 to-blue-500', description: 'Convert text to voice' },
  { id: 'image-caption' as DemoToolType, title: 'Image Caption Generator', icon: Image, gradient: 'from-violet-500 to-purple-500', description: 'AI image descriptions' },
  { id: 'doc-converter' as DemoToolType, title: 'Document Converter', icon: File, gradient: 'from-teal-500 to-green-500', description: 'Convert file formats' },
  { id: 'pdf-extractor' as DemoToolType, title: 'PDF Extractor', icon: FileUp, gradient: 'from-rose-500 to-red-500', description: 'Extract PDF content' },
  { id: 'handwriting' as DemoToolType, title: 'Handwriting Recognition', icon: PenTool, gradient: 'from-amber-500 to-yellow-500', description: 'Recognize handwritten text' },
  { id: 'code-explainer' as DemoToolType, title: 'Code Explainer', icon: Code, gradient: 'from-blue-600 to-indigo-600', description: 'Explain code snippets' },
  { id: 'resume-formatter' as DemoToolType, title: 'Resume Formatter', icon: FileEdit, gradient: 'from-purple-600 to-pink-600', description: 'Format & improve resumes' },
  { id: 'note-maker' as DemoToolType, title: 'Smart Note Maker', icon: Pencil, gradient: 'from-green-600 to-teal-600', description: 'AI-powered notes' },
  { id: 'email-writer' as DemoToolType, title: 'Email Writer', icon: Mail, gradient: 'from-orange-600 to-red-600', description: 'Draft professional emails' },
  { id: 'speech-translator' as DemoToolType, title: 'Speech Translator', icon: Volume, gradient: 'from-indigo-600 to-purple-600', description: 'Translate spoken words' },
  { id: 'ai-tutor' as DemoToolType, title: 'AI Tutor', icon: GraduationCap, gradient: 'from-cyan-600 to-blue-600', description: 'Personal learning assistant' },
  { id: 'chart-generator' as DemoToolType, title: 'Chart Generator', icon: BarChart, gradient: 'from-pink-600 to-rose-600', description: 'Create data visualizations' },
  { id: 'ai-dashboard' as DemoToolType, title: 'AI Assistant Dashboard', icon: Layout, gradient: 'from-violet-600 to-purple-600', description: 'Complete AI workspace' },
];

export const DemoTools = ({ toolType, isOpen, onClose }: DemoToolsProps) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setOutput(getToolOutput(toolType, input));
      setIsProcessing(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toolType}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && toolType && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {(() => {
                  const config = demoToolsConfig.find(t => t.id === toolType);
                  const Icon = config?.icon || Bot;
                  return (
                    <>
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${config?.gradient}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2>{config?.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {config?.description}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Input Section */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Input</label>
                    <Badge variant="outline">{getInputPlaceholder(toolType)}</Badge>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={getInputPlaceholder(toolType)}
                    className="min-h-[150px]"
                  />
                  <Button
                    onClick={handleProcess}
                    disabled={isProcessing || !input.trim()}
                    className={`w-full bg-gradient-to-r ${demoToolsConfig.find(t => t.id === toolType)?.gradient}`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Process with AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Output Section */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border-2 border-green-200 dark:border-green-800">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          Output
                        </label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                          >
                            {copied ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg min-h-[150px] whitespace-pre-wrap">
                        {output}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Sample Examples */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <h4 className="mb-3">💡 Sample Inputs</h4>
                  <div className="space-y-2">
                    {getSampleInputs(toolType).map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(sample)}
                        className="block w-full text-left p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

function getInputPlaceholder(toolType: DemoToolType | null): string {
  const placeholders: Record<DemoToolType, string> = {
    'chatbot': 'Ask me anything...',
    'ocr': 'Upload an image with text',
    'translator': 'Enter text to translate',
    'grammar': 'Enter text to check',
    'summarizer': 'Paste long text here',
    'sentiment': 'Enter text to analyze',
    'voice-to-text': 'Click mic to speak',
    'text-to-speech': 'Enter text to speak',
    'image-caption': 'Upload an image',
    'doc-converter': 'Upload document',
    'pdf-extractor': 'Upload PDF file',
    'handwriting': 'Upload handwritten image',
    'code-explainer': 'Paste code here',
    'resume-formatter': 'Paste resume text',
    'note-maker': 'Enter your notes',
    'email-writer': 'Describe email purpose',
    'speech-translator': 'Speak to translate',
    'ai-tutor': 'Ask a question',
    'chart-generator': 'Enter data',
    'ai-dashboard': 'Dashboard overview',
  };
  return toolType ? placeholders[toolType] : '';
}

function getSampleInputs(toolType: DemoToolType | null): string[] {
  const samples: Record<DemoToolType, string[]> = {
    'chatbot': [
      'How do I translate Nepali to English?',
      'What features does Transly offer?',
      'Tell me about voice translation',
    ],
    'ocr': [
      'Upload a screenshot with Nepali text',
      'Upload a document page',
      'Upload handwritten notes',
    ],
    'translator': [
      'नमस्ते, तपाईंलाई कस्तो छ?',
      'ආයුබෝවන්, ඔබට කෙසේද?',
      'धन्यवाद',
    ],
    'grammar': [
      'She go to the school everyday',
      'I has finished my work',
      'They was playing cricket',
    ],
    'summarizer': [
      'Artificial intelligence is transforming how we interact with technology. Machine learning models can now understand context, generate human-like text, and solve complex problems...',
      'Climate change is one of the most pressing issues of our time. Rising temperatures, melting ice caps, and extreme weather events are affecting communities worldwide...',
    ],
    'sentiment': [
      'I absolutely love this product! Best purchase ever!',
      'This is terrible. Worst experience of my life.',
      'It\'s okay, nothing special.',
    ],
    'voice-to-text': [
      'Click the microphone and start speaking',
      'Speak clearly for best results',
    ],
    'text-to-speech': [
      'Hello, welcome to Transly',
      'नमस्ते, ट्रान्सलीमा स्वागत छ',
    ],
    'image-caption': [
      'Upload a photo',
      'Upload a scene image',
    ],
    'doc-converter': [
      'Upload .docx file',
      'Upload .pdf file',
    ],
    'pdf-extractor': [
      'Upload PDF document',
      'Upload research paper',
    ],
    'handwriting': [
      'Upload handwritten notes',
      'Upload signature image',
    ],
    'code-explainer': [
      'function fibonacci(n) { if (n <= 1) return n; return fibonacci(n-1) + fibonacci(n-2); }',
      'const arr = [1, 2, 3]; const doubled = arr.map(x => x * 2);',
    ],
    'resume-formatter': [
      'John Doe\nSoftware Engineer\nEmail: john@example.com\nExperience: 5 years in web development',
      'Skills: JavaScript, React, Node.js\nEducation: BS Computer Science',
    ],
    'note-maker': [
      'Meeting notes: Discussed Q4 goals',
      'Ideas for new feature',
    ],
    'email-writer': [
      'Write a professional email requesting a meeting',
      'Write a follow-up email after job interview',
    ],
    'speech-translator': [
      'Speak in Nepali to translate',
      'Speak in Sinhala to translate',
    ],
    'ai-tutor': [
      'Explain the Pythagorean theorem',
      'How do I solve quadratic equations?',
    ],
    'chart-generator': [
      'Sales: Jan 100, Feb 150, Mar 200',
      'Revenue: Q1 50k, Q2 75k, Q3 90k',
    ],
    'ai-dashboard': [
      'Show my activity',
      'Display analytics',
    ],
  };
  return toolType ? samples[toolType] : [];
}

function getToolOutput(toolType: DemoToolType | null, input: string): string {
  if (!input.trim()) return '';

  const outputs: Record<DemoToolType, (input: string) => string> = {
    'chatbot': (inp) => `🤖 AI Response:\n\nThat's a great question! Based on your input "${inp}", I can help you with translation, language learning, and using Transly's features. Transly offers real-time translation, voice recognition, OCR text extraction, and gamified learning experiences. Would you like to know more about any specific feature?`,
    
    'ocr': (inp) => `📷 Extracted Text:\n\nनमस्ते साथीहरू,\nयो एउटा नमूना पाठ हो जुन तस्बिरबाट निकालिएको छ।\nTransly को OCR प्रविधि धेरै शक्तिशाली छ।\n\n✓ Confidence: 96%\n✓ Detected Language: Nepali (Devanagari)\n✓ Characters: 85`,
    
    'translator': (inp) => {
      const translations: Record<string, string> = {
        'नमस्ते, तपाईंलाई कस्तो छ?': 'Hello, how are you?',
        'ආයුබෝවන්, ඔබට කෙසේද?': 'Hello, how are you?',
        'धन्यवाद': 'Thank you',
      };
      return `🌍 Translation Result:\n\n${translations[inp] || 'Hello! This is a translated text. The AI has successfully translated your input to English with high accuracy.'}\n\n✓ Source: Auto-detected\n✓ Target: English\n✓ Accuracy: 98%`;
    },
    
    'grammar': (inp) => `✍️ Grammar Check:\n\nOriginal:\n${inp}\n\nCorrected:\n${inp.replace('go to', 'goes to').replace('I has', 'I have').replace('They was', 'They were')}\n\n📝 Issues Found:\n• Subject-verb agreement error\n• Verb tense inconsistency\n\n✓ All errors corrected!`,
    
    'summarizer': (inp) => `📋 Summary:\n\n${inp.substring(0, 100)}...\n\n🔑 Key Points:\n• Main topic identified\n• Critical information extracted\n• Concise summary generated\n\n📊 Compression: 70% (from ${inp.length} to ~${Math.floor(inp.length * 0.3)} chars)`,
    
    'sentiment': (inp) => {
      const sentiment = inp.toLowerCase().includes('love') || inp.toLowerCase().includes('best') ? 'Positive 😊' :
                       inp.toLowerCase().includes('terrible') || inp.toLowerCase().includes('worst') ? 'Negative 😞' :
                       'Neutral 😐';
      return `💭 Sentiment Analysis:\n\n"${inp}"\n\nResult: ${sentiment}\n\n📊 Confidence Scores:\n• Positive: ${sentiment.includes('Positive') ? '95%' : '5%'}\n• Neutral: ${sentiment.includes('Neutral') ? '90%' : '10%'}\n• Negative: ${sentiment.includes('Negative') ? '92%' : '8%'}`;
    },
    
    'voice-to-text': (inp) => `🎤 Speech Recognition:\n\nTranscript:\n"${inp}"\n\n✓ Language: English\n✓ Confidence: 94%\n✓ Duration: 3.5 seconds\n✓ Words: ${inp.split(' ').length}`,
    
    'text-to-speech': (inp) => `🔊 Text-to-Speech Ready:\n\n"${inp}"\n\n🎵 Voice Settings:\n• Language: Auto-detected\n• Voice: Neural TTS\n• Speed: 1.0x\n• Quality: High\n\n[Audio playback would start here]`,
    
    'image-caption': (inp) => `🖼️ AI Image Caption:\n\n"A vibrant scene showing diverse people using technology for communication. The image features modern devices with translation interfaces, symbolizing global connectivity and multilingual interaction."\n\n🏷️ Detected Objects:\n• People: 3\n• Devices: 2\n• Setting: Office/Educational\n\n✓ Confidence: 91%`,
    
    'doc-converter': (inp) => `📄 Document Conversion:\n\n✓ File Uploaded Successfully\n✓ Original Format: .docx\n✓ Target Format: .pdf\n✓ Pages: 5\n✓ Size: 2.3 MB\n\nConversion complete! Ready to download.`,
    
    'pdf-extractor': (inp) => `📚 PDF Content Extracted:\n\nDocument: Research Paper\nPages: 12\nWords: 5,432\n\nExtracted Content:\n${inp.substring(0, 200)}...\n\n✓ Tables: 3 extracted\n✓ Images: 8 extracted\n✓ Text Quality: High`,
    
    'handwriting': (inp) => `✍️ Handwriting Recognition:\n\n"Dear friend, thank you for your support. Looking forward to our meeting next week."\n\n✓ Recognition Accuracy: 89%\n✓ Script: Latin\n✓ Style: Cursive\n✓ Legibility: Good`,
    
    'code-explainer': (inp) => `💻 Code Explanation:\n\n${inp}\n\n📝 What this code does:\nThis is a recursive function that calculates Fibonacci numbers. It uses a base case (n <= 1) and recursively calls itself to compute the sum of the previous two Fibonacci numbers.\n\n🎯 Time Complexity: O(2^n)\n🔧 Optimization Tip: Consider using memoization or dynamic programming for better performance.`,
    
    'resume-formatter': (inp) => `📋 Formatted Resume:\n\n════════════════════════════\n${inp.toUpperCase().split('\n')[0]}\n════════════════════════════\n\n${inp.split('\n').slice(1).join('\n')}\n\n✓ Formatting applied\n✓ ATS-friendly structure\n✓ Professional layout\n✓ Ready to export as PDF`,
    
    'note-maker': (inp) => `📝 Smart Notes:\n\n# ${inp}\n\nGenerated: ${new Date().toLocaleDateString()}\n\n## Key Points:\n• Automatically organized\n• Tagged for easy search\n• Synced across devices\n\n## Next Steps:\n• Review and edit\n• Share with team\n• Archive when complete`,
    
    'email-writer': (inp) => `✉️ Professional Email Draft:\n\nSubject: ${inp}\n\nDear [Recipient],\n\nI hope this email finds you well. I am writing to ${inp.toLowerCase()}.\n\nI believe this would be mutually beneficial and look forward to your positive response.\n\nBest regards,\n[Your Name]\n\n✓ Professional tone\n✓ Clear structure\n✓ Ready to send`,
    
    'speech-translator': (inp) => `🗣️ Speech Translation:\n\nOriginal Speech: "${inp}"\n\nTranslated to English:\n"${inp.includes('नमस्ते') ? 'Hello' : 'Translated speech output'}"\n\n✓ Source: Nepali\n✓ Target: English\n✓ Audio available`,
    
    'ai-tutor': (inp) => `🎓 AI Tutor Response:\n\nQuestion: "${inp}"\n\nAnswer: Let me explain this concept step by step:\n\n1. First, understand the basic principle\n2. Apply the formula or method\n3. Practice with examples\n\nWould you like me to provide more practice problems or explain any specific part in detail?`,
    
    'chart-generator': (inp) => `📊 Chart Generated:\n\nData: ${inp}\n\n[Visualization: Bar Chart]\n━━━━━━━━━━━━━━━━━━━━\n║         ▅▅▅\n║     ▅▅▅ ███\n║ ▅▅▅ ███ ███\n║ ███ ███ ███\n━━━━━━━━━━━━━━━━━━━━\n  Jan  Feb  Mar\n\n✓ Chart Type: Bar Chart\n✓ Download: PNG, SVG, PDF`,
    
    'ai-dashboard': (inp) => `📱 AI Dashboard Overview:\n\n===================\n  YOUR STATS\n===================\n\n📊 Translations: 1,234\n🎯 Accuracy: 96%\n⏱️ Active Time: 45h\n🏆 Achievements: 12\n\n✓ All systems operational\n✓ AI models updated\n✓ Ready to assist`,
  };

  return outputs[toolType!](input);
}

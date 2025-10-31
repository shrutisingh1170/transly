import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SplineErrorBoundary } from './SplineErrorBoundary';
import { Input } from './ui/input';
import { 
  Languages, 
  MessageSquare, 
  FileText, 
  Mic, 
  Trophy, 
  Globe, 
  Zap,
  BookOpen,
  Users,
  Download,
  ChevronRight,
  Menu,
  X,
  Star,
  Award,
  Bot,
  Sparkles,
  Upload,
  Volume2,
  Check,
  ChevronLeft,
  Mail,
  MapPin,
  Phone,
  Shield,
  Gamepad2,
  WifiOff
} from 'lucide-react';
import logo from 'figma:asset/5966a0e6bbfc4e4f5ff5d979141f679a95ed0fe0.png';
import translyLogo from 'figma:asset/848516dd72384b79ba62ccc614973e47ea3984b6.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TypewriterEffect } from './TypewriterEffect';
import { RobotMascot } from './RobotMascot';
import { loadSplineViewer } from '../lib/splineLoader';
import { EnhancedFeaturesSection } from './EnhancedFeaturesSection';
import { useLanguage } from '../lib/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface LandingPageProps {
  onGetStarted: () => void;
  onShow3DBot?: () => void;
}

// Animated Section Component with scroll trigger
const AnimatedSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export const LandingPage = ({ onGetStarted, onShow3DBot }: LandingPageProps) => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [demoText, setDemoText] = useState('');
  const [demoTranslation, setDemoTranslation] = useState('');
  const [translating, setTranslating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1920, height: 1080 });
  const [splineLoaded, setSplineLoaded] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    // Set initial dimensions
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load Spline viewer script (singleton pattern to prevent multiple Three.js instances)
  useEffect(() => {
    loadSplineViewer()
      .then(() => {
        console.log('✅ Spline viewer ready to use');
        setSplineLoaded(true);
      })
      .catch(err => {
        console.error('❌ Spline viewer failed to load:', err);
        console.info('ℹ️ Using fallback 2D robot mascot instead');
        setSplineLoaded(false);
      });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleDemoTranslate = () => {
    setTranslating(true);
    const translations: Record<string, string> = {
      // Nepali translations
      'म स्कूल जान्छु': 'I go to school',
      'नमस्ते': 'Hello',
      'नमस्ते, तपाईलाई कस्तो छ?': 'Hello, how are you?',
      'धन्यवाद': 'Thank you',
      'धन्यवाद, तपाईंको सहायताको लागि': 'Thank you for your help',
      'तपाईंको नाम के हो?': 'What is your name?',
      // Sinhalese translations
      'ආයුබෝවන්': 'Hello',
      'ආයුබෝවන්, ඔබට කෙසේද?': 'Hello, how are you?',
      'මම පාසලට යමි': 'I go to school',
      'ස්තුතියි': 'Thank you',
      'ස්තූතියි ඔබේ උදව්වට': 'Thank you for your help',
      'ඔබේ නම කුමක්ද?': 'What is your name?',
    };
    
    setTimeout(() => {
      // Check if it's a known translation
      if (translations[demoText]) {
        setDemoTranslation(translations[demoText]);
      } else if (demoText.trim()) {
        // For custom user input, simulate AI translation
        const hasNepaliChars = /[\u0900-\u097F]/.test(demoText);
        const hasSinhalaChars = /[\u0D80-\u0DFF]/.test(demoText);
        
        if (hasNepaliChars || hasSinhalaChars) {
          const sourceLang = hasNepaliChars ? 'Nepali' : 'Sinhalese';
          setDemoTranslation(`[AI Translation from ${sourceLang}] This is a demo translation of your custom text. In a production environment, this would be translated by our advanced AI model with 95%+ accuracy.`);
        } else {
          setDemoTranslation('Please enter text in Nepali or Sinhalese to translate.');
        }
      } else {
        setDemoTranslation('Please enter some text to translate.');
      }
      setTranslating(false);
    }, 1500);
  };

  const handleListen = () => {
    if (!demoTranslation || demoTranslation.includes('will appear here') || demoTranslation.includes('Please enter')) {
      return;
    }

    // Stop any ongoing speech
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Create new speech synthesis
    const utterance = new SpeechSynthesisUtterance(demoTranslation);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleExport = () => {
    if (!demoTranslation || demoTranslation.includes('will appear here') || demoTranslation.includes('Please enter')) {
      return;
    }

    // Create text file content
    const content = `TRANSLY TRANSLATION EXPORT
=====================================
Date: ${new Date().toLocaleString()}

Original Text (${demoText.match(/[\u0900-\u097F]/) ? 'Nepali' : 'Sinhalese'}):
${demoText}

English Translation:
${demoTranslation}

=====================================
Powered by Transly AI Translation Platform
www.transly.com
`;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transly-translation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setDemoText(`[Document: ${file.name}]`);
      setTimeout(() => {
        setDemoTranslation(`Document "${file.name}" has been uploaded and processed. This is a demo translation of the extracted text from your document. In production, our OCR engine would extract and translate all text with 95%+ accuracy.`);
      }, 1500);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Tools', id: 'tools' },
    { label: 'Features', id: 'features' },
    { label: 'Demo', id: 'demo' },
    { label: 'Chatbot', id: 'chatbot' },
    { label: 'Learning', id: 'learning' },
    { label: 'Download', id: 'download' },
    { label: 'Contact', id: 'contact' },
  ];

  const features = [
    {
      icon: Languages,
      title: 'AI Translation',
      description: 'Nepali & Sinhalese to English with 95%+ accuracy powered by advanced AI models',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '500K+ translations'
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Real-time speech-to-text and text-to-speech with natural voice synthesis',
      gradient: 'from-purple-500 to-pink-500',
      stats: 'Multi-language STT/TTS'
    },
    {
      icon: FileText,
      title: 'Document OCR',
      description: 'Extract text from PDFs, images, Word, Excel, and PowerPoint files instantly',
      gradient: 'from-orange-500 to-red-500',
      stats: '10+ file formats'
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Interactive quizzes, achievement badges, and global leaderboards for motivation',
      gradient: 'from-green-500 to-emerald-500',
      stats: '100+ quiz levels'
    },
    {
      icon: MessageSquare,
      title: 'AI Chatbot Tutor',
      description: '24/7 conversational practice with intelligent feedback and grammar corrections',
      gradient: 'from-indigo-500 to-blue-500',
      stats: 'Smart AI responses'
    },
    {
      icon: Globe,
      title: 'Offline Mode',
      description: 'Preloaded AI models work without internet on internal networks',
      gradient: 'from-yellow-500 to-orange-500',
      stats: 'Always available'
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Student • Kathmandu',
      image: 'https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc2MDAxODkwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      text: 'Transly transformed my English learning! The gamified quizzes make studying addictive. I improved from B1 to C1 in just 3 months! 🚀'
    },
    {
      name: 'Raj Patel',
      role: 'Educator • Mumbai',
      image: 'https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc2MDAxODkwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      text: 'Perfect for my classroom of 50+ students. The analytics dashboard helps me track everyone\'s progress. Engagement is through the roof!'
    },
    {
      name: 'Sanjana Fernando',
      role: 'Content Creator • Colombo',
      image: 'https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc2MDAxODkwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      text: 'Document OCR is a game-changer! I can now translate entire research papers in seconds. Saved me countless hours of manual work.'
    },
    {
      name: 'Amit Kumar',
      role: 'Business Owner • Delhi',
      image: 'https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc2MDAxODkwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      text: 'Voice translation feature is incredible for client meetings. Real-time accuracy helps me communicate effectively across languages!'
    },
  ];

  const stats = [
    { number: '500K+', label: 'Active Users' },
    { number: '10M+', label: 'Translations' },
    { number: '95%+', label: 'Accuracy Rate' },
    { number: '24/7', label: 'AI Support' },
  ];

  const parallaxLayers = [
    { speed: 0.1, className: 'absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl' },
    { speed: 0.2, className: 'absolute top-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl' },
    { speed: 0.15, className: 'absolute bottom-20 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 overflow-x-hidden">
      {/* Enhanced Sticky Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg"
      >
        <div className="w-full px-6 sm:px-8 lg:px-12 bg-[rgba(183,250,246,0.69)]">
          <div className="flex justify-between items-center h-16 bg-[rgba(253,148,6,0)]">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('home')}
            >
              <img src={translyLogo} alt="Transly" className="h-10 w-10 object-contain" />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Transly
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* CTA Buttons Desktop */}
            <div className="hidden md:flex gap-3 items-center">
              <LanguageSelector />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={onGetStarted}>
                  {t('nav.login')}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  onClick={onGetStarted}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t('nav.getStarted')}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-3 border-t border-gray-200 dark:border-gray-800"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-2">
                <LanguageSelector />
                <Button variant="outline" onClick={onGetStarted} className="w-full">
                  {t('nav.login')}
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600"
                  onClick={onGetStarted}
                >
                  {t('nav.getStarted')}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Top Tagline Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative bg-gradient-to-r from-[#6C63FF] via-[#00CFFF] to-[#6C63FF] py-4 text-center overflow-hidden"
      >
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] bg-[length:200%_100%]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.h1
            className="text-white flex items-center justify-center gap-2 flex-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-6 h-6" />
            <span className="font-[Potta_One]">Transly — AI-Powered Translation Platform</span>
          </motion.h1>
          <motion.p
            className="text-white/90 text-sm sm:text-base mt-2 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Connecting Nepali & Sinhala to English with real-time text, voice, and gamified learning.
          </motion.p>
        </div>
      </motion.div>

      {/* Hero Section with Advanced Parallax */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Multi-layer Parallax Background */}
        <div className="absolute inset-0 overflow-hidden">
          {parallaxLayers.map((layer, index) => (
            <motion.div
              key={index}
              className={layer.className}
              style={{
                y: useTransform(scrollYProgress, [0, 1], ['0%', `${layer.speed * 100}%`]),
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 2,
              }}
            />
          ))}

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0 px-[2px] py-[0px]">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-[#6C63FF] to-[#00CFFF] rounded-full opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Main Headline with Gradient Animation */}
          <motion.h1 
            className="mb-6 bg-gradient-to-r from-[#6C63FF] via-[#00CFFF] to-[#6C63FF] bg-clip-text text-transparent flex items-center justify-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Globe className="w-12 h-12 text-[#6C63FF]" />
            <span className="font-[Shrikhand] text-[20px]">Speak Freely. Understand Instantly.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="mb-6 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Typewriter Effect */}
          <motion.div
            className="mb-8 text-2xl h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TypewriterEffect
              phrases={[
                'नमस्ते → Hello',
                'සුභ උදේ → Good Morning',
                'මට උදව් කරන්න → Help Me',
                'तपाईलाई कस्तो छ ? → How are you?'
              ]}
              className="text-xl sm:text-2xl"
            />
          </motion.div>

          {/* CTA Buttons with Stagger Animation */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(108, 99, 255, 0.6)' }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#6C63FF] to-[#00CFFF] hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                onClick={onGetStarted}
              >
                <Zap className="mr-2" />
                {t('hero.cta')}
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 207, 255, 0.6)' }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#6C63FF] hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950 transition-all"
                onClick={() => scrollToSection('demo')}
              >
                <Globe className="mr-2" />
                {t('hero.learnMore')}
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(108, 99, 255, 0.6)' }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#00CFFF] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-950 dark:hover:to-blue-950 transition-all"
                onClick={() => setChatbotOpen(true)}
              >
                <Bot className="mr-2" />
                Meet the AI Assistant
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image with Floating UI Elements */}
          <motion.div 
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              {/* 3D Spline Viewer */}
              <div className="w-full h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                <SplineErrorBoundary>
                  <spline-viewer 
                    url="https://prod.spline.design/tJLHJxSWQcTxJo-n/scene.splinecode"
                    loading="lazy"
                    events-target="global"
                    className="w-[80%] h-[80%] mx-auto"
                  />
                </SplineErrorBoundary>
              </div>
              
              {/* Floating Translation Card */}
              <FloatingElement delay={0}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-8 left-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Languages className="text-white w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Translating...</p>
                      <p className="text-sm mb-1">नमस्ते साथी</p>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-1"
                      />
                      <p className="text-sm text-blue-600 dark:text-blue-400">→ Hello friend</p>
                    </div>
                  </div>
                </motion.div>
              </FloatingElement>
              
              {/* Floating Achievement Card */}
              <FloatingElement delay={0.5}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-8 right-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <Trophy className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Achievement Unlocked!</p>
                      <p className="text-sm">+50 XP • Level Up! 🎉</p>
                    </div>
                  </div>
                </motion.div>
              </FloatingElement>

              {/* Floating Voice Card */}
              <FloatingElement delay={1}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute top-1/2 left-8 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                    >
                      <Volume2 className="text-white w-4 h-4" />
                    </motion.div>
                    <p className="text-sm">Voice Active...</p>
                  </div>
                </motion.div>
              </FloatingElement>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 text-center"
                >
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 dark:text-gray-600"
          >
            <ChevronRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-20 bg-gradient-to-r from-[#6C63FF]/10 via-[#00CFFF]/10 to-[#6C63FF]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-[#6C63FF] to-[#00CFFF] text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Quick Facts
            </Badge>
            <h2 className="mb-4">Why Choose Transly?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Trusted by thousands worldwide with cutting-edge AI technology
            </p>
          </AnimatedSection>

          {/* Website Facts */}
          <AnimatedSection className="mb-16">
            <h3 className="text-center mb-8 text-[#6C63FF]">Platform Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-[#6C63FF]/20 hover:border-[#6C63FF] transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00CFFF] flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-[#6C63FF]">500K+</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trusted by global users</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-[#00CFFF]/20 hover:border-[#00CFFF] transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00CFFF] to-[#6C63FF] flex items-center justify-center mb-4">
                    <WifiOff className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-[#00CFFF]">Offline</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Works online & offline</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-[#6C63FF]/20 hover:border-[#6C63FF] transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-purple-600 flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-[#6C63FF]">Secure</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-secured privacy</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-[#00CFFF]/20 hover:border-[#00CFFF] transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-purple-600">Gamified</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes in Nepali & Sinhala</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-[#6C63FF]/20 hover:border-[#6C63FF] transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00CFFF] to-blue-600 flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-[#00CFFF]">AI Chatbot</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Voice assistant included</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Cultural Facts */}
          <AnimatedSection>
            <h3 className="text-center mb-8 text-[#00CFFF]">Language & Culture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 p-6 rounded-xl shadow-lg border border-[#6C63FF]/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#6C63FF] to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h4>Nepali Speakers</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🌸 Spoken by 30M+ people across Nepal, India, Bhutan & Myanmar
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-cyan-50 dark:from-gray-900 dark:to-cyan-950 p-6 rounded-xl shadow-lg border border-[#00CFFF]/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00CFFF] to-blue-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h4>Sinhala Speakers</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🏝️ Spoken by 17M+ people in Sri Lanka with unique cultural heritage
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 p-6 rounded-xl shadow-lg border border-purple-300/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h4>Ancient Scripts</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📜 Nepali uses Devanagari script; Sinhala has its own 2000+ year-old script
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-950 p-6 rounded-xl shadow-lg border border-orange-300/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h4>Rich Heritage</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🎶 Both have rich literature & folklore, much still untranslated
                </p>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Features
            </Badge>
            <h2 className="mb-4">Powerful AI-Driven Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need for multilingual translation and language learning in one platform
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-[0px]">
            {features.map((feature, index) => (
              <AnimatedSection key={index} className="">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-transparent cursor-pointer overflow-hidden h-full">
                    <CardContent className="p-6">
                      <motion.div 
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {feature.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {feature.stats}
                      </Badge>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm"
                      >
                        Learn more
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with 20+ Demo Tools */}
      <EnhancedFeaturesSection />

      {/* Enhanced Interactive Demo Section */}
      <section id="demo" className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-orange-100 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-orange-950/50 relative overflow-hidden">
        {/* Background Animated Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-64 h-64 border-2 border-blue-300/30 dark:border-blue-700/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-10 left-10 w-80 h-80 border-2 border-purple-300/30 dark:border-purple-700/30 rounded-full"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <Zap className="w-3 h-3 mr-2 inline" />
              Try It Now
            </Badge>
            <h2 className="mb-4">See Transly in Action</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Type, paste, or upload Nepali/Sinhalese text for instant English translation
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <Card className="border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 p-1">
                <div className="bg-white dark:bg-gray-900 p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Input Section */}
                    <div>
                      <label className="block mb-2">
                        <Languages className="w-4 h-4 inline mr-2" />
                        Input (Nepali/Sinhalese)
                      </label>
                      <textarea
                        className="w-full h-40 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        placeholder="Type or select a sample text to translate to English..."
                        value={demoText}
                        onChange={(e) => setDemoText(e.target.value)}
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('नमस्ते, तपाईलाई कस्तो छ?')}
                          >
                            Hello (Nepali)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('म स्कूल जान्छु')}
                          >
                            School (Nepali)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('धन्यवाद, तपाईंको सहायताको लागि')}
                          >
                            Thanks (Nepali)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('तपाईंको नाम के हो?')}
                          >
                            Question (Nepali)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('ආයුබෝවන්, ඔබට කෙසේද?')}
                          >
                            Hello (Sinhalese)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('මම පාසලට යමි')}
                          >
                            School (Sinhalese)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('ස්තූතියි ඔබේ උදව්වට')}
                          >
                            Thanks (Sinhalese)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDemoText('ඔබේ නම කුමක්ද?')}
                          >
                            Question (Sinhalese)
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload File
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                            onChange={handleFileUpload}
                          />
                        </motion.div>
                      </div>
                      {uploadedFile && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {uploadedFile}
                        </motion.div>
                      )}
                    </div>

                    {/* Output Section */}
                    <div>
                      <label className="block mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        English Translation Output
                      </label>
                      <div className="relative w-full h-40 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
                        {translating ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center h-full"
                          >
                            <div className="flex gap-2">
                              <motion.div
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-3 h-3 bg-blue-500 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-3 h-3 bg-purple-500 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-3 h-3 bg-orange-500 rounded-full"
                              />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {demoTranslation || 'Your English translation will appear here...'}
                          </motion.div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={handleListen}
                            disabled={!demoTranslation || demoTranslation.includes('will appear here') || demoTranslation.includes('Please enter')}
                          >
                            <Volume2 className={`w-4 h-4 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
                            {isPlaying ? 'Stop' : 'Listen'}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={handleExport}
                            disabled={!demoTranslation || demoTranslation.includes('will appear here') || demoTranslation.includes('Please enter')}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl transition-all"
                      onClick={handleDemoTranslate}
                      disabled={!demoText && !uploadedFile}
                    >
                      <Zap className="mr-2" />
                      {translating ? 'Translating...' : 'Translate to English Now'}
                    </Button>
                  </motion.div>

                  {/* Supported Formats */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Supported File Formats</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['PDF', 'DOC', 'DOCX', 'TXT', 'PPT', 'XLS', 'PNG', 'JPG'].map((format) => (
                        <Badge key={format} variant="secondary" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Chatbot Section with 3D Interactive Robot */}
      <section id="chatbot" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <Bot className="w-3 h-3 mr-2 inline" />
                AI Chatbot
              </Badge>
              <h2 className="mb-4">Meet Your 24/7 AI Language Tutor</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Practice conversations in Nepali and Sinhalese with our intelligent chatbot.
                Get instant translations, corrections, and personalized learning suggestions.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: MessageSquare,
                    title: 'Real-time Conversation',
                    desc: 'Chat naturally and get instant AI-powered feedback',
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: BookOpen,
                    title: 'Personalized Learning',
                    desc: 'Adaptive lessons based on your skill level and goals',
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    icon: Sparkles,
                    title: 'Smart Corrections',
                    desc: 'Learn from mistakes with helpful hints and explanations',
                    gradient: 'from-orange-500 to-red-500'
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 group"
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4>{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl transition-all"
                  onClick={() => setChatbotOpen(true)}
                >
                  <Bot className="mr-2" />
                  Start Chatting Now
                </Button>
              </motion.div>
            </AnimatedSection>

            {/* 3D Interactive Robot with Spline */}
            <AnimatedSection>
              <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
                <motion.div 
                  className="relative group cursor-pointer w-full h-full"
                  animate={{
                    x: (mousePosition.x - windowDimensions.width / 2) / 30,
                    y: (mousePosition.y - windowDimensions.height / 2) / 30,
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  onClick={() => setChatbotOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full blur-3xl opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Spline 3D Viewer with Fallback */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {splineLoaded === false ? (
                      // Fallback: Use RobotMascot component
                      <div className="w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center">
                        <RobotMascot size={300} />
                      </div>
                    ) : splineLoaded === true ? (
                      // Spline loaded successfully
                      <SplineErrorBoundary>
                        <spline-viewer 
                          url="https://prod.spline.design/YRGlUfRlxaW-Lh96/scene.splinecode"
                          loading="lazy"
                          events-target="global"
                          style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' }}
                        ></spline-viewer>
                      </SplineErrorBoundary>
                    ) : (
                      // Loading state
                      <div className="w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center">
                        <div className="animate-pulse">
                          <Bot className="w-32 h-32 text-blue-500" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Pulse Indicator */}
                  <motion.div
                    className="absolute -top-2 -right-2 z-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                      Click to chat! 💬
                    </div>
                  </motion.div>

                  {/* Floating Particles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-500 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Enhanced Chatbot Modal */}
        {chatbotOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setChatbotOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card className="overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Bot className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3>AI Language Tutor</h3>
                      <div className="flex items-center gap-2 text-xs opacity-90">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-green-400 rounded-full"
                        />
                        Online • Ready to help
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setChatbotOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                
                <CardContent className="p-6 space-y-4 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                  {/* Bot Message */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-md shadow-md">
                      <p className="text-sm">नमस्ते! Welcome to Transly! I'm your AI tutor. 🤖</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Translation: Hello!
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-md shadow-md">
                      <p className="text-sm">How can I help you learn today? I can:</p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>✅ Practice conversations</li>
                        <li>✅ Translate sentences</li>
                        <li>✅ Correct your grammar</li>
                        <li>✅ Quiz you on vocabulary</li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* User Message */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3 justify-end"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg rounded-tr-none max-w-md shadow-md">
                      <p className="text-sm">I want to practice Nepali conversation!</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                  </motion.div>

                  {/* Bot Response */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-md shadow-md">
                      <p className="text-sm">Excellent! Let's start. तपाईंको नाम के हो? 🗣️</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Translation: What is your name?
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center pt-4"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onGetStarted}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Login to continue chatting
                    </Button>
                  </motion.div>
                </CardContent>

                {/* Chat Input */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      className="flex-1"
                      disabled
                    />
                    <Button disabled className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      Send
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Gamified Learning Section */}
      <section id="learning" className="py-20 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-teal-950/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30l30 30v-30H30z' fill='%23000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <Trophy className="w-3 h-3 mr-2 inline" />
              Learn & Earn
            </Badge>
            <h2 className="mb-4">Gamified Learning Experience</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Make language learning fun with interactive quizzes, achievements, and friendly competition
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Interactive Quizzes',
                desc: 'Test knowledge with multiple-choice, fill-in-blank, and listening exercises',
                gradient: 'from-yellow-500 to-orange-500',
                badges: ['+50 Points', '🏆 Badges'],
                delay: 0
              },
              {
                icon: Award,
                title: 'Achievements',
                desc: 'Unlock badges and achievements as you progress through your journey',
                gradient: 'from-purple-500 to-pink-500',
                badges: ['🥇', '🥈', '🥉', '⭐'],
                delay: 0.2
              },
              {
                icon: Users,
                title: 'Global Leaderboards',
                desc: 'Compete with friends and learners worldwide on our leaderboards',
                gradient: 'from-blue-500 to-cyan-500',
                badges: ['🥇 Rank #1'],
                delay: 0.4
              },
            ].map((item, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="text-center hover:shadow-2xl transition-all h-full">
                    <CardContent className="p-8">
                      <motion.div
                        className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.badges.map((badge, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: item.delay + i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Badge variant="secondary">{badge}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
              <Star className="w-3 h-3 mr-2 inline" />
              Testimonials
            </Badge>
            <h2 className="mb-4">Loved by 500K+ Users Worldwide</h2>
            <p className="text-gray-600 dark:text-gray-300">
              See what our community has to say about their Transly experience
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative">
              {/* Main Testimonial Card */}
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-3xl mx-auto shadow-2xl border-2">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex-shrink-0"
                      >
                        <ImageWithFallback
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                          "{testimonials[currentTestimonial].text}"
                        </p>
                        <div>
                          <h4>{testimonials[currentTestimonial].name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonials[currentTestimonial].role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600' 
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    index === currentTestimonial
                      ? 'border-blue-600 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-16 object-cover rounded-lg"
                  />
                  <p className="text-xs mt-1 truncate">{testimonial.name}</p>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* System Requirements Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3">Voice Features Setup Guide</h3>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <p className="mb-2"><strong>✅ Supported Browsers:</strong></p>
                        <p>Chrome, Edge, Safari (latest versions) • Voice features require HTTPS</p>
                      </div>
                      <div>
                        <p className="mb-2"><strong>🎙️ Enable Microphone Access:</strong></p>
                        <ol className="list-decimal ml-5 space-y-1">
                          <li>Click the lock/info icon in your browser's address bar</li>
                          <li>Find "Microphone" in the permissions list</li>
                          <li>Select "Allow" or "Ask"</li>
                          <li>Refresh the page if needed</li>
                        </ol>
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p className="text-xs">
                          💡 <strong>Note:</strong> If you see "Microphone access denied" errors, check your browser settings and system privacy settings to ensure microphone access is enabled.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </section>

      {/* Download/CTA Section */}
      <section id="download" className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <h2 className="mb-6">Ready to Break Language Barriers?</h2>
            </motion.div>
            <motion.p 
              className="mb-8 text-lg opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Download Transly now and start your multilingual journey. Available on Web, iOS, and Android.
              Join 500K+ learners worldwide!
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                  onClick={onGetStarted}
                >
                  <Zap className="mr-2" />
                  Sign Up Free - No Credit Card
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => scrollToSection('demo')}
                >
                  Try Demo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Download className="mr-2" />
                  Download App
                </Button>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Mail className="w-3 h-3 mr-2 inline" />
              Contact Us
            </Badge>
            <h2 className="mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1">Email</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">support@transly.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1">Phone</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1">Office</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          123 Innovation Street<br />
                          Tech City, TC 12345
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                    <textarea
                      className="w-full h-32 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Your Message"
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        Send Message
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Demo', 'Download']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact']
              },
              {
                title: 'Resources',
                links: ['Help Center', 'Community', 'Tutorials', 'API Docs']
              },
              {
                title: 'Legal',
                links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="mb-4">{section.title}</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  {section.links.map((link) => (
                    <motion.p 
                      key={link}
                      whileHover={{ x: 5, color: '#fff' }}
                      className="hover:text-white cursor-pointer transition-colors"
                    >
                      {link}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div 
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <img src={logo} alt="Transly" className="h-8 w-8" />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                  Transly
                </span>
              </motion.div>
              <p className="text-sm text-gray-400">
                © 2025 Transly. All rights reserved. Made with 💙 for language learners.
              </p>
              <div className="flex gap-4">
                {['𝕏', 'f', 'in', 'yt'].map((icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center cursor-pointer transition-all"
                  >
                    <span className="text-sm">{icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Robot Mascot */}
      {!chatbotOpen && (
        <RobotMascot onChatOpen={() => setChatbotOpen(true)} />
      )}

      {/* Back to Top Button */}
      {scrollY > 500 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl transition-all flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-6 h-6 text-white -rotate-90" />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
};

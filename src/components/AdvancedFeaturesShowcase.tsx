import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Scan,
  Brain,
  Palette,
  BookOpen,
  Volume2,
  WifiOff,
  Shield,
  BookHeart,
  GraduationCap,
  Users,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

import { OCRScreen } from './OCRScreen';
import { NeuralTranslationView } from './NeuralTranslationView';
import { StylePreserverPanel } from './StylePreserverPanel';
import { SmartBilingualView } from './SmartBilingualView';
import { VoiceIntegration } from './VoiceIntegration';
import { OfflineMLMode } from './OfflineMLMode';
import { FederatedLearningDashboard } from './FederatedLearningDashboard';
import { HeritageMode } from './HeritageMode';
import { InteractiveLearning } from './InteractiveLearning';
import { CommunityPlatform } from './CommunityPlatform';

type FeatureScreen = 
  | 'home'
  | 'ocr'
  | 'neural'
  | 'style'
  | 'bilingual'
  | 'voice'
  | 'offline'
  | 'federated'
  | 'heritage'
  | 'learning'
  | 'community';

interface Feature {
  id: FeatureScreen;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  tag: string;
}

export const AdvancedFeaturesShowcase = () => {
  const [currentScreen, setCurrentScreen] = useState<FeatureScreen>('home');

  const features: Feature[] = [
    {
      id: 'ocr',
      title: 'AI Text Extraction',
      description: 'Advanced multimodal OCR with script detection',
      icon: Scan,
      gradient: 'from-blue-500 to-purple-600',
      tag: 'Computer Vision'
    },
    {
      id: 'neural',
      title: 'Neural Translation',
      description: 'Cultural-aware translation with context preservation',
      icon: Brain,
      gradient: 'from-purple-500 to-blue-600',
      tag: 'AI/ML'
    },
    {
      id: 'style',
      title: 'Style Preserver',
      description: 'Intelligent tone adaptation for translations',
      icon: Palette,
      gradient: 'from-orange-500 to-pink-600',
      tag: 'NLP'
    },
    {
      id: 'bilingual',
      title: 'Bilingual Parallel View',
      description: 'Sentence-aligned reading with cultural insights',
      icon: BookOpen,
      gradient: 'from-blue-500 to-teal-600',
      tag: 'Learning'
    },
    {
      id: 'voice',
      title: 'Voice Integration',
      description: 'AI-powered text-to-speech with native voices',
      icon: Volume2,
      gradient: 'from-green-500 to-teal-600',
      tag: 'Audio AI'
    },
    {
      id: 'offline',
      title: 'Offline ML Mode',
      description: 'Run AI models locally with ONNX Runtime',
      icon: WifiOff,
      gradient: 'from-indigo-500 to-purple-600',
      tag: 'Edge AI'
    },
    {
      id: 'federated',
      title: 'Federated Learning',
      description: 'Privacy-preserving collaborative improvement',
      icon: Shield,
      gradient: 'from-emerald-500 to-teal-600',
      tag: 'Privacy'
    },
    {
      id: 'heritage',
      title: 'Heritage Mode',
      description: 'Preserve cultural manuscripts with AI restoration',
      icon: BookHeart,
      gradient: 'from-amber-500 to-orange-600',
      tag: 'Cultural AI'
    },
    {
      id: 'learning',
      title: 'Interactive Learning',
      description: 'Gamified language learning with quizzes',
      icon: GraduationCap,
      gradient: 'from-violet-500 to-purple-600',
      tag: 'EdTech'
    },
    {
      id: 'community',
      title: 'Community Platform',
      description: 'Share translations and collaborate',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-600',
      tag: 'Social'
    },
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'ocr':
        return <OCRScreen />;
      case 'neural':
        return <NeuralTranslationView />;
      case 'style':
        return <StylePreserverPanel />;
      case 'bilingual':
        return <SmartBilingualView />;
      case 'voice':
        return <VoiceIntegration />;
      case 'offline':
        return <OfflineMLMode />;
      case 'federated':
        return <FederatedLearningDashboard />;
      case 'heritage':
        return <HeritageMode />;
      case 'learning':
        return <InteractiveLearning />;
      case 'community':
        return <CommunityPlatform />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-full mb-4">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            10 Advanced AI Features
          </span>
        </div>
        <h1 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Transly Advanced Features
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore the cutting-edge AI capabilities powering multilingual translation, 
          cultural preservation, and collaborative learning
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="cursor-pointer"
              onClick={() => setCurrentScreen(feature.id)}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <CardContent className="pt-6">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-xl`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.tag}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <Button variant="ghost" size="sm" className="w-full group">
                    Explore Feature
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium mb-2">Advanced AI/ML Capabilities</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These mockups showcase Transly's advanced features including neural machine translation,
                  federated learning, offline AI models, cultural heritage preservation, and community collaboration.
                  Each feature is designed with a clean, intelligent interface that balances technical sophistication
                  with literary aesthetics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 lg:p-8">
      {/* Back Button */}
      {currentScreen !== 'home' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentScreen('home')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Features
          </Button>
        </motion.div>
      )}

      {/* Screen Content */}
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderScreen()}
      </motion.div>
    </div>
  );
};

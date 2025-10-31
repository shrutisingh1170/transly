import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Palette, 
  Wand2, 
  BookOpen,
  GraduationCap,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const StylePreserverPanel = () => {
  const [toneProfile, setToneProfile] = useState('faithful');
  const [previewText, setPreviewText] = useState('Hello, I am from Nepal. This text can be extracted using AI technology.');

  const toneProfiles = [
    {
      value: 'faithful',
      label: 'Faithful',
      icon: BookOpen,
      description: 'Preserves original meaning & structure',
      example: 'Hello, I am from Nepal. This text can be extracted using AI technology.',
      color: 'blue'
    },
    {
      value: 'poetic',
      label: 'Poetic',
      icon: Sparkles,
      description: 'Maintains rhythm & literary style',
      example: 'Greetings from the land of Nepal. Through the art of AI, these words find their way.',
      color: 'purple'
    },
    {
      value: 'modernized',
      label: 'Modernized',
      icon: Wand2,
      description: 'Contemporary & conversational',
      example: "Hey! I'm from Nepal. You can use AI tech to pull out text like this.",
      color: 'orange'
    },
    {
      value: 'academic',
      label: 'Academic',
      icon: GraduationCap,
      description: 'Formal & scholarly tone',
      example: 'Salutations. The author originates from Nepal. Artificial Intelligence methodologies facilitate textual extraction.',
      color: 'green'
    }
  ];

  const currentProfile = toneProfiles.find(p => p.value === toneProfile) || toneProfiles[0];

  const handleProfileChange = (value: string) => {
    setToneProfile(value);
    const profile = toneProfiles.find(p => p.value === value);
    if (profile) {
      setPreviewText(profile.example);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>AI Style Preserver</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Intelligent tone adaptation for contextual translation
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tone Profile Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Select Tone Profile</h3>
              <Select value={toneProfile} onValueChange={handleProfileChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toneProfiles.map((profile) => (
                    <SelectItem key={profile.value} value={profile.value}>
                      {profile.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {toneProfiles.map((profile, index) => {
                const Icon = profile.icon;
                return (
                  <motion.button
                    key={profile.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => handleProfileChange(profile.value)}
                    className={`p-5 rounded-xl border-2 transition-all text-left ${
                      toneProfile === profile.value
                        ? `border-${profile.color}-500 bg-${profile.color}-50 dark:bg-${profile.color}-950/30 shadow-lg`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className={`p-3 bg-${profile.color}-100 dark:bg-${profile.color}-900 rounded-lg inline-block mb-3`}>
                      <Icon className={`h-6 w-6 text-${profile.color}-600 dark:text-${profile.color}-400`} />
                    </div>
                    <p className="font-medium mb-2">{profile.label}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {profile.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preview Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Live Preview</h3>
              <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                {currentProfile.label} Mode
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 opacity-10 dark:opacity-5"
              initial={{ backgroundPosition: '0% 0%' }}
              animate={{ backgroundPosition: '100% 100%' }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                background: 'linear-gradient(45deg, #4F46E5 0%, #EC4899 50%, #F59E0B 100%)',
                backgroundSize: '200% 200%',
              }}
            />

            <div className="relative">
              {/* Original Text */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Original (Nepali)</p>
                <p className="font-['Noto_Sans_Devanagari'] text-lg">
                  नमस्ते, म नेपालबाट हुँ। यो AI प्रविधि प्रयोग गरेर पाठ निकाल्न सकिन्छ।
                </p>
              </div>

              {/* Translated Preview with Animation */}
              <motion.div
                key={toneProfile}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl border border-purple-200 dark:border-purple-800"
              >
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  {currentProfile.label} Translation
                </p>
                <p className="text-xl leading-relaxed">
                  {previewText}
                </p>
              </motion.div>

              {/* Style Flow Visualization */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                <Wand2 className="h-5 w-5 text-purple-600" />
                <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Style Characteristics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <h3>Style Characteristics</h3>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Formality Level</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: toneProfile === 'academic' ? '90%' : toneProfile === 'faithful' ? '60%' : toneProfile === 'poetic' ? '50%' : '20%' }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Literary Style</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: toneProfile === 'poetic' ? '90%' : toneProfile === 'faithful' ? '70%' : '40%' }}
                      className="h-full bg-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Modernization</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: toneProfile === 'modernized' ? '85%' : toneProfile === 'poetic' ? '30%' : '50%' }}
                      className="h-full bg-orange-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
            <Sparkles className="h-4 w-4" />
            Apply & Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

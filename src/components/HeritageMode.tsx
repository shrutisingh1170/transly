import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookHeart, 
  Sparkles,
  Download,
  FileArchive,
  Image as ImageIcon,
  FileText,
  BookOpen
} from 'lucide-react';

export const HeritageMode = () => {
  const [comparisonSlider, setComparisonSlider] = useState(50);
  const [selectedCategory, setSelectedCategory] = useState('poetry');

  const categories = [
    { value: 'poetry', label: 'Poetry', icon: BookHeart, count: 234 },
    { value: 'folklore', label: 'Folklore', icon: BookOpen, count: 189 },
    { value: 'religious', label: 'Religious', icon: Sparkles, count: 156 },
    { value: 'historical', label: 'Historical', icon: FileArchive, count: 142 },
  ];

  const manuscripts = [
    {
      id: 1,
      title: 'Ancient Nepali Poetry Collection',
      category: 'poetry',
      year: '1845',
      pages: 45,
      language: 'Nepali',
      status: 'Restored'
    },
    {
      id: 2,
      title: 'Folk Tales of the Himalayas',
      category: 'folklore',
      year: '1892',
      pages: 78,
      language: 'Nepali',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Religious Hymns & Verses',
      category: 'religious',
      year: '1823',
      pages: 62,
      language: 'Sanskrit/Nepali',
      status: 'Restored'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
            <BookHeart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Heritage Mode</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Preserve and digitize cultural manuscripts with AI restoration
            </p>
          </div>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedCategory === category.value
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${
                      selectedCategory === category.value
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-400'
                    }`} />
                    <p className="font-medium text-sm">{category.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {category.count} items
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Before/After Restoration Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>AI-Enhanced Restoration</h3>
              <Badge className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                Before / After
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-900 rounded-xl overflow-hidden h-[400px]">
              {/* Before Image (Background) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - comparisonSlider}% 0 0)`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-900/40 to-orange-900/40 flex items-center justify-center">
                  <div className="text-center text-white/80">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg">Before Restoration</p>
                    <p className="text-sm text-white/60 mt-2">Damaged manuscript (1845)</p>
                  </div>
                </div>
              </div>

              {/* After Image (Foreground) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 0 0 ${comparisonSlider}%)`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-950/60 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 text-amber-600" />
                    <p className="text-lg font-medium">After Restoration</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">AI-enhanced clarity</p>
                  </div>
                </div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${comparisonSlider}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-gray-400 rounded"></div>
                    <div className="w-1 h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <div className="mt-6">
              <Slider
                value={[comparisonSlider]}
                onValueChange={(value) => setComparisonSlider(value[0])}
                max={100}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Split View: Original Image & Digitized Text */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Manuscript Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-amber-600" />
                <h3>Original Manuscript</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-8 h-[300px] flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                <div className="text-center">
                  <FileArchive className="h-20 w-20 mx-auto mb-4 text-amber-600 dark:text-amber-400" />
                  <p className="font-medium mb-2">Ancient Nepali Poetry</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hand-written manuscript from 1845
                  </p>
                  <Badge className="mt-3 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                    45 Pages
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Digitized Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3>Digitized Text</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl h-[300px] overflow-y-auto">
                <div className="space-y-4 font-['Noto_Sans_Devanagari']">
                  <div>
                    <Badge className="mb-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                      Verse 1
                    </Badge>
                    <p className="text-lg leading-relaxed">
                      हिमाल को काख मा बसेर<br />
                      सपना हरु बुनेका छन्<br />
                      ति पुर्खा हरु को आवाज<br />
                      अझै पनि सुनिन्छ यहाँ
                    </p>
                  </div>
                  <div>
                    <Badge className="mb-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                      Verse 2
                    </Badge>
                    <p className="text-lg leading-relaxed">
                      ज्ञान को ज्योति जलाएर<br />
                      अन्धकार मेटाउने<br />
                      यो मेरो प्यारो देश<br />
                      सदा अघि बढ्ने
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Manuscript Collection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Manuscript Collection</h3>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Archive
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {manuscripts.map((manuscript, index) => (
                <motion.div
                  key={manuscript.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                        <BookHeart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium">{manuscript.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span>{manuscript.year}</span>
                          <span>•</span>
                          <span>{manuscript.pages} pages</span>
                          <span>•</span>
                          <span>{manuscript.language}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      manuscript.status === 'Restored'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    }>
                      {manuscript.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Digitize & Archive Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-600 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">Ready to digitize new manuscripts?</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload images and let AI restore and extract text
                  </p>
                </div>
              </div>
              <Button className="gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg">
                <FileArchive className="h-4 w-4" />
                Digitize & Archive
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

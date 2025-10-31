import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { 
  WifiOff, 
  Download,
  Cpu,
  Database,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Info,
  RefreshCw
} from 'lucide-react';

export const OfflineMLMode = () => {
  const [offlineMode, setOfflineMode] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const models = [
    {
      name: 'Nepali → English',
      size: '245 MB',
      version: 'v2.4.1',
      accuracy: '96.8%',
      status: 'active'
    },
    {
      name: 'Sinhalese → English',
      size: '238 MB',
      version: 'v2.4.1',
      accuracy: '95.2%',
      status: 'active'
    },
    {
      name: 'OCR Model (Devanagari)',
      size: '180 MB',
      version: 'v1.8.0',
      accuracy: '94.5%',
      status: 'active'
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <WifiOff className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Offline Mode & Device Intelligence</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Run AI models locally with optimized performance
            </p>
          </div>
        </div>
      </motion.div>

      {/* Offline Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${offlineMode ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <WifiOff className={`h-8 w-8 ${offlineMode ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-medium mb-1">Offline Translation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Process translations without internet connection
                  </p>
                </div>
              </div>
              <Switch
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Model Size</p>
                  <p className="text-2xl font-medium">663 MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Sync</p>
                  <p className="text-2xl font-medium">2h ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Offline Accuracy</p>
                  <p className="text-2xl font-medium">95.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Downloaded Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Downloaded AI Models</h3>
              <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                {models.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {models.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded">
                        <Cpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium">{model.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Version {model.version}
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Size</p>
                      <p className="font-medium">{model.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Accuracy</p>
                      <p className="font-medium">{model.accuracy}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Status</p>
                      <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 capitalize">
                        {model.status}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sync Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <h3>Model Synchronization</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSyncing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Syncing models...</span>
                  <span>{syncProgress}%</span>
                </div>
                <Progress value={syncProgress} className="h-2" />
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                onClick={handleSync}
                disabled={isSyncing}
                className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Sync Now
                  </>
                )}
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Check for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-l-4 border-l-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="font-medium mb-2">Runs fully offline using optimized AI models (ONNX Runtime)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All models are optimized for on-device inference using ONNX Runtime, ensuring fast and 
                  private translations without internet connectivity. Models are compressed using quantization 
                  techniques to minimize storage while maintaining high accuracy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

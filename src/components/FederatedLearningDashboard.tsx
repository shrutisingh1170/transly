import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Shield, 
  TrendingUp,
  RefreshCw,
  Lock,
  CheckCircle2,
  Database,
  Users
} from 'lucide-react';

export const FederatedLearningDashboard = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const accuracyData = [
    { month: 'Jan', accuracy: 92.5 },
    { month: 'Feb', accuracy: 93.2 },
    { month: 'Mar', accuracy: 94.1 },
    { month: 'Apr', accuracy: 94.8 },
    { month: 'May', accuracy: 95.3 },
    { month: 'Jun', accuracy: 95.8 },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSyncing(false);
            setSyncProgress(0);
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Federated Learning Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Privacy-preserving collaborative model improvement
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Accuracy</p>
                  <p className="text-2xl font-medium">95.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Local Updates</p>
                  <p className="text-2xl font-medium">2,847</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Contributors</p>
                  <p className="text-2xl font-medium">12.5K</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Improvement</p>
                  <p className="text-2xl font-medium">+3.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Accuracy Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3>Model Accuracy Over Time</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Your local corrections are helping improve the global model
                </p>
              </div>
              <Badge className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                6-Month Trend
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  domain={[90, 100]}
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sync Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <h3>Synchronization</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Ready to Sync</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isSyncing ? 'Uploading local improvements...' : 'Share your improvements with the global model'}
                    </p>
                  </div>
                </div>
                {isSyncing && (
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {syncProgress}%
                  </Badge>
                )}
              </div>
              
              {isSyncing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Progress value={syncProgress} className="h-2" />
                </motion.div>
              )}
            </div>

            <Button
              onClick={handleSync}
              disabled={isSyncing}
              className="w-full gap-2 bg-gradient-to-r from-emerald-600 to-teal-600"
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
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-medium mb-2">Your data never leaves your device</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Federated learning allows the global model to improve from your corrections without 
                  ever accessing your personal data. Only anonymized model updates are shared, ensuring 
                  complete privacy.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Encryption</p>
                    <p className="font-medium text-sm">End-to-End</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Data Storage</p>
                    <p className="font-medium text-sm">Local Only</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Compliance</p>
                    <p className="font-medium text-sm">GDPR Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <h3>How Federated Learning Works</h3>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full inline-block mb-3">
                  <span className="text-2xl font-medium text-blue-600 dark:text-blue-400">1</span>
                </div>
                <p className="font-medium mb-2">Learn Locally</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI model trains on your device using your corrections
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900 rounded-full inline-block mb-3">
                  <span className="text-2xl font-medium text-emerald-600 dark:text-emerald-400">2</span>
                </div>
                <p className="font-medium mb-2">Share Updates</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Only model improvements are sent, never your data
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-teal-100 dark:bg-teal-900 rounded-full inline-block mb-3">
                  <span className="text-2xl font-medium text-teal-600 dark:text-teal-400">3</span>
                </div>
                <p className="font-medium mb-2">Global Improvement</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Combined updates enhance the model for everyone
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

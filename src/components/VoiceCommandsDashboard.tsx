import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Mic,
  TrendingUp,
  Clock,
  Check,
  X as XIcon,
  Volume2,
  Languages,
  MessageSquare,
  Home,
  Download,
} from 'lucide-react';

export const VoiceCommandsDashboard = () => {
  const voiceLogs = [
    {
      id: 1,
      command: 'Open chatbot',
      status: 'success',
      response: 'Opening chatbot...',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      duration: 1.2,
      confidence: 98,
    },
    {
      id: 2,
      command: 'Translate text',
      status: 'success',
      response: 'Opening translator...',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      duration: 1.5,
      confidence: 95,
    },
    {
      id: 3,
      command: 'Go to features',
      status: 'success',
      response: 'Navigating to features...',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      duration: 0.9,
      confidence: 97,
    },
    {
      id: 4,
      command: 'Open OCR',
      status: 'success',
      response: 'Opening OCR tool...',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      duration: 1.1,
      confidence: 96,
    },
    {
      id: 5,
      command: 'Download extracted text',
      status: 'success',
      response: 'Initiating download...',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      duration: 1.3,
      confidence: 94,
    },
    {
      id: 6,
      command: 'Go to home',
      status: 'success',
      response: 'Navigating to home...',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      duration: 0.8,
      confidence: 99,
    },
    {
      id: 7,
      command: 'Help me translate',
      status: 'success',
      response: 'I can help you translate. Opening translator...',
      timestamp: new Date(Date.now() - 120 * 60 * 1000),
      duration: 1.6,
      confidence: 93,
    },
    {
      id: 8,
      command: 'What can you do',
      status: 'success',
      response: 'I can help you navigate, translate, and use various tools.',
      timestamp: new Date(Date.now() - 150 * 60 * 1000),
      duration: 2.1,
      confidence: 92,
    },
    {
      id: 9,
      command: 'Open settings',
      status: 'success',
      response: 'Opening settings...',
      timestamp: new Date(Date.now() - 180 * 60 * 1000),
      duration: 1.0,
      confidence: 97,
    },
    {
      id: 10,
      command: 'Start voice recognition',
      status: 'success',
      response: 'Voice recognition activated.',
      timestamp: new Date(Date.now() - 210 * 60 * 1000),
      duration: 1.4,
      confidence: 95,
    },
  ];

  const stats = [
    {
      label: 'Total Commands',
      value: voiceLogs.length,
      icon: Mic,
      color: 'purple',
    },
    {
      label: 'Success Rate',
      value: '100%',
      icon: Check,
      color: 'green',
    },
    {
      label: 'Avg Confidence',
      value: '96%',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      label: 'Avg Duration',
      value: '1.3s',
      icon: Clock,
      color: 'orange',
    },
  ];

  const exportLogs = () => {
    const csvContent = `Voice Commands Log - Transly
Generated: ${new Date().toLocaleString()}

Timestamp,Command,Status,Response,Duration,Confidence
${voiceLogs.map(log => 
  `${log.timestamp.toLocaleString()},"${log.command}",${log.status},"${log.response}",${log.duration}s,${log.confidence}%`
).join('\n')}
`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voice-commands-log-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="flex items-center gap-3">
            <Mic className="w-8 h-8 text-purple-600" />
            Voice Commands Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and analyze voice assistant usage
          </p>
        </div>
        <Button
          onClick={exportLogs}
          className="bg-gradient-to-r from-purple-600 to-pink-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6 text-center">
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl mb-2">{stat.value}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Voice Commands Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Recent Voice Commands</h3>
              <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                Last 24 hours
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {voiceLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Volume2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">"{log.command}"</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          log.status === 'success'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                        }`}
                      >
                        {log.status === 'success' ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <XIcon className="w-3 h-3 mr-1" />
                        )}
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {log.response}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span>•</span>
                      <span>Duration: {log.duration}s</span>
                      <span>•</span>
                      <span>Confidence: {log.confidence}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <h3>Available Voice Commands</h3>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { command: 'Open Chatbot', icon: MessageSquare, description: 'Launch AI chatbot' },
                { command: 'Open OCR', icon: Mic, description: 'Start text extraction' },
                { command: 'Translate text', icon: Languages, description: 'Open translator tool' },
                { command: 'Go to Features', icon: Home, description: 'Navigate to features' },
                { command: 'Download extracted text', icon: Download, description: 'Export OCR results' },
                { command: 'Go to Home', icon: Home, description: 'Return to homepage' },
              ].map((cmd, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg"
                >
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <cmd.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">"{cmd.command}"</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {cmd.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Mic className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Voice Assistant Tips</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Speak clearly and naturally for best recognition</li>
                  <li>• Wait for the beep before speaking</li>
                  <li>• Use specific command phrases listed above</li>
                  <li>• Works best in quiet environments</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

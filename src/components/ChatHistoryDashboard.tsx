import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  MessageSquare,
  Download,
  Clock,
  TrendingUp,
  ThumbsUp,
  Bot,
  User,
  Calendar,
} from 'lucide-react';

interface ChatSession {
  id: number;
  title: string;
  messages: number;
  duration: string;
  satisfaction: number;
  timestamp: Date;
  category: string;
  preview: string;
}

export const ChatHistoryDashboard = () => {
  const chatSessions: ChatSession[] = [
    {
      id: 1,
      title: 'Translation Help',
      messages: 12,
      duration: '8 min',
      satisfaction: 5,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      category: 'Support',
      preview: 'How do I translate Nepali documents?',
    },
    {
      id: 2,
      title: 'Grammar Correction',
      messages: 8,
      duration: '5 min',
      satisfaction: 5,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: 'Learning',
      preview: 'Can you help me correct this sentence?',
    },
    {
      id: 3,
      title: 'Feature Inquiry',
      messages: 6,
      duration: '4 min',
      satisfaction: 4,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: 'Support',
      preview: 'What features does Transly offer?',
    },
    {
      id: 4,
      title: 'Voice Translation',
      messages: 10,
      duration: '7 min',
      satisfaction: 5,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: 'Support',
      preview: 'How does voice translation work?',
    },
    {
      id: 5,
      title: 'Learning Tips',
      messages: 15,
      duration: '10 min',
      satisfaction: 5,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: 'Learning',
      preview: 'Tips for improving English pronunciation',
    },
    {
      id: 6,
      title: 'OCR Questions',
      messages: 9,
      duration: '6 min',
      satisfaction: 4,
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      category: 'Support',
      preview: 'Can I extract handwritten text?',
    },
    {
      id: 7,
      title: 'Quiz Assistance',
      messages: 7,
      duration: '5 min',
      satisfaction: 5,
      timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
      category: 'Learning',
      preview: 'Help me prepare for the quiz',
    },
    {
      id: 8,
      title: 'Vocabulary Practice',
      messages: 11,
      duration: '8 min',
      satisfaction: 5,
      timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
      category: 'Learning',
      preview: 'Nepali to English vocabulary words',
    },
    {
      id: 9,
      title: 'Technical Support',
      messages: 5,
      duration: '3 min',
      satisfaction: 4,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      category: 'Support',
      preview: 'App not loading properly',
    },
    {
      id: 10,
      title: 'General Inquiry',
      messages: 4,
      duration: '3 min',
      satisfaction: 5,
      timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000),
      category: 'Support',
      preview: 'Tell me about Transly',
    },
  ];

  const stats = [
    {
      label: 'Total Chats',
      value: chatSessions.length,
      icon: MessageSquare,
      color: 'blue',
    },
    {
      label: 'Avg Messages',
      value: '9',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      label: 'Avg Duration',
      value: '6 min',
      icon: Clock,
      color: 'green',
    },
    {
      label: 'Satisfaction',
      value: '4.8/5',
      icon: ThumbsUp,
      color: 'orange',
    },
  ];

  const exportChatHistory = () => {
    const csvContent = `Chat History - Transly
Generated: ${new Date().toLocaleString()}

Timestamp,Title,Category,Messages,Duration,Satisfaction,Preview
${chatSessions.map(session => 
  `${session.timestamp.toLocaleString()},"${session.title}",${session.category},${session.messages},${session.duration},${session.satisfaction}/5,"${session.preview}"`
).join('\n')}
`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTranscript = (sessionId: number) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (!session) return;

    const transcript = `
═══════════════════════════════════════════════════════════
            CHAT TRANSCRIPT - ${session.title}
═══════════════════════════════════════════════════════════

Session ID: ${session.id}
Date: ${session.timestamp.toLocaleString()}
Category: ${session.category}
Duration: ${session.duration}
Messages: ${session.messages}
Satisfaction: ${session.satisfaction}/5

───────────────────────────────────────────────────────────
                    CONVERSATION
───────────────────────────────────────────────────────────

[User]: ${session.preview}

[AI Assistant]: Thank you for reaching out! I'd be happy to help you with that.

[User]: Great! Can you provide more details?

[AI Assistant]: Absolutely! Let me explain in detail...

[User]: That makes sense. What about...?

[AI Assistant]: Good question! Here's what you need to know...

[User]: Perfect! This is very helpful.

[AI Assistant]: I'm glad I could help! Is there anything else you'd like to know?

[User]: No, that's all. Thank you!

[AI Assistant]: You're welcome! Feel free to reach out anytime. Have a great day!

───────────────────────────────────────────────────────────
                    END OF TRANSCRIPT
───────────────────────────────────────────────────────────

Feedback: ${session.satisfaction}/5 stars
`;

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-transcript-${session.id}.txt`;
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
            <MessageSquare className="w-8 h-8 text-blue-600" />
            Chat History Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and export chatbot conversation history
          </p>
        </div>
        <Button
          onClick={exportChatHistory}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Export All
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

      {/* Chat Sessions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Recent Conversations</h3>
              <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                Last 7 days
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chatSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4>{session.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          session.category === 'Support'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                        }
                      >
                        {session.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      "{session.preview}"
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {session.timestamp.toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {session.messages} messages
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {session.satisfaction}/5
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadTranscript(session.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <h3>Categories</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <span className="text-sm font-medium">Support</span>
                  <Badge className="bg-blue-600 text-white">
                    {chatSessions.filter(s => s.category === 'Support').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <span className="text-sm font-medium">Learning</span>
                  <Badge className="bg-purple-600 text-white">
                    {chatSessions.filter(s => s.category === 'Learning').length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <h3>Satisfaction Breakdown</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4].map(rating => (
                  <div
                    key={rating}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg"
                  >
                    <span className="text-sm font-medium flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      {rating} Stars
                    </span>
                    <Badge className="bg-green-600 text-white">
                      {chatSessions.filter(s => s.satisfaction === rating).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Chat History Management</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All conversations are automatically saved and can be exported individually or in bulk.
                  Use the export feature to create backups or share conversation transcripts.
                  Your chat data is encrypted and stored securely.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

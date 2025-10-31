import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Languages,
  MessageSquare,
  Download,
  Eye,
  Clock,
  Award,
} from 'lucide-react';

export const AnalyticsDashboard = () => {
  // Demo data for translation frequency
  const translationData = [
    { month: 'Jan', translations: 240, accuracy: 94 },
    { month: 'Feb', translations: 320, accuracy: 95 },
    { month: 'Mar', translations: 450, accuracy: 96 },
    { month: 'Apr', translations: 380, accuracy: 95 },
    { month: 'May', translations: 520, accuracy: 97 },
    { month: 'Jun', translations: 600, accuracy: 98 },
  ];

  // Demo data for OCR usage
  const ocrData = [
    { day: 'Mon', scans: 45 },
    { day: 'Tue', scans: 52 },
    { day: 'Wed', scans: 38 },
    { day: 'Thu', scans: 61 },
    { day: 'Fri', scans: 55 },
    { day: 'Sat', scans: 28 },
    { day: 'Sun', scans: 22 },
  ];

  // Demo data for chatbot sessions
  const chatbotData = [
    { name: 'Translation Help', value: 400, color: '#6C63FF' },
    { name: 'Grammar Check', value: 300, color: '#00CFFF' },
    { name: 'Learning Tips', value: 200, color: '#FF6B9D' },
    { name: 'Feature Info', value: 100, color: '#FFA500' },
  ];

  // Demo data for language distribution
  const languageData = [
    { name: 'Nepali → English', value: 550, color: '#6C63FF' },
    { name: 'Sinhala → English', value: 350, color: '#00CFFF' },
    { name: 'English → Nepali', value: 200, color: '#FF6B9D' },
    { name: 'English → Sinhala', value: 150, color: '#FFA500' },
  ];

  const stats = [
    {
      label: 'Total Translations',
      value: '2,510',
      change: '+12%',
      icon: Languages,
      color: 'blue',
    },
    {
      label: 'Active Users',
      value: '1,234',
      change: '+8%',
      icon: Users,
      color: 'purple',
    },
    {
      label: 'OCR Scans',
      value: '301',
      change: '+15%',
      icon: Eye,
      color: 'green',
    },
    {
      label: 'Chat Sessions',
      value: '1,000',
      change: '+20%',
      icon: MessageSquare,
      color: 'orange',
    },
  ];

  const downloadReport = () => {
    // Create CSV data
    const csvData = `Analytics Report - Transly
Generated: ${new Date().toLocaleDateString()}

=== Translation Statistics ===
${translationData.map(d => `${d.month}: ${d.translations} translations, ${d.accuracy}% accuracy`).join('\n')}

=== OCR Usage ===
${ocrData.map(d => `${d.day}: ${d.scans} scans`).join('\n')}

=== Language Distribution ===
${languageData.map(d => `${d.name}: ${d.value} translations`).join('\n')}
`;

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transly-analytics-${new Date().toISOString().split('T')[0]}.csv`;
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
            <BarChart className="w-8 h-8 text-blue-600" />
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your translation activity and performance metrics
          </p>
        </div>
        <Button
          onClick={downloadReport}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
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
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}
                  >
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl mb-1">{stat.value}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Translation Frequency Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3>Translation Frequency</h3>
                <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  Last 6 Months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={translationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="translations" fill="#6C63FF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accuracy Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3>Accuracy Trend</h3>
                <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3% vs Last Period
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={translationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" domain={[90, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#00CFFF"
                    strokeWidth={3}
                    dot={{ fill: '#00CFFF', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* OCR Usage Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3>OCR Usage (This Week)</h3>
                <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  301 Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ocrData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="scans" fill="#FF6B9D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3>Language Distribution</h3>
                <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
                  Total: 1,250
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <h3>Recent Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: '2 mins ago',
                  action: 'Translated Nepali text',
                  detail: '45 characters • 98% accuracy',
                  icon: Languages,
                  color: 'blue',
                },
                {
                  time: '15 mins ago',
                  action: 'OCR Scan completed',
                  detail: 'Document page 1 • 120 words extracted',
                  icon: Eye,
                  color: 'purple',
                },
                {
                  time: '1 hour ago',
                  action: 'Chatbot conversation',
                  detail: '12 messages • Grammar help',
                  icon: MessageSquare,
                  color: 'green',
                },
                {
                  time: '3 hours ago',
                  action: 'Quiz completed',
                  detail: 'Level 5 • Score: 85%',
                  icon: Award,
                  color: 'orange',
                },
                {
                  time: '5 hours ago',
                  action: 'Voice translation',
                  detail: 'Sinhala to English • 30 seconds',
                  icon: Clock,
                  color: 'pink',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg bg-${activity.color}-100 dark:bg-${activity.color}-900/20`}
                  >
                    <activity.icon
                      className={`w-5 h-5 text-${activity.color}-600`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

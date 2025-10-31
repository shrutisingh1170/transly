import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Languages,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const ReportsDashboard = () => {
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const reports = [
    {
      id: 1,
      title: 'Monthly Translation Report',
      description: 'Comprehensive translation statistics for June 2025',
      date: 'June 2025',
      status: 'completed',
      type: 'translation',
      stats: { translations: 600, accuracy: 98, users: 234 },
    },
    {
      id: 2,
      title: 'OCR Performance Report',
      description: 'Text extraction accuracy and usage metrics',
      date: 'June 2025',
      status: 'completed',
      type: 'ocr',
      stats: { scans: 301, accuracy: 96, pages: 847 },
    },
    {
      id: 3,
      title: 'User Engagement Report',
      description: 'Active users, session times, and feature usage',
      date: 'June 2025',
      status: 'completed',
      type: 'engagement',
      stats: { activeUsers: 1234, sessions: 5678, avgTime: '12 min' },
    },
    {
      id: 4,
      title: 'Chatbot Interaction Report',
      description: 'AI chatbot conversations and user satisfaction',
      date: 'June 2025',
      status: 'completed',
      type: 'chatbot',
      stats: { conversations: 1000, satisfaction: 94, avgLength: 8 },
    },
    {
      id: 5,
      title: 'Learning Progress Report',
      description: 'Quiz completion rates and student performance',
      date: 'June 2025',
      status: 'completed',
      type: 'learning',
      stats: { quizzes: 456, completion: 89, avgScore: 85 },
    },
  ];

  const downloadPDF = (reportId: number) => {
    setGeneratingPDF(true);
    
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    // Generate PDF content as text (in a real app, use jsPDF or html2pdf)
    const pdfContent = `
═══════════════════════════════════════════════════════════
              TRANSLY - ${report.title}
═══════════════════════════════════════════════════════════

Report Generated: ${new Date().toLocaleString()}
Reporting Period: ${report.date}

───────────────────────────────────────────────────────────
                    EXECUTIVE SUMMARY
───────────────────────────────────────────────────────────

${report.description}

───────────────────────────────────────────────────────────
                    KEY METRICS
───────────────────────────────────────────────────────────

${Object.entries(report.stats).map(([key, value]) => 
  `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
).join('\n')}

───────────────────────────────────────────────────────────
                    DETAILED ANALYSIS
───────────────────────────────────────────────────────────

Performance Overview:
• Overall performance exceeded expectations
• User engagement shows consistent growth
• System accuracy maintains high standards
• Positive user feedback and satisfaction ratings

Recommendations:
• Continue monitoring key performance indicators
• Expand feature set based on user requests
• Maintain focus on accuracy and reliability
• Regular system updates and improvements

───────────────────────────────────────────────────────────
                        CONCLUSION
───────────────────────────────────────────────────────────

This report demonstrates strong performance across all metrics.
Transly continues to deliver value to users with high accuracy
and reliable service.

═══════════════════════════════════════════════════════════
                    End of Report
═══════════════════════════════════════════════════════════
`;

    setTimeout(() => {
      // Create and download the file
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);

      setGeneratingPDF(false);
      toast.success('Report downloaded successfully!');
    }, 1500);
  };

  const downloadAllReports = () => {
    setGeneratingPDF(true);

    const combinedReport = `
═══════════════════════════════════════════════════════════
                TRANSLY - COMPREHENSIVE REPORT
                    All Reports Package
═══════════════════════════════════════════════════════════

Generated: ${new Date().toLocaleString()}
Period: June 2025

${reports.map(report => `
───────────────────────────────────────────────────────────
${report.title}
───────────────────────────────────────────────────────────

${report.description}

Key Metrics:
${Object.entries(report.stats).map(([key, value]) => 
  `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
).join('\n')}

`).join('\n')}

═══════════════════════════════════════════════════════════
                    End of Combined Report
═══════════════════════════════════════════════════════════
`;

    setTimeout(() => {
      const blob = new Blob([combinedReport], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transly-all-reports-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);

      setGeneratingPDF(false);
      toast.success('All reports downloaded successfully!');
    }, 2000);
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
            <FileText className="w-8 h-8 text-purple-600" />
            Reports Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate and download detailed performance reports
          </p>
        </div>
        <Button
          onClick={downloadAllReports}
          disabled={generatingPDF}
          className="bg-gradient-to-r from-purple-600 to-pink-600"
        >
          <Download className="w-4 h-4 mr-2" />
          {generatingPDF ? 'Generating...' : 'Download All'}
        </Button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl mb-2">{reports.length}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Reports
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl mb-2">{reports.filter(r => r.status === 'completed').length}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Completed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl mb-2">June</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current Period
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl mb-2">+15%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Growth Rate
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                      {report.type === 'translation' && <Languages className="w-6 h-6 text-purple-600" />}
                      {report.type === 'ocr' && <Eye className="w-6 h-6 text-purple-600" />}
                      {report.type === 'engagement' && <Users className="w-6 h-6 text-purple-600" />}
                      {report.type === 'chatbot' && <MessageSquare className="w-6 h-6 text-purple-600" />}
                      {report.type === 'learning' && <TrendingUp className="w-6 h-6 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{report.title}</h3>
                        <Badge
                          variant="outline"
                          className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {report.date}
                        </span>
                        <div className="flex gap-3">
                          {Object.entries(report.stats).map(([key, value], idx) => (
                            <Badge key={idx} variant="outline">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => downloadPDF(report.id)}
                      disabled={generatingPDF}
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Automated Report Generation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reports are automatically generated at the end of each month. You can
                  download individual reports or a complete package containing all reports.
                  All reports are available in PDF format for easy sharing and archiving.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

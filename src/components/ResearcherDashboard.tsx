import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  FolderOpen,
  GitBranch,
  Scan,
  Edit,
  Download,
  Upload,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Mic
} from 'lucide-react';

export const ResearcherDashboard = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'Historical Manuscripts Translation',
      documents: 45,
      progress: 78,
      lastModified: '2 hours ago',
      status: 'active',
      versions: 12
    },
    {
      id: 2,
      name: 'Academic Research Papers',
      documents: 23,
      progress: 45,
      lastModified: '1 day ago',
      status: 'active',
      versions: 8
    },
    {
      id: 3,
      name: 'Cultural Heritage Archive',
      documents: 67,
      progress: 92,
      lastModified: '3 days ago',
      status: 'review',
      versions: 15
    },
  ]);

  const recentDocuments = [
    { name: 'Ancient_Poetry_Collection.pdf', size: '2.4 MB', status: 'completed', accuracy: 96 },
    { name: 'Research_Paper_Draft.docx', size: '856 KB', status: 'processing', accuracy: null },
    { name: 'Manuscript_Page_45.jpg', size: '1.2 MB', status: 'completed', accuracy: 94 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2>Researcher Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage research projects, batch translations, and document analysis
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Batch Upload
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                  <p className="text-2xl font-medium">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
                  <p className="text-2xl font-medium">135</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-medium">89</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Accuracy</p>
                  <p className="text-2xl font-medium">95.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tools">Research Tools</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <h3>Research Projects</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{project.name}</h4>
                            <Badge className={
                              project.status === 'active'
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            }>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {project.documents} docs
                            </span>
                            <span className="flex items-center gap-1">
                              <GitBranch className="h-4 w-4" />
                              {project.versions} versions
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {project.lastModified}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <FolderOpen className="h-3 w-3" />
                          Open
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          Export
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>Recent Documents</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDocuments.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {doc.accuracy && (
                          <Badge variant="outline" className="text-xs">
                            {doc.accuracy}% accurate
                          </Badge>
                        )}
                        <Badge className={
                          doc.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                        }>
                          {doc.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Tools Tab */}
          <TabsContent value="tools" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Scan className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Document OCR</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Extract text from scanned documents and images
                      </p>
                      <Button size="sm" variant="outline">Launch Tool</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Upload className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Batch Translation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Translate multiple documents simultaneously
                      </p>
                      <Button size="sm" variant="outline">Launch Tool</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Edit className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">AI Translation Editor</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Review and refine translations with AI assistance
                      </p>
                      <Button size="sm" variant="outline">Launch Tool</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                      <Mic className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Voice Notes Converter</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Convert voice recordings to translated text
                      </p>
                      <Button size="sm" variant="outline">Launch Tool</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                      <GitBranch className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Version Control</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Track changes and manage translation versions
                      </p>
                      <Button size="sm" variant="outline">View History</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Performance Analytics</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Track translation quality and efficiency metrics
                      </p>
                      <Button size="sm" variant="outline">View Analytics</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

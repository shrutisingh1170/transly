import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, 
  Users,
  BookOpen,
  TrendingUp,
  Award,
  FileText,
  Volume2,
  BarChart3,
  Plus,
  Edit,
  Share2,
  Clock
} from 'lucide-react';

export const EducatorDashboard = () => {
  const [activeStudents] = useState(45);
  const [quizzesCreated] = useState(12);
  const [avgCompletion] = useState(78);

  const myQuizzes = [
    {
      id: 1,
      title: 'Nepali Basics - Greetings',
      students: 28,
      avgScore: 85,
      created: '2 days ago',
      status: 'active'
    },
    {
      id: 2,
      title: 'Sinhalese Numbers 1-100',
      students: 22,
      avgScore: 72,
      created: '5 days ago',
      status: 'active'
    },
    {
      id: 3,
      title: 'Translation Practice: Daily Life',
      students: 35,
      avgScore: 91,
      created: '1 week ago',
      status: 'active'
    },
  ];

  const studentProgress = [
    { name: 'Amit S.', progress: 92, quizzes: 8, level: 'Advanced' },
    { name: 'Priya K.', progress: 78, quizzes: 6, level: 'Intermediate' },
    { name: 'Raj M.', progress: 65, quizzes: 5, level: 'Beginner' },
    { name: 'Maya T.', progress: 88, quizzes: 7, level: 'Advanced' },
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
            <h2>Educator Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your students, create quizzes, and track learning progress
            </p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="h-4 w-4" />
            Create New Quiz
          </Button>
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
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
                  <p className="text-2xl font-medium">{activeStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Created</p>
                  <p className="text-2xl font-medium">{quizzesCreated}</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Completion</p>
                  <p className="text-2xl font-medium">{avgCompletion}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                  <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Badges Awarded</p>
                  <p className="text-2xl font-medium">127</p>
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
        <Tabs defaultValue="quizzes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
            <TabsTrigger value="students">Student Progress</TabsTrigger>
            <TabsTrigger value="tools">Teaching Tools</TabsTrigger>
          </TabsList>

          {/* My Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>Active Quizzes</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {myQuizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{quiz.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {quiz.students} students
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {quiz.avgScore}% avg
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {quiz.created}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                          {quiz.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <BarChart3 className="h-3 w-3" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Share2 className="h-3 w-3" />
                          Share
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Progress Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <h3>Student Performance</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentProgress.map((student, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {student.quizzes} quizzes completed
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{student.level}</Badge>
                      </div>
                      <Progress value={student.progress} className="h-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                        {student.progress}% complete
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teaching Tools Tab */}
          <TabsContent value="tools" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Volume2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Pronunciation Trainer</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Create voice exercises with native speaker audio
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
                      <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Quiz Generator</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        AI-powered quiz creation from any text
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
                      <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Analytics Dashboard</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Track student performance and engagement
                      </p>
                      <Button size="sm" variant="outline">View Analytics</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">AI Tutor Assistant</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Provide 24/7 support with AI chatbot
                      </p>
                      <Button size="sm" variant="outline">Configure</Button>
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

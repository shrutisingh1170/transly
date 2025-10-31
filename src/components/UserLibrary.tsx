import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockTranslations, mockDocuments, mockQuizResults, mockQuizzes } from '../lib/mockData';
import { Star, Trash2, FileText, Trophy, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const UserLibrary = () => {
  const [translations] = useState(mockTranslations);
  const [documents] = useState(mockDocuments);
  const [quizResults] = useState(mockQuizResults);

  const toggleFavorite = () => {
    toast.success('Toggled favorite');
  };

  const handleDelete = () => {
    toast.success('Item deleted');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">My Library</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Access your saved translations, documents, and quiz history
        </p>
      </div>

      <Tabs defaultValue="translations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz History</TabsTrigger>
        </TabsList>

        <TabsContent value="translations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Saved Translations</CardTitle>
                  <CardDescription>Your translation history</CardDescription>
                </div>
                <Badge>{translations.length} items</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {translations.map((trans) => (
                  <div
                    key={trans.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {trans.sourceLanguage === 'nepali' ? 'Nepali' : 'Sinhalese'} → English
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(trans.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mb-2">{trans.sourceText}</p>
                      <p className="text-green-700 dark:text-green-300">
                        → {trans.translatedText}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFavorite}
                      >
                        <Star className={`h-4 w-4 ${trans.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Uploaded Documents</CardTitle>
                  <CardDescription>Your document library</CardDescription>
                </div>
                <Badge>{documents.length} items</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{doc.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {doc.type.toUpperCase()}
                        </Badge>
                        <span>•</span>
                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <Badge variant={doc.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quiz History</CardTitle>
                  <CardDescription>Your quiz performance</CardDescription>
                </div>
                <Badge>{quizResults.length} completed</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quizResults.map((result) => {
                  const quiz = mockQuizzes.find(q => q.id === result.quizId);
                  const percentage = (result.score / result.totalPoints) * 100;
                  
                  return (
                    <div
                      key={result.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{quiz?.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(result.completedAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>Score: {result.score}/{result.totalPoints}</span>
                          <span>•</span>
                          <span className={percentage >= 80 ? 'text-green-600 dark:text-green-400' : ''}>
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl mb-1">{result.score}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Retake
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">8</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">87%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">1,250</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
